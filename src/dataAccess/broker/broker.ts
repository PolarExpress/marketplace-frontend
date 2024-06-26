/* eslint-disable */

/**
 * This program has been developed by students from the bachelor Computer
 * Science at Utrecht University within the Software Project course. © Copyright
 * Utrecht University (Department of Information and Computing Sciences)
 */

import { UseIsAuthorizedState } from "../authentication/authSlice";
import {
  QueuedMessage,
  ReceiveMessageI,
  SendMessageI,
  SendMessageWithSessionI
} from "./types";

/**
 * A broker that handles incoming messages from the backend.
 */
export class Broker {
  private static BACKEND_WSS_URL = import.meta.env.VITE_BACKEND_WSS_URL;

  private authHeader: UseIsAuthorizedState | undefined;
  private callbackListeners: Record<string, Function> = {};

  private catchAllListener:
    | ((data: Record<string, any>, routingKey: string) => void)
    | undefined;
  private connected: boolean;
  private listeners: Record<string, Record<string, Function>> = {};
  /**
   * Contains messages to be sent when the connection to the WebSocket has been
   * opened.
   */
  private messageQueue: QueuedMessage[] = [];

  /**
   * MostRecentMessages is a dictionary with <routingkey, messageObject>. It
   * stores the most recent message for that routingkey.
   */
  private mostRecentMessages: Record<string, unknown> = {};

  private saveStateID: string | undefined;

  private static singletonInstance: Broker;

  private url: string;

  private webSocket: WebSocket | undefined;

  /**
   * Attempts to reconnect to the WebSocket if the connection is closed or not
   * established.
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
   * Closes the current WebSocket connection.
   */
  public close = (): void => {
    if (this.webSocket) this.webSocket.close();
    this.connected = false;
    this.webSocket = undefined;
  };

  /**
   * Websocket connection message event handler. Called when a new message is
   * received through the WebSocket. Handles the message based on the routing
   * key and callbacks.
   *
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
      Object.keys(this.listeners[routingKey]).length > 0
    ) {
      if (this.catchAllListener) {
        this.catchAllListener(data, routingKey);
      }
      for (const listener of Object.values(this.listeners[routingKey]))
        listener(data, routingKey);
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
   * @param domain The domain to make the websocket connection with.
   */
  public constructor(domain: string) {
    this.url = domain;
    this.connected = false;
  }

  public static instance(): Broker {
    if (!this.singletonInstance)
      this.singletonInstance = new Broker(this.BACKEND_WSS_URL);
    return this.singletonInstance as Broker;
  }

  /**
   * Websocket connection close event handler.
   *
   * @param {any} event Contains the event data.
   */
  private onClose(event: any): void {
    console.warn("WS connection was closed from the server side", event.data);
    if (this.webSocket) this.webSocket.close();
    this.connected = false;
    this.webSocket = undefined;
    setTimeout(() => Broker.instance().attemptReconnect(), 5000);
  }

  /**
   * Websocket connection error event handler.
   *
   * @param event Contains the event data.
   */
  private onError(event: any): void {
    console.error("WS error", event);
  }

  /**
   * Connects to the WebSocket and handles the connection logic.
   *
   * @param onOpen Callback function to be called when the WebSocket connection
   *   is opened.
   */
  public connect(onOpen: () => void): void {
    // If there already is already a current websocket connection, close it first.
    if (this.webSocket) this.close();

    const parameters = new URLSearchParams(window.location.search);
    // Most of these parameters are only really used in DEV
    if (this.authHeader?.userID)
      parameters.set("userID", this.authHeader?.userID ?? "");
    if (this.authHeader?.roomID)
      parameters.set("roomID", this.authHeader?.roomID ?? "");
    if (this.saveStateID) parameters.set("saveStateID", this.saveStateID ?? "");
    if (this.authHeader?.sessionID)
      parameters.set("sessionID", this.authHeader?.sessionID ?? "");
    if (this.authHeader?.jwt) parameters.set("jwt", this.authHeader?.jwt ?? "");
    this.webSocket = new WebSocket(this.url + "?" + parameters.toString());
    this.webSocket.addEventListener("open", () => {
      this.connected = true;
      // Send queued messages
      while (this.messageQueue.length > 0) {
        const { callback, message } =
          this.messageQueue.shift() as QueuedMessage;
        this.sendMessage(message, callback);
      }
      onOpen();
    });
    this.webSocket.onmessage = this.receiveMessage;
    this.webSocket.onerror = this.onError;
    this.webSocket.addEventListener("close", this.onClose);
  }

  /**
   * Sends a message through the WebSocket connection.
   *
   * @param message  The message object to be sent.
   * @param callback Optional callback function to handle the response.
   */
  public sendMessage(message: SendMessageI, callback?: Function): void {
    console.debug(
      "%cSending WS message:",
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
      this.messageQueue.push({ callback, message });
    }
  }

  /**
   * Sends a message through the WebSocket connection asynchronously.
   *
   * @param   message The message object to be sent.
   *
   * @returns         A promise that resolves with the response data.
   */
  public sendMessageAsync(message: SendMessageI): Promise<Record<string, any>> {
    return new Promise((resolve, _) => {
      this.sendMessage(message, (data: Record<string, any>) => {
        resolve(data);
      });
    });
  }

  /**
   * Sets the authentication header for the Broker.
   *
   * @param   authHeader The authentication header object.
   *
   * @returns            The Broker instance.
   */
  public setAuth(authHeader: UseIsAuthorizedState): Broker {
    this.authHeader = authHeader;
    return this;
  }
}
