"use client";
import React, {useEffect} from "react";
import "./CemeteryDetail.css";

import Map from '../Map/Map';
import {GetByIdHuman} from "@/lib/burialsService";

export default function CemeteryDetail({ grave }) {
    const [human, setHuman] = React.useState();
    if (!grave) return null;
    useEffect(() => {
        const fetchHuman = async () => {
            try {
                const data = await GetByIdHuman(grave);
                setHuman(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchHuman();

    }, [grave]);

    useEffect(() => {
        console.log(human);
    }, [human]);


    const graveData = {
        ...human,
        ...grave,
    };

    return (
        <div className="grave-detail">
            {human && (
                <>
                    <h2>Детали захоронения</h2>
                    <h3>{human.fullName}</h3>

                    <p>Кладбище: {human.cemeteryName}</p>
                    <p>Участок: {human.placeName}</p>
                    <p>Адрес: {human.address}</p>

                    {/* Карта с координатами */}
                    {human.latitude && human.longitude && (
                        <Map
                            coords={{ latitude: human.latitude, longitude: human.longitude }}
                            info={{
                                address: human.address,
                                name: human.fullName,
                            }}
                        />
                    )}
                </>
            )}
        </div>
    );
}