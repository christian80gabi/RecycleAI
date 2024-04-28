'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import homeOff from "../assets/icons/home_off.svg";
import homeOn from "../assets/icons/home_on.svg";
import locatioOn from "../assets/icons/location_on.svg";
import locationOff from "../assets/icons/location.svg";
import scanner from "../assets/icons/scanner.svg";
import scanning from "../assets/icons/scanning.svg";
import Image from "next/image";

export default function Navbar() {

  const pathname = usePathname();
  return (
    <nav className="fixed bg-neutral-200/50 bottom-6 shadow-xl sha left-1/2 -translate-x-[50%] rounded-xl">
      <div className="flex gap-x-8 p-5">
        <Link href={"/"}>
          {pathname === "/" ? (
            <Image src={homeOn} className="w-12 h-12"></Image>
          ) : (
            <Image src={homeOff} className="w-12 h-12"></Image>
          )}
        </Link>
        <Link href={"/ai-scan"}>
          {pathname === "/ai-scan" ? (
            <Image src={scanning} className="w-12 h-12"></Image>
          ) : (
            <Image src={scanner} className="w-12 h-12"></Image>
          )}
        </Link>
        <Link href={"/map"}>
          {pathname === "/map" ? (
            <Image src={locatioOn} className="w-12 h-12"></Image>
          ) : (
            <Image src={locationOff} className="w-12 h-12"></Image>
          )}
        </Link>
      </div>
    </nav>
  );
}