// 1.进度条功能
// 在第一个ajax请请求时,开启进度条,在所有的ajax请求结束后,关闭进度条

$(document).ajaxStart(function(){ 
    // 开启进度条
    NProgress.start();
});
// 关闭进度条
// 加延迟是为了测试使用的,平时写不需要加
$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    },500);
});


$(function(){
    // 1.导航点击切换功能
    $('.lt_aside .category').click(function(){
        // 点击后下一个兄弟元素隐藏或显示
        $(this).next().stop().slideToggle();
    });
    // 2.左侧列表切换功能
    $(".lt_topbar .icon_left").click(function(){
        $(".lt_aside").toggleClass("hidemenu");
        $(".lt_main").toggleClass("hidemenu");
        $(".lt_topbar").toggleClass("hidemenu");
        
    })
    // 3.退出功能
    $(".lt_topbar .icon_right").click(function(){
        // 点击按钮,显示模态框
        $('#logoutModal').modal("show");

    });
    //模态框的按钮点击事件
        $("#logoutBtn").click(function(){
            // 发送ajax请求,让后台销毁当前用户的登录状态
            $.ajax({
                url:"/employee/employeeLogout",
                dataType:"json",
                success:function(info){
                    console.log(info);
                    if( info.success ){
                        location.href = "login.html";
                    }
                }
        })
    })
})
