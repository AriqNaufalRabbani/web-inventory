"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

import { motion } from "framer-motion";

type DataItem = { day: string; in: number; out: number };

export default function ProfessionalChart({ data }: { data: DataItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm"
    >
      <h2 className="font-semibold mb-4">Barang Masuk vs Keluar (7 Hari)</h2>

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* area for 'in' */}
            <Area type="monotone" dataKey="in" name="Masuk" fillOpacity={0.2} strokeWidth={2} />
            {/* bar for 'out' */}
            <Bar dataKey="out" name="Keluar" barSize={18} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
