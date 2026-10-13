"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

/* Matches the breakpoint the rest of the landing page treats as "phone" */
const MOBILE_QUERY = "(max-width: 767px)";

const subscribe = (onChange: () => void) => {
    const query = window.matchMedia(MOBILE_QUERY);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
};

const getSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;

/* The server has no viewport, so assume a desktop and let the client correct it */
const getServerSnapshot = () => false;

/**
 * True when motion should be skipped completely, i.e. the visitor asked for
 * reduced motion, or they are on a phone.
 *
 * On phones the scroll reveals are not worth the cost: small screens have
 * little room to show the movement, the sections are short, and it keeps the
 * page feeling instant on lower-powered devices.
 *
 * The hero keeps its own entrance animation — that one is plain CSS and is
 * deliberately left alone.
 */
export const useStaticMotion = () => {
    const reduceMotion = useReducedMotion();
    const isMobile = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    return reduceMotion || isMobile;
};
