"use client";
import { useState, useEffect } from "react";
import SignIn from "../../components/SignIn";
import { useAuthContext } from "../context/AuthContext";
import { redirect } from "next/navigation";

export default function Home() {
  const { loginExpiryTime, checkLoginExpired } = useAuthContext();

  useEffect(() => {
    setInterval(() => {
      if (!checkLoginExpired(loginExpiryTime)) {
        redirect("/home");
      }
    }, 1000);
  }, []);

  return (
    <div>
      <SignIn />
    </div>
  );
}
