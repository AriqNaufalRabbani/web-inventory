<?php

namespace App\Controllers;

// use CodeIgniter\Controller;
use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;

class UserController extends ResourceController
{
    protected $modelName = 'App\Models\UserModel';
    protected $format    = 'json';

    public function profile()
    {
        $userData = $this->request->userData;

        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'Token valid',
            'user' => $userData
        ]);
    }

    // Mendapatkan semua pengguna (GET /users)
    public function index()
    {
        $users = $this->model->getAllUsers();
        if ($users) {
            return $this->respond($users);
        }
        return $this->failNotFound('Tidak ada pengguna ditemukan');
    }

    // Mendapatkan pengguna berdasarkan ID (GET /users/(:num))
    public function show($id = null)
    {
        $user = $this->model->getUserById($id);
        if ($user) {
            // Hilangkan password_hash sebelum dikirimkan
            unset($user['password_hash']); 
            return $this->respond($user);
        }
        return $this->failNotFound('Pengguna dengan id ' . $id . ' tidak ditemukan');
    }

    // Menambahkan pengguna baru (POST /users)
    public function create()
    {
        
        $rules = [
            'username' => 'required|is_unique[Users.username]',
            'password' => 'required',
            'fullname' => 'required',
            // Tambahkan validasi untuk role_id dan is_active jika perlu
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }


        // return json_encode($this->request->getVar());
        $data = [
            'username'      => $this->request->getVar('username'),
            // PENTING: Gunakan password_hash() untuk keamanan
            'password_hash' => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT),
            'fullname'      => $this->request->getVar('fullname'),
            'role_id'       => $this->request->getVar('role_id') ?? 2, // Nilai default jika tidak ada
            'is_active'     => $this->request->getVar('is_active') ?? 1,
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s'),
        ];

        
        if ($this->model->insertUser($data)) {
            return $this->respondCreated(['message' => 'Pengguna berhasil ditambahkan']);
        }

        return $this->failServerError('Gagal menambahkan pengguna');
    }

    // Memperbarui pengguna (PUT/PATCH /users/(:num))
    public function update($id = null)
    {
        // $data = $this->request->getRawInput();
        // $data = key($data);
        // $data = json_decode($data, true);

        $data = $this->request->getJSON(true);

        $user = $this->model->getUserById($id);

        // echo json_encode($user);
        // echo json_encode($data);

        if (!$user) {
            return $this->failNotFound('Pengguna dengan id ' . $id . ' tidak ditemukan');
        }

        $updateData = [
            'updated_at' => date('Y-m-d H:i:s')
        ];

        // Hanya update field yang ada di request
        if (isset($data['fullname'])) $updateData['fullname'] = $data['fullname'];
        if (isset($data['role_id'])) $updateData['role_id'] = $data['role_id'];
        if (isset($data['is_active'])) $updateData['is_active'] = $data['is_active'];
        
        // PENTING: Jika password di-update, harus di-hash
        if (isset($data['password']) && !empty($data['password'])) {
            $updateData['password_hash'] = password_hash($data['password'], PASSWORD_BCRYPT);
        }

        // return json_encode($updateData);;

        if ($this->model->updateUser($id, $updateData)) {
            return $this->respond(['message' => 'Pengguna berhasil diperbarui']);
        }
        
        return $this->failServerError('Gagal memperbarui pengguna');
    }

    // Menghapus pengguna (DELETE /users/(:num))
    public function delete($id = null)
    {
        $user = $this->model->getUserById($id);
        if (!$user) {
            return $this->failNotFound('Pengguna dengan id ' . $id . ' tidak ditemukan');
        }

        if ($this->model->deleteUser($id)) {
            return $this->respondDeleted(['message' => 'Pengguna berhasil dihapus']);
        }

        return $this->failServerError('Gagal menghapus pengguna');
    }


}
