import Preloader from "./_components/Preloader";
import Image from "next/image";

export default function CasePage() {
  return (
    <main className="relative min-h-screen w-full">
      {/* The preloader handles the initial loading sequence */}
      <Preloader />

      {/* Main Content Wrapper */}
      <div className="pt-32 px-6 sm:px-12 w-full max-w-[1800px] mx-auto">
        
        {/* Header/Title Section */}
        <header className="mb-12">
          <h1 className="text-5xl sm:text-7xl font-medium tracking-tight uppercase">
            Project Title
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl">
            A minimalist approach to high-fashion editorial presentation.
          </p>
        </header>

        {/* The Hero Image (Target for the Preloader Flip) */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image 
            id="hero-image-target"
            src="/uniq/img7.jpg"
            alt="Hero showcase"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Space for the grid/slider we will build next */}
        <section className="mt-32 pb-32">
          <h2 className="text-3xl mb-8">Selected Works</h2>
          {/* Grid container goes here */}
        </section>

      </div>
    </main>
  );
}