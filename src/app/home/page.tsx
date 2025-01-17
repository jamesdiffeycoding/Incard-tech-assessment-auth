"use client";

import Footer from "@/components/Footer";
import HeaderLogo from "@/components/HeaderLogo";
import HomePageInfo from "@/components/HomePageInfo";
import Image from "next/image";
import { redirect } from "next/navigation";
import { REFRESH_FREQUENCY_IN_MS } from "@/utils";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const { loginExpiryTime, checkLoginExpired, logoutEarly } = useAuthContext();

  useEffect(() => {
    const interval = setInterval(() => {
      if (checkLoginExpired(loginExpiryTime)) {
        redirect("/");
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
        <div className="max-w-[467px] w-full p-4 h-screen flex flex-col justify-center">
          <HeaderLogo />
          <HomePageInfo
            checkLoginExpired={checkLoginExpired}
            loginExpiryTime={loginExpiryTime}
            logoutEarly={logoutEarly}
          />
          <Footer />
        </div>
      </section>
      {/* RIGHT PANE - WIDE SCREENS ONLY */}
      <section className="custom-pane">
        <Image
          alt="platform mockup"
          src="/mockupPane.png"
          width={2074}
          height={1744}
          className="custom-pane w-full h-screen object-cover"
        />
      </section>
    </div>
  );
}
