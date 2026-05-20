"use client";

import SectionItoshiRin, { SectionNagi, SectionShiedo } from "@/components/Pincards/PinCards";
import { SectionIsagi } from "../../components/Pincards/PinCards";

import Image from "next/image";


// app/page.tsx
export default function Home() {
    return (
        <main className="w-full bg-[#0f0f0f]">
            <header className="relative flex h-[100svh] w-full items-center justify-center bg-black p-8 text-white">
                <h1 className="text-center text-[9rem] leading-none font-black tracking-tighter uppercase font-monster-beast">
                    Meet The Egoists <br />
                    <Image
                    src="/BLUELOCK.webp"
                    width={350}
                    height={350}
                    className="inline-block"
                    alt="BLUELOCK_LOGO"
                    />
                    <span className="text-[#004AAD]">BLUELOCK </span>
                </h1>
            </header>
            <SectionItoshiRin />
            <SectionShiedo />
            <SectionIsagi />
            <SectionNagi />
            <footer className="relative flex h-[70svh] w-full items-center justify-center bg-[#0f0f0f] p-8 text-white">
                <h1 className="text-center text-[clamp(3rem,10vw,8rem)] leading-none font-black tracking-tighter uppercase font-monster-beast">
                    Curse <br />Dispelled
                </h1>
            </footer>
        </main>
    )
}

