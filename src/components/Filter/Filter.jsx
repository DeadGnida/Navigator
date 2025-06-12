"use client";
import { useState } from "react";
import styles from "./Filter.module.css";

export default function Filter({ onFilterChange }) {
    const [searchFullName, setSearchFullName] = useState("");
    const [searchBirthYear, setSearchBirthYear] = useState("");
    const [searchDeathYear, setSearchDeathYear] = useState("");

    const handleChange = (field, value) => {
        if (field === "fullName") setSearchFullName(value);
        else if (field === "birthYear") setSearchBirthYear(value);
        else if (field === "deathYear") setSearchDeathYear(value);

        if (typeof onFilterChange === "function") {
            onFilterChange({
                fullName: field === "fullName" ? value : searchFullName,
                birthYear: field === "birthYear" ? value : searchBirthYear,
                deathYear: field === "deathYear" ? value : searchDeathYear,
            });
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
