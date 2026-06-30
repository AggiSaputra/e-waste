"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});

export default function CustomerHome() {
  const [data] = useState([
    { bulan: "Jan", jumlah: 40 },
    { bulan: "Feb", jumlah: 55 },
    { bulan: "Mar", jumlah: 48 },
    { bulan: "Apr", jumlah: 60 },
    { bulan: "Mei", jumlah: 52 },
    { bulan: "Jun", jumlah: 70 },
  ]);

  // 🔥 ambil sampai bulan sekarang
  const currentMonthIndex = new Date().getMonth(); // 0 = Jan
  const visibleData = data.slice(0, currentMonthIndex + 1);

  /* ================= CALC ================= */

  const total = useMemo(
    () => visibleData.reduce((sum, d) => sum + d.jumlah, 0),
    [visibleData]
  );

  const max = useMemo(
    () => Math.max(...visibleData.map((d) => d.jumlah), 1),
    [visibleData]
  );

  const growth = useMemo(() => {
    if (visibleData.length < 2) return 0;
    const last = visibleData[visibleData.length - 1].jumlah;
    const prev = visibleData[visibleData.length - 2].jumlah;
    return ((last - prev) / prev) * 100;
  }, [visibleData]);

  return (
    <div className="container-page space-y-10">

{/* HERO - STARTUP STYLE */}
<div className="card flex flex-col md:flex-row items-center justify-between gap-10">

  {/* LEFT */}
  <div className="max-w-lg">
    <p className="text-sm text-primary font-semibold mb-2">
      🌱 Go Green Movement
    </p>

    <h1 className="text-4xl font-bold leading-tight mb-4">
      Jual Limbah Elektronikmu
      <span className="text-primary"> dengan Mudah</span>
    </h1>

    <p className="text-gray-600 mb-6">
      Kelola limbah elektronik seperti HP, Laptop, dan TV dengan
      cara yang lebih cerdas, cepat, dan ramah lingkungan.
    </p>

    <div className="flex items-center gap-4">
      <Link href="/customer/submit-ewaste">
        <button className="button-primary">
          Ajukan Sekarang
        </button>
      </Link>

      <span className="text-sm text-gray-500">
        ⚡ Proses cepat & aman
      </span>
    </div>
  </div>

  {/* RIGHT */}
  <div className="w-72 h-48 rounded-2xl bg-gradient-to-br from-green-100 to-green-300 flex flex-col justify-center items-center shadow-inner">

    <div className="text-5xl mb-2">♻️</div>

    <p className="text-sm text-gray-600">Total Limbah Terkelola</p>
    <h2 className="text-2xl font-bold text-green-700">
      325 Unit
    </h2>

  </div>

</div>

      {/* MAP + INFO */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-primary">
            Sebaran Lokasi penadah
          </h2>
          <LeafletMap />
        </div>

        <div className="card flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-4 text-primary">
            Kenapa Pilih E-Cycle?
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li>✔ Penjemputan langsung ke lokasi</li>
            <li>✔ Pengelolaan limbah aman & ramah lingkungan</li>
            <li>✔ Proses cepat dan transparan</li>
          </ul>
        </div>
      </div>

      {/* CHART */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-2 text-primary">
          Tren Limbah Masuk
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Periode: {visibleData[0]?.bulan} - {visibleData[visibleData.length - 1]?.bulan}
        </p>

        <div className="grid grid-cols-3 gap-6">

          {/* CHART */}
          <div className="col-span-2">
            <div className="flex items-end justify-between h-48 px-4 border-t border-gray-100 pt-6">
              {visibleData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    title={`${item.jumlah} unit`}
                    className="bg-primary w-8 rounded-t-md transition-all duration-500 hover:opacity-80"
                    style={{
                      height: `${(item.jumlah / max) * 150}px`,
                    }}
                  />
                  <span className="text-sm mt-2 text-gray-600">
                    {item.bulan}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* INSIGHT */}
          <div className="flex flex-col justify-center gap-5">
            <div>
              <p className="text-sm text-gray-500">Total Limbah</p>
              <h3 className="text-2xl font-bold text-primary">
                {total} Unit
              </h3>
            </div>

            <div>
              <p className="text-sm text-gray-500">Pertumbuhan</p>
              <h3
                className={`text-lg font-semibold ${
                  growth >= 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {growth.toFixed(1)}%
              </h3>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}