<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUsersTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'UserID'        => ['type' => 'INT', 'unsigned' => true, 'auto_increment' => true],
            'Username'      => ['type' => 'NVARCHAR', 'constraint' => '50', 'unique' => true],
            'PasswordHash'  => ['type' => 'NVARCHAR', 'constraint' => '255'],
            'FullName'      => ['type' => 'NVARCHAR', 'constraint' => '100'],
            'Email'         => ['type' => 'NVARCHAR', 'constraint' => '100', 'null' => true],
            'Role'          => ['type' => 'NVARCHAR', 'constraint' => '20'],
            'IsActive'      => ['type' => 'BIT', 'default' => 1],
            'CreatedAt'     => ['type' => 'DATETIME', 'default' => 'GETDATE()'],
        ]);
        $this->forge->addKey('UserID', true);
        $this->forge->createTable('Users');
    }

    public function down()
    {
        $this->forge->dropTable('Users');
    }
}
