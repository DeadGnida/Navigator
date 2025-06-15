// components/Header/Header.jsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Cookie from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {useRouter} from "next/navigation";


export default function Header({ onUserChange }) {
    const [user, setUser] = useState({
        name: "",
        role: "",
        created_at: new Date(),
    });
    const [token, setToken] = useState(false);

    useEffect(() => {
        const token = Cookie.get("token");
        if (token) {

            const decoded = jwtDecode(token);
            console.log("Декодированный токен:", decoded);
            setUser({
                name: decoded.fullname,
                role: decoded.role,
                created_at: new Date(decoded.created_at),

            });
        }
        setToken(true);


    }, []);
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const res = await fetch('http://localhost:8080/auth/logout', { method: 'GET' }); // или POST, если сделаешь так

            if (res.ok) {
                // Перенаправляем пользователя на страницу логина
                router.push('/Login');
            } else {
                alert('Ошибка выхода');
            }
        } catch(e) {
            alert(e.message);
            alert('Ошибка сети');
        }
    };

    console.log(user);
    return (
        <header className={styles.header}>
            <h1>Навигатор</h1>
            <nav className={styles.nav}>
                {token & <Link href="/Login">Вход</Link>}
                    <>
                        <span>{user.name}</span>
                        <button onClick={handleLogout}>Выйти</button>
                    </>

            </nav>
        </header>
    );
}
