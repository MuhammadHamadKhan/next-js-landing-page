"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "../Reveal/motion";
import { useScrollDirection } from "../Reveal/ScrollDirectionProvider";
import { useStaticMotion } from "../Reveal/useStaticMotion";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
    id?: string;
    children: ReactNode;
}

/* The two short lines beside the heading are decorative only */
const Line = ({ delay }: { delay: number }) => {
    const staticMotion = useStaticMotion();

    if (staticMotion) {
        return <span className={styles.line} aria-hidden="true" />;
    }

    return (
        <motion.span
            className={styles.line}
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: [0, 1] }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.75, delay, ease: EASE_OUT }}
        />
    );
};

export const SectionHeading = ({ id, children }: SectionHeadingProps) => {
    const staticMotion = useStaticMotion();
    const direction = useScrollDirection();

    // Scrolling down: the heading drops in from above. Scrolling up: it rises from below.
    const fromY = direction > 0 ? -22 : 22;

    return (
        <div className={styles.row}>
            <Line delay={0.15} />
            {staticMotion ? (
                <h2 id={id} className={styles.heading}>
                    {children}
                </h2>
            ) : (
                <motion.h2
                    id={id}
                    className={styles.heading}
                    initial={{ opacity: 0, y: fromY }}
                    whileInView={{ opacity: [0, 1], y: [fromY, 0] }}
                    viewport={{ once: false, margin: "-40px" }}
                    transition={{ duration: 0.85, delay: 0.25, ease: EASE_OUT }}
                >
                    {children}
                </motion.h2>
            )}
            <Line delay={0.4} />
        </div>
    );
};
