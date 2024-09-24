import React from "react";
import Reconnaissance from "@/components/RedTeam/Tools/Recon/Reconnaissance";
import Scanning from "@/components/RedTeam/Tools/Scanning/Scanning";

type Props = {};

export default function Recon({}: Props) {
  return (
    <div>
      {/* <Reconnaissance /> */}
      <Scanning />
    </div>
  );
}
