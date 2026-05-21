"use client";

import FingerprintButton from "@/components/fingerprint/FIngerScan";
import { AnimationSequences } from "@/components/animateSqnc/animateSqnc";

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
                        <span className="text-white/30 text-xs uppercase tracking-widest">Security</span>
                        <h2 className="text-white text-2xl font-semibold leading-tight">
                            Biometric login <br /> & verification
                        </h2>
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="h-[1px] w-3/4 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-2/3 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-4/5 bg-white/10 rounded-full" />
                            <div className="h-[1px] w-1/2 bg-white/10 rounded-full" />
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed mt-1">
                            Your fingerprint is your password. <br /> Secure, instant, and always private.
                        </p>
                    </div>
                    <div className="mt-6 flex justify-start">
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
                    <div className="mt-6 h-16 rounded-xl border border-white/10 flex items-center justify-center">
                        <span className="text-white/20 text-xs">component goes here</span>
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
                    <div className="mt-6 h-16 rounded-xl border border-white/10 flex items-center justify-center">
                        <span className="text-white/20 text-xs">component goes here</span>
                    </div>
                </div>

            </div>
        </div>
    );
}