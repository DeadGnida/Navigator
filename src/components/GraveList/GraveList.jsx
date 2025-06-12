"use client";
import {useEffect, useState} from "react";
import "./GraveList.css";

export default function GraveList({
                                      graves = [],
                                      role = "",
                                      onSelectGrave = () => {},
                                      onSelectGraveId = () => {},
                                      onSaveGrave = () => {},
                                      onDeleteGrave = () => {},
                                  }) {
    const [editingId, setEditingId] = useState(null);
    const [editedGrave, setEditedGrave] = useState({});



    const handleEdit = (grave) => {
        setEditingId(grave.id);
        setEditedGrave({ ...grave });
    };

    const handleSave = () => {
        onSaveGrave(editedGrave);
        setEditingId(null);
    };

    if (!graves || graves.length === 0) return <p>Нет данных для отображения</p>;

    return (
        <div className="grave-list">
            <h2>Список захоронений</h2>
            <ul>
                {graves.map((human) => (
                    <li key={human.id} className="grave-item">
                        {editingId === human.id ? (
                            <div>
                                <input
                                    value={editedGrave.full_name || ""}
                                    onChange={(e) =>
                                        setEditedGrave({ ...editedGrave, full_name: e.target.value })
                                    }
                                    placeholder="Имя"
                                />
                                <input
                                    value={editedGrave.date_birth || ""}
                                    onChange={(e) =>
                                        setEditedGrave({ ...editedGrave, date_birth: e.target.value })
                                    }
                                    placeholder="Год рождения"
                                />
                                <input
                                    value={editedGrave.date_death || ""}
                                    onChange={(e) =>
                                        setEditedGrave({ ...editedGrave, date_death: e.target.value })
                                    }
                                    placeholder="Год смерти"
                                />
                                <input
                                    value={editedGrave.registration || ""}
                                    onChange={(e) =>
                                        setEditedGrave({ ...editedGrave, registration: e.target.value })
                                    }
                                    placeholder="Адрес"
                                />
                                <button onClick={handleSave}>Сохранить</button>
                            </div>
                        ) : (
                            <div>
                                <h3>ФИО: {human.full_name}</h3>
                                <h3>Дата рождения: {new Date(human.date_birth).toLocaleDateString('ru-RU')}</h3>
                                <h3>Дата смерти: {new Date(human.date_death).toLocaleDateString('ru-RU')}</h3>
                                <button onClick={() => {
                                    onSelectGraveId(human.id)
                                    onSelectGrave(human)
                                }}>Посмотреть</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
