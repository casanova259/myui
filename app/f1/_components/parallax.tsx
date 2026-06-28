'use client';

import Lenis from "lenis";
import { useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Column } from "./Columns";

const images = [
    "/f1Scroll/12.jpg",
    "/f1Scroll/14.jpg",
    "/f1Scroll/3.jpg",
    "/f1Scroll/4.jpg",
    "/f1Scroll/5.jpg",
    "/f1Scroll/6.jpg",
    "/f1Scroll/7.jpg",
    "/f1Scroll/8.jpg",
    "/f1Scroll/9.jpg",
    "/f1Scroll/10.jpg",
    "/f1Scroll/11.jpg",
    "/f1Scroll/12.jpg",
    "/f1Scroll/13.jpg",
    "/f1Scroll/14.jpg",
];

export const Oviparallax = () => {

    const gallery = useRef<HTMLDivElement>(null);

    const [dimension, setDimension] = useState({
        width: 0,
        height: 0,
    });

    //track the scroll progress
    const { scrollYProgress } = useScroll({
        target: gallery,
        offset: ["start end", "end start"],
    })


    //now we create the motion values
    const { height } = dimension
    const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);


    //runs when the component mounts
    useEffect(() => {

        const lenis = new Lenis();

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        //resize the window
        const resize = () => {
            setDimension({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener("resize", resize);
        requestAnimationFrame(raf);
        resize();

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);


    return (
        //now comes the layout

        <main className="w-full bg-black text-white z-10">
            <div className="font-inter flex h-screen items-center justify-center gap-2">


                <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-white">

                    
                </div>
            </div>

            <div
                ref={gallery}
                className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden  bg-white p-[2vw]">


                <Column images={[images[0], images[1], images[2]]} y={y} />
                <Column images={[images[8], images[5], images[11]]} y={y2} />
                <Column images={[images[13],images[6], images[7]]} y={y3} />
                <Column images={[images[12], images[9], images[8]]} y={y4} />

            </div>

            <div className="font-inter relative flex h-screen items-center justify-center gap-2">
                <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-white">
                    
                </div>
            </div>
        </main>
    )
}