import { User } from "types";
import { create } from "zustand";

interface AuthStoreProps {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStoreProps>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (userData, token) => {
    set({ user: userData, token });
  },

  logout: () => {
    set({ user: null, token: null });
  }
}));

export default useAuthStore;
