"use client";

import { useEffect, useState } from "react";
import styles from "./UserList.module.css";
import { getAllUsers, deleteUser } from "@/lib/api";
import UpdateUser from "@/components/UpdateUser/UpdateUser";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null);

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

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (err) {
            console.error(err);
            setError("Не удалось удалить пользователя");
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Список пользователей</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {editingId ? (
                <UpdateUser id={editingId} />
            ) : (
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Логин</th>
                        <th>Пароль</th>
                        <th>ФИО</th>
                        <th>Роль</th>
                        <th>Пост</th>
                        <th>Взаимодействие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.login}</td>
                            <td>{user.password}</td>
                            <td>{user.fullName}</td>
                            <td>{user.role}</td>
                            <td>{user.post}</td>
                            <td>
                                <button onClick={() => setEditingId(user.id)}>Редактировать</button>
                                <button onClick={() => handleDelete(user.id)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
