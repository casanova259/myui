"use client";

export default function WalletCard() {
    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-black">
            {/* Rectangle 34 — main black container */}
            <div
                className="relative overflow-hidden"
                style={{
                    width: "320px",
                    height: "320px",
                    background: "#060606",
                    borderRadius: "41px",
                    border: "1.5px solid #1a6bff",
                }}
            >
                {/* Purple card (back) */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 z-[1]"
                    style={{
                        top: "18%",
                        width: "86%",
                        height: "38%",
                        background: "#7b6ff0",
                        borderRadius: "18px",
                    }}
                />

                {/* White card (front) */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 bg-white z-[2]"
                    style={{
                        top: "28%",
                        width: "86%",
                        height: "38%",
                        borderRadius: "18px",
                    }}
                />

                {/* Tray — black concave mask swallowing the card bottoms */}
                <div
                    className="absolute left-0 right-0 bottom-0 z-[3]"
                    style={{
                        height: "58%",
                        background: "#060606",
                        clipPath:
                            "polygon(0% 0%, 28% 0%, 34% 14%, 50% 18%, 66% 14%, 72% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                />

                {/* Amount label */}
                <p
                    className="absolute z-[4] m-0 text-white font-semibold tracking-tight"
                    style={{
                        left: "8%",
                        bottom: "9%",
                        fontSize: "1.45rem",
                        fontFamily: '-apple-system, "SF Pro Display", "Helvetica Neue", sans-serif',
                    }}
                >
                    $ 150,000
                </p>
            </div>
        </div>
    );
}