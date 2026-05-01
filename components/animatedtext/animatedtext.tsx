"use client";

import { motion, stagger, useAnimate } from "motion/react";
import React, { useEffect } from "react"

export const AnimatedText = () => {

    const [scope, animate] = useAnimate();

    const text = " Welcome to Fight Club. The First Rule Of Fight Club  You do not talk about Fight Club . The Second Rule Of Fight Club You DO NOT talk about Fight Club."




    const startAnimating = () => {
        animate("span", {
            opacity: 1,
            filter: "blur(0px)",
            y: 0
        }, {
            duration: 1,
            ease: "easeInOut",
            delay: stagger(0.05)
        })
    }

    useEffect(() => {
        startAnimating();
    }, [])

    return (
        <div ref={scope} className="text-white max-w-4xl mx-auto font-bold text-4xl" >
            {text.split(" ").map((word, index) => (
                <motion.span
                    style={{
                        opacity: 0,
                        filter: "blur(10px)",
                        y: 10,
                        display: "inline-block"
                    }
                    }
                    key={word + index}
                    className=""

                >
                    {word} &nbsp;
                </motion.span>
            ))}
        </div >
    )
}