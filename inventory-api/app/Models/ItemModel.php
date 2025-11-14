<?php

namespace App\Models;

use CodeIgniter\Model;

class ItemModel extends Model
{
    // Menggunakan Query Builder secara 'mentah' (raw query builder)
    protected $db;

    protected $table      = 'Items'; // atau nama tabel yang kamu buat
    protected $primaryKey = 'id';

    protected $allowedFields = [
            'id'
        ,   'KdItem'
        ,   'NmItem'
        ,   'Price'
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
                'ITM' + RIGHT('000' + 
                    CAST(
                        ISNULL(
                            CAST(RIGHT(MAX(KdItem), 3) AS INT), 
                            0
                        ) + 1 
                    AS VARCHAR(3)), 
                3) AS NewCode
            FROM Items;
        ";
        // Eksekusi raw SQL query
        $query = $this->db->query($sql);
        $fetch = $query->getRowArray();

        // Mengembalikan hasil dalam bentuk array
        return $fetch['NewCode']; 
    }

    // --- READ (GET ALL) ---
    public function getAllItems()
    {
        // Pastikan Anda telah menginisialisasi properti $db di Model jika diperlukan
        $sql = "
            SELECT 
                i.*
            ,	Stocks = (SELECT SUM(Stock) FROM ItemStocks WHERE KdItem = i.KdItem)
            FROM Items i
            ORDER BY id
        ";

        // Eksekusi raw SQL query
        $query = $this->db->query($sql);

        // Mengembalikan hasil dalam bentuk array
        return $query->getResultArray(); 
    }

    // --- READ (GET BY ID) ---
    public function getItemById($id)
    {
        // SELECT * FROM users WHERE id = :id:
        $query = $this->builder->getWhere([$this->primaryKey => $id]);
        return $query->getRowArray(); // Mengembalikan satu baris array
    }
    
    // --- CREATE (INSERT) ---
    public function insertItem($data)
    {
        // Query Builder secara otomatis melakukan escaping data
        return $this->builder->insert($data);
    }
    
    // --- UPDATE ---
    public function updateItem($id, $data)
    {
        $this->builder->where($this->primaryKey, $id);
        return $this->builder->update($data);
    }
    
    // --- DELETE ---
    public function deleteItem($id)
    {
        // DELETE FROM users WHERE id = :id:
        return $this->builder->delete([$this->primaryKey => $id]);
    }

}
