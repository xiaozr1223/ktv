<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/6/16
 * Time: 16:31
 */

class Shop{
    function index(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->query('select * from shop_list where cid=1');
        $wine = $stmt->fetchAll();

        $stmt = $Db->pdo->query('select * from shop_list where cid=2');
        $neck = $stmt->fetchAll();
        include 'App/view/shop.html';
    }
    function bill(){
        include 'App/view/bill.html';

    }
    function succeed(){
        include 'App/view/succeed.html';
    }
}