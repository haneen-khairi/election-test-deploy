import CryptoJS from "crypto-js";
const ENCRYPTION_KEY = "7Fg2$L9@h#K!6pDz";

const CryptoStorage = {
  setItem: (storageKey: string, obj: unknown) => {
    const jsonString = JSON.stringify(obj);
    const encrypted = CryptoJS.AES.encrypt(
      jsonString,
      ENCRYPTION_KEY,
    ).toString();
    localStorage.setItem(storageKey, encrypted);
  },

  getItem: (storageKey: string) => {
    const storedData = localStorage.getItem(storageKey);
    if (storedData) {
      const bytes = CryptoJS.AES.decrypt(storedData, ENCRYPTION_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedData) return null;
      return JSON.parse(decryptedData);
    }
    return null;
  },

  removeItem: (storageKey: string) => {
    localStorage.removeItem(storageKey);
  },
};

export default CryptoStorage;
