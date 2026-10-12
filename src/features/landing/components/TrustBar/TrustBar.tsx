import type { ReactNode } from "react";
import styles from "./TrustBar.module.css";

interface Stat {
    value: string;
    label: string;
    icon: ReactNode;
}

const UsersIcon = () => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" aria-hidden="true">
        <path d="M9 11a4 4 0 100-8 4 4 0 000 8zm8 0a3 3 0 100-6 3 3 0 000 6zM9 13c-3.3 0-7 1.7-7 4v2h14v-2c0-2.3-3.7-4-7-4zm8 0c-.4 0-.8 0-1.2.1 1.4 1 2.2 2.3 2.2 3.9v2h5v-2c0-2-3.2-4-6-4z" />
    </svg>
);

const StarIcon = () => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" aria-hidden="true">
        <path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7L12 2z" />
    </svg>
);

const GlobeIcon = () => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.500 18.300 12 21c-2.500-2.700-3.800-5.700-3.800-9S9.500 5.700 12 3z" />
    </svg>
);

const HeartIcon = () => (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" aria-hidden="true">
        <path d="M12 21s-7.500-4.600-9.600-9.200C1 8.600 2.800 5 6.200 5c2.100 0 3.600 1.100 5.800 3.200C14.200 6.100 15.700 5 17.800 5c3.400 0 5.200 3.600 3.800 6.800C19.500 16.400 12 21 12 21z" />
    </svg>
);

// To change a number or label later, just edit this list
const STATS: Stat[] = [
    { value: "1M+", label: "Games Hosted", icon: <span className={styles.purple}><UsersIcon /></span> },
    { value: "5M+", label: "Players", icon: <span className={styles.blue}><UsersIcon /></span> },
    { value: "4.9", label: "App Rating", icon: <span className={styles.gold}><StarIcon /></span> },
    { value: "190+", label: "Countries", icon: <span className={styles.green}><GlobeIcon /></span> },
    { value: "Family", label: "Friendly", icon: <span className={styles.pink}><HeartIcon /></span> },
];

export const TrustBar = () => {
    return (
        <section className={styles.section} aria-label="GVON-G in numbers">
            <ul className={styles.card}>
                {STATS.map((stat) => (
                    <li key={stat.label} className={styles.item}>
                        <span className={styles.icon}>{stat.icon}</span>
                        <div className={styles.text}>
                            <span className={styles.value}>{stat.value}</span>
                            <span className={styles.label}>{stat.label}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};