"use client";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { redirect } from "next/navigation";

const mainClasses =
  "h-[100vh] flex flex-col justify-center items-center bg-blue-200";

export default function Home() {
  const { loginExpiryTime, isLoginExpired } = useAuthContext();

  useEffect(() => {
    setInterval(() => {
      if (isLoginExpired(loginExpiryTime)) {
        redirect("/login");
      }
    }, 1000);
  }, []);

  return (
    <div className={mainClasses}>
      {isLoginExpired(loginExpiryTime)
        ? "Login expired. Please log in again."
        : `Welcome to the home page. You are logged in until ${loginExpiryTime.slice(
            16,
            24
          )}`}
    </div>
  );
}
