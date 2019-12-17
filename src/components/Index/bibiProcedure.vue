<template>
  <div class="flexBox">
    <div class="">
      <div class="coinBox bg">
        <span>BTC市场</span>
      </div>
      <div class="bg twentyBox">
        <p class="twentyBox_title"><i class="todayAmountIcon"></i>24小时交易量统计</p>
        <div class="twentyBox_list" v-for="(item, index) in btcArr" :key="index">
          <p><span>{{item.s}}</span><span class="cBlue">{{item.v ? item.v[0] : '0'}}</span></p>
        </div>
      </div>
      <div class="bg twentyBox bor_top" v-if="btcTotalArr">
        <p class="twentyBox_title"><i class="todayAmountIcon"></i>总交易量统计</p>
        <div class="twentyBox_list" v-for="(item, index) in btcTotalArr" :key="index">
          <p><span>{{item.p}}</span><span class="cBlue">{{item.v ? item.v[0] : '0'}}</span></p>
        </div>
      </div>
    </div>

    <div class="">
      <div class="coinBox bg">
        <span>ETH市场</span>
      </div>
      <div class="bg twentyBox">
        <p class="twentyBox_title"><i class="todayAmountIcon"></i>24小时交易量统计</p>
        <div class="twentyBox_list" v-for="(item, index) in ethArr" :key="index">
          <p><span>{{item.s}}</span><span class="cBlue">{{item.v ? item.v[0] : '0'}}</span></p>
        </div>
      </div>
      <div class="bg twentyBox bor_top">
        <p class="twentyBox_title"><i class="todayAmountIcon"></i>总交易量统计</p>
        <div class="twentyBox_list" v-for="(item, index) in ethTotalArr" :key="index">
          <p><span>{{item.p}}</span><span class="cBlue">{{item.v ? item.v[0] : '0'}}</span></p>
        </div>
      </div>
    </div>

    <div class="">
      <div class="coinBox bg">
        <span>USDT市场</span>
      </div>
      <div class="bg twentyBox">
        <p class="twentyBox_title"><i class="todayAmountIcon_2"></i>24小时交易量统计</p>
        <div class="twentyBox_list" v-for="(item, index) in usdtArr" :key="index">
          <p><span>{{item.s}}</span><span class="cBlue">{{item.v ? item.v[0] : '0'}}</span></p>
        </div>
      </div>
      <div class="bg twentyBox bor_top">
        <p class="twentyBox_title"><i class="todayAmountIcon_2"></i>总交易量统计</p>
        <div class="twentyBox_list" v-for="(item, index) in usdtTotalArr" :key="index">
          <p><span>{{item.p}}</span><span class="cBlue">{{item.v ? item.v[0] : '0'}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {cutOutDate,parseTime} from '@/utils'
export default {
  name: 'bibiProcedure',
    data(){
      return {
        symbolArr: ['eth','btc','usdt'],
        btcTotalArr: [],
        btcArr:[],
        ethTotalArr: [],
        ethArr: [],
        usdtTotalArr: [],
        usdtArr: [],

      }
    },
    mounted(){
      this.getbtc()
      this.geteth()
      this.getusdt()
      this.getglob_btc()
      this.getglob_eth()
      this.getglob_usdt()
    },
    methods: {
      //24小时交易总量
      getbtc(){
          this.$api.get('/market/stat/kline/24hourByMarket',{
            market: 'btc'
          },res=>{
            this.btcArr = res.result
          })
      },
      geteth(){
          this.$api.get('/market/stat/kline/24hourByMarket',{
            market: 'eth'
          },res=>{
            this.ethArr = res.result
          })
      },
      getusdt(){
          this.$api.get('/market/stat/kline/24hourByMarket',{
            market: 'usdt'
          },res=>{
            this.usdtArr = res.result
          })
      },


      //交易总量
        getglob_btc(){
            this.$api.get('/market/stat/kline/globalByMarket',{
              market: 'btc'
            },res=>{
              this.btcTotalArr = res.result
            })
        },
        getglob_eth(){
            this.$api.get('/market/stat/kline/globalByMarket',{
              market: 'eth'
            },res=>{
              this.ethTotalArr = res.result
            })
        },
        getglob_usdt(){
            this.$api.get('/market/stat/kline/globalByMarket',{
              market: 'usdt'
            },res=>{
              this.usdtTotalArr = res.result
            })
        },
    },
}
</script>
<style  scoped>
.flexBox{
  width: 54%;
  display: flex;
  justify-content: space-around;
}
.flexBox .bg{
  background-color: #fff;
}
.flexBox>div{
  width: 250px;
}
.flexBox .coinBox{
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}
.bor_top{border-top: 1px solid #e2e2e2;}
.flexBox .twentyBox{width: 100%;padding:10px 15px 20px 15px;box-sizing: border-box;min-height: 230px;}
.flexBox .twentyBox .twentyBox_title{font-size: 16px;height: 40px;line-height: 40px;text-align: center;margin-bottom: 15px;}
.flexBox .twentyBox .twentyBox_title .todayAmountIcon{background-image: url('/static/img/icon_10.png');width: 30px;height: 30px;background-size: 100% 100%;display: inline-block;vertical-align: middle;margin-right: 10px;}
.flexBox .twentyBox .twentyBox_title .todayAmountIcon_2{background-image: url('/static/img/icon_08.png');width: 30px;height: 30px;background-size: 100% 100%;display: inline-block;vertical-align: middle;margin-right: 10px;}
.flexBox .twentyBox .twentyBox_list{font-size: 14px;line-height: 2;}
.flexBox .twentyBox .twentyBox_list p{display: flex;justify-content: space-between;}










</style>
