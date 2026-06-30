"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

export default function MapInternal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // fix icon
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-64 w-full">
      <MapContainer
        center={[-6.2, 106.816666]}
        zoom={11}
        scrollWheelZoom={false}
        className="h-full w-full rounded"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-6.2, 106.816666]}>
          <Popup>Lokasi Penjual</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}