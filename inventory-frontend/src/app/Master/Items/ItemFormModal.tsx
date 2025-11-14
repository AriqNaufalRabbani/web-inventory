"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ItemFormModal({
  open,
  onClose,
  onSubmit,
  editingItem,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  editingItem: any | null;
}) {
  const [formData, setFormData] = useState({
    NmItem: "",
    Price: "",
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        NmItem: editingItem.NmItem,
        Price: editingItem.Price,
      });
    } else {
      setFormData({
        NmItem: "",
        Price: "",
      });
    }
  }, [editingItem]);

  if (!open) return null;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md dark:bg-gray-dark"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingItem ? "Edit Item" : "Add Item"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Item Name</label>
                <input
                  name="NmItem"
                  value={formData.NmItem}
                  placeholder="Item Name"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  name="Price"
                  placeholder="Price"
                  value={formData.Price}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">{editingItem ? "Update" : "Submit"}</Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
