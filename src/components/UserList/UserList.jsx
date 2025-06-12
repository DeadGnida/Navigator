/** components/UserList/UserList.jsx */
"use client";

import { useEffect, useState } from "react";
import styles from "./UserList.module.css";
import { getAllUsers } from "@/lib/api";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (err) {
                console.error(err);
                setError("Не удалось загрузить пользователей");
            }
        })();
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Список пользователей</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Login</th>
                    <th>Full Name</th>
                    <th>Role</th>
                    <th>Post</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.login}</td>
                        <td>{user.fullName}</td>
                        <td>{user.role}</td>
                        <td>{user.post}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
