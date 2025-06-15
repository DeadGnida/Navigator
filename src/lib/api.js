// lib/api.js
const API_BASE = "http://localhost:8080";


// ------------- Работа с захоронениями (burial) -------------
export async function getAllBurials() {
    const res = await fetch(`${API_BASE}/burial/getAllBurial`);
    if (!res.ok) throw new Error("Не удалось загрузить список захоронений");
    return await res.json();
}

export async function getBurialById(id) {
    const res = await fetch(`${API_BASE}/burial/getBurialById/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Не удалось загрузить данные конкретного захоронения");
    return await res.json();
}

export async function createBurial(payload) {
    const res = await fetch(`${API_BASE}/burial/createBurial`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Не удалось создать захоронение");
    return await res.json();
}

export async function deleteBurial(id) {
    const res = await fetch(`${API_BASE}/burial/deleteBurial/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Не удалось удалить захоронение");
    return await res.json();
}

// У Go-роут есть только GET getAllBurial, POST getBurialById, POST createBurial и DELETE deleteBurial.
// Обновления (update) для Burial в вашем роуте нет. Если понадобится, добавьте PUT/PATCH в бэкенде.

// ------------- Работа с пользователями (user) -------------
export async function getAllUsers() {
    const res = await fetch(`${API_BASE}/user/getAllUser`, {credentials: "include"});
    if (!res.ok) throw new Error("Не удалось получить список пользователей");
    return await res.json();
}

export async function getUserById(id) {
    const res = await fetch(`${API_BASE}/user/getUserById/${id}`,{credentials: "include"});
    if (!res.ok) throw new Error("Не удалось получить пользователя по ID");
    return await res.json();
}

export async function createUser(payload) {
    const res = await fetch(`${API_BASE}/user/createUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Не удалось создать пользователя");
    return await res.json();
}

export async function deleteUser(id) {
    const res = await fetch(`http://localhost:8080/user/deleteUser/${id}`, {
        method: 'DELETE',
        credentials: "include"
    });
    if (!res.ok) throw new Error('Ошибка удаления');
}
export async function updateUser(id, payload) {
    const res = await fetch(`http://localhost:8080/user/updateUser/${id}`, {
        method: 'PATCH',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Ошибка обновления');
}


// ------------- Простейшая «авторизация» через fetch всех юзеров -------------
// У вас в бэкенде нет отдельного /login, поэтому на клиенте просто
// берём всех пользователей и сверяем пару login/password.
// В продакшене лучше сделать отдельный endpoint, но пока так:

export async function loginRequest(login, password) {
    const all = await getAllUsers();
    const found = all.find((u) => u.login === login && u.password === password);
    if (!found) throw new Error("Неверный логин или пароль");
    if (found.status === "ban") throw new Error("Вы заблокированы");
    return found; // возвращаем объект пользователя целиком (id, role, post и т.д.)
}
// В lib/api.js
export async function getAllCemeteries() {
    const res = await fetch(`${API_BASE}/cemetery/getAllCemetery`);
    if (!res.ok) throw new Error("Ошибка получения кладбищ");
    return await res.json();
}
