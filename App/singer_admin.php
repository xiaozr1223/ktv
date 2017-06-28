<?php
class singer_admin{
    function index(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->query('select * from singer');
        $data = $stmt->fetchAll();
        $title = '歌手管理';
        include 'App/view/singer_admin.html';
    }
    function music(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->query("select * from singer_view order by id");
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }

    function music_add(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->prepare("insert into singer_1(name,url,cid) values(?,?,?)");
        $stmt->bindValue(1, $_REQUEST['name']);
        $stmt->bindValue(2, $_REQUEST['pic']);
        $stmt->bindValue(3, $_REQUEST['cid']);
        $stmt->execute();
        echo $Db->pdo->lastInsertId();
//        header('location:/ktv/index.php/Admin/music');
    }

    function music_upd(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->prepare("update singer_1 set {$_REQUEST['tag']}=? where id = ?");
        $stmt->bindValue(1, $_REQUEST['value']);
        $stmt->bindValue(2, $_REQUEST['id']);
        $stmt->execute();
        if($stmt->rowCount()){/*受影响的行数*/
            echo 'ok';
        }else{
            echo 'error';
        }
    }



    function music_del(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->prepare("delete from singer_1 where id = ?");
        $stmt->bindValue(1, $_REQUEST['id']);
        $stmt->execute();
        if($stmt->rowCount()){/*受影响的行数*/
            echo 'ok';
        }else{
            echo 'error';
        }
    }
}