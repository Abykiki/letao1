$(function(){
    var currentPage = 1;
    var pageSize = 5;
    // 一进入页面进行渲染
    render();
    // 1.通过ajax请求渲染页面
    function render(){

        $.ajax({
            url:"/category/queryTopCategoryPaging",
            dataType:"json",
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            success:function(info){
                console.log(info);
                // 结合模板引擎渲染
                var htmlStr = template("tmp",info);
                $("tbody").html(htmlStr);
    
                // 2.分页初始化 
                $("#paginator").bootstrapPaginator({
                        // 版本号
                  bootstrapMajorVersion: 3,
                  // 总页数
                  totalPages: Math.ceil( info.total / info.size ),
                  // 当前页
                  currentPage: info.page,
                  // 给按钮添加点击事件
                  onPageClicked: function( a, b, c, page ) {
                    // 根据 page , 请求对应页的数据, 进行渲染
                    currentPage = page;
        
                    // 调用 render 重新渲染
                    render();
                  }
                })
            }
        })
    };
    // 3.点击添加按钮,显示模态框
    $(".addBtn").click(function(){
        $("#addModal").modal("show");
    });

    // 4.表单校验功能
    $("#form").bootstrapValidator({
        // 配置校验图标
        feedbackIcons:{
            valid:'s'
        },
        // 字段列表
        fields:{
            categoryName:{
                // 校验规则
                validators:{
                    // 非空校验
                    notEmpty:{
                        message:"请输入一级分类"
                    }
                }
            }
        }
    })

})