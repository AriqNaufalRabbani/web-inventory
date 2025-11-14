"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ItemTable from "./ItemTable";
import ItemFormModal from "./ItemFormModal";
import { ItemService } from "@/services/ItemService";
import { Item, ItemCreateUpdate } from "@/types/Item";

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);

  // === Fetch semua item ===
  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await ItemService.getAll();
      setItems(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // === Handler Create ===
  const handleCreate = () => {
    setEditingItem(null);
    setOpenModal(true);
  };

  // === Handler Edit ===
  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setOpenModal(true);
  };

  // === Handler Delete ===
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus item ini?")) return;
    try {
      await ItemService.delete(id);
      fetchItems();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // === Handler Submit (Create / Update) ===
  const handleSubmit = async (formData: ItemCreateUpdate) => {
    try {
      if (editingItem) {
        await ItemService.update(editingItem.id, formData);
      } else {
        await ItemService.create(formData);
      }
      setOpenModal(false);
      fetchItems();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="grid gap-2 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card col-span-12 xl:col-span-7">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Items Management</h1>
        <Button onClick={handleCreate}>+ Add Item</Button>
      </div>

      {error && (
        <div className="text-red-600 mb-3 border border-red-400 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      <ItemTable
        items={items}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ItemFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        editingItem={editingItem}
      />
    </div>
  );
}
