"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface EnterState {
    inView: boolean;
    direction: number;
}

/*
  The reveal plays as the element enters the viewport and then stays put.

  The negative bottom margin delays the trigger slightly, so a section that is
  only just peeking into view does not start fading before it is anywhere near
  readable, and the motion is mostly spent where the visitor is actually
  looking.
*/
const ROOT_MARGIN = "0px 0px -8% 0px";

/**
  Reports whether the element has entered the viewport, plus the scroll
  direction it was travelling in at that moment, so reveals can play
  "forwards" while scrolling down and "backwards" while scrolling up.
 *
  Two things here keep the content from ever getting stuck invisible:
 *
  1. The reveal latches. Once the element has been seen it stays revealed and
     is never hidden again. Previously a not-intersecting callback flipped
     `inView` back to false, and if that callback landed while the element was
     actually still on screen (fast scroll, layout shift from late-loading
     fonts/images, browser scroll restoration) the element stayed parked on
     the `hidden` variant — opacity 0 — until a reload.
  2. The node is tracked with a callback ref instead of being read once from
     `ref.current`. If React swaps the DOM node after mount the observer
     detaches from the old one and would never fire again; this way it always
     follows the live node.
 */
export const useEnterView = <T extends Element>(direction: number) => {
    const directionRef = useRef<number>(direction);
    const [element, setElement] = useState<T | null>(null);
    const [state, setState] = useState<EnterState>({ inView: false, direction });

    /* Keep the latest scroll direction without re-running the observer */
    useEffect(() => {
        directionRef.current = direction;
    }, [direction]);

    const ref = useCallback((node: T | null) => {
        setElement(node);
    }, []);

    useEffect(() => {
        if (!element) return;

        const reveal = () =>
            setState((prev) =>
                prev.inView ? prev : { inView: true, direction: directionRef.current }
            );

        /* No observer support: never hide content, show it right away */
        if (typeof IntersectionObserver === "undefined") {
            reveal();
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) reveal();
            },
            { rootMargin: ROOT_MARGIN, threshold: 0 }
        );

        observer.observe(element);

        /*
          Last line of defence. If the observer somehow never reports back, a
          one-off measurement of the element's own rect still reveals anything
          that is already on screen, so content can never be parked hidden.
        */
        const frames = requestAnimationFrame(() =>
            requestAnimationFrame(() => {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) reveal();
            })
        );

        return () => {
            cancelAnimationFrame(frames);
            observer.disconnect();
        };
    }, [element]);

    return [ref, state.inView, state.direction] as const;
};