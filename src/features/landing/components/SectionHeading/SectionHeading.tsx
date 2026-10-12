import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
    id?: string;
    children: ReactNode;
}

export const SectionHeading = ({ id, children }: SectionHeadingProps) => {
    return (
        <h2 id={id} className={styles.heading}>
            {children}
        </h2>
    );
};