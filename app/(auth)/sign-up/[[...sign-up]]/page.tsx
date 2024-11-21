import SignUpCard from "@/components/Authentication/SignUpCard";
import React from "react";
import Image from "next/image";

// type Props = {};

export default function SignUpPage({}: object) {
  return (
    <div>
      <div className="bg-gray-950 min-h-screen h-full content-center">
        <div className="grid justify-items-stretch py-12">
          <h1 className="mb-4 text-4xl font-thin text-gray-900 dark:text-white md:text-5xl lg:text-8xl justify-self-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-400">
              Register For
            </span>{" "}
            Cybernet AI
          </h1>
        </div>
        <div className="md:flex justify-center md:space-x-16">
          <div className="flex items-center">
            <div className="flex justify-center">
              <Image
                src="https://ouch-cdn2.icons8.com/JYiTsw6K6zsc1F9Sg6_PXiB3Mqr_xJAuoKTEy2pwQ-g/rs:fit:368:435/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvOTc4/LzY0OWQ3MzY3LWVk/ZDktNDM0MC04MGNk/LTAyZTFiMTM2MWVi/My5wbmc.png"
                height={300}
                width={300}
                alt="Picture of Hackers"
                className=""
              />
            </div>
          </div>
          <div>
            <SignUpCard />
          </div>
        </div>
      </div>
    </div>
  );
}
