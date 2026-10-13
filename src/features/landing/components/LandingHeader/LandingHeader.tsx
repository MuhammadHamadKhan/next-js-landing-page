"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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
    <svg className={styles.logoStar} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7L12 2z" />
    </svg>
);

const CloseIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        aria-hidden="true"
    >
        <path d="M6 6l12 12M18 6L6 18" />
    </svg>
);

export const LandingHeader = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuBtnRef = useRef<HTMLButtonElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const wasOpen = useRef<boolean>(false);

    const closeMenu = useCallback(() => setIsOpen(false), []);
    const openMenu = useCallback(() => setIsOpen(true), []);

    // Close with the Escape key, or when the screen grows to desktop size
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

    // Stop the page behind from scrolling while the drawer is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Keyboard users: focus moves into the drawer, then back to the menu button
    useEffect(() => {
        if (isOpen) {
            closeBtnRef.current?.focus();
        } else if (wasOpen.current) {
            menuBtnRef.current?.focus();
        }
        wasOpen.current = isOpen;
    }, [isOpen]);

    return (
        <>
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
                        ref={menuBtnRef}
                        type="button"
                        className={styles.menuBtn}
                        onClick={openMenu}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        aria-label="Open menu"
                    >
                        <span className={styles.bar} />
                        <span className={styles.bar} />
                        <span className={styles.bar} />
                    </button>
                </div>
            </header>

            {/* Placed outside the header on purpose, so it can cover the whole screen */}
            <div
                className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
                onClick={closeMenu}
                aria-hidden="true"
            />

            <aside
                id="mobile-menu"
                className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label="Main menu"
            >
                <div className={styles.drawerTop}>
                    <span className={styles.drawerTitle}>Menu</span>
                    <button
                        ref={closeBtnRef}
                        type="button"
                        className={styles.closeBtn}
                        onClick={closeMenu}
                        aria-label="Close menu"
                    >
                        <CloseIcon />
                    </button>
                </div>

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
            </aside>
        </>
    );
};