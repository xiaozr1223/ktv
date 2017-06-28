<?php
class admin{
    function index(){
        $title = '分类管理';
        include 'App/view/music.html';
    }
    function music(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->query("select * from singer order by id DESC");
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }

    function music_add(){
        $title = $_REQUEST['title'];
        $url = $_REQUEST['url'];
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->prepare("insert into singer(title,url) values(?,?)");
        $stmt->bindValue(1, $title);
        $stmt->bindValue(2, $url);
        $stmt->execute();
        echo $Db->pdo->lastInsertId();
//        header('location:/ktv/index.php/Admin/music');
    }

    function music_del(){
        $id = $_REQUEST['id'];
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->prepare("delete from singer where id = ?");
        $stmt->bindValue(1, $id);
        $stmt->execute();
        echo 'ok';
//        header('location:/ktv/index.php/Admin/music');
    }
    

    function music_upd(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->prepare("update singer set {$_REQUEST['tag']}=? where id = ?");
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