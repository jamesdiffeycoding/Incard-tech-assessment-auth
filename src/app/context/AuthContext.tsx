"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import {
  getFutureDate_MinsAndSecs,
  isCredentialsCorrect,
  isLoginExpired,
  LOGIN_EXPIRY_KEY,
  OLD_DATE,
} from "@/utils/helpers";

const AuthContext = createContext<any>(undefined);

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [loginExpiryTime, setLoginExpiryTime] = useState(
    localStorage.getItem(LOGIN_EXPIRY_KEY) || OLD_DATE
  ); // OR operator prevents null value if nothing stored

  function handleSuccessfulLogin() {
    const expiryDateStr = getFutureDate_MinsAndSecs(0, 5);
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
        isLoginExpired,
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
