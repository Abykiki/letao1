
$(function(){
    // 1.表单校验
    // 要求
    //(1) 用户名不能为空 ,长度为2-6位
    //(2)密码不能为空,长度为6-12位
    $('#form').bootstrapValidator({
      // 配置校验图标
      feedbackIcons: {
        //  校验成功
        valid: 'glyphicon glyphicon-ok',
        // 校验失败
        invalid: 'glyphicon glyphicon-remove',
        // 校验中
        validating: 'glyphicon glyphicon-refresh'
      },
      
      // 配置校验字段(先在input中配置name)
      fields:{
        username:{
  
          // 进行多个规则配置
          validators:{
            // 非空校验
            notEmpty:{
              // 校验提示
              message:"用户名不能为空"
            },
            // 长度校验
            stringLength:{
              min:2,
              max:6,
              message:"用户名长度必须为2-6位"
            },
            // 配置回调函数提示信息
            callback:{
              message:"用户名不存在"
            }
          }
        
        },
        password:{
          validators:{
            notEmpty:{
              message:"密码不能为空"
            },
            stringLength:{
              min:6,
              max:12,
              message:"密码长度必须为6-12位"
            },
            // 配置回调函数提示信息
            callback:{
              message:"密码错误"
            }
          }
        },
      }
      
      
    });
    //  完成后,提交到本地仓库
    
    // 2.注册表单验证成功事件
    // 表单校验需要在表单提交时.进行校验,需要submit按钮
    // 注册一个表单校验成功事件,表单校验成功后,默认会提交
    // 可以在注册成功事件中,组织默认的表单提交,通过ajax提交,就不会跳转了
    // 默认reset按钮重置内容
    $("#form").on("success.form.bv",function( e ){ 
      e.preventDefault();
      $.ajax({
        type:"post",
        data:$("#form").serialize(),
        dataType:"json",
        url:"/employee/employeeLogin",
        success:function(info){
          console.log(info);  
          if(info.success){
            location.href = "index.html";
          } 
          if(info.error === 1000) {
            // alert("用户名不存在");
            // 参数1 :校验字段
            // 参数2:校验状态
            $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
  
          }
          if(info.error === 1001) {
            // alert("密码错误");
            $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
          }
        }
      })
    });
  //  3.重置功能
    $('[type="reset"]').click(function(){
      // 只重置状态
      $("#form").data("bootstrapValidator").resetForm();
    });
  
  })