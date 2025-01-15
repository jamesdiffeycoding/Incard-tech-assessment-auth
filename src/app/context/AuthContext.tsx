"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import {
  TAuthContext,
  checkLoginExpired,
  EXPIRY_MINUTES,
  EXPIRY_SECONDS,
  getDateInFuture,
  isClientSide,
  isCredentialsCorrect,
  LOGIN_EXPIRY_KEY,
  OLD_DATE,
} from "@/utils";

const defaultAuthContext: TAuthContext = {
  loginExpiryTime: OLD_DATE,
  isCredentialsCorrect: () => false,
  checkLoginExpired: () => false,
  handleSuccessfulLogin: () => {},
  logoutEarly: () => {},
};

const AuthContext = createContext<TAuthContext>(defaultAuthContext);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [loginExpiryTime, setLoginExpiryTime] = useState(OLD_DATE);

  function handleSuccessfulLogin() {
    const expiryDateStr = getDateInFuture(EXPIRY_MINUTES, EXPIRY_SECONDS);
    setLoginExpiryTime(expiryDateStr);
    redirect("/home");
  }

  useEffect(() => {
    if (isClientSide) {
      const storedExpiryTime = localStorage.getItem(LOGIN_EXPIRY_KEY);
      if (storedExpiryTime) {
        setLoginExpiryTime(storedExpiryTime);
      }
    }
  }, []);

  function logoutEarly() {
    setLoginExpiryTime(OLD_DATE);
    redirect("/");
  }

  useEffect(() => {
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
        logoutEarly,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
