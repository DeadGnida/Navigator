
export async function GetHumans() {
    const response = await fetch('http://localhost:8080/human/getAllHuman')

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}