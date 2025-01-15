"use client";

import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { redirect } from "next/navigation";
import { REFRESH_FREQUENCY_IN_MS } from "@/utils";
import Image from "next/image";
import HeaderLogo from "@/components/HeaderLogo";
import Footer from "@/components/Footer";

export default function Home() {
  const { loginExpiryTime, checkLoginExpired } = useAuthContext();

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
      {/* LEFT PANE */}
      <section className="flex flex-col justify-center items-center">
        <div className="max-w-[467px] w-full p-4">
          <HeaderLogo />

          {checkLoginExpired(loginExpiryTime)
            ? "Please log in."
            : `Hi there! At ${loginExpiryTime.slice(
                16,
                24
              )} you will be redirected to login.`}
          <Footer />
        </div>
      </section>
      {/* RIGHT PANE */}
      <section className="custom-pane">
        <Image
          alt="platform mockup"
          src="/platformMockup.webp"
          width={500}
          height={500}
          className="custom-pane w-full h-screen object-cover"
        />
      </section>
    </div>
  );
}
