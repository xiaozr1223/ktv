<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/6/16
 * Time: 16:44
 */
class Music{
    function index(){
        include 'Core/Db.php';
        $Db = new Db();
        global $pdo;
        $stmt = $Db->pdo->query('select * from singer');
        $data = $stmt->fetchAll();
        include 'App/view/singer.html';
    }
    function singer_1(){
        $cid = $_REQUEST['id'];
        include 'Core/Db.php';
        $Db = new Db();
        global $pdo;
        $stmt = $Db->pdo->query("select * from singer_view where cid='$cid' order by id DESC ");
        $data = $stmt->fetchAll();
//        dump($data);
        include 'App/view/singer_1.html';
    }
    function rank(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->query('select * from singer_rank');
        $data = $stmt->fetchAll();
        include 'App/view/singer_rank.html';
    }
    function popular(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->query('select * from singer_rank');
        $data = $stmt->fetchAll();
        include 'App/view/popular.html';
    }
    function tjgd(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->query('select * from singer_tj');
        $data = $stmt->fetchAll();
        include 'App/view/singer_tj.html';
    }
    function singer_list(){
        $cid = $_REQUEST['id'];
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->query("select * from singer_view where id='$cid' order by id DESC ");
        $data = $stmt->fetch();

        $stmt1 = $Db->pdo->query("select * from song1_list where aid='$cid' order by id DESC ");
        $data1 = $stmt1->fetchAll();
        include 'App/view/singer_2.html';
    }
    function done(){
        include 'App/view/song_done.html';
    }
    function tjgd_list(){
        include 'App/view/tjgd_list.html';
    }
    function choose(){
        include 'App/view/choose.html';
    }
    function play(){
        include 'App/view/singer_xq.html';
    }
}