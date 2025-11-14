"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PurchaseOrderTable from "./component/PO_Table";
import FormModal from "./component/FormModal";
import { PurchaseOrderService } from "@/services/PurchaseOrder.services";
import { PurchaseOrder, PurchaseOrderCreateUpdate } from "@/types/PurchaseOrder";

export default function PurchaseOrderPage() {
  const [purchaseorders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingPurchaseOrder, setEditingPurchaseOrder] = useState<PurchaseOrder | null>(null);
  const [error, setError] = useState<string | null>(null);

  // === Fetch semua Purchase Order ===
  const fetchPO = async () => {
    setLoading(true);
    try {
      const data = await PurchaseOrderService.getAll();
      setPurchaseOrders(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPO();
  }, []);

  // === Handler Create ===
  const handleCreate = () => {
    setEditingPurchaseOrder(null);
    setOpenModal(true);
  };

  // === Handler Edit ===
  const handleEdit = (purchaseorders: PurchaseOrder) => {
    setEditingPurchaseOrder(purchaseorders);
    setOpenModal(true);
  };

  // === Handler Delete ===
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus purchase order ini?")) return;
    try {
      await PurchaseOrderService.delete(id);
      fetchPO();
    } catch (err: any) {
      alert(err.message);
    }
  };
  // === Handler Delete ===
  const handleSend = async (id: number) => {
    if (!confirm("Yakin ingin submit purchase order ini?")) return;
    try {
      await PurchaseOrderService.submit(id);
      fetchPO();
    } catch (err: any) {
      alert(err.message);
    }
  };
  

  // === Handler Submit (Create / Update) ===
  const handleSubmit = async (formData: PurchaseOrderCreateUpdate) => {
    try {
      if (editingPurchaseOrder) {
        await PurchaseOrderService.update(editingPurchaseOrder.id, formData);
      } else {
        await PurchaseOrderService.create(formData);
      }
      setOpenModal(false);
      fetchPO();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="grid gap-2 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card col-span-12 xl:col-span-7">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Purchase Orders</h1>
        <Button onClick={handleCreate}>+ Create PO</Button>
      </div>

      {error && (
        <div className="text-red-600 mb-3 border border-red-400 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      <PurchaseOrderTable
        purchaseorders={purchaseorders}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSubmit={handleSend}
      />

      <FormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        editingPurchaseOrder={editingPurchaseOrder}
      />
    </div>
  );
}
