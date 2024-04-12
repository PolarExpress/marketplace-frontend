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

import { UseIsAuthorizedState } from "../features/authentication/AuthSlice";
import {
  ReceiveMessageI,
  SendMessageI,
  SendMessageWithSessionI,
  QueuedMessage
} from "./types";

/**
 * A broker that handles incoming messages from the backend.
 * It works with routingkeys, a listener can subscribe to messages from the backend with a specific routingkey.
 * Possible routingkeys:
 * - query_result:              Contains an object with nodes and edges or a numerical result.
 * - query_translation_result:  Contains the query translated to the database language.
 * - schema_result:             Contains the schema of the users database.
 * - query_status_update:       Contains an update to if a query is being executed.
 * - query_database_error:      Contains the error received from the database.
 * - query_sent:                Contains the message that a query has been send.
 * - gsa_node_result:           Contains a node that has the data for the graph-schema-analytics
 * - gsa_edge_result:           Contains a edge that has the data for the graph-schema-analytics
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

  /** Get the singleton instance of the Broker. */
  public static instance(): Broker {
    if (!this.singletonInstance)
      this.singletonInstance = new Broker(this.BACKEND_WSS_URL);
    return this.singletonInstance as Broker;
  }

  /**
   * Subscribe a listener to messages with the specified routingKey.
   * @param {Function} newListener The listener to subscribe.
   * @param {string} routingKey The routingkey to subscribe to.
   * @param {boolean} consumeMostRecentMessage If true and there is a message for this routingkey available, notify the new listener. Default true.
   */
  public subscribe(
    newListener: Function,
    routingKey: string,
    key: string = (Date.now() + Math.floor(Math.random() * 100)).toString(),
    consumeMostRecentMessage: boolean = false
  ): string {
    if (!this.listeners[routingKey]) this.listeners[routingKey] = {};

    // Don't add a listener twice
    if (!(key in this.listeners[routingKey])) {
      this.listeners[routingKey][key] = newListener;

      // Consume the most recent message
      if (consumeMostRecentMessage && routingKey in this.mostRecentMessages)
        newListener(this.mostRecentMessages[routingKey], routingKey);
    }

    return key;
  }

  /**
   * Subscribe a listener to messages with the specified routingKey.
   * @param {Function} newListener The listener to subscribe.
   * @param {string} routingKey The routingkey to subscribe to.
   * @param {boolean} consumeMostRecentMessage If true and there is a message for this routingkey available, notify the new listener. Default true.
   */
  public subscribeDefault(
    newListener: (data: Record<string, any>, routingKey: string) => void
  ): void {
    this.catchAllListener = newListener;
  }

  /**
   * Unsubscribes a listener from messages with specified routingkey.
   * @param {string} routingKey The routing key to unsubscribe from
   * @param {string} listener key of the listener to unsubscribe.
   */
  public unSubscribe(routingKey: string, key: string): void {
    if (this.listeners[routingKey] && key in this.listeners[routingKey]) {
      delete this.listeners[routingKey][key];
    }
  }

  /**
   * Unsubscribes the catch all listener from messages
   */
  public unSubscribeDefault(): void {
    this.catchAllListener = undefined;
  }

  /**
   * Unsubscribes all listeners from messages with specified routingkey.
   * @param {string} routingKey The routing key to unsubscribe from
   */
  public unSubscribeAll(routingKey: string): void {
    this.listeners[routingKey] = {};
  }

  /** @param domain The domain to make the websocket connection with. */
  public constructor(domain: string) {
    this.url = domain;
    this.connected = false;
  }

  public setAuth(authHeader: UseIsAuthorizedState): Broker {
    this.authHeader = authHeader;
    return this;
  }

  public useSaveStateID(saveStateID: string): Broker {
    this.saveStateID = saveStateID;
    return this;
  }

  /**
   * Create a websocket to the given URL.
   * @param {string} URL is the URL to which the websocket connection is opened.
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

  /** Closes the current websocket connection. */
  public close = (): void => {
    if (this.webSocket) this.webSocket.close();
    this.connected = false;
    this.webSocket = undefined;
  };

  /** @returns A boolean which indicates if there currently is a socket connection. */
  public isConnected = (): boolean => {
    return this.connected;
  };

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
   * @param {any} event Contains the event data.
   */
  private onClose(event: any): void {
    console.warn("WS connection was closed from the server side", event.data);
    if (this.webSocket) this.webSocket.close();
    this.connected = false;
    this.webSocket = undefined;
    setTimeout(() => Broker.instance().attemptReconnect(), 5000);
  }

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

  public sendMessageAsync(message: SendMessageI): Promise<Record<string, any>> {
    return new Promise((resolve, _) => {
      this.sendMessage(message, (data: Record<string, any>) => {
        resolve(data);
      });
    });
  }

  /**
   * Websocket connection message event handler. Called if a new message is received through the socket.
   * @param {any} event Contains the event data.
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
   * @param {any} event contains the event data.
   */
  private onError(event: any): void {
    console.error("WS error", event);
  }
}
