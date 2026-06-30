"use client";

import { useState } from "react";

export default function SubmitEwastePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lokasi, setLokasi] = useState("");

  async function getCurrentLocation() {
    if (!navigator.geolocation) {
      alert("Browser tidak support lokasi");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );
          const data = await res.json();

          if (data.display_name) {
            setLokasi(data.display_name);
          } else {
            setLokasi(`${latitude}, ${longitude}`);
          }
        } catch {
          setLokasi(`${latitude}, ${longitude}`);
        }
      },
      () => {
        alert("Gagal mengambil lokasi");
      },
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(e.target);

    const payload = {
      jenis: formData.get("jenis"),
      jumlah: Number(formData.get("jumlah")),
      lokasi: formData.get("lokasi"),
      kondisi: formData.get("kondisi"),
    };

    try {
      const res = await fetch("/api/ewaste", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal kirim");

      setSuccess(true);
      e.target.reset();
      setLokasi(""); // 🔥 penting
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6">Ajukan Limbah Elektronik</h1>

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            Pengajuan berhasil dikirim!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Jenis */}
          <div>
            <label className="block mb-2 font-medium">Jenis Limbah</label>
            <select
              name="jenis"
              className="w-full border p-3 rounded-lg"
              required
            >
              <option value="HP">HP</option>
              <option value="Laptop">Laptop</option>
              <option value="TV">TV</option>
            </select>
          </div>

          {/* Jumlah */}
          <div>
            <label className="block mb-2 font-medium">Jumlah Unit</label>
            <input
              type="number"
              name="jumlah"
              className="w-full border p-3 rounded-lg"
              required
            />
          </div>
          {/* Kondisi */}
          <div>
            <label className="block mb-3 font-medium">Kondisi Barang</label>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="kondisi"
                  value="Rusak"
                  defaultChecked
                />
                Rusak
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="kondisi" value="Mati Total" />
                Mati Total
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="kondisi" value="Masih Berfungsi" />
                Masih Berfungsi
              </label>
            </div>
          </div>
          {/* Lokasi */}
          <div>
            <label className="block mb-2 font-medium">Lokasi Pengambilan</label>

            <textarea
              name="lokasi"
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              className="w-full border p-3 rounded-lg"
              rows={3}
              required
            />

            <button
              type="button"
              onClick={getCurrentLocation}
              className="mt-2 text-sm text-green-600 underline"
            >
              📍 Gunakan lokasi saya
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Kirim Pengajuan"}
          </button>
        </form>
      </div>
    </div>
  );
}
