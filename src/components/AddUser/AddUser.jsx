/** components/AddUser/AddUser.jsx */
"use client";

import { useState } from "react";
import styles from "./AddUser.module.css";
import { createUser } from "@/lib/api";

export default function AddUser() {
    const [user, setUser] = useState({
        login: "",
        password: "",
        fullName: "",
        post: "",
        role: "user",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const submitForm = async () => {
        setError("");
        setSuccess("");
        try {
            await createUser(user);
            setSuccess("Пользователь успешно добавлен");
            setUser({ login: "", password: "", fullName: "", post: "", role: "user" });
        } catch (e) {
            setError("Ошибка при добавлении пользователя");
            console.error(e);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Добавить пользователя</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <div className={styles.inputGroup}>
                <input
                    value={user.login}
                    onChange={(e) => setUser({ ...user, login: e.target.value })}
                    placeholder="Логин"
                />
            </div>
            <div className={styles.inputGroup}>
                <input
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Пароль"
                />
            </div>
            <div className={styles.inputGroup}>
                <input
                    value={user.fullName}
                    onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                    placeholder="ФИО"
                />
            </div>
            <div className={styles.inputGroup}>
                <input
                    value={user.post}
                    onChange={(e) => setUser({ ...user, post: e.target.value })}
                    placeholder="Пост"
                />
            </div>
            <div className={styles.inputGroup}>
                <select
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button className={styles.button} onClick={submitForm}>Добавить</button>
        </div>
    );
}
