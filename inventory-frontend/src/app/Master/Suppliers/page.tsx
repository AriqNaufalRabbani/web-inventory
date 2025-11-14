"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import SupplierTable from "./SupplierTable";
import dynamic from "next/dynamic";
const SupplierTable = dynamic(() => import("./SupplierTable"), { ssr: false, loading: () => <p>Loading...</p>, });
import SupplierFormModal from "./SupplierFormModal";
import { SupplierService } from "@/services/Supplier.services";
import { Supplier, SupplierCreateUpdate } from "@/types/Supplier";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [error, setError] = useState<string | null>(null);

  // === Fetch semua Supplier ===
  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const data = await SupplierService.getAll();
      setSuppliers(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // === Handler Create ===
  const handleCreate = () => {
    setEditingSupplier(null);
    setOpenModal(true);
  };

  // === Handler Edit ===
  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setOpenModal(true);
  };

  // === Handler Delete ===
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus supplier ini?")) return;
    try {
      await SupplierService.delete(id);
      fetchSuppliers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // === Handler Submit (Create / Update) ===
  const handleSubmit = async (formData: SupplierCreateUpdate) => {
    try {
      if (editingSupplier) {
        await SupplierService.update(editingSupplier.id, formData);
      } else {
        await SupplierService.create(formData);
      }
      setOpenModal(false);
      fetchSuppliers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="grid gap-2 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card col-span-12 xl:col-span-7">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Supplier Management</h1>
        <Button onClick={handleCreate}>+ Add Supplier</Button>
      </div>

      {error && (
        <div className="text-red-600 mb-3 border border-red-400 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      <SupplierTable
        suppliers={suppliers}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <SupplierFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        editingSupplier={editingSupplier}
      />
    </div>
  );
}
