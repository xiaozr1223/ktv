<?php
class Db{
    public $pdo;
    public function __construct()
    {
//        $this->pdo = new PDO('mysql:host=localhost;dbname=mydatabase;port=3306;charset=utf8','root','');
        $this->pdo = new PDO('mysql:host=localhost;dbname=ktv;port=3306;charset=utf8','root','');
    }
}


