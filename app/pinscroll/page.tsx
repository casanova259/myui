"use client";

import SectionItoshiRin, { SectionBaro, SectionNagi, SectionShiedo } from "@/components/Pincards/PinCards";
import { SectionIsagi } from "../../components/Pincards/PinCards";

import Image from "next/image";
import ScrollAnimation from "@/components/Pincards/ScrollAnimation";


// app/page.tsx
export default function Home() {
    return (
        <main className="w-full bg-[#0f0f0f] overflow-x-hidden">
            <ScrollAnimation/>
            <header className="relative flex h-[100svh] w-full items-center justify-center bg-black p-8 text-white ">
                <h1 className="text-center text-[9rem] leading-none font-black tracking-tighter uppercase font-monster-beast">
                    Meet The Egoists <br />
                    <Image
                    src="/RT.png"
                    width={250}
                    height={250}
                    className="inline-block"
                    alt="BLUELOCK_LOGO"
                    />
                    <span className="text-[#004AAD] text-[10rem]">BLUELOCK </span>
                </h1>
            </header>
            <SectionItoshiRin />
            <SectionNagi />
            <SectionIsagi />
            <SectionShiedo />
            <SectionBaro/>
            <footer className="relative flex h-svh w-full items-center justify-center bg-[#0f0f0f] p-8 text-white">
                <h1 className="text-center text-[clamp(3rem,10vw,8rem)] leading-none font-black tracking-[6px] uppercase font-monster-beast">
                    IT IsN&apos;T Over  <br />yet
                </h1>
            
            </footer>
        </main>
    )
}

