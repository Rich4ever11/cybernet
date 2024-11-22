import React from "react";
import { GiCyberEye } from "react-icons/gi";
import NmapScanningModule from "./NmapScanningModule";

// type Props = {};

export default function Scanning() {
  return (
    <div className="m-4">
      <div className="flex justify-items-center align-middle p-8">
        <div className="mr-2">
          <GiCyberEye color={"#ffe3e1"} size={64} />{" "}
        </div>
        <h1 className="md:text-6xl text-3xl text-white">Scanning</h1>
      </div>
      <NmapScanningModule />
    </div>
  );
}
