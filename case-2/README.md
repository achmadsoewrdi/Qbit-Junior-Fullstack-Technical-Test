# Case 2 — Perhitungan Total Komentar Bersarang (Recursive Tree Traversal)

## Deskripsi Masalah
Menghitung total seluruh komentar yang ada di dalam struktur data pohon (*nested comments tree*), termasuk seluruh *replies* dan *sub-replies* hingga kedalaman (*depth*) berapapun.

---

## Pendekatan Teknis & Algoritma

### Depth-First Search (DFS) Recursion dengan `Array.prototype.reduce`
Struktur data `IComment` bersifat rekursif (*self-referential type*), di mana properti `replies?: IComment[]` dapat memuat array `IComment` lagi tanpa batas kedalaman yang tetap.

```typescript
const countTotalComments = (data: IComment[]): number => {
  return data.reduce((total, comment) => {
    const repliesCount = comment.replies ? countTotalComments(comment.replies) : 0;
    return total + 1 + repliesCount;
  }, 0);
};
```

- **Kenapa pendekatan rekursif ini dipilih?**
  Setiap node komentar dihitung sebagai `1`, ditambah hasil pemanggilan rekursif `countTotalComments(comment.replies)` jika node tersebut memiliki balasan. Kode sangat deklaratif, *immutable* (tidak memutasi variabel luar), dan mudah diuji (*pure function*).
- **Kompleksitas Waktu & Ruang:**
  - **Time Complexity:** **$O(V)$** di mana $V$ adalah total jumlah node komentar di seluruh pohon (setiap komentar dikunjungi tepat satu kali).
  - **Space Complexity:** **$O(D)$** pada *call stack*, di mana $D$ adalah kedalaman maksimum (*maximum depth*) dari pohon balasan komentar.
- **Alternatif & Trade-off (Iterative BFS/DFS dengan Stack eksplisit):**
  Jika kedalaman komentar bisa mencapai puluhan ribu level (risiko *Maximum call stack size exceeded*), pendekatan iteratif menggunakan array sebagai *explicit stack* lebih aman. Namun untuk struktur komentar aplikasi web normal (umumnya kedalaman < 50 level), rekursi DFS jauh lebih ringkas dan mudah dipelihara (*maintainable*).

---

## Cara Menjalankan

Menggunakan Node.js v22.6+ / v24+ dari root repository `TEST-QBIT`:

```bash
node case-2/main.ts
```

### Output Terminal
```text
Total komentar: 7
```
*(Rincian 7 komentar: `commentId: 1`, `11`, `111`, `112`, `12`, `121`, dan `2`).*
