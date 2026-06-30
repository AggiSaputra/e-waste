"use client";
import { useState } from "react";
import Link from "next/link";

export default function CustomerDashboard() {
  const [ewasteData] = useState([
    {
      id: 1,
      jenis: "Laptop",
      kondisi: "Rusak",
      status: "Menunggu",
      tanggal: "2026-02-10",
    },
    {
      id: 2,
      jenis: "Handphone",
      kondisi: "Mati Total",
      status: "Selesai",
      tanggal: "2026-02-05",
    },
  ]);

  return (
    <div className="container-page">
      <h1 className="section-title">
        Dashboard Penjual Limbah Elektronik
      </h1>

      {/* Quick Action */}
      <div className="mb-8">
        <Link href="/customer/submit-ewaste">
          <button className="button-primary">
            Ajukan Limbah Sekarang
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <p className="text-sm text-gray-500">Total Pengajuan</p>
          <p className="text-2xl font-bold">
            {ewasteData.length}
          </p>
        </div>

        <div className="card">
          <p className="text-sm text-gray-500">Status Terakhir</p>
          <span className="badge badge-warning">
            {ewasteData[0]?.status}
          </span>
        </div>

        <div className="card">
          <p className="text-sm text-gray-500">Limbah Terakhir</p>
          <p className="text-lg font-semibold">
            {ewasteData[0]?.jenis}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="card table-wrapper">
        <table className="table-theme">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Jenis</th>
              <th>Kondisi</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ewasteData.map((item) => (
              <tr key={item.id}>
                <td>{item.tanggal}</td>
                <td>{item.jenis}</td>
                <td>{item.kondisi}</td>
                <td>
                  <span className="badge badge-success">
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