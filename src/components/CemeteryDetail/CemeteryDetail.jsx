"use client";
import React from "react";
import "./CemeteryDetail.css";

import Map from '../Map/Map';

export default function CemeteryDetail({ grave }) {
    if (!grave) return null;

    // Подставим базовые тестовые данные, если grave не полон
    const testGrave = {
        name: 'Иван',
        surname: 'Иванов',
        patronymic: 'Иванович',
        birthYear: '1950',
        deathYear: '2020',
        address: 'Некое кладбище, Улица памяти, 5',
        description: 'Описание захоронения',
        latitude: 55.751574,
        longitude: 37.573856,
    };

    const graveData = {
        ...testGrave,
        ...grave,
    };

    return (
        <div className="grave-detail">
            <h2>Детали захоронения</h2>
            <h3>{graveData.name} {graveData.surname} {graveData.patronymic}</h3>
            <p>Дата рождения: {graveData.birthYear}</p>
            <p>Дата смерти: {graveData.deathYear}</p>
            <p>Место захоронения: {graveData.address}</p>
            <p>{graveData.description}</p>

            {/* Карта с координатами */}
            <Map
                coords={{ latitude: graveData.latitude, longitude: graveData.longitude }}
                info={{
                    name: graveData.name,
                    surname: graveData.surname,
                    birthYear: graveData.birthYear,
                    deathYear: graveData.deathYear,
                }}
            />
        </div>
    );
}