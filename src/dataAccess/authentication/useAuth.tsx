/* eslint-disable custom/enforce-copyright-comment */

import { useAppDispatch } from "../store";

import { authorized, changeRoom } from "./authSlice";

export type AuthenticationHeader = {
  username: string;
  userID: string;
  sessionID: string;
  roomID: string;
  jwt: string;
};

// TODO: Put in .env file
const domain = "http://localhost";
const useruri = ":3000";

export const fetchSettings: RequestInit = {
  method: "GET",
  credentials: "include",
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
                username: res.username,
                userID: res.userID,
                sessionID: res.sessionID,
                jwt: res.jwt,
                authorized: true
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
