// components/CemeteryList/CemeteryList.jsx

'use client';

import { useEffect, useState } from 'react';
import { getAllCemeteries } from '@/lib/api'; // ✅ импорт API-функции
import styles from './CemeteryList.module.css';

export default function CemeteryList({ onSelectCemetery }) {
    const [cemeteries, setCemeteries] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchCemeteries = async () => {
            try {
                const data = await getAllCemeteries();
                setCemeteries(data);
            } catch (err) {
                setError('Не удалось загрузить кладбища');
                console.error(err);
            }
        };



    return (
        <div className={styles.cemeteryList}>
            <h2>Кладбища</h2>
            {error && <p className={styles.error}>{error}</p>}
            <ul>
                {cemeteries.map((cem) => (
                    <li
                        key={cem.id}
                        className={styles.cemeteryItem}
                        onClick={() => onSelectCemetery(cem)}
                    >
                        {cem.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
