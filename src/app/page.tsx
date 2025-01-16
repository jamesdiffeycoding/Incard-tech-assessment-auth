"use client";
import { useEffect } from "react";
import SignIn from "../components/SignIn";
import { useAuthContext } from "./context/AuthContext";
import { redirect } from "next/navigation";
import { REFRESH_FREQUENCY_IN_MS } from "@/utils";
import HeaderLogo from "@/components/HeaderLogo";
import Footer from "@/components/Footer";
import Image from "next/image";
import "./globals.css";

export default function Login() {
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
    <div className="custom-grid h-full w-full">
      {/* LEFT PANE ALWAYS SHOWS */}
      <section className="flex flex-col justify-center items-center">
        <div className="max-w-[467px] w-full p-4">
          <HeaderLogo />
          <SignIn />
          <Footer />
        </div>
      </section>
      {/* RIGHT PANE - WIDE SCREENS ONLY */}
      <section className="custom-pane">
        <Image
          alt="login image"
          src="/loginImage.png"
          width={1420}
          height={2048}
          className="custom-pane w-full h-screen object-cover"
        />
      </section>
    </div>
  );
}
