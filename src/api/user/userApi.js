export async function getAllUser() {
    const response = await fetch('http://localhost:8080/user/getAllUser',{credentials: "include"});

    if (!response.ok) {
        throw new Error("Не удалось загрузить список пользователей");
    }

    const data = await response.json();
    return data;
}
