import Image from "next/image";
import NavBar from "@/components/Navbar/NavBar";

export default function Home() {
  return (
    <div className="bg-black min-h-screen h-full grid font-[family-name:var(--font-geist-sans)]">
      <NavBar />
    </div>
  );
}
