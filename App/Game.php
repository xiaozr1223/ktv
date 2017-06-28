<?php
class Game{
    function index(){
        include 'App/view/game.html';
    }
    function zxh(){
        include 'Core/Db.php';
        $Db = new Db();
        global $pdo;
        $stmt = $Db->pdo->query('select * from risk limit 9');
        $data = $stmt->fetchAll();
        include 'App/view/game_zxh.html';
    }
    function change(){
        $page = $_REQUEST['page'];
        $cid = $_REQUEST['cid'];
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->query("select * from risk where cid='$cid' limit 9 offset ".($page - 1) * 9);
        $data = $stmt->fetchAll();
        echo json_encode($data) ;/*往回传数据[print_r]*/
    }

    
}











