"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import {
  TAuthContext,
  checkLoginExpired,
  EXPIRY_MINUTES,
  EXPIRY_SECONDS,
  getDateInFuture,
  LOGIN_EXPIRY_KEY,
  OLD_DATE,
} from "@/utils";

const defaultAuthContext: TAuthContext = {
  loginExpiryTime: OLD_DATE,
  checkLoginExpired: () => false,
  handleValidLoginAndRedirect: () => {},
  handleLogoutAndRedirect: () => {},
};

const AuthContext = createContext<TAuthContext>(defaultAuthContext);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [loginExpiryTime, setLoginExpiryTime] = useState(OLD_DATE);

  useEffect(() => {
    const storedExpiryTime = localStorage.getItem(LOGIN_EXPIRY_KEY);
    if (storedExpiryTime) {
      setLoginExpiryTime(storedExpiryTime);
    }
  }, []);

  function handleValidLoginAndRedirect() {
    const expiryDateStr = getDateInFuture(EXPIRY_MINUTES, EXPIRY_SECONDS);
    setLoginExpiryTime(expiryDateStr);
    redirect("/home");
  }

  function handleLogoutAndRedirect() {
    setLoginExpiryTime(OLD_DATE);
    redirect("/");
  }

  useEffect(() => {
    localStorage.setItem(LOGIN_EXPIRY_KEY, loginExpiryTime);
  }, [loginExpiryTime]);

  return (
    <AuthContext.Provider
      value={{
        loginExpiryTime,
        checkLoginExpired,
        handleValidLoginAndRedirect,
        handleLogoutAndRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
