"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const toasts = [
    { icon: "💳", title: "Payment received", sub: "$240.00 from Arjun S.", color: "bg-green-500/10 border-green-500/20" },
    { icon: "🔐", title: "Login detected", sub: "New device • Mumbai, IN", color: "bg-blue-500/10 border-blue-500/20" },
    { icon: "👤", title: "New user joined", sub: "Priya K. just signed up", color: "bg-purple-500/10 border-purple-500/20" },
    { icon: "⚡", title: "Withdrawal processed", sub: "$80.00 sent successfully", color: "bg-amber-500/10 border-amber-500/20" },
];

export default function ToastAnimator() {
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray<HTMLElement>(".toast-item");

            tlRef.current = gsap.timeline({ repeat: -1, delay: 0.5 });

            items.forEach((item, i) => {
                tlRef.current!
                    .fromTo(
                        item,
                        { y: 24, opacity: 0, scale: 0.95 },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 0.5,
                            ease: "back.out(1.4)",
                        }
                    )
                    .to(
                        item,
                        {
                            opacity: 0,
                            y: -12,
                            scale: 0.97,
                            duration: 0.4,
                            ease: "power2.in",
                            delay: 1.4,
                        }
                    );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-[72px]">
            {toasts.map((toast, i) => (
                <div
                    key={i}
                    className={`
                        toast-item
                        absolute inset-0
                        flex items-center gap-3
                        px-4 py-3
                        rounded-xl
                        border
                        ${toast.color}
                        opacity-0
                    `}
                >
                    <span className="text-xl leading-none">{toast.icon}</span>
                    <div className="flex flex-col">
                        <span className="text-white text-sm font-medium leading-tight">
                            {toast.title}
                        </span>
                        <span className="text-white/40 text-xs leading-tight mt-0.5">
                            {toast.sub}
                        </span>
                    </div>
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                </div>
            ))}
        </div>
    );
}