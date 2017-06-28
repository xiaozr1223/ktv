/**
 * Created by Administrator on 2017/6/26.
 */
$(function(){
    var tbodyEl = $('tbody');
    if(!location.hash){
        location.href = location.pathname+'#list';
    }
    $(window).on('hashchange',function(){
        $('#myTabs li').removeClass('active');
        $(location.hash+'-tab').closest('li').addClass('active');
        $('.tab-pane').removeClass('active in');
        $(location.hash).addClass('active in')

        if(location.hash == '#list'){
            $.ajax({
                url:'/KTV/index.php/singer_admin/music',
                dataType: 'json',
                success:function(data){
                    render(data);
                }
            })
        }
    })
    $(window).trigger('hashchange');



    function render(arr){
        tbodyEl.empty();
        arr.forEach(function (value,index) {
            var el =
                `
            <tr style="text-align: center" data-id="${value.id}">
                    <td scope="row" style="text-align: center">${value.id}</td>
                    <td class="title">
                    <input type="text" class="name" value="${value.name}"  style="text-align: center">
                    </td>
                    <td class="url">
                    <input type="text" class="url" value="${value.url}"  style="text-align: center">
                    </td>
                    <td class="style">
                    <input type="text" class="style" value="${value.style}"  style="text-align: center">
                    </td>
                    <td>
                         <a class="del" href="#">删除</a>
                    </td>
                </tr>`;
            $(el).prependTo('tbody');
        });

    }

    $('#submit').on('click',function(){
        $.ajax({
            url: '/ktv/index.php/singer_admin/music_add?'+$('#form').serialize(),
            success: function(data){
                location.href = location.pathname+'#list';
            }
        })
        return false;
    })



    $('tbody').on('click','.del',function () {
        var tr = $(this).closest('tr');
        var id = tr.attr('data-id');
        $.ajax({
            url: '/ktv/index.php/singer_admin/music_del',
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
        var id = $(this).closest('tr').attr('data-id');
        var tag = $(this).attr('class');
        $.ajax({
            url: '/ktv/index.php/singer_admin/music_upd',
            data: {value:value,id:id,tag:tag}
        })
    })
    
    
    
    tbodyEl.on('click','input',function(){
        $(this).css('background','#eeeeee');
    })
    tbodyEl.on('blur','input',function(){
        $(this).css('background','#fff');
    })




})