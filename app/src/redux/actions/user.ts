import { SET_JWT, SET_USER } from "@redux/constants/userConstants";
import { User } from "../../types/index";

export function setUser(user: User | null) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function setJWT(jwt: string) {
  return {
    type: SET_JWT,
    payload: jwt
  };
}
