

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { label: "Transactions", value: 2400000, prefix: "", suffix: "M", display: 2.4 },
    { label: "Uptime", value: 99.9, prefix: "", suffix: "%", display: 99.9 },
    { label: "Users", value: 1200000, prefix: "", suffix: "M", display: 1.2 },
];

export default function StatCounter() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const counters = document.querySelectorAll(".stat-number");

            counters.forEach((el) => {
                const target = parseFloat(el.getAttribute("data-target") || "0");
                const decimals = el.getAttribute("data-decimals") === "true";

                gsap.fromTo(
                    el,
                    { innerText: "0" },
                    {
                        innerText: target,
                        duration: 2,
                        ease: "power2.out",
                        snap: { innerText: decimals ? 0.1 : 1 },
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                            once: true,
                        },
                        onUpdate() {
                            const current = parseFloat(
                                (el as HTMLElement).innerText
                            );
                            (el as HTMLElement).innerText = decimals
                                ? current.toFixed(1)
                                : (current / 1000000).toFixed(1);
                        },
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="flex flex-col gap-4 w-full">
            {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                    <div className="flex items-end gap-1">
                        <span
                            className="stat-number text-white text-4xl font-black tabular-nums leading-none"
                            data-target={stat.display}
                            data-decimals="true"
                        >
                            0
                        </span>
                        <span className="text-white text-4xl font-black leading-none">
                            {stat.suffix}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div
                            className="h-[2px] bg-white/20 rounded-full overflow-hidden"
                            style={{ width: "100%" }}
                        >
                            <div
                                className="h-full bg-white/60 rounded-full origin-left scale-x-0 stat-bar"
                                style={{
                                    animation: `growBar 2s ease-out ${i * 0.2}s forwards`,
                                }}
                            />
                        </div>
                        <span className="text-white/40 text-xs whitespace-nowrap shrink-0">
                            {stat.label}
                        </span>
                    </div>
                </div>
            ))}

            <style>{`
                @keyframes growBar {
                    from { transform: scaleX(0); }
                    to   { transform: scaleX(1); }
                }
            `}</style>
        </div>
    );
}