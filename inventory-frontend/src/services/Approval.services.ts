// services/UserService.ts

import { Approval, ApprovalCreateUpdate } from '../types/Approval'; // Sesuaikan path

const API_URL = '/api/api/approval'; // URL API CodeIgniter

export const ApprovalService = {
    // READ All
    getAll: async (): Promise<Approval[]> => {
        const response = await fetch(API_URL + '/fetch');
        
        if (!response.ok) {
            throw new Error('Gagal mengambil data.');
        }
        // Menggunakan "as Approval[]" untuk memastikan tipe data
        return response.json() as Promise<Approval[]>;
    },

    // CREATE
    create: async (userData: ApprovalCreateUpdate) => {
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
    update: async (NoTrans: string, userData: ApprovalCreateUpdate) => {
        const response = await fetch(`${API_URL}/update/${NoTrans}`, {
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
    delete: async (NoTrans: string) => {
        const response = await fetch(`${API_URL}/delete/${NoTrans}`, {
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
    submit: async (NoTrans: string) => {
        const response = await fetch(`${API_URL}/submit/${NoTrans}`, {
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