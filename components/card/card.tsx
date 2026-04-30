"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { AnimatePresence, motion } from "motion/react"
import { TbHours24 } from "react-icons/tb";

export const Card = () => {
    const [open, setOpen] = useState(true);

    return (
        <>
            <AnimatePresence>
                {open &&
                    <motion.div

                        initial={{
                            opacity: 0,
                            scale: 0.9
                        }}
                        animate={
                            {
                                opacity:1,
                                scale:1,
                                filter:'blur(0px)'
                            }
                        }

                        exit={{
                            opacity: 0,
                            scale: 0.98,
                            filter: "blur(10px)"
                        }}

                        transition={{
                            duration: 0.5,
                            ease: "easeInOut"
                        }}


                className={cn("w-72 min-h-[28rem] h-[28rem] rounded-xl ",
                            "shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] ",
                            "p-4 flex flex-col"
                        )}>
                        <h2 className="font-bold text-[10px] text-black">
                            Ui components
                        </h2>
                        <p className="text-neutral-600 mt-2 text-[10px]">
                            A collection of beautiful UI components ,let's get on with it .
                        </p>

                        <div className="flex items-center justify-center">
                            <button onClick={() => setOpen(false)} className="flex items-center gap-1 text-neutral-600 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] rounded-md px-2 py-1">
                                <Image width={50} height={50} alt="logo" src="/logo.png" className="h-4 w-4" />{" "}
                                Makentrity
                                <IoIosClose className="h-3 w-3 text-neutral-400" />
                            </button>
                        </div>


                        {/* MOtion divs srtarts here */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                                filter: "blur(10px)"
                            }}
                            whileHover={{
                                opacity: 1,
                                scale: 1.05,
                                filter: "blur(0px)"
                            }}

                            transition={{
                                duration: 0.3,
                                ease: "easeInOut"
                            }}

                            className="bg-gray-300 flex-1 mt-4 rounded-lg border border-neutral-200 border-dashed border-neutral-200 relative">
                            <div className="absolute inset-0 h-full w-full bg-white rounded-lg divide-y divide-neutral-200">
                                <div className="p-4 flex gap-2">
                                    <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                        <MdMessage className="h-4 w-4 text-neutral-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[8px] font-bold text-neutral-600">
                                            Makentrity
                                        </p>
                                        <p className="text-neutral-400 text-[8px] mt-1">
                                            A collection of Ui Components
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 flex gap-2">
                                    <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                        <TbHours24  className="h-4 w-4 text-neutral-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[8px] font-bold text-neutral-600">
                                            24 Hour Roll
                                        </p>
                                        <p className="text-neutral-400 text-[8px] mt-1">
                                            Providing beautiful components for the whole day
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 flex gap-2">
                                    <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                        <MdMessage className="h-4 w-4 text-neutral-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[8px] font-bold text-neutral-600">
                                            Makentrity
                                        </p>
                                        <p className="text-neutral-400 text-[8px] mt-1">
                                            A collection of Ui Components
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 flex gap-2">
                                    <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                        <MdMessage className="h-4 w-4 text-neutral-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[8px] font-bold text-neutral-600">
                                            Makentrity
                                        </p>
                                        <p className="text-neutral-400 text-[8px] mt-1">
                                            A collection of Ui Components
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 flex gap-2">
                                    <div className="h-7 w-7 flex-shrink-0 bg-gradient-to-br shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                        <MdMessage className="h-4 w-4 text-neutral-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[8px] font-bold text-neutral-600">
                                            Makentrity
                                        </p>
                                        <p className="text-neutral-400 text-[8px] mt-1">
                                            A collection of Ui Components
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        {/* {Motion divs ends here} */}
                    </motion.div>}
            </AnimatePresence>
        </>);
};