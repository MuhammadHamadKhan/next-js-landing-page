"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_OUT, REVEAL_DURATION } from "./motion";
import { useScrollDirection } from "./ScrollDirectionProvider";
import { useStaticMotion } from "./useStaticMotion";

interface RevealProps {
    children: ReactNode;
    /** Delay in seconds, for sequencing siblings */
    delay?: number;
    /** How far away it starts, in px */
    distance?: number;
    className?: string;
}

/**
 * Scroll-triggered reveal that plays every time the element enters the
 * viewport, following the direction of the scroll:
 *
 * - scrolling down: enters from the left
 * - scrolling up: enters from the right
 *
 * The travel distance is declared as keyframes on whileInView (not on
 * initial), so the reveal always starts from the current scroll direction,
 * even when the direction flipped while the element was off screen.
 */
export const Reveal = ({
    children,
    delay = 0,
    distance = 28,
    className,
}: RevealProps) => {
    const reduceMotion = useStaticMotion();
    const direction = useScrollDirection();

    if (reduceMotion) {
        return <div className={className}>{children}</div>;
    }

    const fromX = direction > 0 ? -distance : distance;

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, x: fromX }}
            whileInView={{ opacity: [0, 1], x: [fromX, 0] }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: REVEAL_DURATION, delay, ease: EASE_OUT }}
        >
            {children}
        </motion.div>
    );
};
