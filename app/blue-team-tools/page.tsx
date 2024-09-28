import React from "react";
import PasswordModule from "@/components/BlueTeam/Tools/PasswordHardening/PasswordModule";
import PatchAndUpdateModule from "@/components/BlueTeam/Tools/PatchAndUpdateFeed/PatchAndUpdateModule";
import PhisingDetectionModule from "@/components/BlueTeam/Tools/PhisingDetection/PhisingDetectionModule";
import NavBarAuth from "@/components/Navbar/NavBarAuth";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <NavBarAuth />
      <PasswordModule />
      <PatchAndUpdateModule />
      <PhisingDetectionModule />
    </div>
  );
}
