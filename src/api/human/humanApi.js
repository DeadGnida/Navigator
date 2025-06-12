export async function getAllHuman() {
    const response = await fetch('http://localhost:8080/human/getAllHuman');

    if (!response.ok) {
        throw new Error("Не удалось загрузить список человек");
    }
    alert(JSON.stringify(response));

    return await response.json();
}