// components/GraveList/GraveList.jsx
"use client";
import {useEffect, useState} from "react";
import "./GraveList.css";
import {getAllHuman} from "@/api/human/humanApi";

export default function GraveList({
                                      graves = [],
                                      role = "",
                                      onSelectGrave = () => {},
                                      onSaveGrave = () => {},
                                      onDeleteGrave = () => {},
                                  }) {
    const [editingId, setEditingId] = useState(null);
    const [editedGrave, setEditedGrave] = useState({});
    const [human, setHuman] = useState([]);
    // Если grave из props пустой, можно показать тестовые,
    // но лучше всё‐таки требовать, чтобы пропс graves пришёл из API.
    const data = graves;

    const handleEdit = (grave) => {
        setEditingId(grave.id);
        setEditedGrave({ ...grave });
    };

    const handleSave = async () => {
        // Здесь мы просто вызываем onSaveGrave(editedGrave);
        // Если появится API для обновления, можно делать fetch и ждать ответа.
        onSaveGrave(editedGrave);
        setEditingId(null);
    };
    // useEffect(() => {
    //     getAllHuman()
    //         .then(setHuman)
    //         .catch(console.error);
    //
    // }, []);
    //
    // useEffect(() => {
    //     human.map((item) => {
    //         console.log(item);
    //     });
    //
    // }, [human]);
    return (
        <div className="grave-list">
            <h2>Список захоронений</h2>
            <ul>
                {data === null ? "Данных нету" : data.map((grave) => (
                    <li key={grave.id} className="grave-item">
                        {editingId === grave.id ? (
                            <div>
                                <input
                                    value={editedGrave.name || ""}
                                    onChange={(e) =>
                                        setEditedGrave({ ...editedGrave, name: e.target.value })
                                    }
                                    placeholder="Имя"
                                />
                                <input
                                    value={editedGrave.surname || ""}
                                    onChange={(e) =>
                                        setEditedGrave({ ...editedGrave, surname: e.target.value })
                                    }
                                    placeholder="Фамилия"
                                />
                                <input
                                    value={editedGrave.birthYear || ""}
                                    onChange={(e) =>
                                        setEditedGrave({
                                            ...editedGrave,
                                            birthYear: e.target.value,
                                        })
                                    }
                                    placeholder="Год рождения"
                                />
                                <input
                                    value={editedGrave.deathYear || ""}
                                    onChange={(e) =>
                                        setEditedGrave({
                                            ...editedGrave,
                                            deathYear: e.target.value,
                                        })
                                    }
                                    placeholder="Год смерти"
                                />
                                <input
                                    value={editedGrave.address || ""}
                                    onChange={(e) =>
                                        setEditedGrave({ ...editedGrave, address: e.target.value })
                                    }
                                    placeholder="Адрес"
                                />
                                <textarea
                                    value={editedGrave.description || ""}
                                    onChange={(e) =>
                                        setEditedGrave({
                                            ...editedGrave,
                                            description: e.target.value,
                                        })
                                    }
                                    placeholder="Описание"
                                />
                                <button onClick={handleSave}>Сохранить</button>
                            </div>
                        ) : (
                            <div onClick={() => onSelectGrave(grave)}>
                                <h3>
                                    {grave.fullName || `${grave.name} ${grave.surname}`}
                                </h3>
                                <p>Кладбище: {grave.cemeteryName || grave.address}</p>
                                <p>Дата: {grave.createdAt?.slice(0, 10)}</p>
                            </div>
                        )}

                        {role === "user" && editingId !== grave.id && (
                            <div className="grave-actions">
                                <button onClick={() => handleEdit(grave)}>Редактировать</button>
                                <button onClick={() => onDeleteGrave(grave.id)}>Удалить</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
