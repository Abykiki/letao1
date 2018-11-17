// 进度条功能
// 在第一个ajax请请求时,开启进度条,在所有的ajax请求结束后,关闭进度条
$(document).ajaxStart(function(){
    // 开启进度条
    NProgress.start();
});
// 关闭进度条
$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    },500);
})