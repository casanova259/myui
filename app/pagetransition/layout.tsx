import { Inter } from "next/font/google";
import Navbar from "./_components/navbar";
import TransisitonProvider from "./providers/TransisitonProvider";

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500"],
    variable: "--font-inter",
});

export default function PageTransitionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${inter.variable} font-sans bg-black text-white min-h-screen antialiased`}>
            <Navbar />
            <TransisitonProvider>

                {children}
            </TransisitonProvider>
        </div>
    );
}