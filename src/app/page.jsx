/** app/page.jsx */
"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header/Header";
import Filter from "@/components/Filter/Filter";
import GraveList from "@/components/GraveList/GraveList";
import CemeteryDetail from "@/components/CemeteryDetail/CemeteryDetail";
import Footer from "@/components/Footer/Footer";
import { getAllBurials, deleteBurial } from "@/lib/api";

export default function Home() {
    const [graves, setGraves] = useState([]);
    const [filteredGraves, setFilteredGraves] = useState([]);
    const [selectedGrave, setSelectedGrave] = useState(null);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        // При загрузке страницы ‒ подгружаем все захоронения с сервера
        (async () => {
            try {
                const data = await getAllBurials();
                setGraves(data);
                setFilteredGraves(data);
            } catch (err) {
                console.error(err);
            }
        })();

        // Если в sessionStorage есть user, достаём роль
        const sessionUser = sessionStorage.getItem("user");
        if (sessionUser) {
            const usr = JSON.parse(sessionUser);
            setUserRole(usr.role);
        }
    }, []);

    const updateFilter = useCallback(
        (criteria) => {
            if (graves === null) return;
            const result = graves.filter((grave) => {
                return (
                    (!criteria.surname || grave.fullName.includes(criteria.surname)) &&
                    (!criteria.name || grave.fullName.includes(criteria.name)) &&
                    (!criteria.birthYear || grave.createdAt?.slice(0, 4) == criteria.birthYear) &&
                    (!criteria.deathYear || grave.createdAt?.slice(0, 4) == criteria.deathYear)
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
            {filteredGraves === null && (
                <GraveList
                    graves={filteredGraves}
                    role={userRole}
                    onSelectGrave={selectGrave}
                    onSaveGrave={updateGrave}
                    onDeleteGrave={removeGrave}
                />
            )}
            {selectedGrave && <CemeteryDetail grave={selectedGrave} />}
            <Footer />
        </div>
    );
}
