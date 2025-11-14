<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class JWT extends BaseConfig
{
    public $key = 'a74c6616b89b0c5d0e73cc03545590d4'; // Ganti dengan secret key kamu (harus panjang dan rahasia)
    public $alg = 'HS256';
    public $issuer = 'localhost'; // atau nama domain kamu
    public $expire = 3600; // 1 jam
}
