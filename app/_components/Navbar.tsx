"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";

// All your component routes — edit this list whenever you add/remove a component.
const COMPONENTS = [
  "abstractcards",
  "accrodian",
  "animatedtext",
  "cards",
  "case",
  "domino",
  "dynamicisland",
  "encrypt",
  "f1",
  "fadescroll",
  "faqs",
  "features",
  "flip",
  "fliplinks",
  "kind",
  "mask",
  "navbar",
  "OrbitSlider",
  "oviparallax",
  "pagetransition",
  "parallax",
  "pinscroll",
  "raf",
  "record",
  "scramblenav",
  "scrolliods",
  "shift",
  "showcase",
  "slider",
  "smoothinput",
  "space",
  "split",
  "sqnc",
  "themetoggle",
  "tra",
  "UNIQ",
  "wallet",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  // close on outside click (useful if you switch the trigger to click-based)
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="relative w-full border-b border-zinc-800/80 bg-[#0a0a0b] text-zinc-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="font-mono text-sm tracking-tight text-zinc-100">
          ui<span className="text-zinc-500">.lib</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-8 text-sm text-zinc-400">
          <div
            ref={menuRef}
            className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <button
              className="flex items-center gap-1 text-zinc-200 transition-colors hover:text-white"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              Components
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </button>

            {/* Mega menu */}
            <div
              className={`fixed left-0 right-0 top-16 z-50 origin-top border-b border-zinc-800/80 bg-[#0a0a0b] transition-all duration-200 ${
                open
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
            >
              <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="mb-5 flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-widest text-zinc-500">
                    All components
                  </span>
                  <span className="font-mono text-xs text-zinc-600">
                    {COMPONENTS.length} total
                  </span>
                </div>

                <div className="columns-2 gap-3 sm:columns-3 md:columns-4 lg:columns-6">
                  {COMPONENTS.map((name) => (
                    <Link
                      key={name}
                      href={`/${name}`}
                      onClick={() => setOpen(false)}
                      className="group mb-3 flex break-inside-avoid items-center justify-between gap-2 rounded-md border border-zinc-800 bg-zinc-950/40 px-3 py-3 transition-all duration-150 hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-900"
                    >
                      <span className="font-mono text-[13px] leading-tight text-zinc-300 group-hover:text-white">
                        {name}
                      </span>
                      <ArrowUpRight
                        size={13}
                        className="shrink-0 text-zinc-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-hover:text-zinc-300"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link href="/docs" className="transition-colors hover:text-white">
            Docs
          </Link>
          <Link href="/showcase" className="transition-colors hover:text-white">
            Showcase
          </Link>
        </nav>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}