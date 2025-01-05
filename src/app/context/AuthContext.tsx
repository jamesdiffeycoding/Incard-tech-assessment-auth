"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import {
  AuthContextInterface,
  checkLoginExpired,
  EXPIRY_MINUTES,
  EXPIRY_SECONDS,
  getDateInFuture,
  isCredentialsCorrect,
  LOGIN_EXPIRY_KEY,
  OLD_DATE,
} from "@/utils/helpers";

const defaultAuthContext: AuthContextInterface = {
  loginExpiryTime: OLD_DATE,
  isCredentialsCorrect: () => false,
  checkLoginExpired: () => false,
  handleSuccessfulLogin: () => {},
};

const AuthContext = createContext<AuthContextInterface>(defaultAuthContext);

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [loginExpiryTime, setLoginExpiryTime] = useState(
    localStorage.getItem(LOGIN_EXPIRY_KEY) || OLD_DATE
  ); // OR operator prevents null value if nothing stored

  function handleSuccessfulLogin() {
    const expiryDateStr = getDateInFuture(EXPIRY_MINUTES, EXPIRY_SECONDS);
    setLoginExpiryTime(expiryDateStr);
    redirect("/home");
  }

  useEffect(() => {
    localStorage.setItem(LOGIN_EXPIRY_KEY, loginExpiryTime);
  }, [loginExpiryTime]);

  return (
    <AuthContext.Provider
      value={{
        loginExpiryTime,
        checkLoginExpired,
        handleSuccessfulLogin,
        isCredentialsCorrect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
