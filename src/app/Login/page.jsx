/** app/Login/page.jsx */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import { loginRequest } from "@/lib/api";

export default function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        setError("");
        try {
            const user = await loginRequest(login, password);
            // Сохраняем в sessionStorage
            sessionStorage.setItem("user", JSON.stringify(user));
            router.push(user.role === "admin" ? "/admin-panel" : "/");
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2>Вход в систему</h2>
            <div className={styles.inputField}>
                <label>Логин:</label>
                <input
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
            </div>
            <div className={styles.inputField}>
                <label>Пароль:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button className={styles.loginBtn} onClick={handleLogin}>
                Войти
            </button>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}
