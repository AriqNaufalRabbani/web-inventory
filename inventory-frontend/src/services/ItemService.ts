// services/UserService.ts

import { Item, ItemCreateUpdate } from '../types/Item'; // Sesuaikan path

const API_URL = '/api/api/items'; // URL API CodeIgniter

export const ItemService = {
    // READ All
    getAll: async (): Promise<Item[]> => {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Gagal mengambil data item.');
        }
        // Menggunakan "as Item[]" untuk memastikan tipe data
        return response.json() as Promise<Item[]>;
    },

    // CREATE
    create: async (itemData: ItemCreateUpdate) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData),
        });

        const data = await response.json();
        if (!response.ok) {
            // Asumsikan respons error CI4 memiliki properti 'messages'
            const errorMessage = data.messages?.error || 'Gagal menambahkan item.';
            throw new Error(errorMessage);
        }
        return data;
    },

    // UPDATE
    update: async (id: number, itemData: ItemCreateUpdate) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData),
        });
        
        const data = await response.json();
        if (!response.ok) {
             const errorMessage = data.messages?.error || 'Gagal memperbarui item.';
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
            const errorMessage = data.messages?.error || 'Gagal menghapus item.';
            throw new Error(errorMessage);
        }
        return data;
    },
};