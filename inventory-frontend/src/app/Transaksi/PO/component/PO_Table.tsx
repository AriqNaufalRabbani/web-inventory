"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/formatPrice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { PurchaseOrder } from "@/types/PurchaseOrder";


export default function PurchaseOrderTable({
  purchaseorders,
  loading,
  onEdit,
  onDelete,
  onSubmit
}: {
  purchaseorders: any[];
  loading: boolean;
  onEdit: (purchaseorders: any) => void;
  onDelete: (id: number) => void;
  onSubmit: (id: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof PurchaseOrder>("PONumber");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const perPage = 10;

  // 🔍 Filter berdasarkan search
  const filtered = useMemo(() => {
    return purchaseorders.filter(
      (po) =>
        po.PONumber.toLowerCase().includes(search.toLowerCase()) ||
        po.PODate.toLowerCase().includes(search.toLowerCase()) ||
        po.NmSupplier.toLowerCase().includes(search.toLowerCase()) ||
        po.NmWarehouse.toLowerCase().includes(search.toLowerCase()) ||
        po.TotalAmount.toString().includes(search) ||
        po.StatusText.toLowerCase().includes(search.toLowerCase())
    );
  }, [purchaseorders, search]);

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
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
      return 0;
    });
  }, [filtered, sortKey, sortOrder]);

  // 📄 Pagination
  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  const handleSort = (key: keyof PurchaseOrder) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  if (loading)
    return <div className="text-center py-6 text-gray-500">Loading...</div>;

  if (purchaseorders.length === 0)
    return <div className="text-center py-6 text-gray-500">No data found.</div>;

  return (
    <div className="overflow-x-auto">
      {/* 🔍 Search bar */}
      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          placeholder="Search PO..."
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
              onClick={() => handleSort("PONumber")}
            >
              PO Number {sortKey === "PONumber" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="p-3 border cursor-pointer"
              onClick={() => handleSort("PODate")}
            >
              PO Date {sortKey === "PODate" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="p-3 border cursor-pointer" onClick={() => handleSort("NmSupplier")}>
              Supplier {sortKey === "NmSupplier" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="p-3 border cursor-pointer" onClick={() => handleSort("NmWarehouse")}>
              Warehouse {sortKey === "NmWarehouse" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="p-3 border cursor-pointer" onClick={() => handleSort("TotalAmount")}>
              Total Amount {sortKey === "TotalAmount" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="p-3 border cursor-pointer" onClick={() => handleSort("StatusText")}>
              Status {sortKey === "StatusText" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="p-3 border text-center" style={{ minWidth: "160px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((po, index) => (
            <tr
              key={po.id}
              className="border-b transition-colors hover:bg-neutral-100/50 dark:border-dark-3 dark:hover:bg-dark-2"
            >
              <td className="p-3 border text-center">{(page - 1) * perPage + index + 1}</td>
              <td className="p-3 border">{po.PONumber}</td>
              <td className="p-3 border">{po.PODate}</td>
              <td className="p-3 border">{po.NmSupplier}</td>
              <td className="p-3 border">{po.NmWarehouse}</td>
              <td className="p-3 border">{formatPrice(po.TotalAmount)}</td>
              <td className="p-3 border">{po.StatusText}</td>
              <td className="p-3 border text-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(po)} disabled={po.Status != 0}>
                  {/* Edit */}
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(po.id)} disabled={po.Status != 0}>
                  {/* Delete */}
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button size="sm" variant="info" onClick={() => onSubmit(po.id)} disabled={po.Status != 0}>
                  {/* Submit */}
                  <FontAwesomeIcon icon={faPaperPlane} />
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
