"use client";

import { motion } from "framer-motion";

const list = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};

export default function RecentActivity({
  logs,
}: {
  logs: { time: string; text: string }[];
}) {
  return (
    <motion.div variants={list} initial="hidden" animate="show" className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm dark:bg-gray-dark">
      <h2 className="font-semibold mb-4">Aktivitas Terbaru</h2>

      <ul className="space-y-3">
        {logs.map((log, i) => (
          <motion.li key={i} variants={item} className="flex gap-3">
            <span className="text-blue-500 font-semibold">{log.time}</span>
            <span className="text-gray-700">{log.text}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
