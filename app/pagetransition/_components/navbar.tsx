"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/pagetransition", label: "Home" },
    { href: "/pagetransition/about", label: "About" },
    { href: "/pagetransition/contact", label: "Contact" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6">
            <span className="text-white/20 text-xl tracking-widest select-none">MAK</span>
            <ul className="flex items-center gap-10">
                {links.map(({ href, label }) => {
                    const isActive = pathname === href;
                    return (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`text-xs tracking-[0.25em] uppercase font-light transition-colors duration-300 ${isActive ? "text-white" : "text-white/30 hover:text-white/60"
                                    }`}
                            >
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}