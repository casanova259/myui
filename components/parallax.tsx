"use client";

import React from "react";
import { Card } from "./card/card";
import { MotionHooksExample } from "./paralax/motion-hooks-example";
import { div } from "motion/react-client";

export const Parallax = () => {
    return (
        <div>
            <MotionHooksExample />
        </div>
    );
};