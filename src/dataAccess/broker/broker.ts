/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

/**
 * This program has been developed by students from the bachelor Computer Science at
 * Utrecht University within the Software Project course.
 * © Copyright Utrecht University (Department of Information and Computing Sciences)
 */

import { UseIsAuthorizedState } from "../authentication/authSlice";
import {
  ReceiveMessageI,
  SendMessageI,
  QueuedMessage,
  SendMessageWithSessionI
} from "./types";

/**
 * A broker that handles incoming messages from the backend.
 */
export class Broker {
  private static singletonInstance: Broker;

  private listeners: Record<string, Record<string, Function>> = {};
  private catchAllListener:
    | ((data: Record<string, any>, routingKey: string) => void)
    | undefined;
  private callbackListeners: Record<string, Function> = {};

  private webSocket: WebSocket | undefined;
  private url: string;
  private connected: boolean;
  private authHeader: UseIsAuthorizedState | undefined;
  private saveStateID: string | undefined;

  /** mostRecentMessages is a dictionary with <routingkey, messageObject>. It stores the most recent message for that routingkey. */
  private mostRecentMessages: Record<string, unknown> = {};

  /** Contains messages to be sent when the connection to the WebSocket has been opened */
  private messageQueue: QueuedMessage[] = [];

  //TODO: Create env variable
  private static BACKEND_WSS_URL = "ws://localhost:3001/";

  /**
   * Returns the singleton instance of the Broker.
   * If the instance doesn't exist, it creates a new one with the default backend URL.
   * @returns The singleton instance of the Broker.
   */
  public static instance(): Broker {
    if (!this.singletonInstance)
      this.singletonInstance = new Broker(this.BACKEND_WSS_URL);
    return this.singletonInstance as Broker;
  }

  /**
   * Creates a new instance of the Broker.
   * @param domain The domain to make the websocket connection with.
   */
  public constructor(domain: string) {
    this.url = domain;
    this.connected = false;
  }

  /**
   * Sets the authentication header for the Broker.
   * @param authHeader The authentication header object.
   * @returns The Broker instance.
   */
  public setAuth(authHeader: UseIsAuthorizedState): Broker {
    this.authHeader = authHeader;
    return this;
  }

  /**
   * Connects to the WebSocket and handles the connection logic.
   * @param onOpen Callback function to be called when the WebSocket connection is opened.
   */
  public connect(onOpen: () => void): void {
    // If there already is already a current websocket connection, close it first.
    if (this.webSocket) this.close();

    const params = new URLSearchParams(window.location.search);
    // Most of these parameters are only really used in DEV
    if (this.authHeader?.userID)
      params.set("userID", this.authHeader?.userID ?? "");
    if (this.authHeader?.roomID)
      params.set("roomID", this.authHeader?.roomID ?? "");
    if (this.saveStateID) params.set("saveStateID", this.saveStateID ?? "");
    if (this.authHeader?.sessionID)
      params.set("sessionID", this.authHeader?.sessionID ?? "");
    if (this.authHeader?.jwt) params.set("jwt", this.authHeader?.jwt ?? "");
    this.webSocket = new WebSocket(this.url + "?" + params.toString());
    this.webSocket.onopen = () => {
      this.connected = true;
      // Send queued messages
      while (this.messageQueue.length > 0) {
        const { message, callback } =
          this.messageQueue.shift() as QueuedMessage;
        this.sendMessage(message, callback);
      }
      onOpen();
    };
    this.webSocket.onmessage = this.receiveMessage;
    this.webSocket.onerror = this.onError;
    this.webSocket.onclose = this.onClose;
  }

  /**
   * Closes the current WebSocket connection.
   */
  public close = (): void => {
    if (this.webSocket) this.webSocket.close();
    this.connected = false;
    this.webSocket = undefined;
  };

  /**
   * Attempts to reconnect to the WebSocket if the connection is closed or not established.
   */
  public attemptReconnect = () => {
    console.warn("Attempting to reconnect WS");

    if (!this.connected || !this.webSocket || this.webSocket.readyState !== 1) {
      this.connect(() => {
        setTimeout(() => Broker.instance().attemptReconnect(), 5000);
      });
    } else {
      console.log("WS reconnected", this.webSocket?.readyState, this.connected);
    }
  };

  /**
   * Websocket connection close event handler.
   * @param event Contains the event data.
   */
  private onClose(event: any): void {
    console.warn("WS connection was closed from the server side", event.data);
    if (this.webSocket) this.webSocket.close();
    this.connected = false;
    this.webSocket = undefined;
    setTimeout(() => Broker.instance().attemptReconnect(), 5000);
  }

  /**
   * Sends a message through the WebSocket connection.
   * @param message The message object to be sent.
   * @param callback Optional callback function to handle the response.
   */
  public sendMessage(message: SendMessageI, callback?: Function): void {
    console.debug(
      "%cSending WS message: ",
      "background: #222; color: #bada55",
      message
    );
    let fullMessage = message as SendMessageWithSessionI;

    const uuid = (Date.now() + Math.floor(Math.random() * 100)).toString();
    fullMessage.callID = uuid;

    if (callback) {
      this.callbackListeners[uuid] = callback;
    }

    fullMessage.sessionID = this.authHeader?.sessionID ?? "";
    if (message.body && typeof message.body !== "string") {
      fullMessage.body = JSON.stringify(message.body);
    }

    if (this.webSocket && this.connected && this.webSocket.readyState === 1)
      this.webSocket.send(JSON.stringify(fullMessage));
    else {
      console.warn("WebSocket is not open. Queueing message.");
      this.messageQueue.push({ message, callback });
    }
  }

  /**
   * Sends a message through the WebSocket connection asynchronously.
   * @param message The message object to be sent.
   * @returns A promise that resolves with the response data.
   */
  public sendMessageAsync(message: SendMessageI): Promise<Record<string, any>> {
    return new Promise((resolve, _) => {
      this.sendMessage(message, (data: Record<string, any>) => {
        resolve(data);
      });
    });
  }

  /**
   * Websocket connection message event handler.
   * Called when a new message is received through the WebSocket.
   * Handles the message based on the routing key and callbacks.
   * @param event Contains the event data.
   */
  public receiveMessage = (event: MessageEvent<any>) => {
    let jsonObject: ReceiveMessageI = JSON.parse(event.data);
    const routingKey = jsonObject.type;
    const data = jsonObject.value;
    const uuid = jsonObject.callID;

    let stop = false; // check in case there is a specific callback listener and, if its response is true, also call the subscriptions
    this.mostRecentMessages[routingKey] = data;
    if (uuid in this.callbackListeners) {
      stop = this.callbackListeners[uuid](data) !== true;
      console.debug(
        "%c" + routingKey + ` WS response WITH CALLBACK`,
        "background: #222; color: #DBAB2F",
        data,
        this.callbackListeners,
        "stop=",
        stop
      );
      delete this.callbackListeners[uuid];
    }

    if (
      !stop &&
      this.listeners[routingKey] &&
      Object.keys(this.listeners[routingKey]).length !== 0
    ) {
      if (this.catchAllListener) {
        this.catchAllListener(data, routingKey);
      }
      Object.values(this.listeners[routingKey]).forEach(listener =>
        listener(data, routingKey)
      );
      console.debug(
        "%c" + routingKey + ` WS response`,
        "background: #222; color: #DBAB2F",
        data
      );
    }
    // If there are no listeners, log the message
    else if (!stop) {
      if (this.catchAllListener) {
        this.catchAllListener(data, routingKey);
        console.debug(
          routingKey,
          `catch all used for message with routing key`,
          data
        );
      } else {
        console.debug(
          "%c" + routingKey + ` no listeners for message with routing key`,
          "background: #663322; color: #DBAB2F",
          data
        );
      }
    }
  };

  /**
   * Websocket connection error event handler.
   * @param event Contains the event data.
   */
  private onError(event: any): void {
    console.error("WS error", event);
  }

  public unused() {
    console.log("unused");
  }
}
