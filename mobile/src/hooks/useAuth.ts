import { useCallback } from "react";
import { SignUpVariables, SignInVariables } from "../types/index";
import { AuthService } from "services/AuthService";
import { Local } from "storage/Local";
import useAuthStore from "store/authStore";

export const useAuth = () => {
  const { login } = useAuthStore();

  const signUp = useCallback(async (variables: SignUpVariables) => {
    const response = await AuthService.signUp(variables);
    if (response.success) {
      await Local.set("JWT", response.data.token);
      login({
        email: variables.email,
        name: variables.name,
        password: variables.password,
        id: "1"
      }, response.data.token)
      return { success: true };
    }
    return { success: false };
  }, []);

  const signIn = useCallback(async (variables: SignInVariables) => {
    const response = await AuthService.signIn(variables);

    if (response.success) {
      await Local.set("JWT", response.data.token);
      return { success: true, data: response.data };
    }
    return { success: false };
  }, []);

  return {
    signUp,
    signIn
  };
};
