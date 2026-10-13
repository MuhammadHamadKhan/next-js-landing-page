import Link from "next/link";
import type { CSSProperties } from "react";
import styles from "./FinalCTASection.module.css";

interface ConfettiPiece {
    left: string;
    top: string;
    width: number;
    height: number;
    color: string;
    rotate: number;
    round?: boolean;
}

const CONFETTI: ConfettiPiece[] = [
    { left: "3%", top: "22%", width: 7, height: 4, color: "#fcd34d", rotate: 30 },
    { left: "6%", top: "70%", width: 6, height: 6, color: "#f472b6", rotate: 45 },
    { left: "11%", top: "38%", width: 5, height: 5, color: "#60a5fa", rotate: 10, round: true },
    { left: "15%", top: "84%", width: 8, height: 4, color: "#fb923c", rotate: -35 },
    { left: "21%", top: "12%", width: 6, height: 6, color: "#a78bfa", rotate: 45 },
    { left: "27%", top: "78%", width: 7, height: 4, color: "#fcd34d", rotate: 60 },
    { left: "33%", top: "8%", width: 5, height: 5, color: "#34d399", rotate: 20, round: true },
    { left: "40%", top: "88%", width: 6, height: 6, color: "#f472b6", rotate: 45 },
    { left: "47%", top: "10%", width: 8, height: 4, color: "#60a5fa", rotate: -20 },
    { left: "54%", top: "82%", width: 5, height: 5, color: "#fcd34d", rotate: 15, round: true },
    { left: "60%", top: "14%", width: 6, height: 6, color: "#fb923c", rotate: 45 },
    { left: "64%", top: "60%", width: 7, height: 4, color: "#a78bfa", rotate: 70 },
    { left: "70%", top: "20%", width: 8, height: 4, color: "#f472b6", rotate: -40 },
    { left: "74%", top: "74%", width: 6, height: 6, color: "#34d399", rotate: 45 },
    { left: "78%", top: "10%", width: 5, height: 5, color: "#fcd34d", rotate: 25, round: true },
    { left: "83%", top: "46%", width: 7, height: 4, color: "#60a5fa", rotate: -55 },
    { left: "87%", top: "16%", width: 6, height: 6, color: "#fb923c", rotate: 45 },
    { left: "90%", top: "66%", width: 8, height: 4, color: "#f472b6", rotate: 35 },
    { left: "93%", top: "30%", width: 5, height: 5, color: "#fcd34d", rotate: 15, round: true },
    { left: "96%", top: "80%", width: 6, height: 6, color: "#a78bfa", rotate: 45 },
    { left: "97%", top: "12%", width: 7, height: 4, color: "#34d399", rotate: -25 },
    { left: "80%", top: "88%", width: 6, height: 4, color: "#fcd34d", rotate: 50 },
];

const CrownIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5L3 8z" />
        <rect x="5" y="20" width="14" height="2" rx="1" />
    </svg>
);

const UsersIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 19c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6v1h-13v-1z" />
        <circle cx="17" cy="9" r="2.8" />
        <path d="M16.5 13.2c3 .1 5 2 5 4.8v1.5h-4.2V18c0-1.7-.5-3.2-1.5-4.4.2-.2.4-.4.7-.4z" />
    </svg>
);

const TrophyArt = () => (
    <svg
        className={styles.trophy}
        viewBox="0 0 200 240"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
    >
        <defs>
            <linearGradient id="cta-metal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#b45309" />
                <stop offset="0.22" stopColor="#f59e0b" />
                <stop offset="0.45" stopColor="#fff1a8" />
                <stop offset="0.7" stopColor="#fbbf24" />
                <stop offset="1" stopColor="#92400e" />
            </linearGradient>
            <linearGradient id="cta-handle" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fde68a" />
                <stop offset="1" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="cta-base-top" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#c4b5fd" />
                <stop offset="1" stopColor="#6d28d9" />
            </linearGradient>
            <linearGradient id="cta-base-bottom" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#7c3aed" />
                <stop offset="1" stopColor="#3b1a8f" />
            </linearGradient>
            <radialGradient id="cta-glow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
                <stop offset="0.5" stopColor="#c4b5fd" stopOpacity="0.25" />
                <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cta-floor" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#d8b4fe" stopOpacity="0.9" />
                <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
            </radialGradient>
        </defs>

        <circle cx="100" cy="105" r="98" fill="url(#cta-glow)" />
        <ellipse cx="100" cy="212" rx="96" ry="22" fill="url(#cta-floor)" />

        <path
            d="M57 50C20 48 18 100 62 110"
            fill="none"
            stroke="url(#cta-handle)"
            strokeWidth="10"
            strokeLinecap="round"
        />
        <path
            d="M143 50C180 48 182 100 138 110"
            fill="none"
            stroke="url(#cta-handle)"
            strokeWidth="10"
            strokeLinecap="round"
        />
        <path
            d="M56 52C30 52 28 92 60 104"
            fill="none"
            stroke="#fff7cc"
            strokeOpacity="0.55"
            strokeWidth="2.5"
            strokeLinecap="round"
        />

        <path d="M91 126h18v32H91z" fill="url(#cta-metal)" />
        <ellipse cx="100" cy="140" rx="15" ry="5.5" fill="url(#cta-metal)" />
        <ellipse cx="100" cy="139" rx="15" ry="2" fill="#fff" fillOpacity="0.4" />

        <path d="M56 34h88c1 58-14 92-44 98-30-6-45-40-44-98z" fill="url(#cta-metal)" />
        <ellipse cx="100" cy="34" rx="44" ry="9" fill="#fde68a" />
        <ellipse cx="100" cy="35.5" rx="37" ry="6" fill="#b45309" />
        <ellipse cx="100" cy="34" rx="44" ry="9" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.2" />

        <path
            d="M68 48c0 38 9 60 25 72"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.65"
            strokeWidth="6"
            strokeLinecap="round"
        />
        <path
            d="M132 50c0 30-6 52-17 64"
            fill="none"
            stroke="#92400e"
            strokeOpacity="0.28"
            strokeWidth="8"
            strokeLinecap="round"
        />

        <polygon
            points="100,62 104,73.5 116,73.8 106.4,81 109.9,92.5 100,85.6 90.1,92.5 93.6,81 84,73.8 96,73.5"
            fill="#fff8d6"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />

        <path d="M66 160h68l9 24H57z" fill="url(#cta-metal)" />
        <rect x="50" y="184" width="100" height="14" rx="4" fill="url(#cta-base-top)" />
        <rect x="42" y="196" width="116" height="16" rx="5" fill="url(#cta-base-bottom)" />
        <rect x="50" y="184" width="100" height="3.5" rx="1.75" fill="#fff" fillOpacity="0.45" />

        <path d="M168 40l2.6 7.4 7.4 2.6-7.4 2.6-2.6 7.4-2.6-7.4-7.4-2.6 7.4-2.6z" fill="#fff" />
        <path d="M30 150l2 5.5 5.5 2-5.5 2-2 5.5-2-5.5-5.5-2 5.5-2z" fill="#fff" fillOpacity="0.9" />
        <path d="M176 128l1.6 4.4 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4-4.4-1.6 4.4-1.6z" fill="#fde68a" />
    </svg>
);

export const FinalCTASection = () => (
    <section className={styles.section} aria-label="Start playing">
        <div className={styles.banner}>
            <div className={styles.confetti} aria-hidden="true">
                {CONFETTI.map((piece, index) => (
                    <span
                        key={index}
                        className={`${styles.piece} ${piece.round ? styles.round : ""}`}
                        style={
                            {
                                left: piece.left,
                                top: piece.top,
                                width: `calc(var(--unit) * ${piece.width})`,
                                height: `calc(var(--unit) * ${piece.height})`,
                                background: piece.color,
                                transform: `rotate(${piece.rotate}deg)`,
                            } as CSSProperties
                        }
                    />
                ))}
            </div>

            <div className={styles.content}>
                <h2 className={styles.title}>Ready To Challenge Your Friends?</h2>
                <p className={styles.subtitle}>Host, play and learn like never before.</p>

                <div className={styles.actions}>
                    <Link href="/host" className={`${styles.button} ${styles.gold}`}>
                        <CrownIcon />
                        Host a Game
                    </Link>
                    <Link href="/join" className={`${styles.button} ${styles.blue}`}>
                        <UsersIcon />
                        Join a Game
                    </Link>
                </div>
            </div>

            <div className={styles.art}>
                <TrophyArt />
            </div>
        </div>
    </section>
);