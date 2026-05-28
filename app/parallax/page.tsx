"use client";

import React, { useRef, useEffect } from 'react';

const rowData = [
    {
        id: 1,
        items: [
            { title: "Redline", year: "2021", src: "/images1/img2.jpg" },
            { title: "Gallery Walk", year: "2019", src: "/images1/img3.jpg" },
            { title: "Side Profile", year: "2022", src: "/images1/img4.jpg" },
            { title: "Open Mic", year: "2023", src: "/images1/img5.jpg" },
            { title: "Fieldnotes", year: "2020", src: "/images1/img1.jpg" },
            { title: "Backboard", year: "2024", src: "/images1/img6.jpg" },
            { title: "Afterglow", year: "2021", src: "/images1/img7.jpg" },
            { title: "Hill House", year: "2020", src: "/images1/img8.jpg" },
            { title: "Low Tide", year: "2018", src: "/images1/img9.jpg" },
        ]
    },
    {
        id: 2,
        items: [
            { title: "Timepiece", year: "2019", src: "/images1/img10.jpg" },
            { title: "Close Focus", year: "2022", src: "/images1/img11.jpg" },
            { title: "Airframe", year: "2023", src: "/images1/img12.jpg" },
            { title: "Hardcase", year: "2024", src: "/images1/img13.jpg" },
            { title: "Deep Red", year: "2021", src: "/images1/img14.jpg" },
            { title: "Redline", year: "2021", src: "/images1/img2.jpg" },
            { title: "Gallery Walk", year: "2019", src: "/images1/img3.jpg" },
            { title: "Side Profile", year: "2022", src: "/images1/img4.jpg" },
            { title: "Open Mic", year: "2023", src: "/images1/img5.jpg" },
        ]
    },
    {
        id: 3,
        items: [
            { title: "Fieldnotes", year: "2020", src: "/images1/img1.jpg" },
            { title: "Backboard", year: "2024", src: "/images1/img6.jpg" },
            { title: "Afterglow", year: "2021", src: "/images1/img7.jpg" },
            { title: "Hill House", year: "2020", src: "/images1/img8.jpg" },
            { title: "Low Tide", year: "2018", src: "/images1/img9.jpg" },
            { title: "Timepiece", year: "2019", src: "/images1/img10.jpg" },
            { title: "Close Focus", year: "2022", src: "/images1/img11.jpg" },
            { title: "Airframe", year: "2023", src: "/images1/img12.jpg" },
            { title: "Hardcase", year: "2024", src: "/images1/img13.jpg" },
        ]
    },
    {
        id: 4,
        items: [
            { title: "Deep Red", year: "2021", src: "/images1/img14.jpg" },
            { title: "Redline", year: "2021", src: "/images1/img2.jpg" },
            { title: "Gallery Walk", year: "2019", src: "/images1/img3.jpg" },
            { title: "Side Profile", year: "2022", src: "/images1/img4.jpg" },
            { title: "Open Mic", year: "2023", src: "/images1/img5.jpg" },
            { title: "Fieldnotes", year: "2020", src: "/images1/img1.jpg" },
            { title: "Backboard", year: "2024", src: "/images1/img6.jpg" },
            { title: "Afterglow", year: "2021", src: "/images1/img7.jpg" },
            { title: "Hill House", year: "2020", src: "/images1/img8.jpg" },
        ]
    },
    {
        id: 5,
        items: [
            { title: "Low Tide", year: "2018", src: "/images1/img9.jpg" },
            { title: "Timepiece", year: "2019", src: "/images1/img10.jpg" },
            { title: "Close Focus", year: "2022", src: "/images1/img11.jpg" },
            { title: "Airframe", year: "2023", src: "/images1/img12.jpg" },
            { title: "Hardcase", year: "2024", src: "/images1/img13.jpg" },
            { title: "Deep Red", year: "2021", src: "/images1/img14.jpg" },
            { title: "Redline", year: "2021", src: "/images1/img2.jpg" },
            { title: "Gallery Walk", year: "2019", src: "/images1/img3.jpg" },
            { title: "Side Profile", year: "2022", src: "/images1/img4.jpg" },
        ]
    },
    {
        id: 6,
        items: [
            { title: "Open Mic", year: "2023", src: "/images1/img5.jpg" },
            { title: "Fieldnotes", year: "2020", src: "/images1/img1.jpg" },
            { title: "Backboard", year: "2024", src: "/images1/img6.jpg" },
            { title: "Afterglow", year: "2021", src: "/images1/img7.jpg" },
            { title: "Hill House", year: "2020", src: "/images1/img8.jpg" },
            { title: "Low Tide", year: "2018", src: "/images1/img9.jpg" },
            { title: "Timepiece", year: "2019", src: "/images1/img10.jpg" },
            { title: "Close Focus", year: "2022", src: "/images1/img11.jpg" },
            { title: "Airframe", year: "2023", src: "/images1/img12.jpg" },
        ]
    },
    {
        id: 7,
        items: [
            { title: "Hardcase", year: "2024", src: "/images1/img13.jpg" },
            { title: "Deep Red", year: "2021", src: "/images1/img14.jpg" },
            { title: "Redline", year: "2021", src: "/images1/img2.jpg" },
            { title: "Gallery Walk", year: "2019", src: "/images1/img3.jpg" },
            { title: "Side Profile", year: "2022", src: "/images1/img4.jpg" },
            { title: "Open Mic", year: "2023", src: "/images1/img5.jpg" },
            { title: "Fieldnotes", year: "2020", src: "/images1/img1.jpg" },
            { title: "Backboard", year: "2024", src: "/images1/img6.jpg" },
            { title: "Afterglow", year: "2021", src: "/images1/img7.jpg" },
        ]
    },
    {
        id: 8,
        items: [
            { title: "Hill House", year: "2020", src: "/images1/img8.jpg" },
            { title: "Low Tide", year: "2018", src: "/images1/img9.jpg" },
            { title: "Timepiece", year: "2019", src: "/images1/img10.jpg" },
            { title: "Close Focus", year: "2022", src: "/images1/img11.jpg" },
            { title: "Airframe", year: "2023", src: "/images1/img12.jpg" },
            { title: "Hardcase", year: "2024", src: "/images1/img13.jpg" },
            { title: "Deep Red", year: "2021", src: "/images1/img14.jpg" },
            { title: "Redline", year: "2021", src: "/images1/img2.jpg" },
            { title: "Gallery Walk", year: "2019", src: "/images1/img3.jpg" },
        ]
    },
    {
        id: 9,
        items: [
            { title: "Side Profile", year: "2022", src: "/images1/img4.jpg" },
            { title: "Open Mic", year: "2023", src: "/images1/img5.jpg" },
            { title: "Fieldnotes", year: "2020", src: "/images1/img1.jpg" },
            { title: "Backboard", year: "2024", src: "/images1/img6.jpg" },
            { title: "Afterglow", year: "2021", src: "/images1/img7.jpg" },
            { title: "Hill House", year: "2020", src: "/images1/img8.jpg" },
            { title: "Low Tide", year: "2018", src: "/images1/img9.jpg" },
            { title: "Timepiece", year: "2019", src: "/images1/img10.jpg" },
            { title: "Close Focus", year: "2022", src: "/images1/img11.jpg" },
        ]
    }
];

export default function ParallaxGallery() {
    const scrollTrackRef = useRef<HTMLElement>(null);
    const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

    const scrollState = useRef({
        target: 0,
        current: 0,
        ease: 0.08
    });

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollTrackRef.current) return;

            const rect = scrollTrackRef.current.getBoundingClientRect();
            const currentScroll = -rect.top;
            const scrollableDistance = rect.height - window.innerHeight;

            const progress = Math.min(Math.max(currentScroll / scrollableDistance, 0), 1);
            scrollState.current.target = progress;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        let animationFrameId: number;

        const updateGallery = () => {
            const state = scrollState.current;
            state.current += (state.target - state.current) * state.ease;

            const minWidth = 125;
            const maxWidth = 500;
            const totalRows = rowData.length;

            rowsRef.current.forEach((row, index) => {
                if (!row) return;

                // --- THE SEQUENTIAL MATH ---

                // 1. Calculate where this specific row's scroll journey begins and ends.
                // Example for 9 rows: 
                // Row 0 animates from progress 0.0 to 0.11
                // Row 1 animates from progress 0.11 to 0.22, etc.
                const rowStart = index / totalRows;
                const rowEnd = (index + 1) / totalRows;

                // 2. Map the global scroll progress strictly to this row's start/end window.
                let rowProgress = (state.current - rowStart) / (rowEnd - rowStart);

                // 3. Clamp the value so it doesn't go below 0 (125%) or above 1 (500%)
                rowProgress = Math.min(Math.max(rowProgress, 0), 1);

                // Calculate and apply
                const currentWidth = minWidth + (maxWidth - minWidth) * rowProgress;
                row.style.width = `${currentWidth}%`;
            });

            animationFrameId = requestAnimationFrame(updateGallery);
        };

        animationFrameId = requestAnimationFrame(updateGallery);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <main className="bg-black text-white select-none overflow-x-hidden">

            <section className="h-screen w-full flex items-center justify-center bg-black border-b border-zinc-900">
                <p className="text-zinc-400 font-medium uppercase tracking-tight text-sm">Intro Section</p>
            </section>

            {/* TRACK CONTAINER */}
            <section
                ref={scrollTrackRef}
                className="relative bg-black"
                style={{ height: '4128px' }}
            >
                {/* STICKY FRAME */}
                <div className="sticky top-0 left-0 h-screen w-full flex flex-col justify-center items-center gap-2 overflow-hidden py-4">

                    {rowData.map((row, rowIndex) => (
                        <div
                            key={row.id}
                            ref={(el) => { rowsRef.current[rowIndex] = el; }}
                            className="flex gap-4 will-change-[width]"
                            style={{ width: '125%' }}
                        >
                            {row.items.map((item, itemIndex) => (
                                <div key={`${row.id}-${itemIndex}`} className="flex min-w-0 flex-1 flex-col">
                                    <div className="min-h-0 flex-1 overflow-hidden group bg-zinc-900">
                                        <img
                                            alt={item.title}
                                            className="h-96 w-[1000px] max-w-none object-cover grayscale contrast-125 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.02]"
                                            src={item.src}
                                        />
                                    </div>
                                    <div className="flex justify-between py-1 border-t border-zinc-900 mt-1">
                                        <p className="text-[0.75rem] leading-none font-medium tracking-tight uppercase text-zinc-400">{item.title}</p>
                                        <p className="text-[0.75rem] leading-none font-medium tracking-tight uppercase text-zinc-600">{item.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                </div>
            </section>

            <section className="h-screen w-full flex items-center justify-center bg-black border-t border-zinc-900">
                <p className="text-zinc-400 font-medium uppercase tracking-tight text-sm">Outro Section</p>
            </section>

        </main>
    );
}