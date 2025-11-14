<?php

namespace Config;

$routes = Services::routes();

$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(false); // ⚠️ penting — pastikan ini false kalau mau pakai route group manual

// === Tambahkan route Auth di sini ===
$routes->post('auth/login', 'AuthController::login', ['filter' => 'cors']);

// contoh endpoint yang butuh JWT
$routes->get('profile', 'UserController::profile', ['filter' => 'jwtauth']);

$routes->group('api', function($routes) {
    // CRUD untuk API User menggunakan Resource Routing
    $routes->resource('users', ['controller' => 'UserController']); 
    $routes->resource('warehouses', ['controller' => 'WHController']); 
    $routes->resource('items', ['controller' => 'ItemController']); 
    $routes->resource('suppliers', ['controller' => 'SupplierController']); 
    $routes->resource('customers', ['controller' => 'CustomerController']); 

    $routes->get('purchase-orders/fetch', 'PurchaseOrders::fetchData');
    $routes->post('purchase-orders/create', 'PurchaseOrders::create'); 
    // $routes->put('purchase-orders/edit', 'PurchaseOrders::editForm'); 
    $routes->put('purchase-orders/update/(:segment)', 'PurchaseOrders::update/$1');
    // $routes->delete('purchase-orders/delete', 'PurchaseOrders::deleteForm'); 
    $routes->delete('purchase-orders/delete/(:segment)', 'PurchaseOrders::delete/$1');
    $routes->put('purchase-orders/submit/(:segment)', 'PurchaseOrders::submit/$1');
    $routes->post('purchase-orders/getPO', 'PurchaseOrders::getPurchaseOrderById');

    $routes->get('purchase-orders/getPurchaseOrderById/(:segment)', 'PurchaseOrders::getPurchaseOrderById/$1');

    $routes->get('purchase-orders/getDetailItemsbyPO/(:segment)', 'PurchaseOrders::getDetailItemsbyPO/$1');

    $routes->get('purchase-orders/getSupplierSelect', 'PurchaseOrders::getSupplierSelect');
    $routes->get('purchase-orders/getWarehouseSelect', 'PurchaseOrders::getWarehouseSelect');
    $routes->get('purchase-orders/getItemSelect', 'PurchaseOrders::getItemSelect');
});
