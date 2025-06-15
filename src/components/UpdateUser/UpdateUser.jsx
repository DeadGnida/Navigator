"use client";

import { useEffect, useState } from "react";
import styles from "./UpdateUser.module.css";
import { getUserById, updateUser } from "@/lib/api";

export default function UpdateUser({ id }) {
    const [user, setUser] = useState({
        login: "",
        password: "",
        fullName: "",
        post: "",
        role: "user",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const data = await getUserById(id);
                setUser({
                    login: data.login,
                    password: "",
                    fullName: data.fullName,
                    post: data.post,
                    role: data.role,
                });
            } catch (e) {
                console.error(e);
                setError("Не удалось загрузить данные пользователя");
            }
        })();
    }, [id]);

    const handleUpdate = async () => {
        setError("");
        setSuccess("");
        try {
            const payload = {
                login: user.login,
                ...(user.password ? { password: user.password } : {}),
                fullName: user.fullName,
                post: user.post,
                role: user.role,
            };
            await updateUser(id, payload);
            setSuccess("Пользователь обновлён");
            setUser((prev) => ({ ...prev, password: "" }));
        } catch (e) {
            console.error(e);
            setError("Ошибка при обновлении пользователя");
        }
    };

    return (
        <div>
            <h2>Редактировать пользователя</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <div className={styles.inputGroup}>
                <input
                    value={user.login}
                    onChange={(e) => setUser({ ...user, login: e.target.value })}
                    placeholder="Login"
                />
            </div>
            <div className={styles.inputGroup}>
                <input
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Новый пароль (оставьте пустым, если без изменений)"
                />
            </div>
            <div className={styles.inputGroup}>
                <input
                    value={user.fullName}
                    onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                    placeholder="Full Name"
                />
            </div>
            <div className={styles.inputGroup}>
                <input
                    value={user.post}
                    onChange={(e) => setUser({ ...user, post: e.target.value })}
                    placeholder="Post"
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
            <button onClick={handleUpdate}>Сохранить</button>
        </div>
    );
}
