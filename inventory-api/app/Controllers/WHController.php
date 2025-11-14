<?php

namespace App\Controllers;

// use CodeIgniter\Controller;
use CodeIgniter\RESTful\ResourceController;
use App\Models\WHModel;

class WHController extends ResourceController
{
    protected $modelName = 'App\Models\WHModel';
    protected $format    = 'json';

    // Mendapatkan semua pengguna (GET /users)
    public function index()
    {
        $result = $this->model->getAllWarehouse();
        if ($result) {
            return $this->respond($result);
        }
        return $this->failNotFound('Tidak ada data ditemukan');
    }

}
