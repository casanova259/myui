"use client";

import { useTheme } from "next-themes";
import { useCallback, useState } from "react";

import {
    createCircleAnimation,
    createRectangleAnimation,
    createPolygonAnimation,
    createGifAnimation,
} from "./animations";
import { AnimationVariant, AnimationStart } from "./types";

const STYLE_ID = "theme-transition-styles";

export const useThemeToggle = ({
    variant = "circle",
    start = "center",
    blur = false,
    gifUrl = "",
}: {
    variant?: AnimationVariant;
    start?: AnimationStart;
    blur?: boolean;
    gifUrl?: string;
} = {}) => {
    const { theme, setTheme, resolvedTheme } = useTheme();

    // isDark is simply derived — no separate "mounted" state needed.
    // resolvedTheme is undefined on the server and on the very first client
    // render before next-themes' inline script + hydration settle, so we
    // treat "undefined" as "not dark yet" rather than tracking mount state ourselves.
    const isDark = resolvedTheme === "dark";

    const injectStyles = useCallback((css: string) => {
        let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
        if (!styleEl) {
            styleEl = document.createElement("style");
            styleEl.id = STYLE_ID;
            document.head.appendChild(styleEl);
        }
        styleEl.textContent = css;
    }, []);

    const toggleTheme = useCallback(() => {
        let animation;
        switch (variant) {
            case "rectangle":
                animation = createRectangleAnimation(start, blur);
                break;
            case "polygon":
                animation = createPolygonAnimation(start, blur);
                break;
            case "gif":
                animation = createGifAnimation(gifUrl);
                break;
            default:
                animation = createCircleAnimation(start, blur);
        }

        injectStyles(animation.css);

        const flipTheme = () => {
            setTheme(theme === "light" ? "dark" : "light");
        };

        if (!document.startViewTransition) {
            flipTheme();
            return;
        }

        document.startViewTransition(flipTheme);
    }, [theme, setTheme, variant, start, blur, gifUrl, injectStyles]);

    return { isDark, toggleTheme };
};