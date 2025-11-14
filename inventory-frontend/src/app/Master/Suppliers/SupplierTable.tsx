"use client";

import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";

type Supplier = {
  id: number;
  KdSupplier: string;
  NmSupplier: string;
  Contact: string;
  Address: string;
};

export default function SupplierTable({
  suppliers,
  loading,
  onEdit,
  onDelete,
}: {
  suppliers: any[];
  loading: boolean;
  onEdit: (supplier: any) => void;
  onDelete: (id: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Supplier>("KdSupplier");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // 🔍 Filtering
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((s) =>
      Object.values(s).some((val) =>
        val?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [suppliers, search]);

  // 🔢 Sorting
  const sortedSuppliers = useMemo(() => {
    return [...filteredSuppliers].sort((a, b) => {
      const valA = a[sortField]?.toString().toLowerCase() ?? "";
      const valB = b[sortField]?.toString().toLowerCase() ?? "";
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredSuppliers, sortField, sortOrder]);

  // 📄 Pagination
  const totalPages = Math.ceil(sortedSuppliers.length / rowsPerPage);
  const paginatedSuppliers = sortedSuppliers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSort = (field: keyof Supplier) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  if (loading)
    return <div className="text-center py-6 text-gray-500">Loading...</div>;

  if (suppliers.length === 0)
    return <div className="text-center py-6 text-gray-500">No suppliers found.</div>;

  return (
    <div className="overflow-x-auto">
      {/* 🔍 Search */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search suppliers..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border rounded-md px-3 py-2 text-sm w-64"
        />
        <span className="text-sm text-gray-500">
          Showing {(page - 1) * rowsPerPage + 1}-
          {Math.min(page * rowsPerPage, sortedSuppliers.length)} of{" "}
          {sortedSuppliers.length}
        </span>
      </div>

      {/* 📋 Table */}
      <table className="w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100 dark:bg-[#122031]">
          <tr>
            <th className="p-3 border text-center">#</th>
            <th
              className="p-3 border cursor-pointer select-none"
              onClick={() => handleSort("KdSupplier")}
            >
              Supplier Code{" "}
              {sortField === "KdSupplier" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="p-3 border cursor-pointer select-none"
              onClick={() => handleSort("NmSupplier")}
            >
              Supplier Name{" "}
              {sortField === "NmSupplier" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="p-3 border">Contact</th>
            <th className="p-3 border">Address</th>
            <th className="p-3 border text-center" style={{ minWidth: "160px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedSuppliers.map((supplier, index) => (
            <tr
              key={supplier.id}
              className="border-b hover:bg-neutral-100/50 dark:hover:bg-dark-2 transition-colors"
            >
              <td className="p-3 border text-center">
                {(page - 1) * rowsPerPage + index + 1}
              </td>
              <td className="p-3 border">{supplier.KdSupplier}</td>
              <td className="p-3 border">{supplier.NmSupplier}</td>
              <td className="p-3 border">{supplier.Contact}</td>
              <td className="p-3 border">{supplier.Address}</td>
              <td className="p-3 border text-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(supplier)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(supplier.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📄 Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </span>
        <div className="space-x-2">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
