<?php

namespace App\Models;

use CodeIgniter\Model;

class WHModel extends Model
{
    // Menggunakan Query Builder secara 'mentah' (raw query builder)
    protected $db;

    protected $table      = 'Warehouses'; // atau nama tabel yang kamu buat
    protected $primaryKey = 'id';

    protected $allowedFields = [
            'id'
        ,   'KdWH'
        ,   'NmWH'
        ,   'AddressWH'
    ];

    public function __construct()
    {
        parent::__construct();
        $this->db = \Config\Database::connect();
        $this->builder = $this->db->table($this->table);
    }

    // --- READ (GET ALL) ---
    public function getAllWarehouse()
    {
        // Pastikan Anda telah menginisialisasi properti $db di Model jika diperlukan
        $sql = "
            SELECT  id
                ,   KdWH
                ,   NmWH
                ,   AddressWH
            FROM Warehouses
        ";
        // Eksekusi raw SQL query
        $query = $this->db->query($sql);

        // Mengembalikan hasil dalam bentuk array
        return $query->getResultArray(); 
    }
}
