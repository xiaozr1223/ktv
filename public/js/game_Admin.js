/**
 * Created by Administrator on 2017/6/22.
 */
/**
 * Created by Administrator on 2017/6/21.
 */
$(function(){
    var tbodyEl = $('tbody');
    var btn = $('button');
    var titleEl = $('input[name=title]');
    var urlEl = $('input[name=url]');
    
    if(!location.hash){
        location.herf = location.pathname+'#list';
    }
     
    
    
    function denter(data) {
        $.each(data,function(i,v){
            var el =
                `
                <tr id="${v.id}" style="text-align: center">
                    <td scope="row" style="text-align: center">${v.id}</td>
                    <td>
                         <input type="text" class="content" value="${v.content}"  style="text-align: center">
                    </td>
                     <td>
                        <input type="text" class="cid" value="${v.cid}"  style="text-align: center">
                    </td>
                    <td>
                        <a class="del" href="#">删除</a>
                    </td>
                </tr>
                `;
            $(el).appendTo(tbodyEl);
        });
    }
    $.ajax({
        url: '/ktv/index.php/game_admin/game',
        success: function(data){
            var data = JSON.parse(data);
            denter(data)
        }
    })
    
    btn.on('click',function(){
        let arr = $('#form').serializeArray();
        console.log(arr);
        $.ajax({
            url: '/ktv/index.php/game_admin/game_add?'+$('#form').serialize(),
            success: function(data){
                var el =
                    `
                <tr id="${data}" style="text-align: center">
                    <td scope="row" style="text-align: center">${data}</td>
                    <td class="content">
                        <input type="text" class="content" value="${arr[0].value}"  style="text-align: center">
                    </td>
                    <td class="cid">
                        <input type="text" class="cid" value="${arr[1].value}"  style="text-align: center">
                    </td>
                    <td>
                         <a class="del" href="#">删除</a>
                    </td>
                </tr>`;
                $(el).prependTo(tbodyEl);
                $().val('');
                $().val('');
                location.href = location.pathname+'#list';
            }
        })
        return false;
    })

    tbodyEl.on('click','.del',function () {
        var tr = $(this).closest('tr');
        var id = tr.attr('id');
        $.ajax({
            url: '/ktv/index.php/game_admin/game_del',
            data: {id:id},
            success: function(data){
                if(data =='ok'){
                    tr.detach();
                }
            }
        })
        return false;
    })
    tbodyEl.on('click','input',function(){
        $(this).css('background','#eeeeee');
    })
    tbodyEl.on('blur','input',function(){
        $(this).css('background','#fff');
    })

    tbodyEl.on('change','input',function(){
        var value = $(this).val();
        var id = $(this).closest('tr').attr('id');
        var tag = $(this).attr('class');
        console.log(value,id,tag);
        $.ajax({
            url: '/ktv/index.php/game_admin/game_upd',
            data: {value:value,id:id,tag:tag}
        })
    })





    //------------------------------------------------------
    $(window).on('hashchange',function(){
        // console.log(location);
        // console.log(this);
        $('#myTabs li').removeClass('active');
        $(location.hash+'-tab').closest('li').addClass('active');
        $('.tab-pane').removeClass('active in');
        $(location.hash).addClass('active in')
    })
    $(window).trigger('hashchange');
})
