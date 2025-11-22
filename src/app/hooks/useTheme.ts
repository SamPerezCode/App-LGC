import { useState } from "react";

const THEME_KEY = "lgc:theme";

export const useTheme = () => {
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (!stored) return false;
    return stored === "dark";
  });

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      return next;
    });
  };

  return { dark, toggleTheme };
};
