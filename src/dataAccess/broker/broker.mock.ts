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

  // Interacts with the sessionStorage to mock install interactions.
  public sendMessage(message: MpBackendMessage, callback?: Function): void {
    let data: Record<string, unknown> | undefined = undefined;
    const body = message.body;
    const action: MpBackendAction = body.action;

    switch (action) {
      case "addons/get-by-user": {
        data = { addons: getInstalled() };
        break;
      }

      case "install": {
        if (!("addonID" in body)) {
          throw new Error(
            `Message body ${JSON.stringify(body)} does not contain property "addonID".`
          );
        }

        data = addInstalled(generateAddon(Number(body.addonID)));
        break;
      }

      case "uninstall": {
        if (!("addonID" in body)) {
          throw new Error(
            `Message body ${JSON.stringify(body)} does not contain property "addonID".`
          );
        }

        data = removeInstalled(body.addonID as string);
        break;
      }

      default: {
        throw new Error("Invalid action.");
      }
    }

    if (callback) callback(data);
  }

  // Same as normal broker.
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
