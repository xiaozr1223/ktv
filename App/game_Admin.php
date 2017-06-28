<?php
class game_Admin{
    function index(){
        $title = '游戏管理';
        include 'App/view/game_admin.html';
    }
    function game(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->query("select * from risk order by id DESC");
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }

    function game_add(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->prepare("insert into risk(content,cid) values(?,?)");
        $stmt->bindValue(1, $_REQUEST['content']);
        $stmt->bindValue(2, $_REQUEST['cid']);
        $stmt->execute();
        echo $Db->pdo->lastInsertId();
    }

    function game_del(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->prepare("delete from risk where id = ?");
        $stmt->bindValue(1, $_REQUEST['id']);
        $stmt->execute();
        if($stmt->rowCount()){/*受影响的行数*/
            echo 'ok';
        }else{
            echo 'error';
        }
    }
    function game_upd(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->prepare("update risk set {$_REQUEST['tag']}=? where id = ?");
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