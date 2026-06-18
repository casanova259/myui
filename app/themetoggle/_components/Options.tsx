"use client";

import { motion } from "framer-motion";
import { GripHorizontal } from "lucide-react";

import { AnimationStart, AnimationVariant } from "./types";
import { cn } from "@/lib/utils";

const VARIANT_OPTIONS: AnimationVariant[] = [
    "circle",
    "rectangle",
    "polygon",
    "gif",
];

const START_OPTIONS: AnimationStart[] = [
    "center",
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "top-center",
    "bottom-center",
];

const RECTANGLE_START_OPTIONS: AnimationStart[] = [
    "bottom-up",
    "top-down",
    "left-right",
    "right-left",
];

export const Options = ({
    variant,
    start,
    blur,
    setVariant,
    setStart,
    setBlur,
}: {
    variant: AnimationVariant;
    start: AnimationStart;
    blur: boolean;
    setVariant: (variant: AnimationVariant) => void;
    setStart: (start: AnimationStart) => void;
    setBlur: (blur: boolean) => void;
}) => {
    return (
        <motion.div
            drag
            dragMomentum={true}
            className="border-foreground/10 bg-muted2 fixed right-4 top-24 flex w-[245px] flex-col gap-3 rounded-3xl border p-3 backdrop-blur-sm"
        >
            <div className="flex items-center justify-between">
                <span className="size-4 cursor-grab active:cursor-grabbing">
                    <GripHorizontal className="size-4 opacity-50" />
                </span>
                <p className="text-sm opacity-50">Options</p>
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <p className="text-sm opacity-50">variant :</p>
                    <div className="flex flex-wrap gap-1">
                        {VARIANT_OPTIONS.map((option) => (
                            <button
                                key={option}
                                onClick={() => setVariant(option)}
                                className={cn(
                                    "cursor-pointer rounded px-1 text-sm transition-opacity",
                                    variant === option
                                        ? "opacity-100"
                                        : "hover:bg-foreground/10 opacity-50 hover:opacity-100"
                                )}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {variant !== "gif" && (
                    <div className="flex flex-col gap-1">
                        <p className="text-sm opacity-50">start :</p>
                        <div className="flex flex-wrap gap-1">
                            {(variant === "rectangle"
                                ? RECTANGLE_START_OPTIONS
                                : START_OPTIONS
                            ).map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setStart(option)}
                                    className={cn(
                                        "cursor-pointer rounded px-1 text-sm transition-opacity",
                                        start === option
                                            ? "opacity-100"
                                            : "hover:bg-foreground/10 opacity-50 hover:opacity-100"
                                    )}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {variant !== "gif" && (
                    <div className="flex justify-between">
                        <p className="text-sm opacity-50">blur :</p>
                        <div className="flex gap-1">
                            <button
                                onClick={() => setBlur(false)}
                                className={cn(
                                    "cursor-pointer px-1 text-sm transition-opacity",
                                    !blur ? "opacity-100" : "hover:bg-foreground/10 opacity-50 hover:opacity-100"
                                )}
                            >
                                off
                            </button>
                            <button
                                onClick={() => setBlur(true)}
                                className={cn(
                                    "cursor-pointer px-1 text-sm transition-opacity",
                                    blur ? "opacity-100" : "hover:bg-foreground/10 opacity-50 hover:opacity-100"
                                )}
                            >
                                on
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};