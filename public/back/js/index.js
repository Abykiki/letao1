$(function(){
    // 基于准备好的dom，初始化echarts实例
    var echarts_left = echarts.init(document.querySelector(".echarts_left"));
    // 指定图表的配置和数据
    var option1 = {
      // 大标题
      title:{
        text:'2018年注册人数'
      },
      // 提示框组件
      tooltip:{
        // 表示坐标轴触发
        trigger:"item"
      },
      // 图例
      legend:{
        data:['人数','销量']
      },
      // x轴的数据
      xAxis:{
        data:["1月","2月","3月","4月","5月","6月"]
      },
      // y轴的刻度，y轴刻度不进行设置，y轴会自动根据数据最大值生成合适的刻度
      yAxis:{},
      series:[{
        name:'人数',
        type:'bar',
        data:[500,1200,390,280,800,730]
      },{
        name:'销量',
        type:'bar',
        data:[200,920,540,500,420,1000]
      }]
    };
    echarts_left.setOption(option1);
  
    var echarts_right = echarts.init(document.querySelector(".echarts_right"));
    var option2 = {
      title:{
        text:'热门品牌销售',
        subtext:'2018年11月',
        x:'center',
        textStyle:{
          color:"#e92322",
          fontSize:25
        }
      },
      tooltip:{
        trigger:'item',
        formatter:"{a}<br/>{b}:{c}({d}%)"
      },
      legend:{
        // 垂直
        orient:"vertical",
        left:'left',
        data:['耐克','彪马','回力','阿迪','解放']
      },
      series:[{
        name:'品牌销量',
        type:'pie',
        radius:"55%",
        center:['50%','60%'],
        data:[
          {value:335,name:'耐克'},
          {value:135,name:'彪马'},
          {value:300,name:'回力'},
          {value:245,name:'阿迪'},
          {value:655,name:'解放'},        
  
        ],
      }]
    };
    echarts_right.setOption(option2);
  })