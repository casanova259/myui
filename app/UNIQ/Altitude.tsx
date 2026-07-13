import Image from "next/image";

/**
 * ABOUT
 * Static 2x2 diagonal grid: image / text / text / image
 * Matches the Figma layout — two image cells, two text cells,
 * arranged on the diagonal.
 *
 * Usage:
 * <ABOUT
 *   image1="/images/one.jpg"
 *   image2="/images/two.jpg"
 *   text1="Your text"
 *   text2="Your text"
 * />
 */
export default function ABOUT({
  image1 = "/images/placeholder-1.jpg",
  image2 = "/images/placeholder-2.jpg",
  text1 = "GO TO THE PEAK",
  text2 = "IT WAS ABOUT THE CLIMB",
}) {
  return (
    <div className="h-screen bg-white w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-8 pb-8 box-border">
      <div className="h-full grid grid-cols-1 sm:grid-cols-2 gap-10 content-center">
        {/* Top-left: image */}
        <div className="relative aspect-[4/3] p-2 sm:p-3 md:p-4">
          <div className="relative w-full h-full bg-neutral-200">
            <Image
              src={image1}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Top-right: text */}
        <div className="flex items-center justify-center p-2 sm:p-3 md:p-4 min-h-[120px] sm:min-h-0">
          <span className="text-3xl sm:text-4xl md:text-5xl tracking-wide text-black">
            {text1}
          </span>
        </div>

        {/* Bottom-left: text */}
        <div className="flex items-center justify-center p-2 sm:p-3 md:p-4 min-h-[120px] sm:min-h-0 order-3 sm:order-none">
          <span className="text-3xl sm:text-4xl md:text-5xl tracking-wide text-black text-center">
            {text2}
          </span>
        </div>

        {/* Bottom-right: image */}
        <div className="relative mb-12 aspect-[4/3] p-2 sm:p-3 md:p-4 order-4 sm:order-none">
          <div className="relative w-full h-full bg-neutral-200">
            <Image
              src={image2}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}