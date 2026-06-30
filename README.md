# Sistem Informasi Manajemen E-Waste ♻️

Aplikasi berbasis web ini dikembangkan sebagai *project* Skripsi untuk memfasilitasi pengelolaan limbah elektronik (E-Waste). Platform ini menghubungkan masyarakat (pelanggan) yang ingin membuang limbah elektronik dengan pengepul (*collector*) secara efisien dan terstruktur.

## 🚀 Fitur Utama

- **Otentikasi Pengguna:** Sistem Login dan Register terpisah untuk *Customer* dan *Collector*.
- **Customer Dashboard:** Pengguna dapat mengajukan permintaan penjemputan limbah elektronik (*submit e-waste*) dan melacak status penjemputan.
- **Collector Dashboard:** Pengepul dapat melihat permintaan penjemputan, memantau lokasi pelanggan, dan mengelola laporan.
- **Integrasi Peta:** Menggunakan Leaflet.js untuk memetakan lokasi penjemputan secara akurat.

## 🛠️ Teknologi yang Digunakan

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Database ORM:** [Prisma](https://www.prisma.io/) (SQLite untuk mode *development*)
- **Maps:** Leaflet.js
- **Styling:** CSS / Tailwind (Global CSS)

## 💻 Cara Menjalankan Project (Development)

Untuk menjalankan *project* ini di komputer lokal, pastikan Anda sudah menginstal **Node.js** dan **Git**.

1. **Clone Repository**
   ```bash
   git clone [https://github.com/AggiSaputra/e-waste.git](https://github.com/AggiSaputra/e-waste.git)
   cd e-waste
