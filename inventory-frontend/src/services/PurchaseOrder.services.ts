// services/UserService.ts

import { PurchaseOrder, PurchaseOrderCreateUpdate } from '../types/PurchaseOrder'; // Sesuaikan path

const API_URL = '/api/api/purchase-orders'; // URL API CodeIgniter

export const PurchaseOrderService = {
    // READ All
    getAll: async (): Promise<PurchaseOrder[]> => {
        const response = await fetch(API_URL + '/fetch');
        
        if (!response.ok) {
            throw new Error('Gagal mengambil data.');
        }
        // Menggunakan "as PurchaseOrder[]" untuk memastikan tipe data
        return response.json() as Promise<PurchaseOrder[]>;
    },

    // CREATE
    create: async (userData: PurchaseOrderCreateUpdate) => {
        const response = await fetch(API_URL + '/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) {
            // Asumsikan respons error CI4 memiliki properti 'messages'
            const errorMessage = data.messages?.error || 'Gagal menambahkan data.';
            throw new Error(errorMessage);
        }
        return data;
    },

    // UPDATE
    update: async (id: number, userData: PurchaseOrderCreateUpdate) => {
        const response = await fetch(`${API_URL}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        
        const data = await response.json();
        if (!response.ok) {
             const errorMessage = data.messages?.error || 'Gagal memperbarui data.';
            throw new Error(errorMessage);
        }
        return data;
    },

    // DELETE
    delete: async (id: number) => {
        const response = await fetch(`${API_URL}/delete/${id}`, {
            method: 'DELETE',
        });
        
        const data = await response.json();
        if (!response.ok) {
            const errorMessage = data.messages?.error || 'Gagal menghapus data.';
            throw new Error(errorMessage);
        }
        return data;
    },
    // Submit
    submit: async (id: number) => {
        const response = await fetch(`${API_URL}/submit/${id}`, {
            method: 'PUT',
        });
        
        const data = await response.json();
        if (!response.ok) {
            const errorMessage = data.messages?.error || 'Gagal mensubmit data.';
            throw new Error(errorMessage);
        }
        return data;
    },
    
};