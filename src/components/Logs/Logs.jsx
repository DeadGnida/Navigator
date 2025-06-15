// components/Logs/Logs.jsx
"use client";
import { useState, useEffect } from "react";
import { getAllLogs } from "@/api/logs/logsApi";
import styles from "./Logs.module.css";
export default function Logs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const data = await getAllLogs();
                setLogs(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <p>Загрузка логов...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (logs === 0) return <p>Логи не найдены</p>;

    return (
        <div>
            <h2>Журнал событий</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th><th>Время</th><th>Пользователь</th><th>Действие</th><th>Детали</th>
                </tr>
                </thead>
                <tbody>
                {logs.map(log => (
                    <tr key={log.id}>
                        <td>{log.id}</td>
                        <td>{new Date(log.timestamp).toLocaleString("ru-RU")}</td>
                        <td>{log.user}</td>
                        <td>{log.action}</td>
                        <td>{log.details}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
