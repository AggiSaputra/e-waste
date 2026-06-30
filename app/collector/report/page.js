"use client";

import { useEffect, useState, useRef } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useReactToPrint } from "react-to-print";

export default function CollectorReport() {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("all");

  // ================= PRINT / PDF =================
  const reportRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: reportRef,
    documentTitle: "laporan-ewaste",
  });

  // ================= FETCH DATA =================
  async function fetchData() {
    const res = await fetch("/api/ewaste");
    const result = await res.json();
    setData(result);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // ================= FILTER =================
  const filteredData = data.filter((item) => {
    if (period === "all") return true;

    const itemDate = new Date(item.createdAt);
    const now = new Date();

    if (period === "today") {
      return itemDate.toDateString() === now.toDateString();
    }

    if (period === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      return itemDate >= weekAgo;
    }

    if (period === "month") {
      return (
        itemDate.getMonth() === now.getMonth() &&
        itemDate.getFullYear() === now.getFullYear()
      );
    }

    return true;
  });

  // ================= KPI =================
  const total = filteredData.length;

  const selesai = filteredData.filter(
    (i) => i.status === "Selesai"
  ).length;

  const completionRate =
    total === 0
      ? 0
      : ((selesai / total) * 100).toFixed(1);

  const totalBarang = filteredData.reduce(
    (sum, item) => sum + Number(item.jumlah),
    0
  );

  // ================= STATUS CHART =================
  const statusCount = [
    "Baru",
    "Dijadwalkan",
    "Dijemput",
    "Selesai",
  ].map((status) => ({
    name: status,
    total: filteredData.filter(
      (i) => i.status === status
    ).length,
  }));

  // ================= JENIS CHART =================
  const jenisMap = {};

  filteredData.forEach((item) => {
    jenisMap[item.jenis] =
      (jenisMap[item.jenis] || 0) +
      Number(item.jumlah);
  });

  const jenisData = Object.keys(jenisMap).map(
    (key) => ({
      name: key,
      total: jenisMap[key],
    })
  );

  return (
    <div className="p-8 space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Laporan Analytics
        </h1>

        <button
          onClick={handlePrint}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Unduh PDF
        </button>
      </div>

      {/* REPORT CONTENT */}
      <div ref={reportRef} className="bg-white p-4">

        {/* FILTER */}
        <div>
          <select
            value={period}
            onChange={(e) =>
              setPeriod(e.target.value)
            }
            className="border px-4 py-2 rounded"
          >
            <option value="all">Semua</option>
            <option value="today">Hari Ini</option>
            <option value="week">
              7 Hari Terakhir
            </option>
            <option value="month">
              Bulan Ini
            </option>
          </select>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-4 gap-6 mt-6">
          <Card
            title="Total Pengajuan"
            value={total}
          />

          <Card
            title="Selesai"
            value={selesai}
          />

          <Card
            title="Completion Rate"
            value={`${completionRate}%`}
          />

          <Card
            title="Total Barang"
            value={totalBarang}
          />
        </div>

        {/* CHART */}
        <div className="grid grid-cols-2 gap-8 mt-8">
          <ChartBox
            title="Distribusi Status"
            data={statusCount}
          />

          <ChartBox
            title="Distribusi Jenis Limbah"
            data={jenisData}
          />
        </div>

        {/* TABLE */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Rekap Data Lengkap
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">

              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">
                    No
                  </th>

                  <th className="border px-4 py-2">
                    Jenis
                  </th>

                  <th className="border px-4 py-2">
                    Jumlah
                  </th>

                  <th className="border px-4 py-2">
                    Status
                  </th>

                  <th className="border px-4 py-2">
                    Tanggal
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">
                      {index + 1}
                    </td>

                    <td className="border px-4 py-2">
                      {item.jenis}
                    </td>

                    <td className="border px-4 py-2">
                      {item.jumlah}
                    </td>

                    <td className="border px-4 py-2">
                      {item.status}
                    </td>

                    <td className="border px-4 py-2">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

// ================= CARD =================
function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded p-6 border">
      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-2xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}

// ================= CHART =================
function ChartBox({ title, data }) {
  return (
    <div className="bg-white shadow rounded p-6 border">

      <h3 className="mb-4 font-semibold">
        {title}
      </h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="total" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}
