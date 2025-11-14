"use client";

import { motion } from "framer-motion";

interface Stat {
  title: string;
  value: string;
  change: string;
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function StatsCards({ data }: { data: Stat[] }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <motion.div
          variants={cardVariant}
          key={index}
          className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm dark:bg-gray-dark"
        >
          <p className="text-gray-600 text-sm">{item.title}</p>
          <p className="text-3xl font-semibold mt-1">{item.value}</p>
          <p className={`text-sm mt-2 ${item.change.startsWith("-") ? "text-red-500" : "text-green-600"}`}>
            {item.change}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
