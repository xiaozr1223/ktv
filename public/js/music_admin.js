/**
 * Created by Administrator on 2017/6/21.
 */
$(function(){
    var tbodyEl = $('tbody');
    var btn = $('button');
    var titleEl = $('input[name=title]');
    var urlEl = $('input[name=url]');
    if(!location.hash){
        location.href = location.pathname+'#list';
    }
    function denter(data) {
        $('tbody').empty();
        $.each(data,function(i,v){
            var el =
                `
                <tr id="${v.id}" style="text-align: center">
                    <td scope="row" style="text-align: center">${v.id}</td>
                    <td>
                         <input type="text" class="title" value="${v.title}"  style="text-align: center">
                    </td>
                    <td>
                         <input type="text" class="url" value="${v.url}"  style="text-align: center">
                    </td>
                    <td>
                        <a class="del" href="#">删除 I</a>
                        <a class="add" href="/ktv/index.php/singer_admin?id=${v.id}#add">添加歌手</a>
                    </td>
                </tr>
                `;
            $(el).appendTo(tbodyEl);
        });
    }
    $.ajax({
        url: '/ktv/index.php/admin/music', 
        success: function(data){
           var data = JSON.parse(data);
           denter(data)
        }
    })
    btn.on('click',function(){
        var titlev = titleEl.val();
        var urlv = urlEl.val();
        // var first= $('tr>td:nth-child(1)');
        // first.each(function(i){
        //     $(this).text(i);
        // })
        if(titlev != '' && urlv != ''){
            $.ajax({
                url: '/ktv/index.php/admin/music_add',
                data:{title:titlev,url:urlv},
                success: function(data){
                    var el =
                        `
                <tr id="${data}" style="text-align: center">
                    <td scope="row" style="text-align: center">${data}</td>
                    <td class="title">
                    <input type="text" class="title" value="${titlev}"  style="text-align: center">
                    </td>
                    <td class="url">
                    <input type="text" class="title" value="${urlv}"  style="text-align: center">
                    </td>
                    <td>
                         <a class="del" href="#">删除</a>
                         <a class="add" href="/ktv/index.php/singer_admin?id=$${data}#add">添加歌手</a>
                    </td>
                </tr>`;
                    $(el).prependTo(tbodyEl);
                    titleEl.val('');
                    urlEl.val('');
                    location.href = location.pathname+'#list';

                }
            })
        }

        return false;
    })

    tbodyEl.on('click','.del',function () {
        var tr = $(this).closest('tr');
        var id = tr.attr('id');
        $.ajax({
            url: '/ktv/index.php/admin/music_del',
            data: {id:id},
            success: function(data){
                if(data =='ok'){
                    tr.detach();
                }
            }
        })
        return false;
    })

    tbodyEl.on('change','input',function(){
        var value = $(this).val();
        var id = $(this).closest('tr').attr('id');
        var tag = $(this).attr('class');
        $.ajax({
            url: '/ktv/index.php/admin/music_upd',
            data: {value:value,id:id,tag:tag}
        })
    })

    tbodyEl.on('click','input',function(){
        $(this).css('background','#eeeeee');
    })
    tbodyEl.on('blur','input',function(){
        $(this).css('background','#fff');
    })




//------------------------------------------------------
$(window).on('hashchange',function(){
    console.log(1);
    // console.log(location);
    // console.log(this);
    $('#myTabs li').removeClass('active');
    $(location.hash+'-tab').closest('li').addClass('active');
    $('.tab-pane').removeClass('active in');
    $(location.hash).addClass('active in');

})

    $(window).trigger('hashchange');

})
