"use client";
import { useEffect } from "react";
import SignIn from "../../components/SignIn";
import { useAuthContext } from "../context/AuthContext";
import { redirect } from "next/navigation";

export default function Home() {
  const { loginExpiryTime, checkLoginExpired } = useAuthContext();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!checkLoginExpired(loginExpiryTime)) {
        redirect("/home");
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [loginExpiryTime, checkLoginExpired]);

  return (
    <div>
      <SignIn />
    </div>
  );
}
