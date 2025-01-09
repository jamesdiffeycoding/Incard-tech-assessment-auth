"use client";
import { useEffect } from "react";
import SignIn from "../../components/SignIn";
import { useAuthContext } from "../context/AuthContext";
import { redirect } from "next/navigation";
import { REFRESH_FREQUENCY_IN_MS } from "@/utils/helpers";

export default function Home() {
  const { loginExpiryTime, checkLoginExpired } = useAuthContext();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!checkLoginExpired(loginExpiryTime)) {
        redirect("/home");
      }
    }, REFRESH_FREQUENCY_IN_MS);
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
