"use client";

import NavBarAuth from "@/components/Navbar/NavBarAuth";
import UserDashboard from "@/components/Home/UserDashboard";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className="dark bg-black h-full grid font-[family-name:var(--font-geist-sans)]">
      <NavBarAuth setLoadingStatus={setLoading} />
      {loading ? (
        <>
          <div className="flex justify-center h-screen">
            <div className="py-2">
              <h1 className="text-8xl font-thin">
                Loading{" "}
                <span className="loading loading-spinner loading-lg"></span>
              </h1>
            </div>
          </div>
        </>
      ) : (
        <UserDashboard />
      )}
    </div>
  );
}
