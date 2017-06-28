/**
 * Created by Administrator on 2017/6/27.
 */
$(function(){
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
                url:'/KTV/index.php/song_admin/song_select',
                dataType: 'json',
                success:function(data){
                    render(data);
                }
            })
        }else if(location.hash == '#add'){
            var data = JSON.parse(localStorage.history)
            renderwell('.well.history',data)
        }
    })
    $(window).trigger('hashchange');

    function render(arr){
        $('tbody').empty();
        arr.forEach(function (value,index) {
            var el =
                `
            <tr style="text-align: center" data-id="${value.id}">
                    <td scope="row" style="text-align: center">${value.id}</td>
                    <td class="title">
                    <input type="text" class="name" value="${value.name}"  style="text-align: center">
                    </td>
                    <td class="url">
                    <audio src="${value.url}" controls></audio>
                    </td>
                    <td class="artist_name">
                    <input type="text" class="artist_name" value="${value.artist_name}"  style="text-align: center">
                    </td>
                    <td class="duration">
                    <input type="text" class="style" value="${value.duration}"  style="text-align: center">
                    </td>
                    <td>
                         <a class="del" href="#">删除</a>
                    </td>
                </tr>`;
            $(el).prependTo('tbody');
        });

    }

    function renderwell(selector,arr) {
        $(selector).empty();
        arr.forEach(function (v,i) {
            var el =
                `<button type="button" class="btn btn-info" data-id="${v.id}" style="margin: 0 5px">${v.name}</button>`;
            $(el).appendTo($(selector));
        })
    }

var t;
    $('#search').on('keyup',function(){
        let that = this;
        clearTimeout(t);
        t = setTimeout(function(){
            if(!($('#search').val().trim())){
                return;
            }
            $.ajax({
                url: '/KTV/index.php/song_admin/search',
                data:{keyword:$(that).val().trim()},
                dataType: 'json',
                success: function(data){
                    renderwell('.well.result',data);
                }
            })
        },500)
    })

    $('.well.result,.well.history').on('click','button',function(){
        $('#search').val($(this).html());
        $('input[type=hidden]').val($(this).attr('data-id'));
    })
    if(localStorage.history){
        historyList = JSON.parse(localStorage.history);
    }else{
        historyList = [];
    }

    $('#submit').on('click',function(){
        console.log($('#form').serialize());
        $.ajax({
            url: '/ktv/index.php/song_admin/song_add?'+$('#form').serialize(),
            success: function(data){
                var name = $('#search').val();
                var id = $('input[type=hidden]').val();
                var temp = historyList.filter(function(v,i){
                    return v.id == id;
                });
                if(!temp.length){
                    historyList.push({name:name,id:id});
                    localStorage.history = JSON.stringify(historyList);
                }
                location.href = location.pathname+'#list';
            }
        })
        return false;
    })



    $('tbody').on('click','.del',function () {
        var tr = $(this).closest('tr');
        var id = tr.attr('data-id');
        $.ajax({
            url: '/ktv/index.php/song_admin/song_del',
            data: {id:id},
            success: function(data){
                if(data =='ok'){
                    tr.detach();
                }
            }
        })
        return false;
    })

    $('tbody').on('change','input',function(){
        var value = $(this).val();
        var id = $(this).closest('tr').attr('data-id');
        var tag = $(this).attr('class');
        console.log(value,id,tag);
        $.ajax({
            url: '/ktv/index.php/song_Admin/song_upd',
            data: {value:value,id:id,tag:tag}
        })
    })


})