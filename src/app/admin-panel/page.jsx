/** app/admin-panel/page.jsx */
"use client";

import { useEffect, useState } from "react";
import AddUser from "@/components/AddUser/AddUser";
import UpdateUser from "@/components/UpdateUser/UpdateUser";
import GraveList from "@/components/GraveList/GraveList";
import UserList from "@/components/UserList/UserList";
import Logs from "@/components/Logs/Logs";
import { getAllBurials, deleteBurial } from "@/lib/api";

const tabs = [
    { id: "add-user", label: "Добавить пользователя" },
    { id: "edit-user", label: "Редактировать пользователя" },
    { id: "users", label: "Список пользователей" },
    { id: "graves", label: "Захоронения" },
    { id: "logs", label: "Логи" },
];

export default function AdminPanel() {
    const [graves, setGraves] = useState([]);
    const [selectedGrave, setSelectedGrave] = useState(null);
    const [activeTab, setActiveTab] = useState("add-user");

    useEffect(() => {
        // При монтировании админки один раз загружаем все захоронения
        (async () => {
            try {
                const data = await getAllBurials();
                setGraves(data);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    const handleSelectGrave = (grave) => setSelectedGrave(grave);
    const handleSaveGrave = (updatedGrave) => {
        // Пока только локально
        setGraves((prev) =>
            prev.map((g) => (g.id === updatedGrave.id ? updatedGrave : g))
        );
    };
    const handleDeleteGrave = async (id) => {
        try {
            await deleteBurial(id);
            setGraves((prev) => prev.filter((g) => g.id !== id));
            if (selectedGrave?.id === id) setSelectedGrave(null);
        } catch (err) {
            alert("Ошибка при удалении на сервере");
            console.error(err);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "add-user":
                return <AddUser />;
            case "edit-user":
                // Здесь можно передавать реальное selectedUserId, но в примере просто 1
                return <UpdateUser id={1} />;
            case "users":
                return <UserList />;
            case "graves":
                return (
                    <GraveList
                        graves={graves}
                        role="admin"
                        onSelectGrave={handleSelectGrave}
                        onSaveGrave={handleSaveGrave}
                        onDeleteGrave={handleDeleteGrave}
                    />
                );
            case "logs":
                return <Logs />;
            default:
                return null;
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Панель администратора
            </h1>
            <div className="flex flex-wrap gap-3 justify-center mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-5 py-2.5 rounded-2xl font-semibold transition-all duration-200 ease-in-out shadow hover:shadow-lg focus:outline-none ${
                            activeTab === tab.id
                                ? "bg-blue-700 text-white"
                                : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <section className="bg-white p-8 rounded-2xl shadow-lg max-w-5xl mx-auto border border-gray-200">
                {renderTabContent()}
            </section>
        </main>
    );
}
