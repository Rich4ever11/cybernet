import SignUpCard from "@/components/Authentication/SignUpCard";
import React from "react";

type Props = {};

export default function SignUpPage({}: Props) {
  return (
    <div>
      <div className="bg-gray-950 min-h-screen h-full content-center">
        <div className="grid justify-items-stretch ">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl justify-self-center py-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-orange-400">
              🔥 Faster Cyber
            </span>{" "}
            Better Fix.
          </h1>
        </div>
        <SignUpCard />
        <div className="flex justify-center py-8">
          <img
            src="https://ouch-cdn2.icons8.com/GTtXLR6GnrWclrXaVOnyTU0Q9k_H4phUzCEhQ8uVHBk/rs:fit:368:425/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNjEz/LzJkNzExYjI2LWQ4/OGMtNGFiOC05MGQy/LTZkMzc1OWJkMzc0/OS5wbmc.png"
            width={300}
            height={300}
            alt="Picture of Hackers"
          />
        </div>
      </div>
    </div>
  );
}
