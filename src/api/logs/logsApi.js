// src/api/logs/logsApi.js

export async function getAllLogs() {
    const response = await fetch('http://localhost:8080/logs/getAllLogs', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}
