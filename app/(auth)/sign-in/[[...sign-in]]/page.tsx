"use client";

import React, { useState } from "react";
import SignInCard from "@/components/Authentication/SignInCard";
import { useEffect } from "react";
import { getUserCookieSession } from "@/util/middleware/cookies";
import { useRouter } from "next/navigation";
// type Props = {};

export default function SignInPage({}: object) {
  const router = useRouter();
  const handleUserCookie = async () => {
    const result = await getUserCookieSession();
    if (result) {
      router.push("/");
      return;
    }
  };
  useEffect(() => {
    handleUserCookie();
  }, []);

  return (
    <div className="bg-gray-950 min-h-screen h-full content-center border-8 border-black">
      <div className="grid justify-items-stretch">
        <h1 className="mb-4 text-4xl font-thin text-white dark:text-white md:text-5xl lg:text-8xl justify-self-center py-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-400">
            Login For
          </span>{" "}
          Cybernet AI
        </h1>
      </div>

      <div className="md:flex justify-center md:space-x-16 m-4 py-4">
        <div className="">
          <div className="flex justify-center py-8">
            <img
              src="https://ouch-cdn2.icons8.com/ijnAGsMxvQI_NJv8NsWfGZFAtD264994Nr5dVqWChW8/rs:fit:368:303/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNzU3/Lzk4OTJiZjFhLWJh/ZWQtNDcxMC1hNmRi/LTdmMDFjNDlhODIw/YS5wbmc.png"
              width={375}
              height={375}
              alt="Picture of Hackers"
            />
          </div>
        </div>
        <div>
          <SignInCard />
        </div>
      </div>
    </div>
  );
}
