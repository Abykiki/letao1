$(function(){
    var currentPage = 1;//当前页
    var pageSize = 5; //每页条数
    // 当前正在修改的用户ID
    var currentId;
    //需要修改的状态
    var isDelete;
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

    // 给"启用"禁用"按钮,添加点击注册事件(通过事件委托)
    $("tbody").on("click",".btn",function(){
        // 显示模态框
        $("#userModal").modal("show");
        // 获取用户ID
        currentId = $(this).parent().data("id");
        // 获取状态(根据按钮的类名)
        // isDelete将用户改成什么状态,禁用按钮会将用户改成禁用状态,此时传0
        isDelete = $(this).hasClass("btn-danger")?0:1;

        // 确认按钮被点击,发送ajax请求,改变用户状态
        $("#confirmBtn").click(function(){
            // 接口文档中的用户模块:update-user
             $.ajax({
                type:"post",
                url:"/user/updateUser",
                dataType:"json",
                data:{
                    id: currentId,
                    isDelete:isDelete
                },
                success:function(info){
                    console.log(info);
                    if(info.success){
                        $("#userModal").modal("hide");
                        render();
                    
                }
            }
             })
        })

    })
})