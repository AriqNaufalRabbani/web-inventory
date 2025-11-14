"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function UserFormModal({
  open,
  onClose,
  onSubmit,
  editingUser,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  editingUser: any | null;
}) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    role_id: "2",
    is_active: 1,
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        username: editingUser.username,
        password: "",
        fullname: editingUser.fullname,
        role_id: editingUser.role_id,
        is_active: editingUser.is_active,
      });
    } else {
      setFormData({
        username: "",
        password: "",
        fullname: "",
        role_id: "2",
        is_active: 1,
      });
    }
  }, [editingUser]);

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
            className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h2 className="text-xl font-semibold mb-4">
              {editingUser ? "Edit User" : "Create User"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium">Fullname</label>
                <input
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Role ID</label>
                <select
                  name="role_id"
                  value={formData.role_id}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="1">Admin</option>
                  <option value="2">Staff</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  name="is_active"
                  value={formData.is_active}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">{editingUser ? "Update" : "Submit"}</Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
