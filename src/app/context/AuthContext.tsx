"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import {
  AuthContextInterface,
  checkLoginExpired,
  EXPIRY_MINUTES,
  EXPIRY_SECONDS,
  getDateInFuture,
  isClientSide,
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
  const [loginExpiryTime, setLoginExpiryTime] = useState(OLD_DATE);

  function handleSuccessfulLogin() {
    const expiryDateStr = getDateInFuture(EXPIRY_MINUTES, EXPIRY_SECONDS);
    setLoginExpiryTime(expiryDateStr);
    redirect("/home");
  }

  useEffect(() => {
    // Ensure we only access localStorage on the client-side, not during SSR
    if (isClientSide) {
      const storedExpiryTime = localStorage.getItem(LOGIN_EXPIRY_KEY);
      if (storedExpiryTime) {
        setLoginExpiryTime(storedExpiryTime);
      }
    }
  }, []); // This effect runs only once on mount (client-side)

  useEffect(() => {
    // Ensure we only access localStorage on the client-side, not during SSR
    if (isClientSide) {
      localStorage.setItem(LOGIN_EXPIRY_KEY, loginExpiryTime);
    }
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
