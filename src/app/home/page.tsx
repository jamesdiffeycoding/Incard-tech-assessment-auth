"use client";

import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { redirect } from "next/navigation";
import { REFRESH_FREQUENCY_IN_MS } from "@/utils";
import Image from "next/image";
import HeaderLogo from "@/components/HeaderLogo";
import Footer from "@/components/Footer";

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
      {/* LEFT PANE */}
      <section className="flex flex-col justify-center items-center">
        <div className="max-w-[467px] w-full p-4 grid gap-6">
          <HeaderLogo />
          {checkLoginExpired(loginExpiryTime) ? (
            "Please log in. You will now be redirected to the login page."
          ) : (
            <>
              <h1>Welcome back!</h1>
              {`At ${loginExpiryTime.slice(16, 24)} GMT you will be
              redirected to login again.`}
            </>
          )}
          <button
            className="px-4 py-2 max-w-[140px] cursor-pointer rounded-lg bg-orange-300 focus:bg-orange-400 hover:bg-orange-400 text-black"
            onClick={() => logoutEarly()}
          >
            {" "}
            Log out early
          </button>

          <Footer />
        </div>
      </section>
      {/* RIGHT PANE */}
      <section className="custom-pane">
        <Image
          alt="platform mockup"
          src="/mockup.png"
          width={2074}
          height={1744}
          className="custom-pane w-full h-screen object-cover"
        />
      </section>
    </div>
  );
}
