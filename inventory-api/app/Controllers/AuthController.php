<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\Controller;

class AuthController extends Controller
{
    public function login()
    {
        helper('jwt');

        $userModel = new UserModel();

        $username = $this->request->getVar('username');
        $password = $this->request->getVar('password');

        $user = $userModel->where('username', $username)->first();

        if (!$user) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Username tidak ditemukan'
            ]);
        }

        if (!password_verify($password, $user['password_hash'])) {
            return $this->response->setJSON([
                'status' => 'error',
                'message' => 'Password salah'
            ]);
        }

        $payload = [
            'id' => $user['id'],
            'username' => $user['username'],
            'fullname' => $user['fullname'],
            'role' => $user['role_id']
        ];

        $token = create_jwt($payload);

        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => $payload
        ]);
    }
}
