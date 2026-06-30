"use client";

import { useEffect, useState } from "react";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);

  async function fetchData() {
    const res = await fetch("/api/ewaste");
    const data = await res.json();
    setRequests(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function updateStatus(id, status) {
    await fetch("/api/ewaste", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    fetchData();
  }

  async function handleDelete(id) {
    const confirmDelete = confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    await fetch(`/api/ewaste?id=${id}`, {
      method: "DELETE",
    });

    fetchData();
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Pengajuan Limbah
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
        <th style={{ textAlign: "center" }}>Aksi</th>
      </tr>
    </thead>
    <tbody>
      {requests.map((item, index) => (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.jenis}</td>
          <td>{item.jumlah}</td>
          <td>{item.lokasi}</td>
          <td>
            <select
              value={item.status}
              onChange={(e) =>
                updateStatus(item.id, e.target.value)
              }
              className="border px-2 py-1 rounded"
            >
              <option>Baru</option>
              <option>Dijadwalkan</option>
              <option>Dijemput</option>
              <option>Selesai</option>
            </select>
          </td>
          <td style={{ textAlign: "center" }}>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-600 hover:opacity-70"
            >
              Hapus
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
}
