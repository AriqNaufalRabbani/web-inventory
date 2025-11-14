<?php

namespace App\Models;

use CodeIgniter\Model;

class CustomerModel extends Model
{
    // Menggunakan Query Builder secara 'mentah' (raw query builder)
    protected $db;

    protected $table      = 'Customers'; // atau nama tabel yang kamu buat
    protected $primaryKey = 'id';

    protected $allowedFields = [
            'id'
        ,   'KdCust'
        ,   'NmCust'
        ,   'Contact'
        ,   'Address'
        ,   'CrtDt'
        ,   'UpdDt'
    ];

    public function __construct()
    {
        parent::__construct();
        $this->db = \Config\Database::connect();
        $this->builder = $this->db->table($this->table);
    }

    public function GenerateCode()
    {
        // Pastikan Anda telah menginisialisasi properti $db di Model jika diperlukan
        $sql = "
            SELECT 
                'CUST' + RIGHT('000' + 
                    CAST(
                        ISNULL(
                            CAST(RIGHT(MAX(KdCust), 3) AS INT), 
                            0
                        ) + 1 
                    AS VARCHAR(3)), 
                3) AS NewCode
            FROM Customers;

        ";
        // Eksekusi raw SQL query
        $query = $this->db->query($sql);
        $fetch = $query->getRowArray();

        // Mengembalikan hasil dalam bentuk array
        return $fetch['NewCode']; 
    }

    // --- READ (GET ALL) ---
    public function getAllCustomers()
    {
        // Pastikan Anda telah menginisialisasi properti $db di Model jika diperlukan
        $sql = "
            SELECT 
                *
            FROM Customers
        ";

        // Eksekusi raw SQL query
        $query = $this->db->query($sql);

        // Mengembalikan hasil dalam bentuk array
        return $query->getResultArray(); 
    }

    // --- READ (GET BY ID) ---
    public function getCustomerById($id)
    {
        // SELECT * FROM users WHERE id = :id:
        $query = $this->builder->getWhere([$this->primaryKey => $id]);
        return $query->getRowArray(); // Mengembalikan satu baris array
    }
    
    // --- CREATE (INSERT) ---
    public function insertCustomer($data)
    {
        // Query Builder secara otomatis melakukan escaping data
        return $this->builder->insert($data);
    }
    
    // --- UPDATE ---
    public function updateCustomer($id, $data)
    {
        $this->builder->where($this->primaryKey, $id);
        return $this->builder->update($data);
    }
    
    // --- DELETE ---
    public function deleteCustomer($id)
    {
        // DELETE FROM users WHERE id = :id:
        return $this->builder->delete([$this->primaryKey => $id]);
    }

}
