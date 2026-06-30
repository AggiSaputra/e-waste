# ♻️ E-Waste Management Information System

A web-based information system developed as an undergraduate thesis project to facilitate the management of electronic waste (E-Waste). The platform connects customers who want to dispose of electronic waste with collectors, making the collection process more efficient, organized, and traceable.

---

## 🚀 Features

### 👤 Authentication

* Separate login and registration for **Customer** and **Collector**.
* Secure user authentication and role-based access.

### 📦 Customer Dashboard

* Submit electronic waste pickup requests.
* Track pickup request status.
* View request history.

### 🚛 Collector Dashboard

* View incoming pickup requests.
* Monitor customer pickup locations.
* Manage collection reports.

### 🗺️ Interactive Maps

* Integration with **Leaflet.js** for accurate pickup location mapping.
* Real-time location visualization.

---

## 🛠️ Tech Stack

| Technology       | Description          |
| ---------------- | -------------------- |
| **Framework**    | Next.js (App Router) |
| **Database ORM** | Prisma ORM           |
| **Database**     | SQLite (Development) |
| **Maps**         | Leaflet.js           |
| **Styling**      | CSS & Tailwind CSS   |

---

## 📦 Installation

Make sure the following software is installed on your machine:

* Node.js
* Git
* npm

### 1. Clone the Repository

```bash
git clone https://github.com/AggiSaputra/e-waste.git
cd e-waste
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and configure the required environment variables.

Example:

```env
DATABASE_URL="file:./dev.db"
```

### 4. Run Prisma Migration

```bash
npx prisma migrate dev
```

### 5. Start the Development Server

```bash
npm run dev
```

### 6. Open the Application

Visit:

```
http://localhost:3000
```

---

## 📁 Project Structure

```text
.
├── app/            # Next.js App Router pages
├── components/     # Reusable UI components
├── context/        # Global state management
├── lib/            # Utility functions & Prisma client
├── prisma/         # Database schema & migrations
├── public/         # Static assets
└── README.md
```

### Directory Description

| Directory     | Description                                                         |
| ------------- | ------------------------------------------------------------------- |
| `app/`        | Main application routes (Customer, Collector, Authentication, etc.) |
| `components/` | Reusable UI components including map components                     |
| `context/`    | Global state management (e.g., AuthContext)                         |
| `lib/`        | Utility functions and Prisma configuration                          |
| `prisma/`     | Prisma schema and migration files                                   |
| `public/`     | Static assets such as images and icons                              |

---

## 🗺️ Map Integration

This application uses **Leaflet.js** to:

* Display customer pickup locations.
* Help collectors navigate to pickup points.
* Improve waste collection efficiency.

---

## 🔒 Open Data Declaration

The source code of this system is publicly available in this GitHub repository.

However, the research data processed within the application—including user demographic information, detailed pickup addresses, and transaction history—contains **confidential and sensitive information**.

To protect participant privacy and comply with research ethics, the original dataset cannot be publicly distributed. Researchers with legitimate academic purposes may request limited access to the data by contacting the principal researcher.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

> **Note:** The source code is released under the MIT License. However, the research dataset used in this project is **not** included in this repository and remains confidential due to research ethics and privacy considerations.
---

## 👨‍💻 Author

**Aggi Saputra**

Developed as part of the undergraduate thesis requirements.
