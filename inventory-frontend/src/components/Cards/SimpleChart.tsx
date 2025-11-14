"use client";

export default function SimpleChart({
  data,
}: {
  data: { day: string; in: number; out: number }[];
}) {
  const maxValue = Math.max(...data.map((d) => Math.max(d.in, d.out)));

  return (
    <div className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm">
      <h2 className="font-semibold mb-4">Barang Masuk vs Keluar (7 Hari)</h2>

      <div className="grid grid-cols-7 gap-4 h-40 items-end">
        {data.map((d, i) => (
          <div key={i} className="flex flex-col items-center h-full">
            <div className="w-3 bg-blue-500 rounded"
              style={{ height: `${(d.in / maxValue) * 100}%` }}
            ></div>
            <div className="w-3 bg-red-400 rounded mt-1"
              style={{ height: `${(d.out / maxValue) * 100}%` }}
            ></div>
            <p className="text-xs mt-2 text-gray-600">{d.day}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-4 text-sm">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded-sm"></span> Masuk
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-400 rounded-sm"></span> Keluar
        </span>
      </div>
    </div>
  );
}
