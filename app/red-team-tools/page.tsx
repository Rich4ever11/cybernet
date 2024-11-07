import React from "react";
import Reconnaissance from "@/components/RedTeam/Tools/Recon/Reconnaissance";
import Scanning from "@/components/RedTeam/Tools/Scanning/Scanning";
import Exploit from "@/components/RedTeam/Tools/Exploit/Exploit";
import NavBarAuth from "@/components/Navbar/NavBarAuth";

// type Props = {};

export default function RedTeamTools() {
  return (
    <div>
      <NavBarAuth />
      <Reconnaissance />
      <Scanning />
      <Exploit />
    </div>
  );
}
