"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

import { createCircleAnimation } from "./animations";
import { AnimationStart } from "./types";

const STYLE_ID = "theme-transition-styles";

export const useThemeToggle = ({
    start = "center",
    blur = false,
}: {
    start?: AnimationStart;
    blur?: boolean;
} = {}) => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";

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
        const { css } = createCircleAnimation(start, blur);
        injectStyles(css);

        const flipTheme = () => {
            setTheme(theme === "light" ? "dark" : "light");
        };

        if (!document.startViewTransition) {
            flipTheme();
            return;
        }

        document.startViewTransition(flipTheme);
    }, [theme, setTheme, start, blur, injectStyles]);

    return { isDark, toggleTheme };
};
