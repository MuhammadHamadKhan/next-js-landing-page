"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import styles from "./TestimonialsCarousel.module.css";

interface Testimonial {
    id: number;
    name: string;
    quote: string;
    image?: string;
}

const EDGE_TOLERANCE = 4;

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: "Sarah J.",
        quote: "Everyone at our party loved it. Non-stop laughs and super competitive!",
    },
    {
        id: 2,
        name: "Daniel M.",
        quote: "The best game for family nights. My kids are learning so many new words!",
    },
    {
        id: 3,
        name: "Tolu A.",
        quote: "Highly addictive! We play every weekend with our friends online.",
    },
    {
        id: 4,
        name: "Amina K.",
        quote: "Perfect for our office break. Quick rounds and everyone joins in.",
    },
    {
        id: 5,
        name: "Chris P.",
        quote: "Simple to start and hard to put down. Our group chat is now a game night.",
    },
];

const ChevronIcon = ({ direction }: { direction: "left" | "right" }) => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
);

export const TestimonialsCarousel = () => {
    const trackRef = useRef<HTMLUListElement>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const updateEdges = useCallback(() => {
        const track = trackRef.current;
        if (!track || track.clientWidth <= 0) return;
        const maxScroll = track.scrollWidth - track.clientWidth;
        setCanPrev(track.scrollLeft > EDGE_TOLERANCE);
        setCanNext(track.scrollLeft < maxScroll - EDGE_TOLERANCE);
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        updateEdges();
        const observer = new ResizeObserver(updateEdges);
        observer.observe(track);
        return () => observer.disconnect();
    }, [updateEdges]);

    const scrollByCard = (direction: 1 | -1) => {
        const track = trackRef.current;
        const card = track?.firstElementChild as HTMLElement | null;
        if (!track || !card || track.clientWidth <= 0) return;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        track.scrollBy({
            left: direction * (card.offsetWidth + gap),
            behavior: reduceMotion ? "auto" : "smooth",
        });
    };

    return (
        <section className={styles.section} aria-label="Customer testimonials">
            <div className={styles.inner}>
                <SectionHeading>Loved by thousands</SectionHeading>

                <div className={styles.carousel}>
                    <button
                        type="button"
                        className={styles.arrow}
                        onClick={() => scrollByCard(-1)}
                        disabled={!canPrev}
                        aria-label="Previous testimonials"
                    >
                        <ChevronIcon direction="left" />
                    </button>

                    <ul ref={trackRef} className={styles.track} onScroll={updateEdges}>
                        {TESTIMONIALS.map((item) => (
                            <li key={item.id} className={styles.card}>
                                <div className={styles.avatar}>
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt=""
                                            fill
                                            sizes="72px"
                                            className={styles.avatarImage}
                                        />
                                    ) : (
                                        <span aria-hidden="true">{item.name.charAt(0)}</span>
                                    )}
                                </div>

                                <figure className={styles.body}>
                                    <div className={styles.stars} role="img" aria-label="5 out of 5 stars">
                                        ★★★★★
                                    </div>
                                    <blockquote className={styles.quote}>“{item.quote}”</blockquote>
                                    <figcaption className={styles.name}>{item.name}</figcaption>
                                </figure>
                            </li>
                        ))}
                    </ul>

                    <button
                        type="button"
                        className={styles.arrow}
                        onClick={() => scrollByCard(1)}
                        disabled={!canNext}
                        aria-label="Next testimonials"
                    >
                        <ChevronIcon direction="right" />
                    </button>
                </div>
            </div>
        </section>
    );
};