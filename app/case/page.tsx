import Link from "next/link";
import Preloader from "./_components/Preloader";
import ProjectsSection from "./_components/verticalSlider";

export default function CasePage() {
  return (
    <main className="relative min-h-screen w-full bg-[#f4f4f5] text-[#111111] overflow-hidden">
      
      <Preloader />


      {/* The Core Content Layout */}
      <ProjectsSection />

    </main>
  );
}