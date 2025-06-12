"use client";

import styles from "./Logs.module.css";

export default function Logs() {
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Логи системы</h2>
            <p className={styles.placeholder}>Здесь в будущем будут отображаться логи действий пользователей и системы.</p>
        </div>
    );
}
