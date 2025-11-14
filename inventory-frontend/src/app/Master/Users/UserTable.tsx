"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

type User = {
  id: number;
  username: string;
  fullname: string;
  role_name: string;
  is_active: boolean;
};

export default function UserTable({
  users,
  loading,
  onEdit,
  onDelete,
}: {
  users: any[];
  loading: boolean;
  onEdit: (user: any) => void;
  onDelete: (id: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof User>("username");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  // 🔍 Filter berdasarkan pencarian
  const filtered = useMemo(() => {
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.fullname.toLowerCase().includes(search.toLowerCase()) ||
        u.role_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  // ↕️ Urutkan data
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      if (typeof valueA === "boolean" && typeof valueB === "boolean") {
        return sortOrder === "asc"
          ? Number(valueA) - Number(valueB)
          : Number(valueB) - Number(valueA);
      }
      return 0;
    });
  }, [filtered, sortKey, sortOrder]);

  // 📄 Pagination
  const totalPages = Math.ceil(sorted.length / usersPerPage);
  const paginated = sorted.slice((page - 1) * usersPerPage, page * usersPerPage);

  const handleSort = (key: keyof User) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  if (loading)
    return <div className="text-center py-6 text-gray-500">Loading...</div>;

  if (users.length === 0)
    return <div className="text-center py-6 text-gray-500">No users found.</div>;

  return (
    <div className="overflow-x-auto">
      {/* 🔍 Search bar + info */}
      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          placeholder="Search user..."
          className="border p-2 rounded w-64"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <div className="text-sm text-gray-500">
          Showing {(page - 1) * usersPerPage + 1}-
          {Math.min(page * usersPerPage, sorted.length)} of {sorted.length}
        </div>
      </div>

      {/* 🧾 Table */}
      <table className="w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100 dark:bg-[#122031]">
          <tr>
            <th className="p-3 border text-center">#</th>
            <th
              className="p-3 border cursor-pointer"
              onClick={() => handleSort("username")}
            >
              Username{" "}
              {sortKey === "username" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="p-3 border cursor-pointer"
              onClick={() => handleSort("fullname")}
            >
              Full Name{" "}
              {sortKey === "fullname" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="p-3 border cursor-pointer"
              onClick={() => handleSort("role_name")}
            >
              Role{" "}
              {sortKey === "role_name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="p-3 border cursor-pointer"
              onClick={() => handleSort("is_active")}
            >
              Status{" "}
              {sortKey === "is_active" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="p-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((user, index) => (
            <tr
              key={user.id}
              className="border-b transition-colors hover:bg-neutral-100/50 dark:border-dark-3 dark:hover:bg-dark-2"
            >
              <td className="p-3 border text-center">
                {(page - 1) * usersPerPage + index + 1}
              </td>
              <td className="p-3 border">{user.username}</td>
              <td className="p-3 border">{user.fullname}</td>
              <td className="p-3 border">{user.role_name}</td>
              <td className="p-3 border text-center">
                {user.is_active ? (
                  <span className="text-green-600 font-semibold">Active</span>
                ) : (
                  <span className="text-red-600 font-semibold">Inactive</span>
                )}
              </td>
              <td className="p-3 border text-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(user)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(user.id)}
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
