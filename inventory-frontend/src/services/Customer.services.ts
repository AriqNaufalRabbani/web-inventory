// services/UserService.ts

import { Customer, CustomerCreateUpdate } from '../types/Customer'; // Sesuaikan path

const API_URL = '/api/api/customers'; // URL API CodeIgniter

export const CustomerService = {
    // READ All
    getAll: async (): Promise<Customer[]> => {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Gagal mengambil data customer.');
        }
        // Menggunakan "as Customer[]" untuk memastikan tipe data
        return response.json() as Promise<Customer[]>;
    },

    // CREATE
    create: async (customerData: CustomerCreateUpdate) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
        });

        const data = await response.json();
        if (!response.ok) {
            // Asumsikan respons error CI4 memiliki properti 'messages'
            const errorMessage = data.messages?.error || 'Gagal menambahkan customer.';
            throw new Error(errorMessage);
        }
        return data;
    },

    // UPDATE
    update: async (id: number, customerData: CustomerCreateUpdate) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
        });
        
        const data = await response.json();
        if (!response.ok) {
             const errorMessage = data.messages?.error || 'Gagal memperbarui customer.';
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
            const errorMessage = data.messages?.error || 'Gagal menghapus customer.';
            throw new Error(errorMessage);
        }
        return data;
    },
};