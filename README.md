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

```

2. **Install Dependencies**
```bash
npm install

```


3. **Konfigurasi Environment**
Buat file `.env` di *root directory* (jika belum ada) dan sesuaikan konfigurasi database Anda.
4. **Migrasi Database (Prisma)**
Jalankan perintah ini untuk menyinkronkan skema database:
```bash
npx prisma migrate dev

```


5. **Jalankan Development Server**
```bash
npm run dev

```


6. **Akses Aplikasi**
Buka [http://localhost:3000](http://localhost:3000) di *browser* Anda untuk melihat hasilnya.

## 📁 Struktur Direktori Utama

* `/app` - Berisi *routing* utama Next.js (halaman Customer, Collector, Auth, dll).
* `/components` - Komponen UI yang dapat digunakan kembali (termasuk komponen MapInternal & LeafletMap).
* `/prisma` - Skema database dan file migrasi.
* `/lib` - Utilitas pendukung dan konfigurasi Prisma *client*.
* `/context` - *State management* global (seperti AuthContext).

## 🔒 Pernyataan Ketersediaan Data (Open Data Declaration)

Kode sumber untuk sistem informasi ini tersedia secara publik di repository GitHub ini. Namun, data penelitian yang dikumpulkan dan diproses dalam sistem ini (seperti data demografi pengguna, alamat detail lokasi penjemputan limbah, dan riwayat transaksi) bersifat **sensitif dan rahasia**.

Untuk menjaga privasi pengguna sesuai dengan pedoman dan etika penelitian, dataset asli tidak dapat disebarluaskan atau dipublikasikan secara terbuka. Pihak yang berkepentingan dan memiliki alasan akademis yang sah dapat memohon akses data terbatas dengan menghubungi peneliti utama secara langsung.

---

**Dikembangkan oleh:** Aggi Saputra
*Dibuat untuk memenuhi persyaratan penyelesaian Skripsi.*

```

```
