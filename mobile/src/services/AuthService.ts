import { SignInVariables, SignUpVariables } from "../types/index";

import axios from "axios";
import host from "../utils/host";

export class AuthService {
  static async signUp(user: SignUpVariables) {
    const url = `${host()}/auth/signup`;

    try {
      const response = await axios.post(url, user, {
        headers: {
          "Content-Type": "application/json",
          accept: "/"
        }
      });
      
      if (response.status === 201) {
        return { data: response.data, success: true };
      } else {
        return {
          error: response.data.message,
          success: false
        };
      }
    } catch (error: any) {
      if (error.response.data.error)
        return {
          error: error.response.data.error,
          success: false
        };

      return {
        error: "Erro ao cadastrar usuário",
        success: false
      };
    }
  }

  static async signIn(variables: SignInVariables) {
    const url = `${host()}/auth/signin`;

    try {
      const response = await axios.post(url, variables, {
        headers: {
          "Content-Type": "application/json",
          accept: "/"
        }
      });

      if (response.status === 201) {
        return { data: response.data, success: true };
      } else {
        return {
          error: response.data.message,
          success: false
        };
      }
    } catch (error: any) {
      if (error.response.data.error)
        return {
          error: error.response.data.error,
          success: false
        };

      return {
        error: "Erro ao logar usuário",
        success: false
      };
    }
  }
}
