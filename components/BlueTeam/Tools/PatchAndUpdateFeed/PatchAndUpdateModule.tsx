import React from "react";
import VulnerabilityLookup from "./VulnerabilityLookup";
import { GiCyberEye } from "react-icons/gi";

// type Props = {};

export default function PatchAndUpdateModule() {
  return (
    <div>
      <div className="flex justify-items-center align-middle p-8">
        <div className="mr-2">
          <GiCyberEye color={"#a9ebf4"} size={64} />{" "}
        </div>
        <h1 className="text-6xl text-white">Patching and Updates</h1>
      </div>
      <VulnerabilityLookup />
    </div>
  );
}
