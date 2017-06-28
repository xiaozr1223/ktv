<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/6/27
 * Time: 9:18
 */
class song_admin{
    function index(){
        $title = '歌曲管理';
        include 'App/view/song_admin.html';
    }
    function song_select(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->query('select * from song_view ORDER BY artist_name');
        echo json_encode($stmt->fetchAll());
    }

    function search(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->query("select * from singer_1 where name LIKE '%{$_REQUEST['keyword']}%'");
        echo json_encode($stmt->fetchAll());
    }


    function song_add(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->prepare("insert into song1_list(name,url,duration,aid) values(?,?,?,?)");
        $stmt->bindValue(1, $_REQUEST['name']);
        $stmt->bindValue(2, $_REQUEST['url']);
        $stmt->bindValue(3, $_REQUEST['duration']);
        $stmt->bindValue(4, $_REQUEST['aid']);
        $stmt->execute();
        echo $Db->pdo->lastInsertId();
//        header('location:/ktv/index.php/Admin/music');
    }

    function song_del(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->prepare("delete from song1_list where id = ?");
        $stmt->bindValue(1, $_REQUEST['id']);
        $stmt->execute();
        if($stmt->rowCount()){/*受影响的行数*/
            echo 'ok';
        }else{
            echo 'error';
        }
    }

    function song_upd(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->prepare("update song1_list set {$_REQUEST['tag']}=? where id = ?");
        $stmt->bindValue(1, $_REQUEST['value']);
        $stmt->bindValue(2, $_REQUEST['id']);
        $stmt->execute();
        if($stmt->rowCount()){/*受影响的行数*/
            echo 'ok';
        }else{
            echo 'error';
        }
    }



}