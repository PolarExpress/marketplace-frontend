/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { UseIsAuthorizedState } from "../features/authentication/AuthSlice";
import { addonList } from "../temp/tempAddons";
import { Addon } from "../types/AddOnTypes";
import {
  addInstalled,
  getInstalled,
  removeInstalled
} from "../utils/mocking-utils";
import { MpBackendAction, MpBackendMessage } from "./types";

export class Broker {
  private static singletonInstance: Broker;

  public static instance(): Broker {
    if (!this.singletonInstance) this.singletonInstance = new Broker();
    return this.singletonInstance;
  }

  public useAuth(authHeader: UseIsAuthorizedState): Broker {
    return this;
  }

  public connect(onOpen: () => void): void {
    console.log("Mock Broker connected");
    onOpen();
  }

  public sendMessage(message: MpBackendMessage, callback: Function): void {
    let data: Record<string, any> = {};
    const action: MpBackendAction = message.body.action;

    switch (action) {
      case "addons/get-by-user":
        data = { addons: getInstalled() };
        break;

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
          ? removeInstalled(message.body.addonID)
          : console.warn(
              `Invalid message body: ${JSON.stringify(message.body)}`
            );
        break;
      }

      default:
        console.warn(`Invalid action: ${action}`);
    }
    callback(data);
  }

  public sendMessageAsync(
    message: MpBackendMessage
  ): Promise<Record<string, any>> {
    return new Promise((resolve, _) => {
      this.sendMessage(message, (data: Record<string, any>) => {
        resolve(data);
      });
    });
  }
}
