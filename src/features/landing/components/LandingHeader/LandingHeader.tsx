"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./LandingHeader.module.css";

interface NavItem {
    label: string;
    href: string;
}

const NAV_ITEMS: NavItem[] = [
    { label: "About", href: "#about" },
    { label: "Categories", href: "#categories" },
    { label: "Practice", href: "#practice" },
    { label: "Pricing", href: "#pricing" },
    { label: "Help", href: "#help" },
];

const DESKTOP_BREAKPOINT = 1024;

const CrownIcon = () => (
    <svg
        className={styles.crown}
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 11H5L3 7zm2 13h14v2H5v-2z" />
    </svg>
);

const StarIcon = () => (
    <svg
        className={styles.logoStar}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7L12 2z" />
    </svg>
);

export const LandingHeader = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const closeMenu = () => setIsOpen(false);
    const toggleMenu = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };
        const handleResize = () => {
            if (window.innerWidth >= DESKTOP_BREAKPOINT) setIsOpen(false);
        };

        window.addEventListener("keydown", handleKey);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("keydown", handleKey);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link href="/" className={styles.logo} aria-label="GVON-G Categories home">
                    <span className={styles.logoMain}>
                        <span className={styles.logoPurple}>
                            GV
                            <span className={styles.logoO}>
                                O
                                <StarIcon />
                            </span>
                            N
                        </span>
                        <span className={styles.logoBlue}>-G</span>
                    </span>
                    <span className={styles.logoSub}>CATEGORIES</span>
                </Link>

                <nav className={styles.nav} aria-label="Main navigation">
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.label} href={item.href} className={styles.navLink}>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className={styles.actions}>
                    <Link href="/login" className={styles.loginBtn}>
                        Login
                    </Link>
                    <Link href="/host" className={styles.hostBtn}>
                        <CrownIcon />
                        HOST A GAME
                    </Link>
                </div>

                <button
                    type="button"
                    className={styles.menuBtn}
                    onClick={toggleMenu}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    <span className={`${styles.bar} ${isOpen ? styles.barTop : ""}`} />
                    <span className={`${styles.bar} ${isOpen ? styles.barMid : ""}`} />
                    <span className={`${styles.bar} ${isOpen ? styles.barBottom : ""}`} />
                </button>
            </div>

            <div
                id="mobile-menu"
                className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
            >
                <nav className={styles.panelNav} aria-label="Mobile navigation">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={styles.panelLink}
                            onClick={closeMenu}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className={styles.panelActions}>
                    <Link href="/login" className={styles.loginBtn} onClick={closeMenu}>
                        Login
                    </Link>
                    <Link href="/host" className={styles.hostBtn} onClick={closeMenu}>
                        <CrownIcon />
                        HOST A GAME
                    </Link>
                </div>
            </div>
        </header>
    );
};