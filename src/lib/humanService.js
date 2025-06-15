
export async function GetHumans() {
    const response = await fetch('http://localhost:8080/human/getAllHuman',{credentials: 'include'})

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}
export async function updateHuman(human) {
    const res = await fetch(`http://localhost:8080/human/putHuman/${human.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(human),
    });
    if (!res.ok) throw new Error('Ошибка обновления');
    return res.json();
}

export async function deleteHuman(id) {
    const res = await fetch(`http://localhost:8080/human/deleteHuman/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });
    if (!res.ok) throw new Error('Ошибка удаления');
}