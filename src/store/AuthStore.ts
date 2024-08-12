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

type Permission = {
  has_perm: false;
  id: number;
  codename:
    | "0001_supervisor"
    | "0002_main_delegate"
    | "0003_movement_delegate"
    | "0004_box_delegate"
    | "0005_candidate"
    | "0006_download_voters_as_pdf"
    | "0007_show_nationality_id"
    | "0008_show_family_tree"
    | "0009_can_add_main_delegate"
    | "0010_can_add_delegates";
  name:
    | "Supervisor"
    | "Main delegate"
    | "Movement delegate"
    | "Box delegate"
    | "Candidate"
    | "تحميل الناخبين كملف PDF"
    | "رؤية الرقم الوطني"
    | "رؤية شجرة العائلة"
    | "اضافة مندوب رئيسي"
    | "اضافة مناديب";
};

export type UserInfo = {
  tokens?: Tokens;
  user?: User;
  permissions: Permission[];
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
        permissions: [],
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
