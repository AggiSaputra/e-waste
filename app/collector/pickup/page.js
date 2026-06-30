"use client";

import { useEffect, useState } from "react";

export default function CollectorPickup() {
  const [data, setData] = useState([]);

  async function fetchData() {
    const res = await fetch("/api/ewaste");
    const result = await res.json();

    const filtered = result.filter(
      (item) =>
        item.status === "Dijadwalkan" ||
        item.status === "Dijemput"
    );

    setData(filtered);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Penjemputan Limbah
      </h1>

<div className="table-wrapper">
  <table className="table-theme">
    <thead>
      <tr>
        <th>No</th>
        <th>Jenis</th>
        <th>Jumlah</th>
        <th>Lokasi</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.jenis}</td>
          <td>{item.jumlah}</td>
          <td>{item.lokasi}</td>
          <td>
            <span className="badge badge-info">
              {item.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
}
