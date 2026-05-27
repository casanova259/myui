"use client";

import { FlipLink } from "@/components/RevealLinks/FlipLink";

export default function Page() {
    return (
        <section className="flex items-start pl-20 justify-center flex-col gap-6 bg-black min-h-screen text-white">

            <FlipLink href="#">Twitter</FlipLink>
            <FlipLink href="#">Linkedin</FlipLink>
            <FlipLink href="#">Facebook</FlipLink>
            <FlipLink href="#">Instagram</FlipLink>
        </section>
    )
}


