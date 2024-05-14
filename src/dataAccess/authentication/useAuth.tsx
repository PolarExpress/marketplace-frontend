/* eslint-disable */

import { useAppDispatch } from "../store";
import { authorized, changeRoom } from "./authSlice";

export type AuthenticationHeader = {
  jwt: string;
  roomID: string;
  sessionID: string;
  userID: string;
  username: string;
};

const UMS_URL = import.meta.env.VITE_UMS_URL ?? null;
if (!UMS_URL) console.log("No Vite ums url found.");

export const fetchSettings: RequestInit = {
  credentials: "include",
  method: "GET",
  redirect: "follow"
};

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const handleError = (error: any) => {
    console.error(error);
  };

  const login = () => {
    fetch(`${UMS_URL}/headers`, fetchSettings)
      .then(res =>
        res
          .json()
          .then((res: AuthenticationHeader) => {
            dispatch(
              authorized({
                authorized: true,
                jwt: res.jwt,
                sessionID: res.sessionID,
                userID: res.userID,
                username: res.username
              })
            );
          })
          .catch(handleError)
      )
      .catch(handleError);
  };

  const newShareRoom = () => {
    fetch(`${UMS_URL}/share`, { ...fetchSettings, method: "POST" })
      .then(res =>
        res
          .json()
          .then((res: { Roomid: string; Sessionid: string }) => {
            // TODO: send to backend current state and make redux accordingly
            dispatch(changeRoom(res.Roomid));
          })
          .catch(handleError)
      )
      .catch(handleError);
  };

  return { login, newShareRoom };
};
// export useAuth;
