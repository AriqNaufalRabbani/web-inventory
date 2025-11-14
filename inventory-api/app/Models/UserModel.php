<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    // Menggunakan Query Builder secara 'mentah' (raw query builder)
    protected $db;

    protected $table      = 'Users'; // atau nama tabel yang kamu buat
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'username',
        'password_hash',
        'fullname',
        'role_id',
        'is_active',
        'created_at',
        'updated_at'
    ];

    public function __construct()
    {
        parent::__construct();
        $this->db = \Config\Database::connect();
        $this->builder = $this->db->table($this->table);
    }

    // --- READ (GET ALL) ---
    // public function getAllUsers()
    // {
    //     // SELECT * FROM users
    //     $query = $this->builder->get();
    //     return $query->getResultArray(); // Mengembalikan array
    // }

    public function getAllUsers()
    {
        // Pastikan Anda telah menginisialisasi properti $db di Model jika diperlukan
        $sql = "
            SELECT 
                u.*, 
                role_name = r.name
            FROM Users u
            LEFT JOIN roles r 
            ON r.id = u.role_id
        ";

        // Eksekusi raw SQL query
        $query = $this->db->query($sql);

        // Mengembalikan hasil dalam bentuk array
        return $query->getResultArray(); 
    }

    // --- READ (GET BY ID) ---
    public function getUserById($id)
    {
        // SELECT * FROM users WHERE id = :id:
        $query = $this->builder->getWhere([$this->primaryKey => $id]);
        return $query->getRowArray(); // Mengembalikan satu baris array
    }
    
    // --- CREATE (INSERT) ---
    public function insertUser($data)
    {
        // Contoh data: ['username' => 'newuser', 'password_hash' => 'hash_value', ...]
        // INSERT INTO users (...) VALUES (...)
        // Query Builder secara otomatis melakukan escaping data
        return $this->builder->insert($data);
    }
    
    // --- UPDATE ---
    public function updateUser($id, $data)
    {
        // Contoh data: ['fullname' => 'New Fullname', 'updated_at' => date('Y-m-d H:i:s')]
        // UPDATE users SET ... WHERE id = :id:
        $this->builder->where($this->primaryKey, $id);
        return $this->builder->update($data);
    }
    
    // --- DELETE ---
    public function deleteUser($id)
    {
        // DELETE FROM users WHERE id = :id:
        return $this->builder->delete([$this->primaryKey => $id]);
    }

}
