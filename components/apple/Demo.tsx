"use client";




import { AnimatePresence, motion } from "motion/react"
import { useState } from "react";

export const Demo = () => {
    const items = [
        {
            title: "Innovation",
            description: "Beautiful and durable, by design.",
            image: "/11.jpg",
            Modal_Image: "/111.jpg",
            Modal_Span_text: "Second to none.",
            Modal_Text: "iPhone is known for its iconic design and advanced materials — like iPhone 17 Pro, which has a heat-forged aluminium unibody and is built to deliver exceptional performance. And our thinnest iPhone ever, iPhone Air. Hardware and software are designed in tandem — like Dynamic Island, Camera Control and the Action button."
        },
        {
            title: "Cutting-Edge Cameras",
            description: "Picture your best photos and videos.",
            image: "/22.jpg",
            Modal_Image: "/222.jpg",
            Modal_Span_text: "Stunning made simple.",
            Modal_Text: "The advanced cameras in iPhone automatically capture phenomenal photos with great detail and colour. And with the Center Stage front camera, you get more flexible ways to frame your selfies and so much more. 7"
        },
        {
            title: "Chip and Battery Life",
            description: "Fast that lasts.",
            image: "/33.jpg",
            Modal_Image: "/333.jpg",
            Modal_Span_text: "Super-smart, super-speedy Apple silicon. ",
            Modal_Text: "The A19 and A19 Pro chips are incredibly efficient, delivering remarkable battery life. They unlock helpful Apple Intelligence tools, power advanced camera features, enable AAA gaming and speed up AI workflows with the new Neural Accelerators in the GPU."
        },
        {
            title: "iOS and Apple Intelligence",
            description: "New look. Even more magic.",
            image: "/44.jpg",
            Modal_Image: "/444.jpg",
            Modal_Span_text: "A whole new element of delight.",
            Modal_Text: " The new Liquid Glass design gives you a delightful, consistent experience across your apps and devices, so everything you do feels fluid. Eliminate distractions with screening tools in Phone, FaceTime and Messages. And personalise chats with new backgrounds."
        },
        {
            title: "Environment",
            description: "Designed with the earth in mind.",
            image: "/55.jpg",
            Modal_Image: "/555.jpg",
            Modal_Span_text: "More recycled content? Naturally.",
            Modal_Text: " We’re significantly expanding the use of key recycled metals in iPhone batteries, magnets and circuit boards. Case in point: Our latest models contain 95% recycled lithium in the battery.8"
        },
        {
            title: "Privacy",
            description: "Your data. Just where you want it.",
            image: "/66.jpg",
            Modal_Image: "/666.jpg",
            Modal_Span_text: "Groundbreaking privacy protections. ",
            Modal_Text: " Apple Intelligence is integrated into your iPhone through on-device processing. With Private Cloud Compute, it can draw on larger, Apple-designed server-based models, running on Apple silicon, to handle more complex requests while protecting your privacy."
        },
        {
            title: "Peace of Mind",
            description: "Helpful features. Just in case.",
            image: "/77.jpg",
            Modal_Image: "/777.jpg",
            Modal_Span_text: "For urgent help. ",
            Modal_Text: " Crash Detection can detect a severe car crash and call emergency services when you can’t. And with Emergency SOS, iPhone can automatically call for help and share your location with emergency services.9"
        },
    ];


    const startEndInset = "pl-[max(1rem,calc((100vw-72rem)/2+1rem))] " +
        "pr-[max(1rem,calc((100vw-72rem)/2+1rem))] " +
        "scroll-pl-[max(1rem,calc((100vw-72rem)/2+1rem))]";



    const CARD_TRANSITION = {
        type: 'spring' as const,
        stiffness: 300,
        damping: 25
    }
    const MODEL_TRANSITION = {
        type: 'spring' as const,
        stiffness: 300,
        damping: 25
    }

    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<typeof items[0] | null>(null);

    return (
        <section className="w-full overflow-hidden py-32">
            <AnimatePresence>
                {open &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={MODEL_TRANSITION}
                        className="fixed bg-black/50 inset-0 size-full z-50 backdrop-blur-xl overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ ...MODEL_TRANSITION, delay: 0.2 }}
                            className="relative w-[80vw] mt-12  bg-white mx-auto rounded-3xl   p-20  max-h-[200vh]">

                            <button onClick={() => { setOpen(false) }} className="size-12 z-20 flex items-center justify-center absolute top-4 right-4 rotate-45 bg-neutral-300 rounded-full cursor-pointer">
                                <Icon />
                            </button>


                            <div className="flex justify-start items-center ">
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-xl   mb-4 ml-1 text-black">{selectedItem.title}</h2>
                                    <h1 className="text-5xl  font-bold tracking-tight mb-4 ml-1 text-black">{selectedItem.description}</h1>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-center w-full h-auto mt-6 gap-10 bg-[#f5f5f7] rounded-3xl ">

                                <div className="mt-16 px-4 ">
                                    <p className="text-[#6E6E73] text-3xl max-w-4xl font-medium tracking-wide">
                                        <span className=" text-black font-bold">{selectedItem?.Modal_Span_text}</span>
                                        {selectedItem?.Modal_Text}
                                    </p>
                                </div>


                                <img src={selectedItem?.Modal_Image} alt={selectedItem?.description} />
                            </div>

                        </motion.div>
                    </motion.div>
                }
            </AnimatePresence>

            <div className="mx-auto max-w-6xl px-4 ">
                <h2 className="text-5xl font-semibold tracking-tight mb-4 ml-1 text-black">Get to know iPhone.</h2>
            </div>


            <div className={`flex gap-4 overflow-x-auto py-12 [scrollbar-width:none] snap-x snap-mandatory ${startEndInset} `}>
                {items.map((item, index) => (
                    <motion.button whileHover={{
                        scale: 1.02
                    }}
                        onClick={() => {
                            setOpen(true);
                            setSelectedItem(item)
                        }}
                        transition={CARD_TRANSITION}
                        key={item.title} className="rounded-3xl snap-start flex items-start justify-start text-left relative p-10 h-180 w-100 shrink-0 overflow-hidden cursor-pointer">


                        <div className="size-10 z-20 flex items-center justify-center absolute right-4 bottom-4 rounded-full bg-white">
                            <Icon />
                        </div>

                        <img src={item.image} alt={item.title} className="absolute inset-0 size-full object-cover" />
                        <div className="relative z-10 flex flex-col gap-3">
                            <h2 className="text-base font-medium text-white ">{item.title}</h2>
                            <p className="text-3xl font-bold text-white/75 text-balance">{item.description}</p>
                        </div>
                    </motion.button>
                ))}
            </div>
        </section>
    )
}


const Icon = () => {
    return <svg className="size-12 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
        <path d="m24 16.5h-4.5v-4.5c0-.8286-.6719-1.5-1.5-1.5s-1.5.6714-1.5 1.5v4.5h-4.5c-.8281 0-1.5.6714-1.5 1.5s.6719 1.5 1.5 1.5h4.5v4.5c0 .8286.6719 1.5 1.5 1.5s1.5-.6714 1.5-1.5v-4.5h4.5c.8281 0 1.5-.6714 1.5-1.5s-.6719-1.5-1.5-1.5z"></path>
    </svg>
}