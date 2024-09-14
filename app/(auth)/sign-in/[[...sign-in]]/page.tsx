import React from "react";
import SignInCard from "@/components/Authentication/SignInCard";
import Image from "next/image";

type Props = {};

export default function SignInPage({}: Props) {
  return (
    <div className="bg-gray-900 min-h-screen h-full content-center">
      <div className="grid justify-items-stretch ">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl justify-self-center py-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-400">
            🔥 Faster Cyber
          </span>{" "}
          Better Fix.
        </h1>
      </div>
      <SignInCard />
      <div className="flex justify-center py-8">
        <img
          src="https://ouch-cdn2.icons8.com/ijnAGsMxvQI_NJv8NsWfGZFAtD264994Nr5dVqWChW8/rs:fit:368:303/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNzU3/Lzk4OTJiZjFhLWJh/ZWQtNDcxMC1hNmRi/LTdmMDFjNDlhODIw/YS5wbmc.png"
          width={400}
          height={400}
          alt="Picture of Hackers"
        />
      </div>
    </div>
  );
}
