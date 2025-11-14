// services/UserService.ts

import { Supplier, SupplierCreateUpdate } from '../types/Supplier'; // Sesuaikan path

const API_URL = '/api/api/suppliers'; // URL API CodeIgniter

export const SupplierService = {
    // READ All
    getAll: async (): Promise<Supplier[]> => {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Gagal mengambil data supplier.');
        }
        // Menggunakan "as Supplier[]" untuk memastikan tipe data
        return response.json() as Promise<Supplier[]>;
    },

    // CREATE
    create: async (supplierData: SupplierCreateUpdate) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(supplierData),
        });

        const data = await response.json();
        if (!response.ok) {
            // Asumsikan respons error CI4 memiliki properti 'messages'
            const errorMessage = data.messages?.error || 'Gagal menambahkan supplier.';
            throw new Error(errorMessage);
        }
        return data;
    },

    // UPDATE
    update: async (id: number, supplierData: SupplierCreateUpdate) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(supplierData),
        });
        
        const data = await response.json();
        if (!response.ok) {
             const errorMessage = data.messages?.error || 'Gagal memperbarui supplier.';
            throw new Error(errorMessage);
        }
        return data;
    },

    // DELETE
    delete: async (id: number) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        
        const data = await response.json();
        if (!response.ok) {
            const errorMessage = data.messages?.error || 'Gagal menghapus supplier.';
            throw new Error(errorMessage);
        }
        return data;
    },
};