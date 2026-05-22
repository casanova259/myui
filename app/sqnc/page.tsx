"use client";

import FingerprintButton from "@/components/fingerprint/FIngerScan";
import { AnimationSequences } from "@/components/animateSqnc/animateSqnc";
import StatCounter from "@/components/counter/counter";
import ToastAnimator from "@/components/toaster/toast";


export default function Page() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-8">
            <div className="grid grid-cols-2 gap-[1px] bg-white/10 rounded-2xl overflow-hidden w-full max-w-4xl">

                {/* Cell 1 — Pay Now / Pricing */}
                <div className="bg-[#0f0f0f] p-8 flex flex-col justify-between min-h-[400px]">
                    <div className="flex flex-col gap-3">
                        <span className="text-white/30 text-xs uppercase tracking-widest">Pricing</span>
                        <h2 className="text-white text-2xl font-semibold leading-tight">
                            Simple, transparent <br /> pricing
                        </h2>
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="h-[1px] w-3/4 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-2/3 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-4/5 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-1/2 bg-white/10 rounded-full" />
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed mt-1">
                            One-click checkout. No hidden fees, <br /> no subscriptions unless you want one.
                        </p>
                    </div>
                    <div className="mt-6">
                        <AnimationSequences />
                    </div>
                </div>

                {/* Cell 2 — Fingerprint / Biometric */}
                <div className="bg-[#0f0f0f] p-8 flex flex-col justify-between min-h-[400px]">
                    <div className="flex flex-col gap-3">
                        <span className="text-white/30 text-2xl font-semibold uppercase tracking-widest flex gap-2">
                            Security
                            <svg width="25" height="25" viewBox="0 0 20 25" fill="none" className="inline-block" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.5 0.75C14.2279 0.75 17.25 3.77208 17.25 7.5C17.25 11.2279 14.2279 14.25 10.5 14.25C6.77208 14.25 3.75 11.2279 3.75 7.5C3.75 3.77208 6.77208 0.75 10.5 0.75Z" stroke="white" stroke-width="1.5" />
                                <rect y="5" width="20" height="20" rx="2" fill="white" />
                            </svg>

                        </span>
                        <h2 className="text-white text-3xl font-semibold leading-tight">
                            Biometric Login <br /> & Verification
                        </h2>
                        <div className="w-96  ">
                            <p className="text-white/40 text-sm leading-relaxed mt-1  ">
                                Your fingerprint is your password. <br /> Secure, Instant, and Always Private.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end mb-6">
                        <FingerprintButton />
                    </div>
                </div>

                {/* Cell 3 — Placeholder */}
                <div className="bg-[#0f0f0f] p-8 flex flex-col justify-between min-h-[400px]">
                    <div className="flex flex-col gap-3">
                        <span className="text-white/30 text-xs uppercase tracking-widest">Analytics</span>
                        <h2 className="text-white text-2xl font-semibold leading-tight">
                            Real-time insights <br /> at a glance
                        </h2>
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="h-[1px] w-3/4 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-2/3 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-4/5 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-1/2 bg-white/10 rounded-full" />
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed mt-1">
                            Track every transaction and user <br /> action as it happens, live.
                        </p>
                    </div>
                    {/* drop your next component here */}
                    <div className="mt-2 h-4 rounded-xl border border-white/10 flex items-center justify-center">
                        {/* <span className="text-white/20 text-xs">component goes here</span>
                         */}
                        <StatCounter />
                    </div>
                </div>

                {/* Cell 4 — Placeholder */}
                <div className="bg-[#0f0f0f] p-8 flex flex-col justify-between min-h-[400px]">
                    <div className="flex flex-col gap-3">
                        <span className="text-white/30 text-xs uppercase tracking-widest">Notifications</span>
                        <h2 className="text-white text-2xl font-semibold leading-tight">
                            Stay in the loop, <br /> always
                        </h2>
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="h-[1px] w-3/4 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-2/3 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-4/5 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-1/2 bg-white/10 rounded-full" />
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed mt-1">
                            Push alerts, emails, or SMS — <br /> your choice, your control.
                        </p>
                    </div>
                    {/* drop your next component here */}
                    <div className="mt-6 h-16 rounded-xl    flex items-center justify-center">
                        {/* <span className="text-white/20 text-xs">component goes here</span> */}
                        <ToastAnimator />
                    </div>
                </div>

            </div>
        </div>
    );
}