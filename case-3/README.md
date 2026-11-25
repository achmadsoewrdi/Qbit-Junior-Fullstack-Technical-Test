# Case 3 — Halden Coffee Roasters (UMKM Specialty Coffee Web Platform)

Aplikasi web Fullstack untuk memperkenalkan UMKM **Halden Coffee Roasters** — *Small-Batch Specialty Coffee Roastery* yang menyangrai biji kopi Nusantara & Single-Origin sesuai pesanan (*roasted to order*) dan mengirimkannya dalam 48 jam.

---

## 1. Arsitektur & Tech Stack

Project ini dibangun menggunakan arsitektur **Fullstack Monolith-Repo** yang memisahkan *domain boundary* antara Backend REST API (**NestJS 11**) dan Frontend SPA (**React 19 + TypeScript + Vite 6 + Tailwind CSS v4**).

| Layer | Teknologi | Alasan Pemilihan & Keunggulan |
| :--- | :--- | :--- |
| **Backend API** | **NestJS 11**, TypeScript, `class-validator`, `class-transformer`, `tsx` | Arsitektur modular berbasis Dependency Injection (`CoffeeModule`, `OrdersModule`), validasi DTO ketat sesuai standar keamanan OWASP, dan *zero-deprecated dependencies* dengan runner `tsx`. |
| **Unit Testing** | **Node.js Built-in Test Runner (`node:test`)** | Eksekusi unit test sangat cepat (~500ms) tanpa ketergantungan library testing usang. |
| **Frontend UI** | **React 19**, TypeScript, **Vite 6**, **Tailwind CSS v4**, `lucide-react` | Komponen UI modular, animasi 60fps berbasis GPU (`translate3d`), dan proxy `/api` terintegrasi ke NestJS. |

---

## 2. Fitur Utama yang Diimplementasikan

1. **Storytelling Landing Page (4 Bagian Lengkap):**
   - **Hero & Benefits Bento Grid:** Menampilkan produk unggulan (*Morning Blend*), *floating tasting notes*, *48h roast-to-door guarantee*, dan indikator *5-bar roast profile*.
   - **How It Works & Roastery Story:** Penjelasan 3 langkah (*Pick your blend*, *We roast it fresh*, *At your door in 48h*), cerita roastery dengan 4 metrik utama (`12 kg batches`, `3 farms`, `Roast date`, `0 months on a shelf`), serta tabel perbandingan *Halden vs Supermarket Coffee*.
   - **Interactive Brew Guide & Verified Reviews:** Kalkulator resep seduh interaktif (*Pour-over*, *Espresso*, *French press*, *Cold brew*) yang mengubah gramasi kopi, air (ml), suhu (°C), dan durasi seduh secara *real-time*.
   - **Interactive Product Configurator & Smooth FAQ Accordion:** Kalkulasi harga otomatis berdasarkan pilihan gilingan (*Whole bean, Espresso, Filter, French press*), ukuran kemasan (`250 g`, `340 g`, `1 kg`), serta opsi **Subscribe & Save 15%** vs **One-time purchase**.
2. **Halaman Katalog Menu Lengkap (`All menu` Page):**
   - Menampilkan 6 varian kopi (*Morning Blend*, *Gayo Highland Reserve*, *Kintamani Citrus Bloom*, *Toraja Sapan Velvet*, *Flores Bajawa Honey*, dan *Midnight Sugarcane Decaf*).
   - Dilengkapi filter kategori roast (*All roasts, Light roast, Medium roast, Dark roast, Decaf roast*) dan indikator level sangrai 1–5.
3. **Halaman Detail Jenis Kopi (`Coffee Detail` Page):**
   - Menampilkan *Farm Traceability & Cup Profile* lengkap untuk setiap jenis kopi: **Origin Region**, **Elevation (MASL)**, **Post-Harvest Process** (*Giling Basah, Red Honey, Full Washed, Sugarcane EA Decaf*), **Cultivar / Varietal**, karakter keasaman (*Acidity*), *Body*, dan rekomendasi resep seduh barista.
4. **Live Search Modal (`Search...`):**
   - Pencarian *real-time* berdasarkan nama kopi, daerah asal (*Aceh, Bali, Toraja, Flores, Colombia*), *tasting notes* (*Cocoa, Mandarin, Honey*), *Brew Guides*, hingga jawaban *FAQ*, dilengkapi *Popular Filter Chips*.
5. **Slide-Over Cart Drawer & Real NestJS Checkout:**
   - Keranjang belanja interaktif yang mengirimkan pesanan ke endpoint `POST /api/orders` di NestJS dan mengembalikan nomor resi pesanan (`#HLD-XXXXXX`).

---

## 3. Struktur Direktori `case-3/`

```text
case-3/
├── package.json                       # Root orchestrator scripts (install:all, dev:backend, dev:frontend)
├── README.md                          # Dokumentasi Case 3
│
├── backend/                           # NestJS 11 REST API (http://localhost:3000/api)
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── main.ts                    # Bootstrap, CORS, Global ValidationPipe, prefix /api
│       ├── app.module.ts
│       ├── common/interfaces/         # Kontrak tipe data TypeScript
│       ├── coffee/                    # Module Katalog Kopi, Brew Guides, Reviews, FAQ
│       │   ├── coffee.controller.ts
│       │   ├── coffee.service.ts
│       │   ├── coffee.service.spec.ts # Unit tests (node:test)
│       │   └── data/coffee.seed.ts    # Seed data 6 varian kopi & konten roastery
│       └── orders/                    # Module Pemesanan & Newsletter
│           ├── orders.controller.ts
│           ├── orders.service.ts
│           └── dto/                   # Validasi input (CreateOrderDto, SubscribeNewsletterDto)
│
└── frontend/                          # React 19 + Vite 6 + Tailwind CSS v4 (http://localhost:5173)
    ├── package.json
    ├── vite.config.ts                 # Konfigurasi proxy '/api' -> 'http://localhost:3000'
    └── src/
        ├── App.tsx                    # State management halaman (Home, Menu, Detail, Search, Cart)
        ├── index.css                  # Tailwind v4 & GPU-accelerated animations
        ├── types/coffee.ts            # TypeScript interfaces
        ├── services/api.ts            # Fetch client dengan graceful fallback
        └── components/
            ├── layout/                # TopBanner, Navbar, MarqueeStrip, Footer
            ├── sections/              # Hero, BenefitsBento, HowItWorks, Roastery, Comparison, BrewGuide, Offer, FAQ
            ├── pages/                 # CoffeeMenuPage.tsx & CoffeeDetailPage.tsx
            └── ui/                    # TiltedBadge, SearchModal, CartDrawer
```

---

## 4. Kontrak REST API (NestJS Backend)

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/coffee/landing` | Mengambil seluruh data landing page, featured product, katalog 6 kopi, brew guides, reviews, dan FAQ. |
| `GET` | `/api/coffee/products?q=` | Mengambil daftar seluruh produk kopi dengan dukungan filter pencarian query `q`. |
| `GET` | `/api/coffee/products/:slug` | Mengambil detail lengkap 1 varian kopi berdasarkan `slug` atau `id`. |
| `GET` | `/api/coffee/brew-guides` | Mengambil daftar panduan resep seduh kopi. |
| `POST` | `/api/orders` | Membuat pesanan baru dengan validasi DTO dan perhitungan otomatis diskon langganan 15%. |
| `POST` | `/api/orders/newsletter` | Mendaftarkan email ke newsletter dan mengembalikan kode promo `HALDEN15`. |

---

## 5. Cara Menjalankan & Verifikasi

### A. Install Dependencies
Dari dalam folder `case-3/`:
```bash
npm run install:all
```

### B. Jalankan Unit Test Backend
```bash
cd backend && npm test
```

### C. Jalankan Server Development (Backend & Frontend)
Buka 2 terminal di dalam folder `case-3/`:

- **Terminal 1 (NestJS Backend — Port 3000):**
  ```bash
  cd backend && npm run start:dev
  ```
- **Terminal 2 (React Vite Frontend — Port 5173):**
  ```bash
  cd frontend && npm run dev
  ```

Buka **`http://localhost:5173`** di browser.
