"use client";
import { useState, useEffect } from "react";
import SignIn from "../../components/SignIn";
import { useAuthContext } from "../context/AuthContext";
import { redirect } from "next/navigation";

const mainClasses =
  "h-[100vh] flex flex-col justify-center items-center bg-red-200";

export default function Home() {
  const { loginExpiryTime, isLoginExpired } = useAuthContext();

  useEffect(() => {
    setInterval(() => {
      if (!isLoginExpired(loginExpiryTime)) {
        redirect("/home");
      }
    }, 1000);
  }, []);

  return (
    <div className={mainClasses}>
      <SignIn />
    </div>
  );
}
