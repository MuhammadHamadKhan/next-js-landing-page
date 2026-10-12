import type { ComponentType } from "react";
import { SectionHeading } from "@/features/landing/components/SectionHeading/SectionHeading";
import { BrainIcon, HeartIcon, RocketIcon, UsersIcon } from "./FeatureIcons";
import styles from "./FeaturesSection.module.css";

type FeatureTone = "purple" | "green" | "blue" | "pink";

interface Feature {
    id: string;
    title: string;
    description: string;
    tone: FeatureTone;
    Icon: ComponentType;
}

const FEATURES: Feature[] = [
    {
        id: "multiplayer",
        title: "Multiplayer Fun",
        description: "Play with friends, family, or large groups.",
        tone: "purple",
        Icon: UsersIcon,
    },
    {
        id: "ai-learning",
        title: "AI Assisted Learning",
        description: "Smart AI helps validate words and expand your knowledge.",
        tone: "green",
        Icon: BrainIcon,
    },
    {
        id: "quick-to-learn",
        title: "Quick To Learn",
        description: "Simple rules. Fast rounds. Endless excitement.",
        tone: "blue",
        Icon: RocketIcon,
    },
    {
        id: "family-friendly",
        title: "Family Friendly",
        description: "Safe, inclusive and perfect for all ages.",
        tone: "pink",
        Icon: HeartIcon,
    },
];

export const FeaturesSection = () => {
    return (
        <section id="about" className={styles.section} aria-labelledby="why-gvon-heading">
            <SectionHeading id="why-gvon-heading">Why GVON-G?</SectionHeading>

            <ul className={styles.grid}>
                {FEATURES.map(({ id, title, description, tone, Icon }) => (
                    <li key={id} className={`${styles.card} ${styles[tone]}`}>
                        <span className={styles.iconWrap}>
                            <Icon />
                        </span>
                        <div className={styles.body}>
                            <h3 className={styles.title}>{title}</h3>
                            <p className={styles.description}>{description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};