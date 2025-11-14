<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

if (!function_exists('create_jwt')) {
    function create_jwt($payload)
    {
        $config = config('JWT');
        $issuedAt = time();
        $expire = $issuedAt + $config->expire;

        $token = [
            'iss' => $config->issuer,
            'iat' => $issuedAt,
            'exp' => $expire,
            'data' => $payload
        ];

        return JWT::encode($token, $config->key, $config->alg);
    }
}

if (!function_exists('validate_jwt')) {
    function validate_jwt($token)
    {
        $config = config('JWT');
        try {
            $decoded = JWT::decode($token, new Key($config->key, $config->alg));
            return $decoded;
        } catch (Exception $e) {
            return null;
        }
    }
}
