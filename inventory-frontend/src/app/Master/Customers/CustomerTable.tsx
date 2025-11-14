"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

type Customer = {
  id: number;
  KdCust: string;
  NmCust: string;
  Contact: string;
  Address: string;
};

export default function CustomerTable({
  customers,
  loading,
  onEdit,
  onDelete,
}: {
  customers: any[];
  loading: boolean;
  onEdit: (customer: any) => void;
  onDelete: (id: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Customer>("NmCust");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔍 Filter by search
  const filtered = useMemo(() => {
    return customers.filter(
      (c) =>
        c.KdCust.toLowerCase().includes(search.toLowerCase()) ||
        c.NmCust.toLowerCase().includes(search.toLowerCase()) ||
        c.Contact.toLowerCase().includes(search.toLowerCase()) ||
        c.Address.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  // ↕️ Sorting
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return 0;
    });
  }, [filtered, sortKey, sortOrder]);

  // 📄 Pagination
  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  const handleSort = (key: keyof Customer) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  if (loading)
    return <div className="text-center py-6 text-gray-500">Loading...</div>;

  if (customers.length === 0)
    return <div className="text-center py-6 text-gray-500">No customers found.</div>;

  return (
    <div className="overflow-x-auto">
      {/* 🔍 Search input */}
      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          placeholder="Search customer..."
          className="border p-2 rounded w-64"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <div className="text-sm text-gray-500">
          Showing {(page - 1) * perPage + 1}-
          {Math.min(page * perPage, sorted.length)} of {sorted.length}
        </div>
      </div>

      {/* 🧾 Table */}
      <table className="w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100 dark:bg-[#122031]">
          <tr>
            <th className="p-3 border text-center">#</th>
            <th
              className="p-3 border cursor-pointer"
              onClick={() => handleSort("KdCust")}
            >
              Customer Code{" "}
              {sortKey === "KdCust" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="p-3 border cursor-pointer"
              onClick={() => handleSort("NmCust")}
            >
              Customer Name{" "}
              {sortKey === "NmCust" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="p-3 border">Contact</th>
            <th className="p-3 border">Address</th>
            <th className="p-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((customer, index) => (
            <tr
              key={customer.id}
              className="border-b transition-colors hover:bg-neutral-100/50 dark:border-dark-3 dark:hover:bg-dark-2"
            >
              <td className="p-3 border text-center">
                {(page - 1) * perPage + index + 1}
              </td>
              <td className="p-3 border">{customer.KdCust}</td>
              <td className="p-3 border">{customer.NmCust}</td>
              <td className="p-3 border">{customer.Contact}</td>
              <td className="p-3 border">{customer.Address}</td>
              <td className="p-3 border text-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(customer)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(customer.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📄 Pagination */}
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
