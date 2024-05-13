/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { addonList } from "@polarexpress/mockData/addons";
import {
  addInstalled,
  getInstalled,
  removeInstalled
} from "@polarexpress/test/mockingUtils";
import { Addon } from "@polarexpress/types/addon";

import { BrokerBase } from "./broker.interface";
import { MpBackendAction, MpBackendMessage } from "./types";

/**
 * Mocked version of the broker to run the frontend without backend.
 */
export class MockBroker extends BrokerBase {
  public static instance(): MockBroker {
    if (!this.singletonInstance) this.singletonInstance = new MockBroker();
    return this.singletonInstance as MockBroker;
  }

  public connect(onOpen: () => void): void {
    console.log("Mock Broker connected");
    onOpen();
  }

  /**
   * Interacts with the sessionStorage to mock install interactions.
   */
  public sendMessage(message: MpBackendMessage, callback?: Function): void {
    let data: Record<string, unknown> = {};
    const action: MpBackendAction = message.body.action;

    switch (action) {
      case "addons/get-by-user": {
        data = { addons: getInstalled() };
        break;
      }

      case "install": {
        const addon = addonList.find(
          (addon: Addon) =>
            "addonID" in message.body && addon._id === message.body.addonID
        );
        addon
          ? addInstalled(addon)
          : console.warn(
              `Could not find addon. Message body: ${JSON.stringify(message.body)}`
            );
        break;
      }

      case "uninstall": {
        "addonID" in message.body
          ? removeInstalled(message.body.addonID as string)
          : console.warn(
              `Invalid message body: ${JSON.stringify(message.body)}`
            );
        break;
      }

      default: {
        console.warn(`Invalid action: ${action}`);
      }
    }

    if (callback) callback(data);
  }

  /**
   * Same as normal broker.
   */
  public sendMessageAsync(
    message: MpBackendMessage
  ): Promise<Record<string, unknown>> {
    return new Promise(resolve => {
      this.sendMessage(message, (data: Record<string, unknown>) => {
        resolve(data);
      });
    });
  }

  public setAuth(): MockBroker {
    return this;
  }
}
