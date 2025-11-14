<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Cors extends BaseConfig
{
    public array $default = [
        /**
         * Origins for the `Access-Control-Allow-Origin` header.
         * We allow your frontend running on localhost:3000
         */
        'allowedOrigins' => [
            'http://localhost:3000', // <-- PASTIKAN INI ADA
        ],

        'allowedOriginsPatterns' => [],

        /**
         * Set ke 'true' jika Anda mengirim JWT Token/Cookies/Session
         * melalui header 'Authorization' atau dengan 'withCredentials: true' di frontend.
         */
        'supportsCredentials' => true, 

        /**
         * Headers yang digunakan oleh frontend dan API Anda (termasuk Authorization).
         */
        'allowedHeaders' => [
            'X-Requested-With', 
            'Content-Type', 
            'Accept', 
            'Origin', 
            'Authorization', // PENTING untuk login/API dengan JWT
        ],

        'exposedHeaders' => [],

        /**
         * Metode yang diizinkan untuk API Anda (Login biasanya POST)
         */
        'allowedMethods' => [
            'GET', 
            'POST', 
            'OPTIONS', // WAJIB ada untuk Preflight Request
            'PUT', 
            'DELETE'
        ],

        'maxAge' => 7200,
    ];
}