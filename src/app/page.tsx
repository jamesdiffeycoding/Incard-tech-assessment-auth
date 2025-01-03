"use client";
import { useState, useEffect } from "react";
import SignIn from "../app/components/SignIn";

const mainClasses = "h-[100vh] flex justify-center items-center bg-blue-200";

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const authExpiration = "ss";

  const handleAuthentication = (newValue: boolean) => {
    setAuthenticated(newValue);
    localStorage.setItem("authenticated", newValue.toString());
    localStorage.setItem("auth expiration", "ss");
  };

  useEffect(() => {
    const auth = localStorage.getItem("authenticated");
    const authExpiration = localStorage.getItem("auth expiration");
    if (auth) {
      setAuthenticated(auth === "true");
    }
  }, []);

  return (
    <div className={mainClasses}>
      Auth:{JSON.stringify(authenticated)}
      Expiration: {JSON.stringify("ss")}
      <button onClick={() => handleAuthentication(false)}>Reset</button>
      {authenticated ? (
        <h1>Welcome back!</h1>
      ) : (
        <SignIn handleAuthentication={handleAuthentication} />
      )}
    </div>
  );
}
