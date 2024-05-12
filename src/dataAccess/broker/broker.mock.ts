/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { generateAddon } from "@polarexpress/mockData/addons";
import {
  addInstalled,
  getInstalled,
  removeInstalled
} from "@polarexpress/test/mockingUtils";

import { UseIsAuthorizedState } from "../authentication/authSlice";
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
    let data: Record<string, any> = {};
    const action: MpBackendAction = message.body.action;

    switch (action) {
      case "addons/get-by-user": {
        data = { addons: getInstalled() };
        break;
      }

      case "install": {
        const addon = generateAddon(Number(message.body.addonID));

        addon
          ? addInstalled(addon)
          : console.warn(
              `Could not find addon. Message body: ${JSON.stringify(message.body)}`
            );
        break;
      }

      case "uninstall": {
        "addonID" in message.body
          ? removeInstalled(message.body.addonID)
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
  ): Promise<Record<string, any>> {
    return new Promise((resolve, _) => {
      this.sendMessage(message, (data: Record<string, any>) => {
        resolve(data);
      });
    });
  }

  public setAuth(_authHeader: UseIsAuthorizedState): MockBroker {
    return this;
  }
}
