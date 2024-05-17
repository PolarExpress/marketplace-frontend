/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { UseIsAuthorizedState } from "../authentication/authSlice";
import { SendMessageI } from "./types";

/**
 * Abstract base class for the Broker. Defines the common interface and methods
 * for the Broker implementations.
 */
export abstract class BrokerBase {
  protected static singletonInstance: BrokerBase;

  /**
   * Get the singleton instance of the Broker.
   */
  public static instance(): BrokerBase {
    if (!this.singletonInstance) {
      throw new Error("Singleton instance not initialized");
    }
    return this.singletonInstance;
  }

  /**
   * Connects to the broker and executes the provided callback when the
   * connection is open.
   *
   * @param onOpen Callback function to be called when the connection is open.
   */
  public abstract connect(onOpen: () => void): void;

  /**
   * Sends a message to the broker with an optional callback function.
   *
   * @param message  The message to send.
   * @param callback Optional callback function to handle the response.
   */
  public abstract sendMessage(message: SendMessageI, callback?: Function): void;

  /**
   * Sends a message to the broker asynchronously and returns a promise that
   * resolves with the response.
   *
   * @param   message The message to send.
   *
   * @returns         A promise that resolves with the response data.
   */
  public abstract sendMessageAsync(
    message: SendMessageI
  ): Promise<Record<string, unknown>>;

  /**
   * Sets the authentication header for the broker.
   *
   * @param   authHeader The authentication header state.
   *
   * @returns            The broker instance.
   */
  public abstract setAuth(authHeader: UseIsAuthorizedState): BrokerBase;
}
