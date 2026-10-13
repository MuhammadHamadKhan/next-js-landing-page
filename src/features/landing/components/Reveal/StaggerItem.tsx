"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_OUT, REVEAL_DURATION } from "./motion";
import { useScrollDirection } from "./ScrollDirectionProvider";
import { useStaticMotion } from "./useStaticMotion";

interface StaggerItemProps {
    children: ReactNode;
    className?: string;
    /** Delay in seconds before this item starts — pass index * 0.12 to cascade siblings */
    delay?: number;
    /** Lift on hover, in px. Set to 0 to disable. */
    lift?: number;
    /** How far away it starts, in px */
    distance?: number;
}

/**
 * Scroll-revealing item that plays every time it enters the viewport,
 * following the direction of the scroll:
 *
 * - scrolling down: enters from the left
 * - scrolling up: enters from the right
 *
 * Siblings are cascaded by passing an increasing `delay`, which produces the
 * left-to-right (or right-to-left) sweep across a row.
 *
 * The hover lift stays quick and separate, so pointing at a card feels
 * instant while the reveal keeps its unhurried pace.
 */
export const StaggerItem = ({
    children,
    className,
    delay = 0,
    lift = 0,
    distance = 44,
}: StaggerItemProps) => {
    const reduceMotion = useStaticMotion();
    const direction = useScrollDirection();

    if (reduceMotion) {
        return <div className={className}>{children}</div>;
    }

    const fromX = direction > 0 ? -distance : distance;

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, x: fromX, scale: 0.97 }}
            whileInView={{ opacity: [0, 1], x: [fromX, 0], scale: [0.97, 1] }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: REVEAL_DURATION, delay, ease: EASE_OUT }}
            whileHover={
                lift
                    ? { y: -lift, transition: { duration: 0.32, ease: EASE_OUT } }
                    : undefined
            }
        >
            {children}
        </motion.div>
    );
};
