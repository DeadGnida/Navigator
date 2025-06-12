'use client';
import { useEffect, useRef } from 'react';
import "./Map.css"
export default function Map({ coords, info }) {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!coords || !info) return;

        const { latitude, longitude } = coords;

        const initMap = () => {
            const map = new window.ymaps.Map(mapRef.current, {
                center: [latitude, longitude],
                zoom: 15,
                controls: ['zoomControl', 'fullscreenControl'],
            });

            const balloonHtml = `
                <strong>${info.name} ${info.surname}</strong><br />
                <p>Дата рождения: ${info.birthYear || '—'}</p>
                <p>Дата смерти: ${info.deathYear || '—'}</p>
                <button onclick="window.open('https://yandex.ru/maps/?rtext=${latitude},${longitude}&rtt=auto')">
                    Проложить маршрут
                </button>
            `;

            const placemark = new window.ymaps.Placemark([latitude, longitude], {
                balloonContentHeader: `${info.name} ${info.surname}`,
                balloonContent: balloonHtml,
            }, {
                preset: 'islands#icon',
                iconColor: '#0095b6',
            });

            map.geoObjects.add(placemark);
        };

        window.ymaps.ready(initMap);
    }, [coords, info]);

    return (
        <div ref={mapRef} className="map-container" />
    );
}
