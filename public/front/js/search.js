$(function(){
  // 分析功能需求:
  // 1. 根据搜索历史, 进行渲染展示
  render();
  // 读取本地数据,返回数组
  function getHistory(){
    var jsonStr = localStorage.getItem("search_list") || '[]';
    var arr = JSON.parse(jsonStr);
    return arr;
  }
  // 渲染页面
  function render(){
    var arr = getHistory();
    var htmlStr = template("tmp",{list:arr});
    $('.lt_history').html(htmlStr);
  }
  // 2. 清空所有历史
  $('.lt_history').on('click','.btn_empty',function(){
    mui.confirm("你确定要清空历史记录?","温馨提示",["取消","确认"],function(e){
      if(e.index === 1){
        // 移除本地历史
        localStorage.removeItem("search_list");
        // 重新渲染
        render();
      }
    })
  });
  // 3. 删除单个历史记录
  $('.lt_history').on("click","btn_delete",function(){
    // 获取下标
    var index = $(this).data("index");
    // 获取本地存储的数据
    var arr = getHistory();
    // 删除数组中的对应项
    arr.splice(index,1);
    // 存储到本地
    localStorage.setItem("search_list",JSON.stringify(arr));

    render();

  })
  // 4. 添加历史记录
  $(".search_btn").click(function(){
    var key = $(".search_input").val().trim();
    if(key === ""){
      mui,toast("请输入搜索关键字");
      return;
    }
    // 获取数组
    var arr = getHistory();
    var index = arr.indexOf(key);
    if(index!=-1){

      arr.splice(index,1);
    }
    if(arr.length >=10){
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem("search_list",JSON.stringify(arr));
    render();
    $(".search_input").val("");
    location.href = "searchList.html?key="+key;
  })
})