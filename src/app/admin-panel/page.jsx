/** app/admin-panel/page.jsx */
"use client";

import { useEffect, useState } from "react";
import AddUser from "@/components/AddUser/AddUser";
import UserList from "@/components/UserList/UserList";
import Logs from "@/components/Logs/Logs";

const tabs = [
    { id: "add-user", label: "Добавить пользователя" },
    { id: "users", label: "Список пользователей" },
    { id: "logs", label: "Логи" },
];

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState("add-user");


    const renderTabContent = () => {
        switch (activeTab) {
            case "add-user":
                return <AddUser />;
            case "users":
                return <UserList />;
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
