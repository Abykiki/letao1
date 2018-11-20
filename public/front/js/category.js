$(function(){
  // 1.进入页面,请求左侧一级分类数据,进行渲染
  $.ajax({
    url:"/category/queryTopCategory",
    dataType:"json",
    success:function(info){
      console.log(info);
      var htmlStr = template("left_tmp",info);
      $('.lt_category_left ul').html(htmlStr);
      renderById( info.rows[0].id );

    }
  });

  // 2.给左侧添加点击事件(事件委托)
  $('.lt_category_left').on("click","a",function(){
    // 高亮效果
    $(this).addClass("current").parent().siblings().find("a").removeClass("current");
    // 获取一级分类id
    var id = $(this).data("id");
    // 根据id渲染二级分类
    renderById(id);
  })


  // 根据一级分类的id渲染二级分类

  function renderById(id){
    $.ajax({
      url:"/category/querySecondCategory",
      dataType:"json",
      data:{
        id:id
      },
      success:function(info){
        console.log( info );
        var htmlStr = template("right_tmp",info);
        $(".lt_category_right ul").html(htmlStr);
      }
    })
  }
})