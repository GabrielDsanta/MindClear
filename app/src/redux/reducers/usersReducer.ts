import { SET_JWT, SET_USER } from "@redux/constants/userConstants";
import { User } from "../../types/index";

type UserReducerType = {
  user: User;
  jwt: "";
};
const initialState: UserReducerType = {
  user: {} as User,
  jwt: ""
};

export const userReducer = (state = initialState, action: { type: string; payload: any }): UserReducerType => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_JWT:
      return {
        ...state,
        jwt: action.payload
      };
    default:
      return state;
  }
};
