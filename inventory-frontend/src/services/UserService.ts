// services/UserService.ts

import { User, UserCreateUpdate } from '../types/User'; // Sesuaikan path

const API_URL = '/api/api/users'; // URL API CodeIgniter

export const UserService = {
    // READ All
    getAll: async (): Promise<User[]> => {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Gagal mengambil data pengguna.');
        }
        // Menggunakan "as User[]" untuk memastikan tipe data
        return response.json() as Promise<User[]>;
    },

    // CREATE
    create: async (userData: UserCreateUpdate) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) {
            // Asumsikan respons error CI4 memiliki properti 'messages'
            const errorMessage = data.messages?.error || 'Gagal menambahkan pengguna.';
            throw new Error(errorMessage);
        }
        return data;
    },

    // UPDATE
    update: async (id: number, userData: UserCreateUpdate) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        
        const data = await response.json();
        if (!response.ok) {
             const errorMessage = data.messages?.error || 'Gagal memperbarui pengguna.';
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
            const errorMessage = data.messages?.error || 'Gagal menghapus pengguna.';
            throw new Error(errorMessage);
        }
        return data;
    },
};