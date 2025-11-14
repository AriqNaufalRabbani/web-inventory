<?php

namespace App\Controllers;

// use CodeIgniter\Controller;
use CodeIgniter\RESTful\ResourceController;
use App\Models\SupplierModel;

class SupplierController extends ResourceController
{
    protected $modelName = 'App\Models\SupplierModel';
    protected $format    = 'json';

    // Mendapatkan semua pengguna (GET /users)
    public function index()
    {
        $result = $this->model->getAllSuppliers();
        if ($result) {
            return $this->respond($result);
        }
        return $this->failNotFound('Tidak ada Supplier ditemukan');
    }

    // Mendapatkan pengguna berdasarkan ID (GET /users/(:num))
    public function show($id = null)
    {
        $result = $this->model->getSupplierById($id);
        if ($result) {
            // Hilangkan password_hash sebelum dikirimkan
            return $this->respond($result);
        }
        return $this->failNotFound('Supplier dengan id ' . $id . ' tidak ditemukan');
    }

    // Menambahkan pengguna baru (POST /users)
    public function create()
    {
        $rules = [
            'NmSupplier'      => 'required',
            // Tambahkan validasi untuk role_id dan is_active jika perlu
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $code               = $this->model->GenerateCode();

        $data = [
            'KdSupplier'    => $code,
            'NmSupplier'    => $this->request->getVar('NmSupplier'),
            'Contact'       => $this->request->getVar('Contact'),
            'Address'       => $this->request->getVar('Address'),
            'CrtDt'         => date('Y-m-d H:i:s'),
            'UpdDt'         => date('Y-m-d H:i:s'),
        ];


        
        if ($this->model->insertSupplier($data)) {
            return $this->respondCreated(['message' => 'Supplier berhasil ditambahkan']);
        }

        return $this->failServerError('Gagal menambahkan Supplier');
    }

    // Memperbarui pengguna (PUT/PATCH /users/(:num))
    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

        $Supplier = $this->model->getSupplierById($id);

        if (!$Supplier) {
            return $this->failNotFound('Supplier dengan id ' . $id . ' tidak ditemukan');
        }

        $updateData = [
            'UpdDt' => date('Y-m-d H:i:s')
        ];

        // Hanya update field yang ada di request
        if (isset($data['NmSupplier'])) $updateData['NmSupplier'] = $data['NmSupplier'];
        if (isset($data['Contact'])) $updateData['Contact'] = $data['Contact'];
        if (isset($data['Address'])) $updateData['Address'] = $data['Address'];
        

        // return json_encode($updateData);;

        if ($this->model->updateSupplier($id, $updateData)) {
            return $this->respond(['message' => 'Supplier berhasil diperbarui']);
        }
        
        return $this->failServerError('Gagal memperbarui Supplier');
    }

    // Menghapus pengguna (DELETE /users/(:num))
    public function delete($id = null)
    {
        $result = $this->model->getSupplierById($id);
        if (!$result) {
            return $this->failNotFound('Supplier dengan id ' . $id . ' tidak ditemukan');
        }

        if ($this->model->deleteSupplier($id)) {
            return $this->respondDeleted(['message' => 'Supplier berhasil dihapus']);
        }

        return $this->failServerError('Gagal menghapus pengguna');
    }


}
