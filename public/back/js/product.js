$(function(){
    var pageSize = 5;
    var currentPage = 1;
    var picArr = [];
    // 1.进入页面,发送请求,渲染页面
    render();

    function render(){
        $.ajax({
            url:"",
            dataType:"json",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success :function(info){
                console.log(info);
                var htmlStr = template();
                $("tbody").html( htmlStr );

                // 分页初始化
                $("#paginator").bootstrap
                
            }
        })
    }

    //2. 点击添加按钮,显示模态框
    $("#addBtn").click(function(){
        $("#addModal").modal("show");

        $.ajax({
            url:"",
            data:{
                page:1,
                pageSize:100,
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                
                var htmlStr = template();
                $("").html(htmlStr);
            }
        })
    });

    // 3.通过事件委托,给所有的dropdown里面的a添加点击事件
    $(".dropdown-menu").on("click","a",function(){
        // 获取文本.设置给按钮
        var txt = $(this).text();
        $(".dropdownText").text(txt); 
        // 获取ID,设置给隐藏域
        var id = $(this).data("id");
        $('[name="brandId"]').val(id);
    });

    // 4.进行文件上传配置
    $(".fileupload").fileupload({
        dataType:"json",
        done:function(e,data){
            console.log(data);
            // 后台返回的结果
            var picObj = data.result;
            var picUrl = picObj.picAddr;

            // 往数组的最前面追加
            picArr.unshift(picObj);

            $("#imgBox").prepend('');
            if(picArr.length>3){
                // 将最后面的移除
                picArr.pop();
                // 移除图片结构中
            }
            
        }
    });

    // 5.进行表单校验初始化

    // 6.注册表单校验成功事件,阻止默认的表单提交,通过ajax提交
    $("#form").on("success.form.bv",function(e){
        e.preventDefault();
        // 获取所有input的数据
        var params = $('#form').serialize();
        // 拼接图片的数据

        $.ajax({
            type:"post",
            dataType:"json",
            url:"",
            data:params,
            success:function(info){
                console.log(info);
                // 关闭模态框
                $("#addModal").modal("hide");
                // 重新渲染第一页
                currentPage = 1;
                render();

                // 重置内容和状态
                $("#form").data("bootstrapValidator").resetForm(true);
                // 重置下拉按钮和图片按钮
                                                                                                                                                      
                
            }
        })

    })
})
