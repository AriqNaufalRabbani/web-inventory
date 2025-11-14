<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use Config\Services;

class JWTAuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        helper('jwt');
        $header = $request->getHeaderLine('Authorization');

        if (!$header || !preg_match('/Bearer\s(\S+)/', $header, $matches)) {
            return Services::response()
                ->setJSON(['status' => 'error', 'message' => 'Token tidak ditemukan'])
                ->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        }

        $token = $matches[1];
        $decoded = validate_jwt($token);

        if (!$decoded) {
            return Services::response()
                ->setJSON(['status' => 'error', 'message' => 'Token tidak valid atau kadaluarsa'])
                ->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        }

        // Simpan data user ke request untuk digunakan di controller
        $request->userData = $decoded->data;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
    }
}
