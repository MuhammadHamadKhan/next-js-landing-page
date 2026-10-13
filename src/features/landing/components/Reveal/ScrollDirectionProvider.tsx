"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";

/** 1 = scrolling down, -1 = scrolling up */
type Direction = 1 | -1;

const ScrollDirectionContext = createContext<Direction>(1);

/**
 * Shares the current scroll direction with every animated section, so
 * reveals can play "forwards" while scrolling down and "backwards" while
 * scrolling up.
 *
 * A single passive listener is used, throttled through requestAnimationFrame,
 * and state only updates when the direction actually flips.
 */
export const ScrollDirectionProvider = ({ children }: { children: ReactNode }) => {
    const [direction, setDirection] = useState<Direction>(1);
    const lastY = useRef(0);

    useEffect(() => {
        lastY.current = window.scrollY;
        let frame = 0;

        const onScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                const y = window.scrollY;
                if (y === lastY.current) return;
                setDirection(y > lastY.current ? 1 : -1);
                lastY.current = y;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    const value = useMemo(() => direction, [direction]);

    return (
        <ScrollDirectionContext.Provider value={value}>
            {children}
        </ScrollDirectionContext.Provider>
    );
};

/** 1 when scrolling down, -1 when scrolling up */
export const useScrollDirection = () => useContext(ScrollDirectionContext);
