import { createContext, useContext } from "react";
import type { AuthResult } from "~/server/utils/auth.server";

export const AppContext = createContext<AuthResult>(null);

export const AppProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: AuthResult;
}) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useProfile = () => useContext(AppContext);
