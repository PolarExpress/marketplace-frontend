/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { useAuth } from "../features/authentication/useAuth";
import { Broker } from "../broker/broker";

export const EventBus = () => {
  const auth = useAppSelector((state: RootState) => state.auth);
  const { login } = useAuth();

  useEffect(() => {
    login();
  }, [login]);

  useEffect(() => {
    if (auth.authorized && auth.jwt) {
      console.log("Connecting broker");
      Broker.instance()
        .useAuth(auth)
        .connect(() => {
          console.log("WS connected", window.location.search);
        });
    } else {
      // dispatch(logout());
    }
  }, [auth]);

  // Trying to send a test message to check for successful connection to backend
  useEffect(() => {
    console.log("Sending message");
    Broker.instance().sendMessage(
      {
        key: "state",
        subKey: "getAll"
      },
      (data: { id: string }[]) => console.log(data[0].id)
    );
  }, [auth]);

  return null;
};
