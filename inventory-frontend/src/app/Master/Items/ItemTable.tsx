"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/formatPrice";

type Item = {
  id: number;
  KdItem: string;
  NmItem: string;
  Price: number;
  Stocks: number;
};

export default function ItemTable({
  items,
  loading,
  onEdit,
  onDelete,
}: {
  items: any[];
  loading: boolean;
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Item>("KdItem");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // 🔍 Filter items berdasarkan pencarian
  const filtered = useMemo(() => {
    return items.filter(
      (item) =>
        item.KdItem.toLowerCase().includes(search.toLowerCase()) ||
        item.NmItem.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  // ↕️ Urutkan berdasarkan kolom
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
      return 0;
    });
  }, [filtered, sortKey, sortOrder]);

  // 📄 Pagination
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleSort = (key: keyof Item) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  if (loading)
    return <div className="text-center py-6 text-gray-500">Loading...</div>;

  if (items.length === 0)
    return <div className="text-center py-6 text-gray-500">No items found.</div>;

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-64"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <div className="text-sm text-gray-500">
          Showing {(page - 1) * itemsPerPage + 1}-
          {Math.min(page * itemsPerPage, sorted.length)} of {sorted.length}
        </div>
      </div>

      <table className="w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100 dark:bg-[#122031]">
          <tr>
            <th className="p-3 border text-center">#</th>
            <th className="p-3 border cursor-pointer" onClick={() => handleSort("KdItem")}>
              Item Code {sortKey === "KdItem" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="p-3 border cursor-pointer" onClick={() => handleSort("NmItem")}>
              Item Name {sortKey === "NmItem" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="p-3 border cursor-pointer" onClick={() => handleSort("Price")}>
              Price {sortKey === "Price" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="p-3 border cursor-pointer" onClick={() => handleSort("Stocks")}>
              Stocks {sortKey === "Stocks" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="p-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((item, index) => (
            <tr
              key={item.id}
              className="border-b hover:bg-neutral-100/50 dark:border-dark-3 dark:hover:bg-dark-2"
            >
              <td className="p-3 border text-center">
                {(page - 1) * itemsPerPage + index + 1}
              </td>
              <td className="p-3 border">{item.KdItem}</td>
              <td className="p-3 border">{item.NmItem}</td>
              <td className="p-3 border text-right">{formatPrice(item.Price)}</td>
              <td className="p-3 border text-right">{item.Stocks} Pcs</td>
              <td className="p-3 border text-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Buttons */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <Button
          size="sm"
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            size="sm"
            variant={page === i + 1 ? "default" : "outline"}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          size="sm"
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
