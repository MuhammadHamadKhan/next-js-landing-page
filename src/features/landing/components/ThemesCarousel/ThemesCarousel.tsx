"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { SectionHeading } from "@/features/landing/components/SectionHeading/SectionHeading";
import styles from "./ThemesCarousel.module.css";

interface Theme {
    id: string;
    name: string;
    emoji: string;
    from: string;
    to: string;
    /*
      TO ADD A REAL IMAGE LATER:
      1. Put the file in public/images/themes/ (for example football.jpg)
      2. Set image below to "/images/themes/football.jpg"
      Leave it as undefined to keep the colored placeholder.
    */
    image?: string;
}

// The last 3 themes are only extra placeholders so you can test the scrolling. Delete them if not needed.
const THEMES: Theme[] = [
    { id: "football", name: "Football", emoji: "⚽", from: "#15803d", to: "#052e16" },
    { id: "christmas", name: "Christmas", emoji: "🎄", from: "#dc2626", to: "#7f1d1d" },
    { id: "africa", name: "Africa", emoji: "🐘", from: "#d97706", to: "#78350f" },
    { id: "movies", name: "Movies", emoji: "🎬", from: "#7c3aed", to: "#312e81" },
    { id: "kids", name: "Kids", emoji: "🧸", from: "#fbbf24", to: "#f97316" },
    { id: "music", name: "Music", emoji: "🎵", from: "#ec4899", to: "#4338ca" },
    { id: "food", name: "Food", emoji: "🍕", from: "#f97316", to: "#b91c1c" },
    { id: "science", name: "Science", emoji: "🔬", from: "#0ea5e9", to: "#1e3a8a" },
];

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
    const [page, setPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(1);
    const [canPrev, setCanPrev] = useState<boolean>(false);
    const [canNext, setCanNext] = useState<boolean>(false);

    // Reads the scroll position and works out which "page" of cards we are on
    const update = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;

        const { scrollLeft, scrollWidth, clientWidth } = el;

        // The row has no width yet (not measured), so skip for now
        if (clientWidth <= 0) return;

        const pages = Math.min(
            THEMES.length,
            Math.max(1, Math.ceil((scrollWidth - 1) / clientWidth))
        );

        setPageCount(pages);
        setPage(Math.min(pages - 1, Math.max(0, Math.round(scrollLeft / clientWidth))));
        setCanPrev(scrollLeft > 4);
        setCanNext(scrollLeft + clientWidth < scrollWidth - 4);
    }, []);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;

        update();
        el.addEventListener("scroll", update, { passive: true });

        const observer = new ResizeObserver(update);
        observer.observe(el);

        return () => {
            el.removeEventListener("scroll", update);
            observer.disconnect();
        };
    }, [update]);

    const scrollByPage = (direction: 1 | -1) => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollBy({ left: direction * el.clientWidth });
    };

    const scrollToPage = (index: number) => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollTo({ left: index * el.clientWidth });
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
                    onClick={() => scrollByPage(-1)}
                    disabled={!canPrev}
                    aria-label="Show previous themes"
                >
                    <ChevronIcon direction="left" />
                </button>

                <ul className={styles.track} ref={trackRef} tabIndex={0}>
                    {THEMES.map((theme) => (
                        <li
                            key={theme.id}
                            className={styles.card}
                            style={{ "--from": theme.from, "--to": theme.to } as CSSProperties}
                        >
                            {theme.image ? (
                                <Image
                                    src={theme.image}
                                    alt=""
                                    fill
                                    sizes="(max-width: 640px) 62vw, (max-width: 1024px) 33vw, 20vw"
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
                    onClick={() => scrollByPage(1)}
                    disabled={!canNext}
                    aria-label="Show next themes"
                >
                    <ChevronIcon direction="right" />
                </button>
            </div>

            {Number.isFinite(pageCount) && pageCount > 1 && (
                <div className={styles.dots}>
                    {Array.from({ length: pageCount }, (_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`${styles.dot} ${index === page ? styles.dotActive : ""}`}
                            onClick={() => scrollToPage(index)}
                            aria-label={`Go to page ${index + 1}`}
                            aria-current={index === page}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};