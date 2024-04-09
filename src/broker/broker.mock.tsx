/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { UseIsAuthorizedState } from "../features/authentication/AuthSlice";
import { addonList, installed } from "../temp/tempAddons";
import { Addon } from "../types/AddOnTypes";
import { MpBackendAction, MpBackendMessage } from "./types";

export class Broker {
  private static singletonInstance: Broker;
  private connected: boolean;

  public static instance(): Broker {
    if (!this.singletonInstance) this.singletonInstance = new Broker();
    return this.singletonInstance;
  }

  public constructor() {
    this.connected = false;
  }

  public useAuth(authHeader: UseIsAuthorizedState): Broker {
    console.log("Mock Broker auth set");
    return this;
  }

  public connect(onOpen: () => void): void {
    console.log("Mock Broker connected");
    onOpen();
  }

  public sendMessage(message: MpBackendMessage, callback: Function): void {
    let data: Record<string, any> = {};
    const action: MpBackendAction = message.body.action;
    let addon: Addon | undefined;
    let index: number;

    switch (action) {
      case "addons/get-by-user":
        data = { addons: installed };
        break;

      case "install":
        addon = addonList.find(
          (addon: Addon) =>
            "addonId" in message.body && addon._id === message.body.addonId
        );
        addon
          ? installed.push(addon)
          : console.warn(`Could not find addon. Message body: ${message.body}`);
        break;

      case "uninstall":
        index = addonList.findIndex(
          (addon: Addon) =>
            "addonId" in message.body && addon._id === message.body.addonId
        );
        index !== -1
          ? installed.splice(index, 1)
          : console.warn(`Could not find addon. Message body: ${message.body}`);
        break;

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
