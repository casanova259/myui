"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const projectsData = [
    {
        id: "showreel",
        title: "Showreel",
        img: "/uniq/img7.jpg",
        isLink: false,
    },
    {
        id: "merrell",
        title: "Merrell",
        href: "/works/merrell/",
        img: "https://images.prismic.io/joffrey2025/aW97NgIvOtkhBvHJ_gallery-6.webp?auto=format,compress",
        isLink: true,
    },
    {
        id: "aerleum",
        title: "Aerleum",
        href: "/works/aerleum/",
        img: "https://images.prismic.io/joffrey2025/aFL7CbNJEFaPYFFZ_main.png?auto=format,compress",
        isLink: true,
    },
    {
        id: "ambrosia",
        title: "Ambrosia",
        href: "/works/ambrosia/",
        img: "https://images.prismic.io/joffrey2025/aXKRygIvOtkhB1cX_Maskgroup.png?auto=format,compress",
        isLink: true,
    },
    {
        id: "helene-blanck",
        title: "H. Blanck",
        href: "/works/helene-blanck/",
        img: "https://images.prismic.io/joffrey2025/aQzYL7pReVYa4JAc_image6-1-.png?auto=format,compress",
        isLink: true,
    }
];

export default function ProjectsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        itemsRef.current.forEach((item, index) => {
            if (!item) return;

            const imageWrapper = item.querySelector(".projects__item__image") as HTMLElement;
            const titleTarget = document.querySelector(`.projects__title--desktop[data-project-uid="${projectsData[index].id}"]`);

            if (imageWrapper) {
                gsap.set(imageWrapper, { scale: 1, transformOrigin: "0% 0%" });
                // Prepare the item for height animation as seen in the original HTML
                gsap.set(item, { willChange: "height" }); 
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: "top center+=20%",
                    end: "bottom center-=20%",
                    scrub: true,
                    onEnter: () => gsap.to(titleTarget, { opacity: 1, duration: 0.3 }),
                    onLeave: () => gsap.to(titleTarget, { opacity: 0.2, duration: 0.3 }),
                    onEnterBack: () => gsap.to(titleTarget, { opacity: 1, duration: 0.3 }),
                    onLeaveBack: () => gsap.to(titleTarget, { opacity: 0.2, duration: 0.3 }),
                },
            });

            if (imageWrapper) {
                // Calculate how much extra height the scaled image needs
                // We use a function so it recalculates correctly if the user resizes the window
                const getExpandedHeight = () => {
                    const originalItemHeight = item.offsetHeight;
                    const imageOriginalHeight = imageWrapper.offsetHeight;
                    // If scale is 2.0513, it grows by 1.0513x its original height
                    const extraHeight = imageOriginalHeight * 1.0513; 
                    return originalItemHeight + extraHeight;
                };

                // Animate SCALE and HEIGHT perfectly together using the "expand" label
                tl.to(imageWrapper, {
                    scale: 2.0513,
                    duration: 1,
                    ease: "none",
                    force3D: true,
                }, "expand")
                .to(item, {
                    height: getExpandedHeight,
                    duration: 1,
                    ease: "none",
                }, "expand")
                
                // Shrink back to normal using the "shrink" label
                .to(imageWrapper, {
                    scale: 1,
                    duration: 1,
                    ease: "none",
                    force3D: true,
                }, "shrink")
                .to(item, {
                    // Clear the hardcoded height so it goes back to its natural auto layout
                    height: "auto", 
                    duration: 1,
                    ease: "none",
                }, "shrink");
            }
        });
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full pt-[20vh] pb-[25vh] px-6 sm:px-12"
        >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 relative h-full">

                {/* LEFT COLUMN: Massive Sticky 'Cases' Title */}
                <div className="hidden sm:block sm:col-span-3 relative h-full">
                    <div className="fixed bottom-8 w-full h-fit">
                        <h2 className="text-[7vw] leading-none tracking-tight font-medium text-[#111] m-0">
                            Cases
                        </h2>
                    </div>
                </div>

                {/* CENTER COLUMN: The Vertical Slider */}
                {/* ONLY THIS LINE WAS CHANGED to add space-y-32 and sm:space-y-[25vh] */}
                <div className="projects__wrapper left-0 relative space-y-20 sm:space-y-[8vh] sm:col-start-5 sm:col-span-6 col-span-full">

                    {projectsData.map((project, i) => (
                        <div
                            key={project.id}
                            ref={(el) => { itemsRef.current[i] = el; }}
                            className="projects__item space-y-8 relative z-20"
                        >
                            {project.isVideo ? (
                                // Showreel Tile Layout
                                <div className="relative aspect-[16/9] w-full">
                                    <div className="projects__showreel aspect-[16/9] object-cover">
                                        <div className="projects__item__thumb projects__item__image relative w-full sm:w-[17.55vw] aspect-[16/9] will-change-transform bg-[#e0e0e0] overflow-hidden">
                                            <Image className="object-cover absolute size-full top-0 left-0" src={project.img} alt="Showreel" fill priority sizes="(max-width: 640px) 100vw, 17.55vw" />
                                            <video className="preloader-video relative size-full z-10 object-cover" src={project.videoSrc} autoPlay muted loop playsInline poster={project.img}></video>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Image Tile Layout
                               <Link className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-black/60" href={project.href || "#"} aria-label={`See ${project.title}`}>
                                    <div className="projects__item__thumb projects__item__image aspect-[520/370] w-full sm:w-[17.55vw] will-change-transform bg-[#e0e0e0] overflow-hidden relative">
                                        <Image
                                            src={project.img}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, 17.55vw"
                                        />
                                    </div>
                                </Link>
                            )}

                            {/* Mobile Title (hidden on sm breakpoint) */}
                            <p className="projects__title text-xl font-medium sm:hidden block">
                                <span className="inline-flex sm:hidden items-center gap-2">
                                    {project.title}
                                </span>
                            </p>
                        </div>
                    ))}

                </div>
                {/* RIGHT COLUMN: Sticky Titles */}
                <div className="hidden sm:flex sm:col-span-3 sm:col-start-10 relative h-full">
                    <div className="fixed bottom-8 right-8  w-full h-fit flex flex-col items-end space-y-1">
                        {projectsData.map((project, i) => (
                            <div key={`${project.id}-title`} className="block">
                                <h2
                                    className="projects__title projects__title--desktop text-lg sm:text-xl font-medium opacity-20 hover:!opacity-50 w-max overflow-hidden transition-opacity cursor-pointer text-[#111]"
                                    data-project-uid={project.id}
                                    style={{ opacity: i === 0 ? 1 : 0.2 }} // Initially highlight the first one
                                >
                                    {project.title}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}