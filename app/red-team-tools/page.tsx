"use client";

import React, { useState } from "react";
import Reconnaissance from "@/components/RedTeam/Tools/Recon/Reconnaissance";
import Scanning from "@/components/RedTeam/Tools/Scanning/Scanning";
import Exploit from "@/components/RedTeam/Tools/Exploit/Exploit";
import NavBarAuth from "@/components/Navbar/NavBarAuth";

// type Props = {};

export default function RedTeamTools() {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div>
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
        <>
          <Reconnaissance />
          <Scanning />
          <Exploit />
        </>
      )}
    </div>
  );
}
