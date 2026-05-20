"use client";

import SectionItoshiRin, { SectionNagi, SectionShiedo } from "@/components/Pincards/PinCards";
import { SectionIsagi } from "../../components/Pincards/PinCards";




// app/page.tsx
export default function Home() {
    return (
        <main className="w-full bg-[#0f0f0f]">
            <SectionItoshiRin />
            <SectionShiedo/>
            <SectionIsagi/>
            <SectionNagi/>
            <footer className="relative flex h-[70svh] w-full items-center justify-center bg-[#0f0f0f] p-8 text-white">
                <h1 className="text-center text-[clamp(3rem,10vw,8rem)] leading-none font-black tracking-tighter uppercase font-monster-beast">
                    Curse <br />Dispelled
                </h1>
            </footer>
        </main>
    )
}

