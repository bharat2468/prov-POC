import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "ui-storage",
  storage: localStorage,
});

export const uiAtoms = atom({
  key: "uiAtom",
  default: {
    theme: "light",
  },
  effects_UNSTABLE: [persistAtom],
});
