"use client";

import CharacterCards from "@/components/Pincards/PinCards";
// import { usePinScroll } from "@/hooks/usePinScroll";

// Total number of cards — keep in sync with the cards array in CharacterCards.tsx
const CARD_COUNT = 6;

export default function HomePage() {
    // Wire up the horizontal pin scroll
    // usePinScroll("pin-container", CARD_COUNT);

    return (
        <main>
            {/*
        The outer wrapper defines the total scroll height so the browser
        knows how much to let the user scroll before the pinned section ends.
        Height = CARD_COUNT * 100vh  (one full viewport per card)
      */}
            <div style={{ height: `${CARD_COUNT * 100}vh` }}>
                <CharacterCards />
            </div>
        </main>
    );
}