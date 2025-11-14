<?php

namespace App\Models;

use CodeIgniter\Model;

class PurchaseOrderModel extends Model
{
    // Menggunakan Query Builder secara 'mentah' (raw query builder)
    protected $db;

    protected $table            = 'PurchaseOrders';
    protected $primaryKey       = 'id';
    protected $allowedFields    = [
        'PONumber', 'PODate', 'KdPurchaseOrder', 'KdWarehouse',
        'Status', 'CrtDt', 'CrtBy', 'UpdDt', 'UpdBy'
    ];
    public $useTimestamps = false;

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
                'PO' + CAST(YEAR(GETDATE()) AS VARCHAR(4)) + '' + 
                RIGHT('0000' + 
                    CAST(
                        ISNULL(
                            MAX(CAST(RIGHT(PONumber, 4) AS INT)), 
                            0
                        ) + 1 
                    AS VARCHAR(4)), 
                4) AS NewPONumber
            FROM PurchaseOrders
        ";
        // Eksekusi raw SQL query
        $query = $this->db->query($sql);
        $fetch = $query->getRowArray();

        // Mengembalikan hasil dalam bentuk array
        return $fetch['NewPONumber']; 
    }

    // --- READ (GET ALL) ---
    public function fetchData()
    {
        // Pastikan Anda telah menginisialisasi properti $db di Model jika diperlukan
        $sql = "
            SELECT
                PO.id
            ,	PO.PONumber
            ,	PO.PODate
            ,	SU.KdSupplier
            ,	SU.NmSupplier
            ,	ContactSupplier = SU.Contact
            ,	AddressSupplier = SU.Address
            ,	KdWarehouse = WH.KdWH
            ,	NmWarehouse = WH.NmWH
            ,	WH.AddressWH
            ,	TotalAmount = (SELECT SUM(Subtotal) FROM PurchaseOrderItems WHERE PONumber = PO.PONumber)
            ,	PO.Status
            ,	StatusText = CASE WHEN PO.Status = '0' THEN 'Draft'
                                    WHEN PO.Status = '1' THEN 'Submited'
                                    WHEN PO.Status = '2' THEN 'Approved'
                                    WHEN PO.Status = '4' THEN 'Rejected'
                                    ELSE '' END
            FROM PurchaseOrders	PO
            LEFT JOIN Suppliers SU
            ON SU.KdSupplier = PO.KdSupplier
            LEFT JOIN Warehouses WH
            ON WH.KdWH = PO.KdWarehouse
        ";
        // Eksekusi raw SQL query
        $query = $this->db->query($sql);

        // Mengembalikan hasil dalam bentuk array
        return $query->getResultArray(); 
    }

    // --- READ (GET BY ID) ---
    public function getPurchaseOrderById($id)
    {
        $sql = "
            SELECT
                PO.id
            ,	PO.PONumber
            ,	PO.PODate
            ,	SU.KdSupplier
            ,	SU.NmSupplier
            ,	ContactSupplier = SU.Contact
            ,	AddressSupplier = SU.Address
            ,	WH.KdWH
            ,	WH.NmWH
            ,	WH.AddressWH
            ,	TotalAmount = (SELECT SUM(Subtotal) FROM PurchaseOrderItems WHERE PONumber = PO.PONumber)
            ,	PO.Status
            ,	StatusText = CASE WHEN PO.Status = '0' THEN 'Draft'
                                    WHEN PO.Status = '1' THEN 'Approved'
                                    WHEN PO.Status = '0' THEN 'Rejected'
                                    ELSE '' END
            FROM PurchaseOrders	PO
            LEFT JOIN Suppliers SU
            ON SU.KdSupplier = PO.KdSupplier
            LEFT JOIN Warehouses WH
            ON WH.KdWH = PO.KdWarehouse
            WHERE PO.id = '$id'
        ";
        // Eksekusi raw SQL query
        $query = $this->db->query($sql);

        // Mengembalikan hasil dalam bentuk array
        return $query->getRowArray(); 
    }

    public function getDetailItemsbyPO($PONumber)
    {
        $sql = "
            SELECT * 
            FROM PurchaseOrderItems
            WHERE PONumber = '$PONumber'
        ";
        // Eksekusi raw SQL query
        $query = $this->db->query($sql);

        // Mengembalikan hasil dalam bentuk array
        return $query->getResultArray(); 
    }

    public function getSupplierSelect($Search = '%'){
        $sql = "
            SELECT KdSupplier, NmSupplier FROM Suppliers
            WHERE NmSupplier LIKE '%$Search%'
        ";
        // Eksekusi raw SQL query
        $query = $this->db->query($sql);
        return $query->getResultArray(); 
    }

    public function getWarehouseSelect($Search = '%'){
        $sql = "
            SELECT KdWH, NmWH FROM Warehouses
            WHERE NmWH LIKE '%$Search%'
        ";
        // Eksekusi raw SQL query
        $query = $this->db->query($sql);
        return $query->getResultArray(); 
    }

    public function getItemSelect($Search = '%'){
        $sql = "
            SELECT KdItem, NmItem FROM Items
            WHERE NmItem LIKE '%$Search%'
        ";
        // Eksekusi raw SQL query
        $query = $this->db->query($sql);
        return $query->getResultArray(); 
    }
    
    // --- CREATE (INSERT) ---
    public function insertPurchaseOrder($data)
    {
        $PONumber    = $this->GenerateCode();
        $PODate      = $data['PODate'];
        $KdSupplier  = $data['KdSupplier'];
        $KdWarehouse = $data['KdWarehouse'];

        $this->db->transStart(); // mulai transaksi

        // Insert header
        $this->db->table('PurchaseOrders')->insert([
            'PONumber'   => $PONumber,
            'PODate'     => $PODate,
            'KdSupplier' => $KdSupplier,
            'KdWarehouse'=> $KdWarehouse,
            'Status'     => 0,
            'CrtDt'      => date('Y-m-d H:i:s'),
            'CrtBy'      => 'LOAD',
            'UpdDt'      => date('Y-m-d H:i:s'),
            'UpdBy'      => 'LOAD'
        ]);

        // Insert items jika ada
        if(!empty($data['items'])){
            foreach($data['items'] as $item){
                $KdItem   = trim($item['KdItem']);
                $Qty      = (float) trim($item['Qty']);
                $Price    = (float) trim($item['Price']);
                $Subtotal = $Qty * $Price;

                $this->db->table('PurchaseOrderItems')->insert([
                    'PONumber' => $PONumber,
                    'KdItem'   => $KdItem,
                    'Qty'      => $Qty,
                    'Price'    => $Price,
                    'Subtotal' => $Subtotal,
                    'CrtDt'    => date('Y-m-d H:i:s')
                ]);
            }
        }

        $this->db->transComplete(); // commit/rollback otomatis

        return $this->db->transStatus(); // true jika berhasil, false jika gagal
    }
    
    // --- UPDATE ---
    public function updatePurchaseOrder($id, $data)
    {
        $PONumber       = trim($data['PONumber']);
        $PODate         = trim($data['PODate']);
        $KdSupplier     = trim($data['KdSupplier']);
        $KdWarehouse    = trim($data['KdWarehouse']);
        
        $sql = "
            UPDATE PurchaseOrders
            SET     KdSupplier  = '$KdSupplier'
                ,   KdWarehouse = '$KdWarehouse'
                ,   UpdDt       = GETDATE()
                ,   UpdBy       = 'LOAD'
            WHERE id = '$id'
        ";
        $query = $this->db->query($sql);

        $sql = "
            DELETE PurchaseOrderItems
            WHERE PONumber = (SELECT PONumber FROM PurchaseOrders WHERE id = '$id')
        ";
        $query = $this->db->query($sql);

        if($data['items']){
            foreach($data['items'] as $value){
                $KdItem = trim($value['KdItem']);
                $Qty    = (float) trim($value['Qty']);
                $Price  = (float) trim($value['Price']);
                $Subtotal = $Qty * $Price;

                $sql = "
                    INSERT INTO [dbo].[PurchaseOrderItems]
                        (   [PONumber]
                        ,   [KdItem]
                        ,   [Qty]
                        ,   [Price]
                        ,   [Subtotal]
                        ,   [CrtDt])
                    VALUES(
                            '$PONumber'
                        ,   '$KdItem'
                        ,   '$Qty'
                        ,   '$Price'
                        ,   '$Subtotal'
                        ,   GETDATE()
                    )
                ";
                $query = $this->db->query($sql);
            }
        }

        return true;
    }
    
    // --- DELETE ---
    public function deletePurchaseOrder($id)
    {
        $sql = "
            DELETE PurchaseOrderItems
            WHERE PONumber = (SELECT PONumber FROM PurchaseOrders WHERE id = '$id')
        ";
        $query = $this->db->query($sql);
        
        $sql = "
            DELETE PurchaseOrders
            WHERE id = '$id'
        ";
        $query = $this->db->query($sql);

        

        return true;
    }

    public function submitPurchaseOrder($id)
    {
        $sql = "
            UPDATE PurchaseOrders
            SET Status = '1'
            WHERE id = '$id'
        ";
        $query = $this->db->query($sql);

        return true;
    }
}
