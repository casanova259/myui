"use client";

import FingerprintButton from "@/components/fingerprint/FIngerScan";
import { AnimationSequences } from "@/components/animateSqnc/animateSqnc";
import ToastAnimator from "@/components/toaster/toast";
import { IconBellRinging, IconFingerprint } from '@tabler/icons-react';
import { IconLockFilled } from '@tabler/icons-react';
import { IconAlignBoxBottomRight } from '@tabler/icons-react';
import BarChart from "@/components/BarChart/BarChart";

export default function Page() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-8">
            <div className="grid grid-cols-2 gap-[1px] bg-white/10 rounded-2xl overflow-hidden w-full max-w-4xl">

                {/* Cell 1 — Pay Now / Pricing */}
                <div className="bg-[#0f0f0f] p-8 flex flex-col justify-between min-h-[400px]">
                    <div className="flex flex-col gap-3">
                        <span className="text-white/30 text-2xl uppercase tracking-widest font-semibold">Pricing</span>
                        <h2 className="text-white text-3xl font-semibold leading-relaxed tracking-wide">
                            Simple, Transparent <br /> Pricing
                        </h2>
                        {/* <div className="flex flex-col gap-2 mt-2">
                            <div className="h-[1px] w-3/4 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-2/3 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-4/5 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-1/2 bg-white/10 rounded-full" />
                        </div> */}
                        <p className="text-white/40 text-md leading-relaxed mt-1">
                            One-click checkout. No hidden fees, <br /> no subscriptions unless you want one.
                        </p>
                    </div>
                    <div className="mt-2 pb-4">
                        <AnimationSequences />
                    </div>
                </div>

                {/* Cell 2 — Fingerprint / Biometric */}
                {/* Cell 2 — Biometric / Security */}
                <div className="bg-[#0f0f0f] p-8 flex flex-col justify-between min-h-[400px]">

                    {/* Top */}
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-2">
                            <span className="text-white/30 text-2xl font-semibold uppercase tracking-widest flex items-center gap-2">
                                Security
                                {/* <svg width="22" height="22" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.5 0.75C14.2279 0.75 17.25 3.77208 17.25 7.5C17.25 11.2279 14.2279 14.25 10.5 14.25C6.77208 14.25 3.75 11.2279 3.75 7.5C3.75 3.77208 6.77208 0.75 10.5 0.75Z" stroke="#575657" strokeWidth="1.5" />
                                <rect y="5" width="20" height="20" rx="2" fill="#575657" />
                            </svg> */}
                            </span>

                            <IconLockFilled />
                        </div>

                        <h2 className="text-white text-3xl font-semibold leading-relaxed tracking-wide">
                            Biometric Login <br /> & Verification
                        </h2>

                        <div className="w-full ">
                            <p className="text-white/20 text-sm leading-relaxed  mt-2">
                                Your fingerprint is your password. <br /> Secure, Instant, and Always Private.
                            </p>
                        </div>

                    </div>

                    {/* Bottom — two boxes */}
                    <div className="flex gap-3 mt-6">

                        {/* Left box — dark container, can hold extra info or leave minimal */}
                        <div className="rounded-2xl border border-neutral-100 transparent p-4 flex w-full  justify-center min-h-[160px] ">

                            <div className="flex flex-col gap-2 items-center justify-center pl-2">
                                <span className="text-white text-xl  tracking-wide">Touch ID Payments</span>
                                <span className="text-neutral-200 text-md  mt-1">Sensor active</span>
                            </div>

                            <div className="flex-1 flex items-center justify-end">
                                <FingerprintButton />
                            </div>

                        </div>

                        {/* Right box — FingerprintButton */}


                    </div>

                </div>
                {/* Cell 3 — Placeholder */}
                <div className="bg-[#0f0f0f] p-8 flex flex-col justify-between min-h-[400px]">
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-2">
                            <span className="text-white/30 text-xl uppercase tracking-widest font-semibold">Analytics</span>
                            <IconAlignBoxBottomRight className="h-5 w-5 " stroke={2} />
                        </div>
                        <h2 className="text-white text-3xl font-semibold leading-relaxed">
                            Real-time insights <br /> at a glance
                        </h2>
                    </div>

                    {/* ✅ removed h-4 and items-center — let chart size itself */}
                    <div className="w-full rounded-xl border border-white/10">
                        <BarChart />
                    </div>
                </div>

                {/* Cell 4 — Placeholder */}
                <div className="bg-[#0f0f0f] p-8 flex flex-col gap-16 min-h-[400px]">
                    <div className="flex flex-col gap-4">

                        <div className="flex gap-2">
                            <span className="text-white/30 text-xl uppercase tracking-widest font-semibold">
                                Notifications
                            </span>
                            <IconBellRinging />
                        </div>
                        <h1 className="text-white text-3xl font-semibold leading-tight">
                            Stay in the loop, <br /> always
                        </h1>
                        {/* <div className="flex flex-col gap-2 mt-2">
                            <div className="h-[1px] w-3/4 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-2/3 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-4/5 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-1/2 bg-white/10 rounded-full" />
                        </div> */}
                        <p className="text-white/40 text-md leading-relaxed mt-1">
                            Push alerts, emails, or SMS — <br /> your choice, your control.
                        </p>
                    </div>
                    {/* drop your next component here */}
                    <div className="mt-2 h-12 rounded-xl  flex items-center justify-center">
                        {/* <span className="text-white/20 text-xs">component goes here</span> */}
                        <ToastAnimator />
                    </div>
                </div>
            </div>
        </div>
    );
}