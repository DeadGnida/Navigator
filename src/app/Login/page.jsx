"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import { LoginUser } from "@/api/login/loginApi";
import { parseJwt } from '@/api/jwt'; // сохраняй функцию в удобном месте
export default function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

// page.jsx


    // const handleLogin = async () => {
    //     setError("");
    //     try {
    //         const { token } = await LoginUser(login, password);
    //         const payload = parseJwt(token);
    //         document.cookie = `Authorization=${token}; path=/; SameSite=Lax Secure=false`;
    //         const role = payload?.role;
    //         console.log('Parsed role from token:', role);
    //
    //         sessionStorage.setItem("token", token);
    //         sessionStorage.setItem("user", JSON.stringify(payload));
    //
    //         if (role?.toLowerCase() === 'admin') {
    //             router.push('/admin-panel');
    //         } else {
    //             router.push('/');
    //         }
    //     } catch (e) {
    //         console.error(e);
    //         setError(e.message || "Ошибка входа");
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch('http://localhost:8080/auth/login', {  // замени на свой URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.message || "Ошибка входа");
                return;
            }

            const data = await res.json();
            // Предположим, что сервер вернёт токен в data.token
            // Сохраним токен в cookie через JS (лучше HTTPOnly ставить на бэкенде)
            document.cookie = `token=${data.token}; path=/; max-age=86400`; // 1 день

            // Перенаправим на админ панель или главную
            router.push('/admin-panel');
        } catch {
            setError("Ошибка сети, попробуйте позже");
        }
    };

    return (

        <div className={styles.loginContainer} >
            <form onSubmit={handleSubmit}>
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
            <button className={styles.loginBtn} type="submit">
                Войти
            </button>
            {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
}
