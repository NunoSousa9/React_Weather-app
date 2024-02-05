import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const WorldMap = ({ citiesData, onCityClick }) => {
    return (
        <MapContainer center={[0, 0]} zoom={2.5} style={{ height: '100vh', width: '100%', boxShadow: '0 0 10px rgba(200, 200, 200, 2' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {citiesData.map((city) => (
                <Marker key={city.id} position={[city.coord.lat, city.coord.lon]} onClick={() => onCityClick(city)}>
                    <Popup>{city.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default WorldMap;