"use client";

import { useEffect, useRef, useState } from "react";

interface EnterState {
    inView: boolean;
    direction: number;
}

/*
  inView turns true when the element starts to appear,
  and turns false only when it has fully left the screen.
  The scroll direction is saved at the moment it appears.
*/
export const useEnterView = <T extends Element>(direction: number) => {
    const ref = useRef<T>(null);
    const directionRef = useRef<number>(direction);
    const [state, setState] = useState<EnterState>({ inView: false, direction });

    useEffect(() => {
        directionRef.current = direction;
    }, [direction]);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setState((prev) => {
                    if (entry.isIntersecting) {
                        return prev.inView
                            ? prev
                            : { inView: true, direction: directionRef.current };
                    }
                    return prev.inView ? { ...prev, inView: false } : prev;
                });
            },
            { threshold: 0 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return [ref, state.inView, state.direction] as const;
};