import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { SignUpVariables, SignInVariables } from "../types/index";
import { Local } from "services/Local";
import { AuthService } from "services/AuthService";
import { setUser } from "@redux/actions";

export const useAuth = () => {
  const dispatch = useDispatch();

  const signUp = useCallback(async (variables: SignUpVariables) => {
    const response = await AuthService.signUp(variables);
    if (response.success) {
      dispatch(setUser(response.data.user));
      await Local.set("JWT", response.data.token);
      return { success: true };
    }
    return { success: false };
  }, []);

  const signIn = useCallback(async (variables: SignInVariables) => {
    const response = await AuthService.signIn(variables);

    if (response.success) {
      dispatch(setUser(response.data.user));
      await Local.set("JWT", response.data.token);
      return { success: true };
    }
    return { success: false };
  }, []);

  return {
    signUp,
    signIn
  };
};
