"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState, useMemo } from "react";

// 🔥 GENERATE 40 TITIK RANDOM DI JAKARTA
function generateLocations(count = 40) {
  const baseLat = -6.2;
  const baseLng = 106.816666;

  return Array.from({ length: count }, (_, i) => ({
    name: `Penadah ${i + 1}`,
    position: [
      baseLat + (Math.random() - 0.5) * 0.2, // random lat
      baseLng + (Math.random() - 0.5) * 0.2, // random lng
    ],
  }));
}

export default function MapInternal() {
  const [mounted, setMounted] = useState(false);

  // 🔥 generate sekali aja (biar ga berubah tiap render)
  const locations = useMemo(() => generateLocations(40), []);

  useEffect(() => {
    const customIcon = new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
      iconSize: [28, 28],
    });

    L.Marker.prototype.options.icon = customIcon;

    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-64 w-full">
      <MapContainer
        center={[-6.2, 106.816666]}
        zoom={11}
        className="h-full w-full rounded"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 🔥 40 MARKER */}
        {locations.map((loc, i) => (
          <Marker key={i} position={loc.position}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}