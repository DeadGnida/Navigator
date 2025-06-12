"use client";
import { useState, useEffect } from "react";
import styles from "./Filter.module.css";

export default function Filter({ onFilterChange }) {
    const [searchSurname, setSearchSurname] = useState("");
    const [searchName, setSearchName] = useState("");
    const [searchPatronymic, setSearchPatronymic] = useState("");
    const [searchBirthYear, setSearchBirthYear] = useState("");
    const [searchDeathYear, setSearchDeathYear] = useState("");

    useEffect(() => {
        if (typeof onFilterChange === "function") {
            onFilterChange({
                surname: searchSurname,
                name: searchName,
                patronymic: searchPatronymic,
                birthYear: searchBirthYear,
                deathYear: searchDeathYear,
            });
        }
    }, [searchSurname, searchName, searchPatronymic, searchBirthYear, searchDeathYear, onFilterChange]);

    return (
        <div className={styles["filter-container"]}>
            <input
                type="text"
                value={searchSurname}
                onChange={(e) => setSearchSurname(e.target.value)}
                placeholder="Фамилия"
            />
            <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Имя"
            />
            <input
                type="text"
                value={searchPatronymic}
                onChange={(e) => setSearchPatronymic(e.target.value)}
                placeholder="Отчество"
            />
            <input
                type="number"
                value={searchBirthYear}
                onChange={(e) => setSearchBirthYear(e.target.value)}
                placeholder="Год рождения"
            />
            <input
                type="number"
                value={searchDeathYear}
                onChange={(e) => setSearchDeathYear(e.target.value)}
                placeholder="Год смерти"
            />
        </div>
    );
}
