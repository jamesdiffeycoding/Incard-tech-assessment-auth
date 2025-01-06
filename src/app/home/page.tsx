"use client";

import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { redirect } from "next/navigation";

export default function Home() {
  const { loginExpiryTime, checkLoginExpired } = useAuthContext();

  useEffect(() => {
    const interval = setInterval(() => {
      if (checkLoginExpired(loginExpiryTime)) {
        redirect("/login");
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [loginExpiryTime, checkLoginExpired]);

  return (
    <div className="text-center font-bold">
      {checkLoginExpired(loginExpiryTime)
        ? "Please log in."
        : `At ${loginExpiryTime.slice(
            16,
            24
          )} you will be redirected to login.`}
    </div>
  );
}
