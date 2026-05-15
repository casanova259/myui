"use client";


import { delay } from "motion";
import { motion } from "motion/react"
import { del } from "motion/react-client";

export const Demo = () => {
    const items = [
        {
            title: "Innovation",
            description: "Beautiful and durable, by design.",
            image: "/11.jpg",
        },
        {
            title: "Cutting-Edge Cameras",
            description: "Picture your best photos and videos.",
            image: "/22.jpg",
        },
        {
            title: "Chip and Battery Life",
            description: "Fast that lasts.",
            image: "/33.jpg",
        },
        {
            title: "iOS and Apple Intelligence",
            description: "New look. Even more magic.",
            image: "/44.jpg",
        },
        {
            title: "Environment",
            description: "Designed with the earth in mind.",
            image: "/55.jpg",
        },
        {
            title: "Privacy",
            description: "Your data. Just where you want it.",
            image: "/66.jpg",
        },
        {
            title: "Peace of Mind",
            description: "Helpful features. Just in case.",
            image: "/77.jpg",
        },
    ];


    const startEndInset = "pl-[max(1rem,calc((100vw-72rem)/2+1rem))] " +
        "pr-[max(1rem,calc((100vw-72rem)/2+1rem))] " +
        "scroll-pl-[max(1rem,calc((100vw-72rem)/2+1rem))]";



    const CARD_TRANSITION = {
        type: 'spring' as const,
        stiffness: 300,
        damping: 25
    }



    return (
        <section className="w-full overflow-hidden py-32">
            <div className="mx-auto max-w-6xl px-4">
                <h2 className="text-5xl font-semibold tracking-tight mb-12 text-black">Get to know iPhone.</h2>
            </div>


            <div className={`flex gap-4 overflow-x-auto py-12 [scrollbar-width:none] snap-x snap-mandatory ${startEndInset} `}>
                {items.map((item, index) => (
                    <motion.button whileHover={{
                        scale: 1.02
                    }}
                        
                        transition={CARD_TRANSITION}
                        key={item.title} className="rounded-3xl snap-start flex items-start justify-start text-left relative p-10 h-180 w-100 shrink-0 overflow-hidden cursor-pointer">


                        <div className="size-10 z-20 flex items-center justify-center absolute right-4 bottom-4 rounded-full bg-white">
                            <Icon />
                        </div>

                        <img src={item.image} alt={item.title} className="absolute inset-0 size-full object-cover" />
                        <div className="relative z-10 flex flex-col gap-3">
                            <h2 className="text-base font-medium text-white ">{item.title}</h2>
                            <p className="text-3xl font-bold text-white/75 text-balance">{item.description}</p>
                        </div>
                    </motion.button>
                ))}
            </div>
        </section>
    )
}


const Icon = () => {
    return <svg className="size-10 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
        <path d="m24 16.5h-4.5v-4.5c0-.8286-.6719-1.5-1.5-1.5s-1.5.6714-1.5 1.5v4.5h-4.5c-.8281 0-1.5.6714-1.5 1.5s.6719 1.5 1.5 1.5h4.5v4.5c0 .8286.6719 1.5 1.5 1.5s1.5-.6714 1.5-1.5v-4.5h4.5c.8281 0 1.5-.6714 1.5-1.5s-.6719-1.5-1.5-1.5z"></path>
    </svg>
}