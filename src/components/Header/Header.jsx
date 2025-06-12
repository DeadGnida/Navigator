"use client";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <h1>Навигатор</h1>
            <nav className={styles.nav}>
                <Link href="/">Главная</Link>
                <Link href="/admin-panel">Админка</Link>
                <Link href="/Login">Вход</Link>
            </nav>
        </header>
    );
}
