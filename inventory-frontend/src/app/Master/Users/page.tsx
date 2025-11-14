"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import UserTable from "./UserTable";
import UserFormModal from "./UserFormModal";
import { UserService } from "@/services/UserService";
import type { User, UserCreateUpdate } from "@/types/User";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // === Fetch semua user ===
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await UserService.getAll();
      setUsers(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // === Handler Create ===
  const handleCreate = () => {
    setEditingUser(null);
    setOpenModal(true);
  };

  // === Handler Edit ===
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setOpenModal(true);
  };

  // === Handler Delete ===
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return;
    try {
      await UserService.delete(id);
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // === Handler Submit (Create / Update) ===
  const handleSubmit = async (formData: UserCreateUpdate) => {
    try {
      if (editingUser) {
        await UserService.update(editingUser.id, formData);
      } else {
        await UserService.create(formData);
      }
      setOpenModal(false);
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="grid gap-2 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card col-span-12 xl:col-span-7">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={handleCreate}>+ Create User</Button>
      </div>

      {error && (
        <div className="text-red-600 mb-3 border border-red-400 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      <UserTable
        users={users}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UserFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        editingUser={editingUser}
      />
    </div>
  );
}
