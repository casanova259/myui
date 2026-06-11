import Lenis from "lenis";
import { useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Column } from "./Columns";

const images = [
    "/images1/img1.jpg",
    "/images1/img2.jpg",
    "/images1/img3.jpg",
    "/images1/img4.jpg",
    "/images1/img5.jpg",
    "/images1/img6.jpg",
    "/images1/img7.jpg",
    "/images1/img8.jpg",
    "/images1/img9.jpg",
    "/images1/img10.jpg",
    "/images1/img11.jpg",
    "/images1/img12.jpg",
    "/images1/img13.jpg",
    "/images1/img14.jpg",
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

        <main className="w-full bg-black text-white">
            <div className="font-inter flex h-screen items-center justify-center gap-2">


                <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-white">

                    <span className="relative max-w-[12ch] text-md uppercase leading-tight opacity-40 after:absolute
                    after:left-1/2 after:top-full after:h-16 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']
                    ">
                        Scroll Down To See
                    </span>
                </div>
            </div>

            <div
                ref={gallery}
                className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden  bg-white p-[2vw]">


                <Column images={[images[0], images[1], images[2]]} y={y} />
                <Column images={[images[3], images[4], images[5]]} y={y2} />
                <Column images={[images[6], images[7], images[8]]} y={y3} />
                <Column images={[images[6], images[7], images[8]]} y={y4} />

            </div>

            <div className="font-inter relative flex h-screen items-center justify-center gap-2">
                <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-white">
                    <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-black after:to-white after:content-['']">
                        scroll Up to see
                    </span>
                </div>
            </div>
        </main>
    )
}