import Image from "next/image";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import styles from "./HowItWork.module.css";

type StepTone = "purple" | "blue" | "green";

interface Step {
    id: number;
    title: string;
    description: string;
    tone: StepTone;
    emoji: string;
    image?: string;
}

const STEPS: Step[] = [
    {
        id: 1,
        title: "Create or Join",
        description: "Host a game or join using a game code.",
        tone: "purple",
        emoji: "👨‍👩‍👧",
    },
    {
        id: 2,
        title: "Answer Categories",
        description: "You get a letter. Think fast and name the right answers.",
        tone: "blue",
        emoji: "🎁",
    },
    {
        id: 3,
        title: "Win & Learn",
        description: "Score points, climb the leaderboard and learn new words!",
        tone: "green",
        emoji: "🏆",
    },
];

export const HowItWorks = () => (
    <section className={styles.section} aria-label="How it works">
        <div className={styles.inner}>
            <SectionHeading id="" >How It Work</SectionHeading>

            <ol className={styles.list}>
                {STEPS.map((step) => (
                    <li key={step.id} className={`${styles.card} ${styles[step.tone]}`}>
                        <div className={styles.media}>
                            {step.image ? (
                                <Image
                                    src={step.image}
                                    alt=""
                                    fill
                                    sizes="(min-width: 1024px) 120px, 100px"
                                    className={styles.image}
                                />
                            ) : (
                                <span className={styles.emoji} aria-hidden="true">
                                    {step.emoji}
                                </span>
                            )}
                        </div>

                        <div className={styles.body}>
                            <div className={styles.head}>
                                <span className={styles.number}>{step.id}</span>
                                <h3 className={styles.title}>{step.title}</h3>
                            </div>
                            <p className={styles.text}>{step.description}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    </section>
);