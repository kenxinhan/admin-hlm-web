<template>
  <div class="homeInfo">
    <div class="statistics">
       <p>统计分析</p>
    </div>
    <div class="statistics_group">
      <p>分组统计</p>
      <div class="" ref="groupChart" style="width:800px;height:400px;margin:0 auto;margin-top:20px;"></div>
    </div>
    <div class="">
      <p style="margin-bottom:20px;">客户分析</p>
      <div ref="ChinaMap" class='operate_box' style="height:600px;width:49%;display:inline-block;"></div>
      <div ref="circleChart" class='operate_box' style="height:600px;width:49%;display:inline-block;"></div>
    </div>
    <div style="margin-top:40px;">
      <p style="margin-bottom:30px;">客户分析</p>
      <div class="" ref="groupChart_number" style="width:800px;height:400px;margin:0 auto;"></div>
    </div>
  </div>
</template>
<script>
let echarts = require('echarts/lib/echarts') // 引入基本模板
require('echarts/lib/chart/pie') // 引入柱状图组件
require('echarts/map/js/china.js') // 引入中国地图

require("echarts/lib/component/toolbox")  //工具栏
require('echarts/lib/component/tooltip')// 引入提示框
require('echarts/lib/component/title')  //引入title组件
require('echarts/lib/component/legend')//可点击显示对应图标
export default {
  components: {  },
    data(){
      return {

      }
    },
    mounted(){
      this.drawPie_group()
      this.drawchina_map()
      this.drawcircle()
      this.drawPie_gender()
    },
    methods: {
      //分组统计
        drawPie_group(){
          let myChart = echarts.init(this.$refs.groupChart)
            myChart.setOption({
             tooltip : {
                 trigger: 'item',
                 formatter: "{a} <br/>{b} : {c} ({d}%)"
             },
             legend: {
                 orient: 'vertical',
                 bottom: 'bottom',
                 data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
             },
             series : [
                 {
                     name: '访问来源',
                     type: 'pie',
                     radius : '70%',//图形占比
                     center: ['45%', '40%'],//图形相对位置
                     data:[
                         {value:335, name:'直接访问'},
                         {value:310, name:'邮件营销'},
                         {value:234, name:'联盟广告'},
                         {value:135, name:'视频广告'},
                         {value:1548, name:'搜索引擎'}
                     ],
                     itemStyle: {
                         emphasis: {
                             shadowBlur: 10,
                             shadowOffsetX: 0,
                             shadowColor: 'rgba(0, 0, 0, 0.5)'
                         }
                     }
                 }
             ]
            })
        },
        //中国地图
        drawchina_map(){
          let ChinaMap = echarts.init(this.$refs.ChinaMap)
          function randomData() {
             return Math.round(Math.random()*500);
         }
            ChinaMap.setOption({

              tooltip: {
                  trigger: 'item'
              },
              legend: {
                  orient: 'vertical',
                  left: 'left',
              },
              visualMap: {
                  min: 0,
                  max: 2500,
                  left: 'left',
                  top: 'bottom',
                  text: ['高','低'],           // 文本，默认为数值文本
                  calculable: true
              },
              toolbox: {
                  show: true,
                  orient: 'vertical',
                  left: 'right',
                  top: 'center'
              },
              series: [
                  {
                      name: '客户地域分布',
                      type: 'map',
                      mapType: 'china',
                      roam: false,
                      label: {
                          normal: {
                              show: true
                          },
                          emphasis: {
                              show: true
                          }
                      },
                      data:
                      [
  	    	                {name: '北京',value: randomData() },
  	    	                {name: '天津',value: randomData() },
  	    	                {name: '上海',value: randomData() },
  	    	                {name: '重庆',value: randomData() },
  	    	                {name: '河北',value: randomData() },
  	    	                {name: '河南',value: randomData() },
  	    	                {name: '云南',value: randomData() },
  	    	                {name: '辽宁',value: randomData() },
  	    	                {name: '黑龙江',value: randomData() },
  	    	                {name: '湖南',value: randomData() },
  	    	                {name: '安徽',value: randomData() },
  	    	                {name: '山东',value: randomData() },
  	    	                {name: '新疆',value: randomData() },
  	    	                {name: '江苏',value: randomData() },
  	    	                {name: '浙江',value: randomData() },
  	    	                {name: '江西',value: randomData() },
  	    	                {name: '湖北',value: randomData() },
  	    	                {name: '广西',value: randomData() },
  	    	                {name: '甘肃',value: randomData() },
  	    	                {name: '山西',value: randomData() },
  	    	                {name: '内蒙古',value: randomData() },
  	    	                {name: '陕西',value: randomData() },
  	    	                {name: '吉林',value: randomData() },
  	    	                {name: '福建',value: randomData() },
  	    	                {name: '贵州',value: randomData() },
  	    	                {name: '广东',value: randomData() },
  	    	                {name: '青海',value: randomData() },
  	    	                {name: '西藏',value: randomData() },
  	    	                {name: '四川',value: randomData() },
  	    	                {name: '宁夏',value: randomData() },
  	    	                {name: '海南',value: randomData() },
  	    	                {name: '台湾',value: randomData() },
  	    	                {name: '香港',value: randomData() },
  	    	                {name: '澳门',value: randomData() }
  	    	            ]
                  }
              ]
            })
        },
        //
          drawcircle(){
            let circleChart = echarts.init(this.$refs.circleChart)
              circleChart.setOption({

                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    bottom: 'bottom',
                    data:['男性客户','女性客户','未知性别']
                },
                series: [
                    {
                        name:'客户性别结构',
                        type:'pie',
                        radius: ['40%', '55%'],//内外圈占比
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'男性客户'},
                            {value:310, name:'女性客户'},
                            {value:234, name:'未知性别'},
                        ]
                    }
                ]
              })
          },
          //客户性别数
            drawPie_gender(){
              let genderChart = echarts.init(this.$refs.groupChart_number)
                genderChart.setOption({
                 tooltip : {
                     trigger: 'item',
                     formatter: "{a} <br/>{b} : {c} ({d}%)"
                 },
                 legend: {
                     orient: 'vertical',
                     bottom: 'bottom',
                     data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                 },
                 series : [
                     {
                         name: '访问来源',
                         type: 'pie',
                         radius : '70%',//图形占比
                         center: ['45%', '40%'],//图形相对位置
                         data:[
                             {value:335, name:'直接访问'},
                             {value:310, name:'邮件营销'},
                             {value:234, name:'联盟广告'},
                             {value:135, name:'视频广告'},
                             {value:1548, name:'搜索引擎'}
                         ],
                         itemStyle: {
                             emphasis: {
                                 shadowBlur: 10,
                                 shadowOffsetX: 0,
                                 shadowColor: 'rgba(0, 0, 0, 0.5)'
                             }
                         }
                     }
                 ]
                })
            },

    },
}
</script>
<style lang="less" scoped>
.statistics{
  font-size: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d1d1d1;
}
.statistics_group{
  padding: 20px 0;
}
</style>
