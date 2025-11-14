"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import SearchableSelect from "@/components/ui-elements/SearchableSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

interface ItemRow {
  id: number;
  KdItem: string;
  Qty: number;
  Price: number;
}

export default function FormModal({
  open,
  onClose,
  onSubmit,
  editingPurchaseOrder,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  editingPurchaseOrder: any | null;
}) {
  const [items, setItems] = useState<ItemRow[]>([]);
  const [formData, setFormData] = useState({
    PONumber: "",
    PODate: "",
    KdSupplier: "",
    KdWarehouse: "",
  });

  // 🔹 hanya isi header saat pertama kali edit
  useEffect(() => {
    if (editingPurchaseOrder) {
      setFormData((prev) => ({
        ...prev,
        PONumber: editingPurchaseOrder.PONumber ?? "",
        PODate: editingPurchaseOrder.PODate ?? "",
        KdSupplier: editingPurchaseOrder.KdSupplier ?? "",
        KdWarehouse: editingPurchaseOrder.KdWarehouse ?? "",
      }));

      // 🔹 ambil item detail berdasarkan ID
      fetch(`/api/api/purchase-orders/getDetailItemsbyPO/${editingPurchaseOrder.PONumber}`)
        .then((res) => res.json())
        .then((data) => {
          // pastikan formatnya [{KdItem, Qty, Price}]
          const mapped = data.map((item: any, idx: number) => ({
            id: idx + 1,
            KdItem: item.KdItem,
            Qty: item.Qty,
            Price: item.Price,
          }));
          setItems(mapped);
        })
        .catch((err) => console.error("Gagal load item detail:", err));
    } else {
      // kalau create baru
      setFormData({
        PONumber: "",
        PODate: "",
        KdSupplier: "",
        KdWarehouse: "",
      });
      setItems([{ id: 1, KdItem: "", Qty: 0, Price: 0 }]);
    }
  }, [editingPurchaseOrder]);

  if (!open) return null;

  const handleChange = (e: any) => {
    if (e?.target) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else if (e?.name) {
      setFormData({ ...formData, [e.name]: e.value });
    }
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now(), KdItem: "", Qty: 0, Price: 0 },
    ]);
  };

  const handleDeleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload = {
      ...formData,
      items,
    };
    onSubmit(payload);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg w-full"
            style={{ maxWidth: "50rem" }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingPurchaseOrder ? "Edit PO" : "Create PO"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">PO Number</label>
                  <input
                    name="PONumber"
                    disabled
                    placeholder="Auto Generate"
                    value={formData.PONumber}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">PO Date</label>
                  <input
                    type="date"
                    name="PODate"
                    value={formData.PODate}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Supplier</label>
                  <SearchableSelect
                    apiUrl="/api/api/purchase-orders/getSupplierSelect"
                    name="KdSupplier"
                    value={formData.KdSupplier}
                    onChange={handleChange}
                    labelKey="text"
                    valueKey="id"
                    placeholder="Cari Supplier..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Warehouse</label>
                  <SearchableSelect
                    apiUrl="/api/api/purchase-orders/getWarehouseSelect"
                    name="KdWarehouse"
                    value={formData.KdWarehouse}
                    onChange={handleChange}
                    labelKey="text"
                    valueKey="id"
                    placeholder="Cari Warehouse..."
                  />
                </div>
              </div>

              <hr className="my-3" />

              <h2 className="font-semibold text-lg">PO Items</h2>
              <table className="w-full border border-gray-300 rounded-lg">
                <thead>
                  <tr>
                    <th className="p-3 border" style={{minWidth: '250px'}}>Items</th>
                    <th className="p-3 border">Qty</th>
                    <th className="p-3 border">Price</th>
                    <th className="p-3 border">
                      <Button type="button" size="sm" onClick={handleAddItem}>
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row, index) => (
                    <tr key={row.id}>
                      <td className="p-3 border">
                        <SearchableSelect
                          apiUrl="/api/api/purchase-orders/getItemSelect"
                          name={`KdItem[${index}]`}
                          value={row.KdItem}
                          onChange={(opt: any) =>
                            handleItemChange(index, "KdItem", opt.value)
                          }
                          labelKey="text"
                          valueKey="id"
                          placeholder="Cari Item..."
                        />
                      </td>
                      <td className="p-3 border">
                        <input
                          name={`Qty[${index}]`}
                          type="number"
                          value={row.Qty}
                          onChange={(e) =>
                            handleItemChange(index, "Qty", e.target.value)
                          }
                          className="w-full border p-2 rounded"
                        />
                      </td>
                      <td className="p-3 border">
                        <input
                          name={`Price[${index}]`}
                          type="number"
                          value={row.Price}
                          onChange={(e) =>
                            handleItemChange(index, "Price", e.target.value)
                          }
                          className="w-full border p-2 rounded"
                        />
                      </td>
                      <td className="p-3 border text-center">
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteItem(row.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPurchaseOrder ? "Update" : "Submit"}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
