/* eslint-disable custom/enforce-copyright-comment */

import { useAppDispatch } from "../store";
import { authorized, changeRoom } from "./authSlice";

export type AuthenticationHeader = {
  jwt: string;
  roomID: string;
  sessionID: string;
  userID: string;
  username: string;
};

// TODO: Put in .env file
const domain = "http://localhost";
const useruri = ":3000";

export const fetchSettings: RequestInit = {
  credentials: "include",
  method: "GET",
  redirect: "follow"
};

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const handleError = (err: any) => {
    console.error(err);
  };

  const login = () => {
    fetch(`${domain}${useruri}/headers`, fetchSettings)
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
    fetch(`${domain}${useruri}/share`, { ...fetchSettings, method: "POST" })
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
