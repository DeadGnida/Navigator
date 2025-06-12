// components/GraveList/GraveList.jsx
"use client";
import {useEffect, useState} from "react";
import "./GraveList.css";
import {getAllHuman} from "@/api/human/humanApi";
import {GetHumans} from "@/lib/humanService";
import {GetBurials} from "@/lib/burialsService";



export default function GraveList({ graves = [],
                                      role = "",
                                      onSelectGrave = () => {},
                                      onSaveGrave = () => {},
                                      onDeleteGrave = () => {},}) {
    const [editingId, setEditingId] = useState(null);
    const [editedGrave, setEditedGrave] = useState({});
    const [humans, setHuman] = useState([])



    const handleEdit = (grave) => {
        setEditingId(grave.id);
        setEditedGrave({ ...grave });
    };



    useEffect(() => {
        GetHumans()
            .then(data => {
                const formatted = Array.isArray(data) ? data : [data];
                setHuman(formatted);
            })
            .catch(err => setError(err.message || "Ошибка загрузки людей"));
    }, []);


    if (humans === null) return "Данных нету";
    return (
        <div className="grave-list">
            <h2>Список захоронений</h2>
            <ul>
                {humans.map((human) => (
                    <li key={human.id} className="grave-item">
                        {editingId === human.id ? (
                            <div>
                                <input
                                    value={editedGrave.full_name || ""}
                                    onChange={(e) =>
                                        setEditedGrave({ ...editedGrave, name: e.target.value })
                                    }
                                    placeholder="Имя"
                                />
                                <input
                                    value={editedGrave.date_birth || ""}
                                    onChange={(e) =>
                                        setEditedGrave({ ...editedGrave, birthYear: e.target.value })
                                    }
                                    placeholder="Год рождения"
                                />
                                <input
                                    value={editedGrave.date_death || ""}
                                    onChange={(e) =>
                                        setEditedGrave({ ...editedGrave, deathYear: e.target.value })
                                    }
                                    placeholder="Год смерти"
                                />
                                <input
                                    value={editedGrave.registration || ""}
                                    onChange={(e) =>
                                        setEditedGrave({ ...editedGrave, address: e.target.value })
                                    }
                                    placeholder="Адрес"
                                />
                                <button onClick={handleSave}>Сохранить</button>
                            </div>
                        ) : (
                            <div>
                                <h3>ФИО:{human.full_name}</h3>
                                <h3>Дата рождения: {new Date(human.date_birth).toLocaleDateString('ru-RU')}</h3>
                                <h3>Дата смерти: {new Date(human.date_death).toLocaleDateString('ru-RU')}</h3>
                                <button onClick={() => onSelectGrave(human.id)}>Посмотреть</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
