import Link from "next/link";
import type { ComponentType } from "react";
import {
    FacebookIcon,
    InstagramIcon,
    TiktokIcon,
    TwitterIcon,
    YoutubeIcon,
} from "./SocialIcons";
import styles from "./LandingFooter.module.css";

interface FooterLink {
    label: string;
    href: string;
}

interface FooterColumn {
    title: string;
    links: FooterLink[];
}

interface SocialLink {
    id: string;
    label: string;
    href: string;
    Icon: ComponentType;
}

// To add or rename a link, edit these lists. The layout adjusts by itself.
const COLUMNS: FooterColumn[] = [
    {
        title: "About",
        links: [
            { label: "Our Story", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Press Kit", href: "/press" },
        ],
    },
    {
        title: "Categories",
        links: [
            { label: "All Themes", href: "/categories" },
            { label: "Popular", href: "/categories/popular" },
            { label: "New Releases", href: "/categories/new" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "Help Center", href: "/help" },
            { label: "Contact Us", href: "/contact" },
            { label: "Community", href: "/community" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Use", href: "/terms" },
            { label: "Cookie Policy", href: "/cookies" },
        ],
    },
];

// Replace each "#" with your real social media page address
const SOCIALS: SocialLink[] = [
    { id: "facebook", label: "Facebook", href: "#", Icon: FacebookIcon },
    { id: "instagram", label: "Instagram", href: "#", Icon: InstagramIcon },
    { id: "tiktok", label: "TikTok", href: "#", Icon: TiktokIcon },
    { id: "youtube", label: "YouTube", href: "#", Icon: YoutubeIcon },
    { id: "twitter", label: "Twitter", href: "#", Icon: TwitterIcon },
];

const LogoStar = () => (
    <svg className={styles.logoStar} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7L12 2z" />
    </svg>
);
const COPYRIGHT_YEAR = 2026;
export const LandingFooter = () => {


    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <Link href="/" className={styles.logo} aria-label="GVON-G Categories home">
                        <span className={styles.logoMain}>
                            <span className={styles.logoPurple}>
                                GV
                                <span className={styles.logoO}>
                                    O
                                    <LogoStar />
                                </span>
                                N
                            </span>
                            <span className={styles.logoBlue}>-G</span>
                        </span>
                        <span className={styles.logoSub}>CATEGORIES</span>
                    </Link>

                    <p className={styles.tagline}>
                        <span >Think Fast.</span>
                        <span className={styles.taglinePurple}>Learn Faster.</span>
                        <span>Play Together.</span>
                    </p>
                </div>

                {COLUMNS.map((column) => (
                    <nav key={column.title} className={styles.column} aria-label={column.title}>
                        <h3 className={styles.columnTitle}>{column.title}</h3>
                        <ul className={styles.list}>
                            {column.links.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className={styles.link}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}

                <div className={styles.follow}>
                    <h3 className={styles.columnTitle}>Follow Us</h3>
                    <ul className={styles.socials}>
                        {SOCIALS.map(({ id, label, href, Icon }) => (
                            <li key={id}>
                                <a
                                    href={href}
                                    className={`${styles.social} ${styles[id]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                >
                                    <Icon />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <p className={styles.copyright}>
                    &copy; {COPYRIGHT_YEAR} GVON-G. All rights reserved.
                </p>
            </div>
        </footer>
    );
};