"use client";

import React, { useState } from "react";
import PasswordModule from "@/components/BlueTeam/Tools/PasswordHardening/PasswordModule";
import PatchAndUpdateModule from "@/components/BlueTeam/Tools/PatchAndUpdateFeed/PatchAndUpdateModule";
import PhisingDetectionModule from "@/components/BlueTeam/Tools/PhisingDetection/PhisingDetectionModule";
import NavBarAuth from "@/components/Navbar/NavBarAuth";

// type Props = {};

export default function BlueTeamTools() {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className="bg-black">
      <NavBarAuth setLoadingStatus={setLoading} />

      {loading ? (
        <>
          <div className="flex flex-row justify-center items-center h-screen">
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
          <PasswordModule />
          <PatchAndUpdateModule />
          <PhisingDetectionModule />
        </>
      )}
    </div>
  );
}
