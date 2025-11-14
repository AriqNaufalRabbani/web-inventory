<?php
namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class Cors implements FilterInterface
{
    // Origin yang diizinkan, bisa pakai '*' untuk development
    private $allowedOrigins = [
        'http://localhost:3000',
        // 'https://your-frontend.com'
    ];

    public function before(RequestInterface $request, $arguments = null)
    {
        $origin = $request->getHeaderLine('Origin');

        // Tangani preflight OPTIONS
        if ($request->getMethod() === 'options') {
            $response = service('response');

            if (in_array($origin, $this->allowedOrigins) || in_array('*', $this->allowedOrigins)) {
                $response->setHeader('Access-Control-Allow-Origin', $origin ?: '*');
            }

            $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            $response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
            $response->setHeader('Access-Control-Max-Age', '86400'); // cache preflight 1 hari
            $response->setStatusCode(200)->send();
            exit; // hentikan eksekusi
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        $origin = $request->getHeaderLine('Origin');

        if (in_array($origin, $this->allowedOrigins) || in_array('*', $this->allowedOrigins)) {
            $response->setHeader('Access-Control-Allow-Origin', $origin ?: '*');
        }

        $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        $response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        $response->setHeader('Access-Control-Allow-Credentials', 'true'); // jika pakai cookies/session
    }
}
