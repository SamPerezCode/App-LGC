import type { Dispatch, SetStateAction } from "react";

export const getInitials = (fullName: string): string => {
  if (!fullName) return "?";

  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  const first = parts[0][0];
  const last = parts[parts.length - 1][0];
  return (first + last).toUpperCase();
};

interface LogoutOptions {
  setLoggingOut: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onLogout: () => void;
  delayMs?: number;
}

export const logoutWithDelay = ({
  setLoggingOut,
  setOpen,
  onLogout,
  delayMs = 500,
}: LogoutOptions) => {
  setLoggingOut(true);

  setTimeout(() => {
    setOpen(false);
    onLogout();
  }, delayMs);
};
