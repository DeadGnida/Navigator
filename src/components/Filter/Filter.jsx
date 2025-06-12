"use client";
import { useState } from "react";
import styles from "./Filter.module.css";

export default function Filter({ humans, onFilterChange }) {
    const [searchFullName, setSearchFullName] = useState("");
    const [searchBirthYear, setSearchBirthYear] = useState("");
    const [searchDeathYear, setSearchDeathYear] = useState("");

    const handleChange = (field, value) => {
        // Обновляем локальное состояние фильтров
        if (field === "fullName") setSearchFullName(value);
        else if (field === "birthYear") setSearchBirthYear(value);
        else if (field === "deathYear") setSearchDeathYear(value);

        // Формируем новый объект фильтров с учётом текущего изменения
        const newFilter = {
            fullName: field === "fullName" ? value : searchFullName,
            birthYear: field === "birthYear" ? value : searchBirthYear,
            deathYear: field === "deathYear" ? value : searchDeathYear,
        };

        // Фильтруем массив human по новым фильтрам
        const filteredHumans = humans.filter((person) => {
            const matchesFullName =
                newFilter.fullName === "" ||
                person.full_name.toLowerCase().includes(newFilter.fullName.toLowerCase());

            // Получаем год из строки даты рождения, например "2030-12-05T00:00:00Z" -> 2030
            const birthYear = person.date_birth ? new Date(person.date_birth).getUTCFullYear() : null;
            const deathYear = person.date_death ? new Date(person.date_death).getUTCFullYear() : null;
            console.log("Проверка", birthYear, deathYear);
            const matchesBirthYear =
                newFilter.birthYear === "" ||
                (birthYear !== null && birthYear === Number(newFilter.birthYear));

            const matchesDeathYear =
                newFilter.deathYear === "" ||
                (deathYear !== null && deathYear === Number(newFilter.deathYear));

            return matchesFullName && matchesBirthYear && matchesDeathYear;
        });


        console.log(
            filteredHumans.length > 0
                ? JSON.stringify(filteredHumans, null, 2)
                : "Ничего не найдено"
        );

        // Если есть внешний обработчик — вызываем его
        if (typeof onFilterChange === "function") {
            onFilterChange(newFilter); // ✅ передаём только критерии
        }

    };

    return (
        <div className={styles["filter-container"]}>
            <input
                type="text"
                value={searchFullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="ФИО"
            />
            <input
                type="number"
                value={searchBirthYear}
                onChange={(e) => handleChange("birthYear", e.target.value)}
                placeholder="Год рождения"
            />
            <input
                type="number"
                value={searchDeathYear}
                onChange={(e) => handleChange("deathYear", e.target.value)}
                placeholder="Год смерти"
            />
        </div>
    );
}
