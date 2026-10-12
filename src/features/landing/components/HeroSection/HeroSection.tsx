import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSection.module.css";

/*
  TO REPLACE THE IMAGE LATER:
  1. Put the new image in public/images/ (for example hero.png)
  2. Change HERO_IMAGE.src below to "/images/hero.png"
  Nothing else needs to change.
*/
const HERO_IMAGE = {
    src: "/images/hero-placeholder.svg",
    alt: "Friends playing the GVON-G categories game together",
};

interface Player {
    initials: string;
    color: string;
}

// Replace these with real photos later if you want
const PLAYERS: Player[] = [
    { initials: "A", color: "#f59e0b" },
    { initials: "S", color: "#ec4899" },
    { initials: "J", color: "#10b981" },
    { initials: "M", color: "#3b82f6" },
    { initials: "T", color: "#8b5cf6" },
];

const CrownIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 11H5L3 7zm2 13h14v2H5v-2z" />
    </svg>
);

const UsersIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M9 11a4 4 0 100-8 4 4 0 000 8zm8 0a3 3 0 100-6 3 3 0 000 6zM9 13c-3.3 0-7 1.7-7 4v2h14v-2c0-2.3-3.7-4-7-4zm8 0c-.4 0-.8 0-1.2.1 1.4 1 2.2 2.3 2.2 3.9v2h5v-2c0-2-3.2-4-6-4z" />
    </svg>
);

const BoltIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
);

const StarIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7L12 2z" />
    </svg>
);

export const HeroSection = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.inner}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        <span className={styles.line1}>Think Fast.</span>
                        <span className={styles.line2}>Learn Faster.</span>
                        <span className={styles.line3}>Play Together.</span>
                    </h1>

                    <p className={styles.text}>
                        Challenge your friends, family, colleagues and communities with the
                        most exciting AI-assisted categories game ever created.
                    </p>

                    <div className={styles.buttons}>
                        <Link href="/host" className={`${styles.btn} ${styles.hostBtn}`}>
                            <CrownIcon />
                            HOST A GAME
                        </Link>
                        <Link href="/join" className={`${styles.btn} ${styles.joinBtn}`}>
                            <UsersIcon />
                            JOIN A GAME
                        </Link>
                        <Link href="/practice" className={`${styles.btn} ${styles.practiceBtn}`}>
                            <BoltIcon />
                            PRACTICE FOR FREE
                        </Link>
                    </div>

                    <div className={styles.proof}>
                        <div className={styles.avatars} aria-hidden="true">
                            {PLAYERS.map((player) => (
                                <span
                                    key={player.initials}
                                    className={styles.avatar}
                                    style={{ backgroundColor: player.color }}
                                >
                                    {player.initials}
                                </span>
                            ))}
                        </div>
                        <div>
                            <div className={styles.stars} aria-label="Rated 4.9 out of 5">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <StarIcon key={n} />
                                ))}
                            </div>
                            <p className={styles.rating}>4.9/5 from 10,000+ Players</p>
                        </div>
                    </div>
                </div>

                <div className={styles.imageWrap}>
                    <Image
                        src={HERO_IMAGE.src}
                        alt={HERO_IMAGE.alt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className={styles.image}
                    />
                </div>
            </div>
        </section>
    );
};