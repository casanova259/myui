export default function AltitudeSection() {
  return (
    <section className="relative z-[1] mt-[450svh] flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#f0f0f0] py-16 text-black select-none lg:h-[100svh] lg:py-0">
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      {/* Top ruler */}
      <div className="absolute top-8 left-1/2 hidden -translate-x-1/2 items-end gap-6 font-mono text-[0.65rem] font-bold tracking-widest opacity-60 lg:flex">
        <span className="opacity-40">080</span>
        <span className="opacity-40">085</span>
        <div className="flex flex-col items-center gap-1">
          <div className="h-2 w-[2px] bg-black" />
          <span className="text-black">090</span>
        </div>
        <span className="opacity-40">095</span>
        <span className="opacity-40">100</span>
      </div>

      {/* Left vertical rail */}
      <div className="absolute top-1/2 left-8 hidden -translate-y-1/2 flex-col gap-8 font-mono text-[0.65rem] font-bold opacity-40 lg:flex">
        <span>450</span>
        <span>400</span>
        <div className="relative flex items-center text-black opacity-100">
          <div className="absolute top-1/2 -right-4 h-[1px] w-3 -translate-y-1/2 bg-black" />
          <span className="text-lg tracking-tighter">350</span>
        </div>
        <span>300</span>
        <span>250</span>
      </div>

      {/* Right vertical rail */}
      <div className="absolute top-1/2 right-8 hidden -translate-y-1/2 flex-col items-end gap-6 font-mono text-[0.65rem] font-bold opacity-70 lg:flex">
        <div className="flex items-center gap-2">
          <span className="opacity-40">26,000</span>
          <div className="h-[1px] w-3 bg-black/40" />
        </div>
        <div className="flex items-center gap-2">
          <span className="opacity-40">25,500</span>
          <div className="h-[1px] w-3 bg-black/40" />
        </div>
        <div className="relative my-2 flex items-center text-black opacity-100">
          <div className="absolute top-1/2 -left-5 flex -translate-y-1/2 items-center">
            <div className="h-[1px] w-3 bg-black" />
            <div className="h-2 w-[1px] bg-black" />
          </div>
          <div className="border border-black bg-[#f0f0f0] px-2 py-1 text-lg tracking-tighter shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            25,000
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="opacity-40">24,500</span>
          <div className="h-[1px] w-3 bg-black/40" />
        </div>
        <div className="flex items-center gap-2">
          <span className="opacity-40">24,000</span>
          <div className="h-[1px] w-3 bg-black/40" />
        </div>
      </div>

     

      {/* Vertical rotated label */}
      <div className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 rotate-180 items-center gap-2 [writing-mode:vertical-lr] lg:flex">
        <div className="h-16 w-[1px] bg-black/30" />
        <span className="font-mono text-[0.55rem] tracking-[0.4em] text-black/40 uppercase">
          AERODYNAMIC INTEGRATION STAGE 01
        </span>
      </div>

      {/* Main content grid */}
      <div className="relative z-10 flex w-full max-w-[1200px] flex-col justify-center gap-16 px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:px-16">
        {/* Left column */}
        <div className="flex max-w-[400px] flex-col">
          <div className="relative block h-48 w-full border border-black/10 bg-black/5 p-1 sm:h-56 lg:mb-12">
            <div className="absolute -top-3 -left-3 size-5 border-t-[3px] border-l-[3px] border-black" />
            <div className="absolute -top-3 -right-3 size-5 border-t-[3px] border-r-[3px] border-black" />
            <div className="absolute -bottom-3 -left-3 size-5 border-b-[3px] border-l-[3px] border-black" />
            <div className="absolute -right-3 -bottom-3 size-5 border-r-[3px] border-b-[3px] border-black" />
            <img
              src="/uniq/img5.jpg"
              alt="Cockpit Interior"
              className="h-full w-full object-cover opacity-100 mix-blend-multiply grayscale"
            />
            <span className="absolute -bottom-7 left-0 font-mono text-[0.55rem] tracking-widest text-black/80">
              / FIG. 02
            </span>
          </div>

          <div className="mt-16 mb-7 flex items-center gap-4 lg:mt-10">
            <div className="size-2 animate-pulse bg-black" />
            <span className="font-mono text-[0.65rem] font-bold tracking-[0.3em] uppercase">
              Lock Engaged
            </span>
          </div>

          <p className="font-mono text-sm leading-relaxed tracking-wide text-black/80 uppercase mix-blend-multiply">
            The pride of a fighter pilot isn&apos;t measured in participation
            trophies. It is measured in the wreckage of second place.
            <br />
            <br />
            We don&apos;t share the airspace. We dominate it. Zero drag. Pure
            kinetic execution.
          </p>
        </div>

        {/* Right column */}
        <div className="relative flex w-full max-w-[450px] flex-col items-start">
          <h2 className="text-[clamp(4rem,8vw,8rem)] leading-[0.8] font-bold tracking-tighter text-black uppercase">
            Own
          </h2>
          <h2 className="text-[clamp(4rem,8vw,8rem)] leading-[0.8] font-bold tracking-tighter text-black uppercase">
            The Sky
          </h2>
          <span className="mt-4 font-mono text-[0.55rem] font-bold tracking-[0.5em] text-black/60 uppercase">
            Design Engineering Div.
          </span>

          <div className="relative mt-8 block h-48 w-full border border-black/10 bg-black/5 p-1 sm:h-56 lg:ml-4">
            <div className="absolute top-0 left-0 size-3 border-t-2 border-l-2 border-black" />
            <div className="absolute top-0 right-0 size-3 border-t-2 border-r-2 border-black" />
            <div className="absolute bottom-0 left-0 size-3 border-b-2 border-l-2 border-black" />
            <div className="absolute right-0 bottom-0 size-3 border-r-2 border-b-2 border-black" />
            <img
              src="/uniq/img4.jpg"
              alt="Tactical Asset"
              className="h-full w-full object-cover opacity-90 mix-blend-multiply grayscale"
            />
            <span className="absolute -bottom-6 left-0 font-mono text-[0.55rem] tracking-widest text-black/80">
              / FIG. 01
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}