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
                    border: "1px solid #c8c8c8",
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
                    }}
                >

                    <svg width="500" height="277" viewBox="0 0 801 277" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M70.6316 27.879C78.2644 8.59214 96.4872 -1.85957 115.368 0.273484H684.387C684.496 0.273486 684.606 0.275919 684.716 0.277391C703.606 -1.86856 721.842 8.58347 729.478 27.879L796.597 197.469C806.353 222.118 795.116 251.863 771.5 263.905L757.596 270.996C733.979 283.039 706.925 272.819 697.17 248.17L669.14 177.349H130.971L102.945 248.169C93.1902 272.819 66.1371 283.039 42.5203 270.997L28.615 263.907C4.99845 251.865 -6.23851 222.12 3.51641 197.471L70.6316 27.879Z" fill="black" />
                    </svg>

                </div>

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