<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class CorsFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        if ($request->getMethod() === 'options') {
            $response = service('response');
            return $response
                ->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
                ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
                ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
                ->setStatusCode(200)
                ->send();
            exit;
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        $response->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        $response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
}
