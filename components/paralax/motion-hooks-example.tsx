"use client";

import { IconRocket } from "@tabler/icons-react";
import { useMotionTemplate, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { motion } from "motion/react";
import Image from "next/image";
import React, { useRef, useState } from "react";

type Feature = {
    icon: React.ReactNode;
    title: string;
    description: string;
    content: React.ReactNode
}

export function MotionHooksExample() {

    const containerRef=useRef<HTMLDivElement>(null);
    const {scrollYProgress}=useScroll({
        target:containerRef,
        offset:["start end","end start"]
    })

    const backgrounds=["#171717","#0f172a","#111827"]

    const [background,setbackground]=useState(backgrounds[0])

    useMotionValueEvent(scrollYProgress,"change",(latest)=>{
        const finalValue=Math.floor(latest*backgrounds.length);
        setbackground(backgrounds[finalValue])
    })


    return (
        <motion.div animate={{background}} ref={containerRef}  className="flex min-h-screen items-center justify-center bg-neutral-900">
            <div className="flex flex-col gap-10 mx-auto max-w-4xl py-40">


                {features.map((feature, idx) => (
                    <Card key={feature.title} feature={feature
                    } />
                ))}
            </div>
        </motion.div>
    )
}

const Card = ({ feature }: { feature: Feature }) => {

    const ref = useRef<HTMLDivElement>(null);
    //scroll progress kitni hogyi h progress viuewport m

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]  //yani ellement ka strat viewport k end m aayega tab start krunga track
        //and then when element ka end start pe pahunchega toh bnd krdungA
    })

    const translateContent=useSpring(useTransform(scrollYProgress,[0,1],[200,-300]),{
        stiffness:100,
        damping:30,
        mass:1
    })

    const opacityContent=useTransform(scrollYProgress,[0,0.5,1],[0,1,0]);

    const blur=useTransform(scrollYProgress,[0.5,1],[0,10])
    const scale=useTransform(scrollYProgress,[0.5,1],[1,0.8])

    
    return (
        <div
            ref={ref}
            key={feature.title}
            className="grid grid-cols-2 items-center gap-20 py-20">
            <motion.div style={{
                filter:useMotionTemplate`blur(${blur}px)`,
                scale
            }} className="flex flex-col gap-5">
                {feature.icon}
                <h2 className="text-4xl font-bold text-white">
                    {feature.title}
                </h2>
                <p className="text-lg text-neutral-400">{feature.description}</p>
            </motion.div>

            <motion.div
            style={{
                y:translateContent,
                opacity:opacityContent
            }}
            >{feature.content}</motion.div>
        </div>
    )
}



const features: Feature[] = [
    {
        icon: <IconRocket className="h-8 w-8 text-neutral-200" />,
        title: "Gneerate ultra images",
        description: "with our state of the art AI , you can generate ultra realisitic images in no time at all",
        content: (
            <div>
                <Image
                    src="/first.jpg"
                    alt="idk"
                    height={300}
                    width={300}
                    className="rounded-lg"
                />
            </div>
        )
    },
    {
        icon: <IconRocket className="h-8 w-8 text-neutral-200" />,
        title: "Gneerate ultra images with me",
        description: "with our state of the art AI , you can generate ultra realisitic images in no time at all",
        content: (
            <div>
                <Image
                    src="/second.jpg"
                    alt="idk"
                    height={300}
                    width={300}
                    className="rounded-lg"
                />
            </div>
        )
    },
    {
        icon: <IconRocket className="h-8 w-8 text-neutral-200" />,
        title: "Gneerate ultra images with ai",
        description: "with our state of the art AI , you can generate ultra realisitic images in no time at all",
        content: (
            <div>
                <Image
                    src="/third.jpg"
                    alt="idk"
                    height={300}
                    width={300}
                    className="rounded-lg"
                />
            </div>
        )
    },
]