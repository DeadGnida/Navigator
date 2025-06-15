export async function GetByIdHuman(id) {
    const response = await fetch(`http://localhost:8080/burial/getBurialByIdHuman/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}
