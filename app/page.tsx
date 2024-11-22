"use client";

import NavBarAuth from "@/components/Navbar/NavBarAuth";
import UserDashboard from "@/components/Home/UserDashboard";

export default function Home() {
  return (
    <div className="bg-black h-full grid font-[family-name:var(--font-geist-sans)]">
      <NavBarAuth />
      <UserDashboard />
    </div>
  );
}
