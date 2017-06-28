/**
 * Created by Administrator on 2017/6/23.
 */
$(function () {
    $('.title h4 p').on('click',function () {
        $('.title h4 p').removeClass('active');
        $(this).addClass('active');
        $('.list').removeClass('active').eq($(this).index()).addClass('active')
    })
    var chioceList = [];
    /*点击加号*/
    $('.plus').on('click',function(){
        let data = JSON.parse($(this).closest('li').attr('data'));
        let temp = chioceList.filter(function(value,index){
            return data.id == value.id;
        });
        if(!temp.length){
            data.num = 1;
            chioceList.push(data);
            $(this).prev().text('1');
        }else{
           temp[0].num += 1;
            $(this).prev().text(temp[0].num);
        }
        console.table(chioceList);
        render();
    });
    /*点击减号*/
    $('.subtract').on('click',function(){
        let data = JSON.parse($(this).closest('li').attr('data'));
        let temp = chioceList.filter(function(value,index){
            return data.id == value.id;
        });
        if(temp.length){
                temp[0].num -= 1;
                $(this).next().text(temp[0].num);
            if(temp[0].num == 0){
                chioceList = chioceList.filter(function(value,index){
                    return temp[0].id != value.id;
                })
            }
        }
        console.table(chioceList);
        render();
    });
   /* 对页面进行渲染【只关注chioceList的数据】*/
    function render(){
        $('.bottom .chioce').empty();
        chioceList.forEach(function (value,index) {
            $(`<span class="yx">${value.name}  (${value.num})</span>`).appendTo('.bottom .chioce')
        });
        $('.totle').text(getTotle());
        $('.title .left span').text(getwinenum(1));
        $('.title .right span').text(getwinenum(2));
    }
    /*计算总价格*/
    function getTotle(){
        let totle = 0;
        chioceList.forEach(function(value,index){
            totle += value.price * value.num;
        })
       return totle.toFixed(2);
    };
    /*计算酒水或零食的个数【1：酒水；2：零食】*/
    function getwinenum(type) {
        let num=0;
        chioceList.forEach(function(value,index){
            if(value.cid == type){
               num += value.num
            }
        })
        return num =num>9?num:"0"+num;
    };


    $('.store').on('click',function(){
        let arr=JSON.stringify(chioceList);
        localStorage.setItem("choice_info",`${arr}`);
    })


    
})
