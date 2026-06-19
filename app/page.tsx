"use client";

import { Structure } from "./_components/Structure";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });


export default function Page() {
  return <main className="min-h-screen flex items-center justify-center bg-black font-inter">
    <Structure />
  </main>;
}