<template>
  <div class="bigBox">
    <!-- <div class="radioBox mb10">
      <el-radio-group v-model="radioType" @change="handleRadio">
        <el-radio-button label="1">BTC市场</el-radio-button>
        <el-radio-button label="2">ETH市场</el-radio-button>
        <el-radio-button label="3">USDT市场</el-radio-button>
      </el-radio-group>
    </div>
    <div class="totalBox">
      <p><i class="todayAmountIcon"></i><span>24小时交易量统计</span></p>
      <p class="cBlue">155555.454646468</p>
    </div>
    <div class="totalBox bor_top">
      <p><i class="todayAmountIcon"></i><span>总交易量统计</span></p>
      <p class="cBlue">155555.454646468</p>
    </div> -->
    <div class="bg twentyBox">
      <p class="twentyBox_title"><i class="todayAmountIcon"></i>24小时交易量统计</p>
      <div class="twentyBox_list" v-for="(item, index) in Arr1" :key="index">
        <p><span>{{item.s}}</span><span class="cBlue">{{item.v ? item.v[0] : '0'}}</span></p>
      </div>
    </div>
    <div class="bg twentyBox bor_top">
      <p class="twentyBox_title"><i class="todayAmountIcon"></i>总交易量统计</p>
      <div class="twentyBox_list" v-for="(item, index) in Arr2" :key="index">
        <p><span>{{item.p}}</span><span class="cBlue">{{item.v ? item.v[0] : '0'}}</span></p>
      </div>
    </div>

  </div>
</template>
<script>
import {cutOutDate,parseTime} from '@/utils'
export default {
  name: 'fabiProcedure',
    data(){
      return {
        radioType: '1',
        symbolType: 'btc_cny',
        Arr1: [],
        Arr2: [],

      }
    },
    mounted(){
      this.getTotal()
      this.getGlobalTotal()
    },
    methods: {
      //24小时交易总量
      getTotal(){
          this.$api.get('/market/stat/kline/24hourByMarket',{
            market: 'cny'
          },res=>{
            this.Arr1 = res.result
            if(this.Arr1){
              this.Arr1.forEach(item =>{
                let a = item.s.split('_')
                item.s = a[0]
              })
            }
          //  console.log(this.Arr1)
          })
      },
      //
      getGlobalTotal(){
          this.$api.get('/market/stat/kline/globalByMarket',{
            market: 'cny'
          },res=>{
            this.Arr2 = res.result
            if(this.Arr2){
              this.Arr2.forEach(item =>{
                let a = item.p.split('_')
                item.p = a[0]
              })
            }
          })
      },

    },
}
</script>
<style  scoped>
.bigBox{margin: 50px 0 0 50px;}
/* .bigBox .radioBox{width: 100%;text-align: center;line-height: 40px;}
.bigBox .totalBox{width: 100%;text-align: center;font-size: 16px;background-color: #fff;line-height: 2;padding: 20px;box-sizing: border-box;}
.todayAmountIcon{background-image: url('/static/img/icon_10.png');width: 30px;height: 30px;background-size: 100% 100%;display: inline-block;vertical-align: middle;margin-right: 10px;}
.bor_top{border-top: 1px solid #e2e2e2;} */
</style>
<style scoped>
.bg{background-color: #fff;}
.bor_top{border-top: 1px solid #e2e2e2;}
.twentyBox{width: 300px;padding:10px 20px 20px 20px;box-sizing: border-box;min-height: 230px;display: inline-block;}
.twentyBox .twentyBox_title{font-size: 20px;height: 40px;line-height: 40px;text-align: center;margin-bottom: 15px;}
.twentyBox .twentyBox_title .todayAmountIcon{background-image: url('/static/img/icon_10.png');width: 30px;height: 30px;background-size: 100% 100%;display: inline-block;vertical-align: middle;margin-right: 10px;}

.twentyBox .twentyBox_list{font-size: 14px;line-height: 2.5;}
.twentyBox .twentyBox_list p{display: flex;justify-content: space-between;font-size: 16px;}
</style>
