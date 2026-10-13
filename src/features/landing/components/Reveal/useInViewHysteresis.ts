"use client";

import { useEffect, useRef, useState } from "react";

interface HysteresisOptions {
    /**
     * Fraction of the element that must be visible before the animation
     * triggers — so it never fires while the element is only peeking in.
     */
    enter?: number;
    /**
     * Fraction at which the element is considered gone and reset to hidden.
     * Kept very low on purpose: an element must be almost entirely off screen
     * before it is hidden, which stops it from fading away while still
     * visible, and stops it re-triggering during a continuous scroll.
     */
    exit?: number;
}

/**
 * IntersectionObserver with a trigger threshold and a much lower reset
 * threshold (hysteresis).
 *
 * A plain observer animates content every time it crosses the viewport edge,
 * which makes sections fade out and back in while you are still looking at
 * them. This only fires when the element is meaningfully in view, and only
 * resets once it has genuinely left.
 */
export const useInViewHysteresis = <T extends Element>({
    enter = 0.2,
    exit = 0.02,
}: HysteresisOptions = {}) => {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);
    const shown = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const ratio = entry.intersectionRatio;

                if (shown.current) {
                    if (ratio <= exit) {
                        shown.current = false;
                        setInView(false);
                    }
                } else if (ratio >= enter) {
                    shown.current = true;
                    setInView(true);
                }
            },
            { threshold: [0, exit, enter, 1] },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [enter, exit]);

    return [ref, inView] as const;
};
