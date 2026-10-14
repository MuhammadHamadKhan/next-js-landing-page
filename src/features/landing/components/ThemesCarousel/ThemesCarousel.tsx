"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { SectionHeading } from "@/features/landing/components/SectionHeading/SectionHeading";
import styles from "./ThemesCarousel.module.css";

interface Theme {
    id: string;
    name: string;
    emoji: string;
    from: string;
    to: string;
    image?: string;
}

const THEMES: Theme[] = [
    { id: "football", name: "Football", emoji: "⚽", from: "#15803d", to: "#052e16", image: "/football.png" },
    { id: "christmas", name: "Christmas", emoji: "🎄", from: "#dc2626", to: "#7f1d1d", image: "/christmas.png" },
    { id: "africa", name: "Africa", emoji: "🐘", from: "#d97706", to: "#78350f", image: "/elephent.png" },
    { id: "movies", name: "Movies", emoji: "🎬", from: "#7c3aed", to: "#312e81", image: "/movied.png" },
    { id: "kids", name: "Kids", emoji: "🧸", from: "#fbbf24", to: "#f97316", image: "/kids.png" },
];

const COPIES = 5;
const MIDDLE_COPY_INDEX = 2;

/* Same "phone" breakpoint the rest of the landing page uses */
const MOBILE_QUERY = "(max-width: 767px)";

const subscribeToMobile = (onChange: () => void) => {
    const query = window.matchMedia(MOBILE_QUERY);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
};

const getMobileSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;

/* No viewport on the server, so start as desktop and let the client correct it */
const getMobileServerSnapshot = () => false;

/**
 * Phones get a plain swipe row: one single pass of the themes, no looping.
 * Tablets and desktops keep the 5-copy infinite loop with arrows.
 */
const useIsMobile = () =>
    useSyncExternalStore(subscribeToMobile, getMobileSnapshot, getMobileServerSnapshot);

const ChevronIcon = ({ direction }: { direction: "left" | "right" }) => (
    <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
);

export const ThemesCarousel = () => {
    const trackRef = useRef<HTMLUListElement>(null);
    const [step, setStep] = useState<number>(0);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isReady, setIsReady] = useState<boolean>(false);
    const isMobile = useIsMobile();

    const isMouseDownRef = useRef<boolean>(false);
    const startXRef = useRef<number>(0);
    const startScrollLeftRef = useRef<number>(0);
    const isDraggingRef = useRef<boolean>(false);

    /**
     * 5 repeated copies of the themes for continuous infinite looping on tablet and
     * desktop. On phones only copy 0 is shown (see `.card[data-copy]` in the CSS), so
     * the row is a plain swipe list that stops on the last card.
     *
     * All copies are always rendered so server and client markup stay identical;
     * hiding is pure CSS, which also means no layout jump when rotating the phone.
     */
    const repeatedThemes = useMemo(() => {
        const list: { key: string; theme: Theme; copy: number }[] = [];
        for (let copy = 0; copy < COPIES; copy++) {
            for (let i = 0; i < THEMES.length; i++) {
                list.push({
                    key: `${THEMES[i].id}-${copy}-${i}`,
                    theme: THEMES[i],
                    copy,
                });
            }
        }
        return list;
    }, []);

    // Measures the step width (card width + gap)
    const measureStep = useCallback(() => {
        const track = trackRef.current;
        if (!track || track.children.length === 0) return 0;
        const firstCard = track.children[0] as HTMLElement;
        const cardWidth = firstCard.getBoundingClientRect().width;
        const computedGap = parseFloat(window.getComputedStyle(track).gap) || 12;
        const totalStep = cardWidth + computedGap;
        if (totalStep > 0) {
            setStep(totalStep);
        }
        return totalStep;
    }, []);

    useLayoutEffect(() => {
        measureStep();
    }, [measureStep]);

    // Position the track: middle copy on desktop, start of the single pass on mobile
    const positionTrack = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;

        const measuredStep = measureStep();
        if (measuredStep <= 0) return;

        track.scrollLeft = isMobile ? 0 : THEMES.length * measuredStep * MIDDLE_COPY_INDEX;
        setIsReady(true);
    }, [isMobile, measureStep]);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        positionTrack();

        const observer = new ResizeObserver(() => {
            measureStep();
        });
        observer.observe(track);

        return () => observer.disconnect();
    }, [measureStep, positionTrack]);

    // Handle scroll for infinite looping and active dot update
    const handleScroll = useCallback(() => {
        const track = trackRef.current;
        if (!track || step <= 0) return;

        const copyWidth = THEMES.length * step;

        if (isMobile) {
            // No looping on phones: the row simply stops at the last card
            const currentCardIndex = Math.round(track.scrollLeft / step);
            setActiveIndex(Math.min(Math.max(currentCardIndex, 0), THEMES.length - 1));
            return;
        }

        // If user scrolls past copy 3.5, wrap silently back to copy 2
        if (track.scrollLeft >= copyWidth * 3.5) {
            track.scrollLeft -= copyWidth;
        } else if (track.scrollLeft <= copyWidth * 1.2) {
            // If user scrolls back before copy 1.2, wrap forward to copy 2
            track.scrollLeft += copyWidth;
        }

        // Active dot calculation (0..4)
        const currentCardIndex = Math.round(track.scrollLeft / step);
        const currentThemeIndex = ((currentCardIndex % THEMES.length) + THEMES.length) % THEMES.length;
        setActiveIndex(currentThemeIndex);
    }, [isMobile, step]);

    // Button Next
    const handleNext = useCallback(() => {
        const track = trackRef.current;
        if (!track || step <= 0) return;

        if (!isMobile) {
            const copyWidth = THEMES.length * step;
            if (track.scrollLeft >= copyWidth * 3) {
                track.scrollLeft -= copyWidth;
            }
        }

        track.scrollBy({ left: step, behavior: "smooth" });
    }, [isMobile, step]);

    // Button Prev
    const handlePrev = useCallback(() => {
        const track = trackRef.current;
        if (!track || step <= 0) return;

        if (!isMobile) {
            const copyWidth = THEMES.length * step;
            if (track.scrollLeft <= copyWidth * 1.5) {
                track.scrollLeft += copyWidth;
            }
        }

        track.scrollBy({ left: -step, behavior: "smooth" });
    }, [isMobile, step]);

    // Click on a dot
    const goToTheme = (targetIndex: number) => {
        const track = trackRef.current;
        if (!track || step <= 0) return;

        if (isMobile) {
            track.scrollTo({ left: targetIndex * step, behavior: "smooth" });
            return;
        }

        const currentCardIndex = Math.round(track.scrollLeft / step);
        const currentThemeIndex = ((currentCardIndex % THEMES.length) + THEMES.length) % THEMES.length;
        let diff = targetIndex - currentThemeIndex;
        if (diff > THEMES.length / 2) diff -= THEMES.length;
        if (diff < -THEMES.length / 2) diff += THEMES.length;
        if (diff === 0) return;

        track.scrollBy({ left: diff * step, behavior: "smooth" });
    };

    // Optional mouse-drag for desktop users who want to click & drag with hands
    const handleMouseDown = (e: MouseEvent<HTMLUListElement>) => {
        const track = trackRef.current;
        if (!track) return;
        isMouseDownRef.current = true;
        startXRef.current = e.pageX - track.offsetLeft;
        startScrollLeftRef.current = track.scrollLeft;
        isDraggingRef.current = false;
    };

    const handleMouseMove = (e: MouseEvent<HTMLUListElement>) => {
        if (!isMouseDownRef.current) return;
        const track = trackRef.current;
        if (!track) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startXRef.current) * 1.2;
        if (Math.abs(walk) > 4) {
            isDraggingRef.current = true;
            track.scrollLeft = startScrollLeftRef.current - walk;
        }
    };

    const handleMouseUp = () => {
        isMouseDownRef.current = false;
    };

    return (
        <section
            id="categories"
            className={styles.section}
            aria-labelledby="themes-heading"
        >
            <SectionHeading id="themes-heading">Play Any Theme You Love</SectionHeading>

            <div className={styles.stage}>
                <button
                    type="button"
                    className={`${styles.arrow} ${styles.arrowPrev}`}
                    onClick={handlePrev}
                    aria-label="Show previous themes"
                >
                    <ChevronIcon direction="left" />
                </button>

                <ul
                    className={styles.track}
                    ref={trackRef}
                    tabIndex={0}
                    onScroll={handleScroll}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{
                        opacity: isReady || step > 0 ? 1 : 0,
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowLeft") handlePrev();
                        if (e.key === "ArrowRight") handleNext();
                    }}
                >
                    {repeatedThemes.map(({ key, theme, copy }) => (
                        <li
                            key={key}
                            className={styles.card}
                            data-copy={copy}
                            aria-hidden={isMobile && copy > 0 ? true : undefined}
                            style={{ "--from": theme.from, "--to": theme.to } as CSSProperties}
                        >
                            {theme.image ? (
                                <Image
                                    src={theme.image}
                                    alt={theme.name}
                                    fill
                                    sizes="(max-width: 640px) 70vw, (max-width: 1024px) 33vw, 20vw"
                                    className={styles.image}
                                />
                            ) : (
                                <span className={styles.emoji} aria-hidden="true">
                                    {theme.emoji}
                                </span>
                            )}
                            <span className={styles.name}>{theme.name}</span>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    className={`${styles.arrow} ${styles.arrowNext}`}
                    onClick={handleNext}
                    aria-label="Show next themes"
                >
                    <ChevronIcon direction="right" />
                </button>
            </div>

            <div className={styles.dots} role="tablist" aria-label="Themes navigation">
                {THEMES.map((theme, index) => (
                    <button
                        key={theme.id}
                        type="button"
                        role="tab"
                        className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
                        onClick={() => goToTheme(index)}
                        aria-label={`Go to ${theme.name} theme`}
                        aria-selected={index === activeIndex}
                    />
                ))}
            </div>
        </section>
    );
};