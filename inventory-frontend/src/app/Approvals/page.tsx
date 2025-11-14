"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FormModal from "./component/FormModal";
import { Approval, ApprovalCreateUpdate } from "@/types/Approval";
import ApprovalTable from "./component/TableData";
import { ApprovalService } from "@/services/Approval.services";

export default function ApprovalPage() {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingApproval, setEditingApproval] = useState<Approval | null>(null);
  const [error, setError] = useState<string | null>(null);

  // === Fetch semua Purchase Order ===
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await ApprovalService.getAll();
      setApprovals(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // === Handler Create ===
  const handleCreate = () => {
    setEditingApproval(null);
    setOpenModal(true);
  };

  // === Handler Edit ===
  const handleEdit = (approvals: Approval) => {
    setEditingApproval(approvals);
    setOpenModal(true);
  };

  // === Handler Delete ===
  const handleDelete = async (NoTrans: string) => {
    if (!confirm("Yakin ingin menghapus purchase order ini?")) return;
    try {
      await ApprovalService.delete(NoTrans);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };
  // === Handler Delete ===
  const handleSend = async (NoTrans: string) => {
    if (!confirm("Yakin ingin submit purchase order ini?")) return;
    try {
      await ApprovalService.submit(NoTrans);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };
  

  // === Handler Submit (Create / Update) ===
  const handleSubmit = async (formData: ApprovalCreateUpdate) => {
    try {
      if (editingApproval) {
        await ApprovalService.update(editingApproval.NoTrans, formData);
      } else {
        await ApprovalService.create(formData);
      }
      setOpenModal(false);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="grid gap-2 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card col-span-12 xl:col-span-7">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Approval List</h1>
        <Button onClick={handleCreate}>+ Create PO</Button>
      </div>

      {error && (
        <div className="text-red-600 mb-3 border border-red-400 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      <ApprovalTable
        approvals={approvals}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSubmit={handleSend}
      />

      <FormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        editingApproval={editingApproval}
      />
    </div>
  );
}
