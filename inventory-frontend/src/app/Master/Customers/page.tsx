"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CustomerFormModal from "./CustomerFormModal";
import CustomerTable from "./CustomerTable";
import { Customer, CustomerCreateUpdate } from "@/types/Customer";
import { CustomerService } from "@/services/Customer.services";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string | null>(null);

  // === Fetch semua Customer ===
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await CustomerService.getAll();
      setCustomers(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // === Handler Create ===
  const handleCreate = () => {
    setEditingCustomer(null);
    setOpenModal(true);
  };

  // === Handler Edit ===
  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setOpenModal(true);
  };

  // === Handler Delete ===
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus customer ini?")) return;
    try {
      await CustomerService.delete(id);
      fetchCustomers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // === Handler Submit (Create / Update) ===
  const handleSubmit = async (formData: CustomerCreateUpdate) => {
    try {
      if (editingCustomer) {
        await CustomerService.update(editingCustomer.id, formData);
      } else {
        await CustomerService.create(formData);
      }
      setOpenModal(false);
      fetchCustomers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="grid gap-2 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card col-span-12 xl:col-span-7">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <Button onClick={handleCreate}>+ Add Customer</Button>
      </div>

      {error && (
        <div className="text-red-600 mb-3 border border-red-400 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      <CustomerTable
        customers={customers}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CustomerFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        editingCustomer={editingCustomer}
      />
    </div>
  );
}
