import { fruits, type IFruit } from './data.ts';

// 1. Daftar buah unik (normalisasi lowercase agar tidak duplikat)
const getUniqueFruits = (data: IFruit[]): string[] => {
  const seen = new Set<string>();
  return data
    .filter((f) => {
      const normalized = f.fruitName.toLowerCase();
      if (seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    })
    .map((f) => f.fruitName);
};

// 2 & 3. Kelompokkan berdasarkan wadah & hitung total stok
const groupFruitsByType = (data: IFruit[]) => {
  return data.reduce((acc, item) => {
    if (!acc[item.fruitType]) {
      acc[item.fruitType] = { fruits: new Set<string>(), totalStock: 0 };
    }
    acc[item.fruitType].fruits.add(item.fruitName.toLowerCase());
    acc[item.fruitType].totalStock += item.stock;
    return acc;
  }, {} as Record<string, { fruits: Set<string>; totalStock: number }>);
};

// Menjalankan fungsi & menampilkan hasil
console.log('1. Buah yang dimiliki Andi:', getUniqueFruits(fruits));

const grouped = groupFruitsByType(fruits);
console.log('2. Jumlah wadah:', Object.keys(grouped).length);

for (const [type, info] of Object.entries(grouped)) {
  console.log(`   - Wadah ${type}: [${Array.from(info.fruits).join(', ')}] | Total Stock: ${info.totalStock}`);
}