"use client";

import NavBarAuth from "@/components/Navbar/NavBarAuth";
import UserDocuments from "@/components/Home/UserDocuments";

export default function Home() {
  return (
    <div className="bg-black grid font-[family-name:var(--font-geist-sans)]">
      <NavBarAuth />
      <UserDocuments />
    </div>
  );
}
