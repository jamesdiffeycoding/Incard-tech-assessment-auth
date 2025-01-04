"use client";
import { useState, useEffect } from "react";
import SignIn from "../app/components/SignIn";

const mainClasses =
  "h-[100vh] flex flex-col justify-center items-center bg-blue-200";
const loginExpiryTimeKey = "login-expiry"; // local storage key

export default function Home() {
  const [loginExpiryTime, setLoginExpiryTime] = useState(
    localStorage.getItem(loginExpiryTimeKey) || ""
  ); // OR operator prevents null value if nothing stored

  const [sessionValidity, setSessionValidity] = useState(
    checkLoginStillValid()
  );

  function checkLoginStillValid() {
    if (!loginExpiryTime) {
      return false;
    }
    // Compare times in milliseconds since 1970
    const msNow = Date.now();
    const msExpiry = new Date(loginExpiryTime).getTime();
    return msNow < msExpiry;
  }

  function updateSessionValidity() {
    setSessionValidity(checkLoginStillValid());
  }

  function handleSuccessfulLogin(expirationDate: string) {
    localStorage.setItem(loginExpiryTimeKey, expirationDate);
    setLoginExpiryTime(expirationDate);
    setSessionValidity(new Date(expirationDate) > new Date());
  }

  useEffect(() => {
    const intervalId = setInterval(updateSessionValidity, 30000); // check login validity every 30 seconds (30000ms)
    return () => clearInterval(intervalId);
  }, []); // Depend on loginExpiryTime for re-running the effect when it changes

  return (
    <div className={mainClasses}>
      {sessionValidity ? (
        <>
          <h1>Welcome back!</h1>
          <p>You are logged in until {loginExpiryTime.slice(16, 21)} GMT</p>
        </>
      ) : (
        <SignIn handleSuccessfulLogin={handleSuccessfulLogin} />
      )}
    </div>
  );
}
