"use client";

import Projects from "./_components/Projects";
import {LenisRef, ReactLenis} from "lenis/react";
import { gsap } from "gsap/all";
import "./globals.css"
import { useEffect, useRef } from "react";

export default function Page() {

    const lenisRef=useRef<LenisRef>(null);

    useEffect(()=>{
        function update(time:number)
        {
            lenisRef.current?.lenis?.raf(time*1000);
        }

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return ()=> gsap.ticker.remove(update);
    },[]);

    
    return (
        <>
            <ReactLenis root options={{autoRaf:false}}  ref={lenisRef}/>
            <section className="intro">
                <p>Intro</p>
            </section>

            <Projects/>
            <section className="outro">
                <p>Outro</p>
            </section>
            
        </>
    )
}