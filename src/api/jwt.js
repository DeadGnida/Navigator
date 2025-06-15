// src/lib/jwt.js

/**
 * Расшифровывает payload из JWT без сторонних библиотек.
 * Корректно обрабатывает base64url + unicode.
 */
export function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            window.atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error('parseJwt error:', e);
        return null;
    }
}
