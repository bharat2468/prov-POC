import { uiAtoms } from "../atoms/uiAtoms";

export const toggleTheme = async ({ set, snapshot }) => {
  const { theme } = await snapshot.getPromise(uiAtoms);
  set(uiAtoms, (prev) => ({
    ...prev,
    theme: theme === "light" ? "dark" : "light",
  }));
};
