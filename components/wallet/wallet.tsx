import React, { useState } from "react";

const CARDS = [
    { id: 1, last4: "2546" },
    { id: 2, last4: "9784" },
];

const AMOUNTS = [50, 100, 300];

export default function CashFlow() {
    const [selectedCard, setSelectedCard] = useState(1);
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-[#f0f0f0] flex flex-col items-center justify-center p-6">

            {/* Page title */}
            <div className="w-full max-w-sm mb-4">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Cash Flow</h1>
            </div>

            {/* Card */}
            <div className="bg-white rounded-3xl shadow-md w-full max-w-sm p-5">

                {/* Wallet row */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-100 rounded-2xl w-12 h-12 flex items-center justify-center">
                            {/* Wallet icon using tabler if available, else emoji fallback */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                                fill="none" stroke="#374151" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 8V5a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V6" />
                                <circle cx="17" cy="12" r="1" fill="#374151" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-medium">Wallet</p>
                            <p className="text-2xl font-semibold text-gray-900">$34.00</p>
                        </div>
                    </div>

                    {/* Close button */}
                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 text-sm font-medium">
                        ✕
                    </button>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 mb-4" />

                {/* Payment Mode header */}
                <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-500">Payment Mode</p>
                    <button className="flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 hover:bg-gray-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <line x1="2" y1="10" x2="22" y2="10" />
                        </svg>
                        Add Card
                    </button>
                </div>

                {/* Card list */}
                <div className="flex flex-col mb-4">
                    {CARDS.map((card) => {
                        const isSelected = selectedCard === card.id;
                        return (
                            <button
                                key={card.id}
                                onClick={() => setSelectedCard(card.id)}
                                className="flex items-center justify-between py-2.5 px-1 rounded-xl hover:bg-gray-50"
                            >
                                <div className="flex items-center gap-3">
                                    {/* Radio — 👇 add layoutId="radio-dot" to the inner dot */}
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                    ${isSelected ? "border-gray-900" : "border-gray-300"}`}>
                                        {isSelected && (
                                            <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                                        )}
                                    </div>

                                    <span className="text-sm text-gray-700 tracking-widest">
                                        ••••&nbsp;••••&nbsp;{card.last4}
                                    </span>
                                </div>

                                <span className="text-sm font-bold text-blue-700 italic">VISA</span>
                            </button>
                        );
                    })}
                </div>

                {/* Cash label */}
                <p className="text-sm font-medium text-gray-500 mb-2">Cash</p>

                {/* Amount pills */}
                <div className="flex gap-2 mb-5">
                    {AMOUNTS.map((amt) => {
                        const isSelected = selectedAmount === amt;
                        return (
                            // 👇 for layoutId animation: put a motion.div inside with layoutId="pill-bg" when selected
                            <button
                                key={amt}
                                onClick={() => setSelectedAmount(amt)}
                                className={`flex-1 py-2.5 rounded-full text-sm font-medium border transition-all
                                    ${isSelected
                                        ? "bg-gray-900 text-white border-gray-900"
                                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                ${amt}
                            </button>
                        );
                    })}
                </div>

                {/* Add Cash button */}
                <button className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-full py-3.5 px-6 text-sm font-semibold w-fit">
                    <span className="text-lg leading-none">+</span>
                    Add Cash
                </button>

            </div>
        </div>
    );
}
