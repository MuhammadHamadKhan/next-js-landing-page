"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { EASE_OUT } from "./motion";
import { useScrollDirection } from "./ScrollDirectionProvider";
import { useEnterView } from "./UseEnterView";
import { useStaticMotion } from "./useStaticMotion";

interface StaggerItemProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    /* How many pixels the card rises when hovered (handled in CSS) */
    lift?: number;
    /* How far the card travels when it first appears */
    distance?: number;
}

interface StaggerCustom {
    direction: number;
    delay: number;
    distance: number;
}

const startOffset = ({ direction, distance }: StaggerCustom) =>
    direction > 0 ? distance : -distance;

const variants: Variants = {
    hidden: (custom: StaggerCustom) => ({
        opacity: 0,
        y: startOffset(custom),
        transition: { duration: 0 },
    }),
    show: (custom: StaggerCustom) => ({
        opacity: [0, 1],
        y: [startOffset(custom), 0],
        transition: { duration: 0.7, delay: custom.delay, ease: EASE_OUT },
    }),
};

export const StaggerItem = ({
    children,
    className,
    delay = 0,
    lift = 6,
    distance = 28,
}: StaggerItemProps) => {
    const staticMotion = useStaticMotion();
    const scrollDirection = useScrollDirection();
    const [ref, inView, enterDirection] = useEnterView<HTMLDivElement>(scrollDirection);

    const style = { "--lift": `${lift}px` } as CSSProperties;

    if (staticMotion) {
        return (
            <div className={className} style={style}>
                {children}
            </div>
        );
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            style={style}
            variants={variants}
            custom={{ direction: enterDirection, delay, distance }}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
        >
            {children}
        </motion.div>
    );
};