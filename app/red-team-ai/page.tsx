import React from "react";
import Conversation from "@/components/RedTeam/AI/Conversation";
import NavBarAuth from "@/components/Navbar/NavBarAuth";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <NavBarAuth />
      <Conversation />
    </div>
  );
}
