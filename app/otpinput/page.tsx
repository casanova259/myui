"use client";

import { OTPInput } from "./_components/Otpinput";

export function Demo() {
    return (
        <OTPInput
            correctOTP="424242"
            onSuccess={() => console.log("Verified!")}
            onError={() => console.log("Invalid OTP")}
        />
    );
}

export default function Page() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white p-6">
            <div className="w-full max-w-sm p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center">
                <Demo />
            </div>
        </main>
    );
}

