"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const LeafletMap = dynamic(
  () => import("../../../components/LeafletMap"),
  { ssr: false }
);

export default function CollectorDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/ewaste")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  /* ================= SUMMARY ================= */

  const summary = useMemo(() => {
    const totalPenjual = new Set(data.map(d => d.lokasi)).size;

    const limbahMasuk = data.reduce(
      (total, item) => total + item.jumlah,
      0
    );

    const menunggu = data
      .filter(d => d.status === "Baru")
      .reduce((total, item) => total + item.jumlah, 0);

    const estimasiNilai = limbahMasuk * 50000;

    return {
      totalPenjual,
      limbahMasuk,
      menunggu,
      estimasiNilai: `Rp ${estimasiNilai.toLocaleString("id-ID")}`,
    };
  }, [data]);

  /* ================= CHART DATA ================= */

  const jenisData = useMemo(() => {
    const grouped = {};

    data.forEach(item => {
      if (!grouped[item.jenis]) {
        grouped[item.jenis] = 0;
      }
      grouped[item.jenis] += item.jumlah;
    });

    return Object.keys(grouped).map(jenis => ({
      jenis,
      jumlah: grouped[jenis],
    }));
  }, [data]);

  const tableData = data.slice(0, 5);

  return (
    <div className="p-8 space-y-8 h-fit">


      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card title="Total Lokasi" value={summary.totalPenjual} />
        <Card title="Limbah Masuk" value={`${summary.limbahMasuk} Unit`}  />
        <Card title="Menunggu Diproses" value={`${summary.menunggu} Unit`}  />
        <Card title="Estimasi Nilai" value={summary.estimasiNilai}/>
      </div>

      {/* CHART + MAP */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="card">
          <h2 className="font-semibold mb-4">Jumlah Limbah per Jenis</h2>

          <div className="flex items-end gap-6 h-48">
            {jenisData.map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                 className="bg-primary w-10 rounded-t-md"
                  style={{ height: `${item.jumlah * 5}px` }}
                />
                <span className="text-sm mt-2">{item.jenis}</span>
              </div>
            ))}
          </div>

          {jenisData.length === 0 && (
            <p className="text-gray-400 text-sm mt-4">
              Belum ada data.
            </p>
          )}
        </div>

        {/* MAP */}
        <div className="card">
          <h2 className="font-semibold mb-4">
            Sebaran Lokasi Penjual
          </h2>
          <LeafletMap />
        </div>

      </div>

      {/* TABLE */}
      <div className="card">
        <h2 className="font-semibold mb-4">
          Pengajuan Terbaru
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">No</th>
              <th className="text-left py-2">Jenis</th>
              <th className="text-left py-2">Jumlah</th>
              <th className="text-left py-2">Lokasi</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{item.jenis}</td>
                <td className="py-2">{item.jumlah}</td>
                <td className="py-2">{item.lokasi}</td>
                <td className="py-2">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tableData.length === 0 && (
          <p className="text-gray-400 mt-4">
            Belum ada pengajuan.
          </p>
        )}
      </div>

    </div>
  );
}

/* CARD */
function Card({ title, value }) {
  return (
    <div className="card">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold text-primary mt-2">
        {value}
      </h2>
    </div>
  );
}

/* STATUS BADGE */
function StatusBadge({ status }) {
  const colorMap = {
    Baru: "text-green-600",
    Dijadwalkan: "text-purple-600",
    Dijemput: "text-orange-600",
    Selesai: "text-blue-600",
  };

  return (
    <span className={colorMap[status] || "text-gray-600"}>
      {status}
    </span>
  );
}
