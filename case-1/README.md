# Case 1 — Analisis & Agregasi Data Buah Andi

## Deskripsi Masalah
Mengolah data daftar buah (`IFruit[]`) yang dimiliki Andi untuk menjawab 4 pertanyaan:
1. Buah apa saja yang dimiliki Andi? (`fruitName`)
2. Andi memisahkan buahnya menjadi beberapa wadah berdasarkan tipe buah (`fruitType`). Berapa jumlah wadah yang dibutuhkan? Dan ada buah apa saja di masing-masing wadah?
3. Berapa total stock buah yang ada di masing-masing wadah?
4. Apakah ada komentar terkait kasus di atas?

---

## Pendekatan Teknis & Algoritma

### 1. Normalisasi Case-Insensitive dengan `Set` ($O(N)$ Time Complexity)
Pada data `fruits`, terdapat inkonsistensi penulisan huruf besar/kecil seperti `'Apel'` vs `'apel'` dan `'Kurma'` vs `'KURMA'`.
- **Kenapa menggunakan `Set` + `.toLowerCase()`?**
  Pengecekan elemen unik di dalam `Set` memiliki kompleksitas waktu **$O(1)$** (*hash lookup*), sehingga keseluruhan fungsi `getUniqueFruits` berjalan dalam **$O(N)$**.
- **Trade-off vs `Array.includes()` / `findIndex()`:**
  Jika menggunakan `array.indexOf()` di dalam `.filter()`, kompleksitasnya membengkak menjadi **$O(N^2)$** yang akan melambat jika jumlah data buah mencapai puluhan ribu baris.

### 2. Single-Pass Aggregation dengan `Array.prototype.reduce`
Fungsi `groupFruitsByType` mengelompokkan nama buah unik sekaligus menjumlahkan `totalStock` per `fruitType` (`IMPORT` dan `LOCAL`) hanya dalam **satu kali iterasi** (*single-pass* $O(N)$).

---

## Jawaban Soal 1 – 4

1. **Buah yang dimiliki Andi (Unik):**
   `['Apel', 'Kurma', 'Manggis', 'Jeruk Bali', 'Salak']` (5 jenis buah unik setelah dinormalisasi dari duplikasi huruf besar/kecil).
2. **Jumlah wadah & isi masing-masing wadah:**
   Dibutuhkan **2 wadah** berdasarkan `fruitType`:
   - **Wadah `IMPORT`**: `apel`, `kurma`
   - **Wadah `LOCAL`**: `manggis`, `jeruk bali`, `salak`
3. **Total stock di masing-masing wadah:**
   - **Wadah `IMPORT`**: `10 + 20 + 50 + 20 = 100`
   - **Wadah `LOCAL`**: `100 + 10 + 150 = 260`
4. **Komentar / Temuan Anomali Data pada Soal (No. 4):**
   - **Duplikasi Primary Key (`fruitId: 5`)**: Terdapat 3 objek berbeda (`Jeruk Bali`, `KURMA`, dan `Salak`) yang sama-sama memiliki `fruitId: 5`. Dalam desain database relasional maupun NoSQL, `fruitId` seharusnya bersifat *unique identifier* (Primary Key).
   - **Inkonsistensi Penulisan Nama (`fruitName`)**: `'Apel'` vs `'apel'`, serta `'Kurma'` vs `'KURMA'` memiliki ID berbeda namun merujuk pada entitas buah yang sama. Di sistem produksi, data harus dinormalisasi sebelum disimpan atau menggunakan *unique constraint* yang *case-insensitive* (`CITEXT` di PostgreSQL).

---

## Cara Menjalankan

Menggunakan Node.js v22.6+ / v24+ (mendukung eksekusi TypeScript secara native tanpa build step):

```bash
# Jalankan dari root repository TEST-QBIT:
node case-1/main.ts
```

### Contoh Output Terminal
```text
1. Buah yang dimiliki Andi: [ 'Apel', 'Kurma', 'Manggis', 'Jeruk Bali', 'Salak' ]
2. Jumlah wadah: 2
   - Wadah IMPORT: [apel, kurma] | Total Stock: 100
   - Wadah LOCAL: [manggis, jeruk bali, salak] | Total Stock: 260
```
