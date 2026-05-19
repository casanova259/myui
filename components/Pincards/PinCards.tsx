"use client";

import { useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CardData {
    id: string;
    bg: string;                  // Tailwind bg class
    textColor: string;           // primary text colour
    mutedColor: string;          // muted / label colour
    layout: "image-right" | "image-left" | "centered";
    eyebrow: string;
    headline: string;
    body: string;
    tag?: string;
    tagBg?: string;
    stats?: { label: string; value: string; accent?: boolean }[];
    imageSrc: string;            // ← swap with your real images
    imageLabel: string;
    imageCaption?: string;
}

const cards: CardData[] = [
    {
        id: "gojo",
        bg: "bg-[#8B9B82]",
        textColor: "text-black",
        mutedColor: "text-black/60",
        layout: "image-right",
        eyebrow: "CLASSIFICATION - SPECIAL GRADE",
        headline: "THE STRONGEST",
        body: "Throughout heaven and earth, he alone is the honored one. Infinity stretches endlessly where complexity vanishes into zero.",
        tag: "SIX EYES ACTIVE / INFINITY (∞) RESOLUTION",
        tagBg: "border border-black/40 text-black",
        imageSrc: "/images/gojo.jpg",
        imageLabel: "LIMITLESS / BLUE / RED / PURPLE",
    },
    {
        id: "geto",
        bg: "bg-[#111111]",
        textColor: "text-white",
        mutedColor: "text-white/50",
        layout: "image-left",
        eyebrow: "CLASSIFICATION - SPECIAL GRADE CURSE USER",
        headline: "IDEALS",
        body: "Are you the strongest because you are Gojo Satoru? Or are you Gojo Satoru because you are the strongest? Form and expression intersect without explanation, consumed by a tragic absolute.",
        imageSrc: "/images/geto.jpg",
        imageLabel: "MAXIMUM: UZUMAKI",
        stats: [
            { label: "OBJECTIVE DIRECTIVE", value: "ERADICATE NON-SORCERERS" },
        ],
    },
    {
        id: "toji",
        bg: "bg-[#7B68EE]",
        textColor: "text-black",
        mutedColor: "text-black/60",
        layout: "image-right",
        eyebrow: "SUBJECT #00 // 天与呪縛 (HEAVENLY RESTRICTION)",
        headline: "ANOMALY",
        body: "Zero cursed energy. A heavenly restriction that stripped away everything, leaving behind a physical shell capable of tearing through the divine. He doesn't conform to the rules of sorcery; he shatters them with sheer, uncontrollable force and raw, primal instinct. The Sorcerer Killer.",
        imageSrc: "/images/toji.jpg",
        imageLabel: "CLASSIFIED",
        stats: [
            { label: "STATUS", value: "UNREGISTERED" },
            { label: "THREAT LEVEL", value: "SPECIAL GRADE" },
            { label: "ARSENAL", value: "INVERTED SPEAR" },
        ],
    },
    {
        id: "nanami",
        bg: "bg-[#FFD700]",
        textColor: "text-black",
        mutedColor: "text-black/60",
        layout: "centered",
        eyebrow: "COURT RECORD // DOMAIN: DEADLY SENTENCING",
        headline: "RETRIAL",
        body: "A genius who reached the pinnacle of jujutsu through sheer intellect and the law. A clearer position takes shape as the gavel falls, Judgeman opens its eyes, and the deadly sentencing begins.",
        imageSrc: "/images/nanami.jpg",
        imageLabel: "GUILTY",
        stats: [
            { label: "VERDICT PHASE 1", value: "CONFISCATION" },
            { label: "VERDICT PHASE 2", value: "DEATH PENALTY", accent: true },
        ],
    },
    {
        id: "sukuna",
        bg: "bg-[#C0392B]",
        textColor: "text-white",
        mutedColor: "text-white/60",
        layout: "image-left",
        eyebrow: "ENTITY / THE DISGRACED ONE",
        headline: "MALICE",
        body: "Stand proud. You are strong. This space holds without interruption. A calamity that breathes, overwhelming the world with mere presence where simplicity meets absolute destruction.",
        imageSrc: "/images/sukuna.jpg",
        imageLabel: "LETHAL FORCE AUTHORIZED",
        imageCaption: "TECHNIQUE: CLEAVE & DISMANTLE",
    },
    {
        id: "domain",
        bg: "bg-[#AAAAAA]",
        textColor: "text-black",
        mutedColor: "text-black/60",
        layout: "image-left",
        eyebrow: "",
        headline: "DOMAIN\nEXPANSION",
        body: "The pinnacle of jujutsu sorcery. By expanding a domain, the user traps the target within an inescapable environment.\n\nThe composition loosens its grip. Elements soften, contrast fades, and what remains is a guaranteed-hit space built of pure cursed energy.",
        imageSrc: "/images/domain.jpg",
        imageLabel: "",
        stats: [
            { label: "CLASSIFICATION", value: "BARRIER TECHNIQUE" },
            { label: "CORE EFFECT", value: "GUARANTEED HIT" },
        ],
    },
];



// ─── Placeholder image (remove when you add real images) ─────────────────────
function Placeholder({ label, dark }: { label: string; dark?: boolean }) {
    return (
        <div
            className={`w-full h-full flex items-end justify-center pb-3 ${dark ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
                }`}
        >
            <span className="text-[10px] tracking-widest font-bold uppercase opacity-60">
                {label || "IMAGE"}
            </span>
        </div>
    );
}

// ─── Framed image component ───────────────────────────────────────────────────
function FramedImage({
    src,
    label,
    caption,
    dark,
    stacked,
}: {
    src: string;
    label: string;
    caption?: string;
    dark?: boolean;
    stacked?: boolean;
}) {
    return (
        <div className="relative w-full max-w-[340px] mx-auto">
            {/* stacked / offset backing frame */}
            {stacked && (
                <div
                    className={`absolute inset-0 translate-x-3 translate-y-3 border-2 ${dark ? "border-gray-600" : "border-black/30"
                        }`}
                />
            )}
            <div className={`relative border-4 ${dark ? "border-black" : "border-black"}`}>
                <div className="aspect-[3/4] overflow-hidden">
                    {/* Replace Placeholder with <img src={src} … /> once you have real images */}
                    <Placeholder label={label} dark={dark} />
                </div>
                {label && (
                    <div
                        className={`px-3 py-1.5 text-[10px] tracking-[0.2em] font-bold uppercase ${dark ? "bg-black text-white" : "bg-black text-white"
                            }`}
                    >
                        {label}
                    </div>
                )}
            </div>
            {caption && (
                <p className="mt-2 text-[11px] tracking-widest font-bold uppercase opacity-80">
                    {caption}
                </p>
            )}
        </div>
    );
}

// ─── Individual card layouts ──────────────────────────────────────────────────

function ImageRightCard({ card }: { card: CardData }) {
    return (
        <div className={`card-section ${card.bg} relative overflow-hidden min-h-screen w-full`}>
            {/* ghosted background text */}
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-start pl-6 text-[20vw] font-black uppercase opacity-10 leading-none select-none"
            >
                {card.headline.split(" ")[0]}
            </span>

            <div className="relative z-10 flex items-center justify-between h-full px-16 gap-12">
                {/* left: text */}
                <div className="flex-1 max-w-[55%]">
                    <p className={`text-[11px] tracking-[0.25em] uppercase mb-4 ${card.mutedColor}`}>
                        {card.eyebrow}
                    </p>
                    <h2
                        className={`font-black uppercase leading-none mb-6 ${card.textColor}`}
                        style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
                    >
                        {card.headline}
                    </h2>
                    <p className={`text-lg leading-relaxed mb-8 ${card.textColor} max-w-lg`}>
                        {card.body}
                    </p>
                    {card.tag && (
                        <span className={`inline-block px-4 py-2 text-[10px] tracking-widest uppercase ${card.tagBg}`}>
                            {card.tag}
                        </span>
                    )}
                    {card.stats && card.stats.length > 0 && (
                        <div className="flex gap-8 mt-6">
                            {card.stats.map((s) => (
                                <div key={s.label} className="flex flex-col gap-1">
                                    <span className={`text-[9px] tracking-widest uppercase ${card.mutedColor}`}>
                                        {s.label}
                                    </span>
                                    <span className={`text-sm font-black uppercase ${s.accent ? "text-red-600" : card.textColor}`}>
                                        {s.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* right: image */}
                <div className="w-[300px] flex-shrink-0">
                    <FramedImage
                        src={card.imageSrc}
                        label={card.imageLabel}
                        caption={card.imageCaption}
                        stacked
                    />
                </div>
            </div>
        </div>
    );
}

function ImageLeftCard({ card }: { card: CardData }) {
    const isDark = card.bg.includes("111") || card.bg.includes("C03");
    return (
        <div className={`card-section ${card.bg} relative overflow-hidden  min-h-screen w-full`}>
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-end pr-6 text-[20vw] font-black uppercase opacity-10 leading-none select-none"
            >
                {card.headline.split(" ")[0]}
            </span>

            <div className="relative z-10 flex items-center justify-between h-full px-16 gap-12">
                {/* left: image */}
                <div className="w-[300px] flex-shrink-0">
                    <FramedImage
                        src={card.imageSrc}
                        label={card.imageLabel}
                        caption={card.imageCaption}
                        dark={isDark}
                        stacked
                    />
                </div>

                {/* right: text */}
                <div className="flex-1 max-w-[55%]">
                    {card.eyebrow && (
                        <p className={`text-[11px] tracking-[0.25em] uppercase mb-4 ${card.mutedColor}`}>
                            {card.eyebrow}
                        </p>
                    )}
                    <h2
                        className={`font-black uppercase leading-none mb-6 ${card.textColor}`}
                        style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
                    >
                        {card.headline}
                    </h2>
                    <p className={`text-lg leading-relaxed mb-8 ${card.textColor} max-w-lg whitespace-pre-line`}>
                        {card.body}
                    </p>
                    {card.stats && card.stats.length > 0 && (
                        <div className={`border-l-2 pl-4 ${isDark ? "border-white/30" : "border-black/30"}`}>
                            {card.stats.map((s) => (
                                <div key={s.label} className="mb-2">
                                    <span className={`text-[9px] tracking-widest uppercase block ${card.mutedColor}`}>
                                        {s.label}
                                    </span>
                                    <span className={`text-sm font-black uppercase ${s.accent ? "text-red-500" : card.textColor}`}>
                                        {s.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                    {card.imageCaption && (
                        <p className={`mt-6 text-[11px] tracking-widest font-bold uppercase ${card.mutedColor}`}>
                            {card.imageCaption}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

function CenteredCard({ card }: { card: CardData }) {
    return (
        <div className={`card-section ${card.bg} relative overflow-hidden min-h-screen w-full`}>
            {/* stripe texture overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(0,0,0,0.15) 18px, rgba(0,0,0,0.15) 20px)",
                }}
            />
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-start pl-8 text-[18vw] font-black uppercase opacity-10 leading-none select-none"
            >
                {card.headline}
            </span>

            <div className="relative z-10 flex flex-col items-center justify-between h-full py-16 px-16 text-center">
                {/* top */}
                <div className="w-full">
                    <span className={`inline-block border px-4 py-1.5 text-[10px] tracking-widest uppercase mb-6 ${card.textColor} border-black/40`}>
                        {card.eyebrow}
                    </span>
                    <h2
                        className={`font-black uppercase leading-none ${card.textColor}`}
                        style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
                    >
                        {card.headline}
                    </h2>
                </div>

                {/* middle: image */}
                <div className="w-full max-w-[420px] my-4">
                    <FramedImage src={card.imageSrc} label={card.imageLabel} />
                </div>

                {/* bottom */}
                <div className="w-full max-w-[660px]">
                    <p className={`text-xl leading-relaxed mb-6 ${card.textColor}`}>{card.body}</p>
                    <div className={`border-t pt-5 flex justify-center gap-12 ${card.textColor}`} style={{ borderColor: "rgba(0,0,0,0.3)" }}>
                        {card.stats?.map((s) => (
                            <div key={s.label}>
                                <span className={`text-[9px] tracking-widest uppercase block ${card.mutedColor}`}>
                                    {s.label}
                                </span>
                                <span className={`text-sm font-black uppercase ${s.accent ? "text-red-700" : card.textColor}`}>
                                    {s.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function CharacterCards() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            {/* This outer wrapper is what GSAP ScrollTrigger will pin */}
            <div ref={containerRef} id="pin-container" className="relative ">
                {cards.map((card) => {
                    if (card.layout === "image-right") return <ImageRightCard key={card.id} card={card} />;
                    if (card.layout === "image-left") return <ImageLeftCard key={card.id} card={card} />;
                    return <CenteredCard key={card.id} card={card} />;
                })}
            </div>
        </>
    );
}