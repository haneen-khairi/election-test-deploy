import CryptoStorage from "@constants/functions/storage";
import { create } from "zustand";

type Tokens = {
  refresh: string;
  access: string;
};

type User = {
  id?: number;
  name?: string;
  image?: string;
  group?: string;
  mobile_number?: string;
};

export type UserInfo = {
  tokens?: Tokens;
  user?: User;
};

interface AuthStore {
  isAuthenticated: boolean;
  data?: UserInfo;
  login: (data: UserInfo) => void;
  logout: () => void;
  updateTokens: (tokens: Tokens) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: CryptoStorage.getItem("isAuth") ? true : false,
  data: CryptoStorage.getItem("authData") || {},
  login: async (data: UserInfo) => {
    await CryptoStorage.setItem("isAuth", true);
    await CryptoStorage.setItem("authData", data);
    set({ data, isAuthenticated: true });
  },
  logout: async () => {
    await CryptoStorage.removeItem("isAuth");
    await CryptoStorage.removeItem("authData");
    set({
      data: {
        tokens: {
          access: "",
          refresh: "",
        },
        user: {
          id: 0,
          mobile_number: "",
          name: "",
        },
      },
      isAuthenticated: false,
    });
  },
  updateTokens: async (tokens: Tokens) => {
    const authData = CryptoStorage.getItem("authData") || {};
    authData.tokens = tokens;
    await CryptoStorage.setItem("authData", authData);
    set({ data: authData, isAuthenticated: true });
  },
}));

export default useAuthStore;
