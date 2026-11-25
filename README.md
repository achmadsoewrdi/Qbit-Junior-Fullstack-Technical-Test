# Qbit Junior Fullstack Technical Test

Repositori ini berisi solusi lengkap untuk **Junior Fullstack Technical Test** yang terbagi menjadi 3 studi kasus (`case-1`, `case-2`, dan `case-3`).

---

## Daftar Studi Kasus & Navigasi Cepat

| Case | Topik | Tech Stack | Dokumentasi Detail |
| :--- | :--- | :--- | :--- |
| **[Case 1](./case-1)** | Manipulasi Data Array, Normalisasi Duplikasi & Agregasi Stok Buah | TypeScript (Native Node.js Type Stripping) | [Baca `case-1/README.md`](./case-1/README.md) |
| **[Case 2](./case-2)** | Perhitungan Total Komentar Bersarang (*Recursive Tree Traversal*) | TypeScript (Native Node.js Type Stripping) | [Baca `case-2/README.md`](./case-2/README.md) |
| **[Case 3](./case-3)** | Aplikasi Web UMKM **Halden Coffee Roasters** (Katalog, Detail Produk, Live Search, Cart Checkout) | **Backend:** NestJS 11 + TypeScript<br>**Frontend:** React 19 + Vite 6 + Tailwind CSS v4 | [Baca `case-3/README.md`](./case-3/README.md) |

---

## Struktur Direktori Utama

```text
TEST-QBIT/
├── README.md                 # Dokumentasi utama (Overview semua case)
├── .gitignore                # Konfigurasi file yang diabaikan Git (node_modules, dist, dll)
│
├── case-1/                   # Solusi Case 1 (Data Buah Andi)
│   ├── README.md             # Penjelasan algoritma, kompleksitas O(N), & jawaban soal 1-4
│   ├── tsconfig.json
│   ├── data.ts
│   └── main.ts
│
├── case-2/                   # Solusi Case 2 (Komentar Bersarang / Recursive)
│   ├── README.md             # Penjelasan algoritma rekursif DFS & kompleksitas
│   ├── tsconfig.json
│   ├── data.ts
│   └── main.ts
│
└── case-3/                   # Solusi Case 3 (UMKM Halden Coffee Roasters - Fullstack)
    ├── README.md             # Dokumentasi arsitektur, API contract, & panduan menjalankan
    ├── package.json          # Root orchestrator scripts
    ├── backend/              # NestJS 11 REST API (Port 3000)
    └── frontend/             # React 19 + TypeScript + Vite 6 + Tailwind CSS v4 (Port 5173)
```

---

## Panduan Singkat Menjalankan (Quick Start)

### Prasyarat
- **Node.js v22.6+ / v24+** (mendukung *native TypeScript execution* untuk `case-1` dan `case-2`).
- **npm v10+ / v11+**

### 1. Menjalankan Case 1
```bash
node case-1/main.ts
```

### 2. Menjalankan Case 2
```bash
node case-2/main.ts
```

### 3. Menjalankan Case 3 (Fullstack NestJS + React)
```bash
# 1. Masuk ke folder case-3 dan install dependencies
cd case-3
npm run install:all

# 2. Jalankan Unit Test Backend NestJS
npm run test:backend

# 3. Jalankan Backend (Terminal 1 - http://localhost:3000/api)
npm run dev:backend

# 4. Jalankan Frontend (Terminal 2 - http://localhost:5173)
npm run dev:frontend
```
