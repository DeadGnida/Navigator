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
    const [human, setHuman] = useState([]);
    const [filteredGraves, setFilteredGraves] = useState([]);
    const [selectedGrave, setSelectedGrave] = useState(null);
    const [selectedHumanId, setSelectedHumanId] = useState(null);
    const [userRole, setUserRole] = useState("");
    const [filteredGravesHuman, setFilteredGravesHuman] = useState([]);




        useEffect(() => {
            const fetchHumans = async () => {
                try {
                    const data = await GetHumans();
                    const formatted = Array.isArray(data) ? data : [data];
                    setGraves(formatted); // сохраняем людей в graves
                    setHuman(formatted);
                } catch (err) {
                    console.error("Ошибка загрузки людей:", err);
                }
            };

            fetchHumans();
        }, []);


    const updateFilter = useCallback((criteria) => {
        const result = human.filter((person) => {
            const fullName = person.full_name.toLowerCase();
            const birthYear = person.date_birth ? new Date(person.date_birth).getUTCFullYear() : null;
            const deathYear = person.date_death ? new Date(person.date_death).getUTCFullYear() : null;

            const matchesFullName =
                !criteria.fullName || fullName.includes(criteria.fullName.toLowerCase());

            const matchesBirthYear =
                criteria.birthYear === "" || (birthYear !== null && birthYear === Number(criteria.birthYear));

            const matchesDeathYear =
                criteria.deathYear === "" || (deathYear !== null && deathYear === Number(criteria.deathYear));

            return matchesFullName && matchesBirthYear && matchesDeathYear;
        });

        setFilteredGraves(result);
    }, [human]);
    const updateFilterHuman = (filtered) => {
        setFilteredGravesHuman(filtered);
    };

    const selectGrave = (grave) => {
        setSelectedGrave(grave);
    };

    const selectGraveId = (grave) => {
        setSelectedHumanId(grave);
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
            <Filter humans={human}  onFilterChange={updateFilter} />

                <GraveList

                    graves={filteredGraves.length > 0 ? filteredGraves : human}
                    role={userRole}
                    onSelectGrave={selectGrave}
                    onSelectGraveId={selectGraveId}
                    onSaveGrave={updateGrave}
                    onDeleteGrave={removeGrave}
                />

            {selectedGrave && <CemeteryDetail grave={selectedHumanId} />}
            <Footer />
        </div>
    );
}
