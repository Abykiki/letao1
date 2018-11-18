$(function(){
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render(){
        // 进入页面,发送ajax请求,获取数据,进行页面动态渲染
        $.ajax({
            url:"/user/queryUser",
            dataType:"json",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
                var htmlStr = template("tmp",info); 
                $("tbody").html(htmlStr);
    
                // 分页初始化
                $("#paginator").bootstrapPaginator({
                    // 版本号
              bootstrapMajorVersion: 3,
              // 总页数
              totalPages: Math.ceil( info.total / info.size ),
              // 当前页
              currentPage: info.page,
              // 点击事件
              onPageClicked: function( a, b, c, page ) {
                // 根据 page , 请求对应页的数据, 进行渲染
                currentPage = page;
    
                // 调用 render 重新渲染
                render();
              }
                })
            }
        })

    }
})