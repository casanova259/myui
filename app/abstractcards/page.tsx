"use client";

import AbstractCards from "@/components/AbstractCards/abstractcards";

export default function Page() {
    return (
        <>
        <section className="h-screen w-full bg-[#fcf5e2] flex items-center  justify-center">
            <h2 className="max-md:text text-center text-[9vw] font-semibold leading-[.8] tracking-tight text-black">
                Welcome To <br/> Mak!
            </h2>
        </section>
        <AbstractCards/>
        <section className="h-screen w-full bg-[#fcf5e2] flex items-center justify-center">

        </section>
        </>
    )
}