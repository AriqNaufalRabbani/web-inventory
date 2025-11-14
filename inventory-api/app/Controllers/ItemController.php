<?php

namespace App\Controllers;

// use CodeIgniter\Controller;
use CodeIgniter\RESTful\ResourceController;
use App\Models\ItemModel;

class ItemController extends ResourceController
{
    protected $modelName = 'App\Models\ItemModel';
    protected $format    = 'json';

    // Mendapatkan semua pengguna (GET /users)
    public function index()
    {
        $result = $this->model->getAllItems();
        if ($result) {
            return $this->respond($result);
        }
        return $this->failNotFound('Tidak ada Item ditemukan');
    }

    // Mendapatkan pengguna berdasarkan ID (GET /users/(:num))
    public function show($id = null)
    {
        $result = $this->model->getItemById($id);
        if ($result) {
            // Hilangkan password_hash sebelum dikirimkan
            return $this->respond($result);
        }
        return $this->failNotFound('Item dengan id ' . $id . ' tidak ditemukan');
    }

    // Menambahkan pengguna baru (POST /users)
    public function create()
    {
        $rules = [
            'NmItem'      => 'required',
            // Tambahkan validasi untuk role_id dan is_active jika perlu
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $KdItem               = $this->model->GenerateCode();

        $data = [
            'KdItem'        => $KdItem,
            'NmItem'        => $this->request->getVar('NmItem'),
            'Price'         => $this->request->getVar('Price'),
            'CrtDt'         => date('Y-m-d H:i:s'),
            'UpdDt'         => date('Y-m-d H:i:s'),
        ];

        
        if ($this->model->insertItem($data)) {
            return $this->respondCreated(['message' => 'Item berhasil ditambahkan']);
        }

        return $this->failServerError('Gagal menambahkan Item');
    }

    // Memperbarui pengguna (PUT/PATCH /users/(:num))
    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

        $Item = $this->model->getItemById($id);

        if (!$Item) {
            return $this->failNotFound('Item dengan id ' . $id . ' tidak ditemukan');
        }

        $updateData = [
            'UpdDt' => date('Y-m-d H:i:s')
        ];

        // Hanya update field yang ada di request
        if (isset($data['NmItem'])) $updateData['NmItem']   = $data['NmItem'];
        if (isset($data['Price'])) $updateData['Price']     = $data['Price'];
        

        // return json_encode($updateData);;

        if ($this->model->updateItem($id, $updateData)) {
            return $this->respond(['message' => 'Item berhasil diperbarui']);
        }
        
        return $this->failServerError('Gagal memperbarui Item');
    }

    // Menghapus pengguna (DELETE /users/(:num))
    public function delete($id = null)
    {
        $result = $this->model->getItemById($id);
        if (!$result) {
            return $this->failNotFound('Item dengan id ' . $id . ' tidak ditemukan');
        }

        if ($this->model->deleteItem($id)) {
            return $this->respondDeleted(['message' => 'Item berhasil dihapus']);
        }

        return $this->failServerError('Gagal menghapus pengguna');
    }


}
