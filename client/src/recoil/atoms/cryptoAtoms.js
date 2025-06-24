// recoil/atoms/cryptoAtoms.js
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "crypto-storage", // key in localStorage
  storage: localStorage, // or sessionStorage
});

export const cryptoAtoms = atom({
  key: "cryptoAtoms",
  default: {
    data: [],
    allCryptos: [],
    favorites: [],
    favoriteData: [],
    loading: false,
    error: null,
  },
  effects_UNSTABLE: [persistAtom],
});
