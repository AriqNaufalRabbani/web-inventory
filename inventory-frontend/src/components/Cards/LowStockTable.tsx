"use client";

import { motion } from "framer-motion";

export default function LowStockTable({
  items,
}: {
  items: { name: string; stock: number; min: number }[];
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm dark:bg-gray-dark">
      <h2 className="font-semibold mb-4">Stok Hampir Habis</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Produk</th>
            <th>Stok</th>
            <th>Minimum</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => {
            const isCritical = item.stock <= item.min * 0.3;
            return (
              <motion.tr
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className="border-b"
              >
                <td className="py-2">{item.name}</td>
                <td className={`text-semibold ${isCritical ? "text-red-600 font-bold" : "text-orange-600"}`}>{item.stock}</td>
                <td>{item.min}</td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
