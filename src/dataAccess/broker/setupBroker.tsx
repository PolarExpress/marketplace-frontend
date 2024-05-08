/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { createBroker } from "@polarexpress/test/mockingUtils";
import { useEffect } from "react";

import { useAuthorizationCache } from "../store";
import { useAuth } from "../authentication";
import { BrokerBase } from "./broker.interface";

let broker: BrokerBase | undefined;

/**
 * Logs in and connects to the WebSocket.
 */
export const SetupBroker = () => {
  broker = broker ?? createBroker();
  const auth = useAuthorizationCache();
  const { login } = useAuth();

  /* eslint-disable react-hooks/exhaustive-deps -- everything breaks if login is a dependency */
  useEffect(() => {
    login();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  // Connects the WebSocket and sets authorisation header for the broker
  useEffect(() => {
    const connect = async () => {
      if (auth.authorized && auth.jwt) {
        console.log("Connecting broker");
        broker!.setAuth(auth).connect(() => {
          console.log("WS connected", window.location.search);
        });
      } else {
        // dispatch(logout());
      }
    };
    connect();
  }, [auth]);

  return <></>;
};

export default SetupBroker;
