/** app/page.jsx */
"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header/Header";
import Filter from "@/components/Filter/Filter";
import GraveList from "@/components/GraveList/GraveList";
import CemeteryDetail from "@/components/CemeteryDetail/CemeteryDetail";
import Footer from "@/components/Footer/Footer";
import { getAllBurials, deleteBurial } from "@/lib/api";
import {GetHumans} from "@/lib/humanService";

export default function Home() {
    const [graves, setGraves] = useState([]);
    const [filteredGraves, setFilteredGraves] = useState([]);
    const [selectedGrave, setSelectedGrave] = useState(null);
    const [userRole, setUserRole] = useState("");




        useEffect(() => {
            const fetchHumans = async () => {
                try {
                    const data = await GetHumans();
                    const formatted = Array.isArray(data) ? data : [data];
                    setGraves(formatted); // сохраняем людей в graves
                } catch (err) {
                    console.error("Ошибка загрузки людей:", err);
                }
            };

            fetchHumans();
        }, []);


    const updateFilter = useCallback(
        (criteria) => {
            if (!graves) return;

            const result = graves.filter((grave) => {
                const fullName = grave.full_name.toLowerCase();
                const nameFilter = criteria.name ? criteria.name.toLowerCase() : "";
                const birthYearMatch = !criteria.birthYear || new Date(grave.date_birth).getFullYear().toString() === criteria.birthYear;
                const deathYearMatch = !criteria.deathYear || new Date(grave.date_death).getFullYear().toString() === criteria.deathYear;

                return (
                    (!nameFilter || fullName.includes(nameFilter)) &&
                    birthYearMatch &&
                    deathYearMatch
                );
            });

            setFilteredGraves(result);
        },
        [graves]
    );


    const selectGrave = (grave) => {
        setSelectedGrave(grave);
    };

    const updateGrave = (updatedGrave) => {
        // У Go‐сервиса нет PATCH для Burial, поэтому пока просто меняем локально
        const updated = graves.map((g) => (g.id === updatedGrave.id ? updatedGrave : g));
        setGraves(updated);
        setFilteredGraves(updated);
        if (selectedGrave?.id === updatedGrave.id) {
            setSelectedGrave(updatedGrave);
        }
    };

    const removeGrave = async (graveId) => {
        try {
            await deleteBurial(graveId);
            const updated = graves.filter((g) => g.id !== graveId);
            setGraves(updated);
            setFilteredGraves(updated);
            if (selectedGrave?.id === graveId) setSelectedGrave(null);
        } catch (err) {
            alert("Ошибка при удалении захоронения");
            console.error(err);
        }
    };

    return (
        <div>
            <Header />
            <Filter onFilterChange={updateFilter} />

                <GraveList
                    graves={filteredGraves}
                    role={userRole}
                    onSelectGrave={selectGrave}
                    onSaveGrave={updateGrave}
                    onDeleteGrave={removeGrave}
                />

            {selectedGrave && <CemeteryDetail grave={selectedGrave} />}
            <Footer />
        </div>
    );
}
