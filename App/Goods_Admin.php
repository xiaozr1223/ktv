<?php
class Goods_Admin{
    function index(){
        $title = '商店管理';
        include 'App/view/Goods_admin.html';
    }
    function goods(){
//        sleep(2);
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->query("select * from shop_list order by id DESC");
        $data = $stmt->fetchAll();
        echo json_encode($data);
    }

    function goods_add(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->prepare("insert into shop_list(pic,name,hot,price,cid) values(?,?,?,?,?)");
        $stmt->bindValue(1, $_REQUEST['name']);
        $stmt->bindValue(2, $_REQUEST['pic']);
        $stmt->bindValue(3, '');
        $stmt->bindValue(4, $_REQUEST['price']);
        $stmt->bindValue(5, $_REQUEST['cid']);
        $stmt->execute();
        echo $Db->pdo->lastInsertId();
    }

    function goods_del(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->prepare("delete from shop_list where id = ?");
        $stmt->bindValue(1, $_REQUEST['id']);
        $stmt->execute();
        if($stmt->rowCount()){/*受影响的行数*/
            echo 'ok';
        }else{
            echo 'error';
        }
    }
    function goods_upd(){
        include 'Core/Db.php';
        $Db = new Db();
        $stmt = $Db->pdo->prepare("update shop_list set {$_REQUEST['tag']}=? where id = ?");
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