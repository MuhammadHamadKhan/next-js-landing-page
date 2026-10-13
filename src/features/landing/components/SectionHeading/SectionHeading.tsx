"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { EASE_OUT } from "../Reveal/motion";
import { useScrollDirection } from "../Reveal/ScrollDirectionProvider";
import { useEnterView } from "../Reveal/UseEnterView";
import { useStaticMotion } from "../Reveal/useStaticMotion";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
    id?: string;
    children: ReactNode;
}

const DISTANCE = 22;

/* Scrolling down: the heading drops in from above. Scrolling up: it rises from below. */
const startOffset = (direction: number) => (direction > 0 ? -DISTANCE : DISTANCE);

const headingVariants: Variants = {
    hidden: (direction: number) => ({
        opacity: 0,
        y: startOffset(direction),
        transition: { duration: 0 },
    }),
    show: (direction: number) => ({
        opacity: [0, 1],
        y: [startOffset(direction), 0],
        transition: { duration: 0.85, delay: 0.25, ease: EASE_OUT },
    }),
};

const lineVariants: Variants = {
    hidden: { scaleX: 0, transition: { duration: 0 } },
    show: (delay: number) => ({
        scaleX: [0, 1],
        transition: { duration: 0.75, delay, ease: EASE_OUT },
    }),
};

/* The two short lines beside the heading are decorative only */
const Line = ({ delay }: { delay: number }) => {
    const staticMotion = useStaticMotion();
    const [ref, inView] = useEnterView<HTMLSpanElement>(0);

    if (staticMotion) {
        return <span className={styles.line} aria-hidden="true" />;
    }

    return (
        <motion.span
            ref={ref}
            className={styles.line}
            aria-hidden="true"
            variants={lineVariants}
            custom={delay}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
        />
    );
};

export const SectionHeading = ({ id, children }: SectionHeadingProps) => {
    const staticMotion = useStaticMotion();
    const scrollDirection = useScrollDirection();
    const [ref, inView, enterDirection] = useEnterView<HTMLHeadingElement>(scrollDirection);

    return (
        <div className={styles.row}>
            <Line delay={0.15} />
            {staticMotion ? (
                <h2 id={id} className={styles.heading}>
                    {children}
                </h2>
            ) : (
                <motion.h2
                    ref={ref}
                    id={id}
                    className={styles.heading}
                    variants={headingVariants}
                    custom={enterDirection}
                    initial="hidden"
                    animate={inView ? "show" : "hidden"}
                >
                    {children}
                </motion.h2>
            )}
            <Line delay={0.4} />
        </div>
    );
};