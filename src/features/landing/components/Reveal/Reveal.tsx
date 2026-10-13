"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { EASE_OUT } from "./motion";
import { useScrollDirection } from "./ScrollDirectionProvider";
import { useEnterView } from "./UseEnterView";
import { useStaticMotion } from "./useStaticMotion";

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    distance?: number;
}

interface RevealCustom {
    direction: number;
    delay: number;
    distance: number;
}

/* Scrolling down: content rises from below. Scrolling up: it drops from above. */
const startOffset = ({ direction, distance }: RevealCustom) =>
    direction > 0 ? distance : -distance;

const variants: Variants = {
    hidden: (custom: RevealCustom) => ({
        opacity: 0,
        y: startOffset(custom),
        transition: { duration: 0 },
    }),
    show: (custom: RevealCustom) => ({
        opacity: [0, 1],
        y: [startOffset(custom), 0],
        transition: { duration: 0.7, delay: custom.delay, ease: EASE_OUT },
    }),
};

export const Reveal = ({ children, className, delay = 0, distance = 24 }: RevealProps) => {
    const staticMotion = useStaticMotion();
    const scrollDirection = useScrollDirection();
    const [ref, inView, enterDirection] = useEnterView<HTMLDivElement>(scrollDirection);

    if (staticMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={variants}
            custom={{ direction: enterDirection, delay, distance }}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
        >
            {children}
        </motion.div>
    );
};