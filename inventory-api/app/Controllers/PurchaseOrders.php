<?php

namespace App\Controllers;

// use CodeIgniter\Controller;
use CodeIgniter\RESTful\ResourceController;
use App\Models\PurchaseOrderModel;

class PurchaseOrders extends ResourceController
{
    protected $modelName = 'App\Models\PurchaseOrderModel';
    protected $format    = 'json';

    // Mendapatkan semua pengguna (GET /users)
    public function fetchData()
    {
        $result = $this->model->fetchData();
        // if ($result) {
            return $this->respond($result);
        // }
        // return $this->failNotFound('Tidak ada data ditemukan');
    }

    // Mendapatkan pengguna berdasarkan ID (GET /users/(:num))
    public function getPurchaseOrderById($id = null)
    {
        $result = $this->model->getPurchaseOrderById($id);
        if ($result) {
            // Hilangkan password_hash sebelum dikirimkan
            return $this->respond($result);
        }
        return $this->failNotFound('PO dengan id ' . $id . ' tidak ditemukan');
    }

    public function getDetailItemsbyPO($PONumber = null)
    {
        $result = $this->model->getDetailItemsbyPO($PONumber);
        if ($result) {
            // Hilangkan password_hash sebelum dikirimkan
            return $this->respond($result);
        }
        return $this->failNotFound('PO dengan id ' . $PONumber . ' tidak ditemukan');
    }

    public function getSupplierSelect($Search = '%'){
        $result = $this->model->getSupplierSelect($Search);

        $data = array();
        foreach($result as $res){
            $KdSupplier = trim($res['KdSupplier']);
            $NmSupplier = trim($res['NmSupplier']);

            array_push($data, array(
                'id'        => $KdSupplier,
                'text'      => $NmSupplier,
            ));
        }

        echo json_encode($data);
    }

    public function getWarehouseSelect($Search = '%'){
        $result = $this->model->getWarehouseSelect($Search);

        $data = array();
        foreach($result as $res){
            $KdWH = trim($res['KdWH']);
            $NmWH = trim($res['NmWH']);

            array_push($data, array(
                'id'        => $KdWH,
                'text'      => $NmWH,
            ));
        }

        echo json_encode($data);
    }

    public function getItemSelect($Search = '%'){
        $result = $this->model->getItemSelect($Search);

        $data = array();
        foreach($result as $res){
            $KdItem = trim($res['KdItem']);
            $NmItem = trim($res['NmItem']);

            array_push($data, array(
                'id'        => $KdItem,
                'text'      => $NmItem,
            ));
        }

        echo json_encode($data);
    }

    // Menambahkan pengguna baru (POST /users)
    public function create()
    {
        $rules = [
            'PODate'        => 'required',
            'KdSupplier'    => 'required',
            'KdWarehouse'   => 'required',
            // Tambahkan validasi untuk role_id dan is_active jika perlu
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $data = array();
        $data = $this->request->getJSON(true);
        
        if ($this->model->insertPurchaseOrder($data)) {
            return $this->respondCreated(['message' => 'PO berhasil ditambahkan']);
        }

        return $this->failServerError('Gagal menambahkan PO');
    }

    // Memperbarui pengguna (PUT/PATCH /users/(:num))
    public function update($id = null)
    {
        $Item = $this->model->getPurchaseOrderById($id);

        if (!$Item) {
            return $this->failNotFound('PO dengan id ' . $id . ' tidak ditemukan');
        }

        $rules = [
            'PODate'        => 'required',
            'KdSupplier'    => 'required',
            'KdWarehouse'   => 'required',
            // Tambahkan validasi untuk role_id dan is_active jika perlu
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $data = array();
        $data = $this->request->getJSON(true);
        
        if ($this->model->updatePurchaseOrder($id, $data)) {
            return $this->respondUpdated(['message' => 'PO berhasil diupdate']);
        }

        return $this->failServerError('Gagal menambahkan PO');
    }

    // Menghapus pengguna (DELETE /users/(:num))
    public function delete($id = null)
    {
        $result = $this->model->getPurchaseOrderById($id);
        if (!$result) {
            return $this->failNotFound('PO dengan id ' . $id . ' tidak ditemukan');
        }

        if ($this->model->deletePurchaseOrder($id)) {
            return $this->respondDeleted(['message' => 'PO berhasil dihapus']);
        }

        return $this->failServerError('Gagal menghapus pengguna');
    }

    public function submit($id = null)
    {
        $result = $this->model->getPurchaseOrderById($id);
        if (!$result) {
            return $this->failNotFound('PO dengan id ' . $id . ' tidak ditemukan');
        }

        if ($this->model->submitPurchaseOrder($id)) {
            return $this->respondUpdated(['message' => 'PO berhasil disubmit']);
        }

        return $this->failServerError('Gagal menghapus pengguna');
    }


}
