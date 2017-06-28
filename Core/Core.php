<?php

class Core{
//    public static function run1(){
//        $path = substr($_SERVER['PATH_INFO'],1);
//        $class_name = explode('/',$path)[0];
//        $fn = explode('/',$path)[1];
//        include "App/{$class_name}.php";
//        $Page = new $class_name();
//        $Page -> $fn();
//    }
    public static function run(){
        if(!isset($_SERVER['PATH_INFO'])||$_SERVER['PATH_INFO']=='/'){
            $class_name = 'Home';
            $fn = 'index';
        }else{
            $path = explode('/',substr($_SERVER['PATH_INFO'],1));
            $class_name = $path[0];
            if(isset(explode('/',substr($_SERVER['PATH_INFO'],1))[1]) && $path[1]!=''){
                $fn = explode('/',substr($_SERVER['PATH_INFO'],1))[1];
            }else{
                $fn = 'index';
            }
//      $fn = isset($pat[1]) && $pat[1]?$path[1]:index;
        }

        if(file_exists("App/{$class_name}.php")){
            include "App/{$class_name}.php";
            if(class_exists($class_name)){
                $page = new $class_name();
                if(method_exists($class_name,$fn)){

                    $page->$fn();
                }else{
                    include 'App/view/404.html';
                }
            }else{
                include 'App/view/404.html';
            }
        }else{
            include 'App/view/404.html';
        }
    }
}