<?php

namespace App\Controllers;

// use CodeIgniter\Controller;
use CodeIgniter\RESTful\ResourceController;
use App\Models\CustomerModel;

class CustomerController extends ResourceController
{
    protected $modelName = 'App\Models\CustomerModel';
    protected $format    = 'json';

    // Mendapatkan semua pengguna (GET /users)
    public function index()
    {
        $result = $this->model->getAllCustomers();
        if ($result) {
            return $this->respond($result);
        }
        return $this->failNotFound('Tidak ada Customer ditemukan');
    }

    // Mendapatkan pengguna berdasarkan ID (GET /users/(:num))
    public function show($id = null)
    {
        $result = $this->model->getCustomerById($id);
        if ($result) {
            // Hilangkan password_hash sebelum dikirimkan
            return $this->respond($result);
        }
        return $this->failNotFound('Customer dengan id ' . $id . ' tidak ditemukan');
    }

    // Menambahkan pengguna baru (POST /users)
    public function create()
    {
        $rules = [
            'NmCust'      => 'required',
            // Tambahkan validasi untuk role_id dan is_active jika perlu
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $code               = $this->model->GenerateCode();

        $data = [
            'KdCust'        => $code,
            // PENTING: Gunakan password_hash() untuk keamanan
            'NmCust'        => $this->request->getVar('name'),
            'Contact'       => $this->request->getVar('contact'),
            'Address'       => $this->request->getVar('address'),
            'CrtDt'         => date('Y-m-d H:i:s'),
            'UpdDt'         => date('Y-m-d H:i:s'),
        ];

        
        if ($this->model->insertCustomer($data)) {
            return $this->respondCreated(['message' => 'Customer berhasil ditambahkan']);
        }

        return $this->failServerError('Gagal menambahkan Customer');
    }

    // Memperbarui pengguna (PUT/PATCH /users/(:num))
    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

        $Customer = $this->model->getCustomerById($id);

        if (!$Customer) {
            return $this->failNotFound('Customer dengan id ' . $id . ' tidak ditemukan');
        }

        // $updateData = [
        //     'updated_at' => date('Y-m-d H:i:s')
        // ];

        // Hanya update field yang ada di request
        if (isset($data['NmCust'])) $updateData['NmCust'] = $data['NmCust'];
        if (isset($data['Contact'])) $updateData['Contact'] = $data['Contact'];
        if (isset($data['Address'])) $updateData['Address'] = $data['Address'];
        

        // return json_encode($updateData);;

        if ($this->model->updateCustomer($id, $updateData)) {
            return $this->respond(['message' => 'Customer berhasil diperbarui']);
        }
        
        return $this->failServerError('Gagal memperbarui Customer');
    }

    // Menghapus pengguna (DELETE /users/(:num))
    public function delete($id = null)
    {
        $result = $this->model->getCustomerById($id);
        if (!$result) {
            return $this->failNotFound('Customer dengan id ' . $id . ' tidak ditemukan');
        }

        if ($this->model->deleteCustomer($id)) {
            return $this->respondDeleted(['message' => 'Customer berhasil dihapus']);
        }

        return $this->failServerError('Gagal menghapus pengguna');
    }


}
