<template>
<div class="ChargeMoney">
  <div class="">
    <el-tabs v-model="activeName">
      <el-tab-pane label="支付订单" name="first">
      </el-tab-pane>
      <!-- <el-tab-pane label="已接诊客户" name="second">
      </el-tab-pane> -->
    </el-tabs>
  </div>
  <div class="searchForm">
    <div class="title">
      <i></i>
      <span>筛选查询</span>
    </div>
    <el-form label-width="120px" class="clearfix">
      <div class="fSearch-2-2">
        <el-form-item size="small" label="订单编号：">
          <el-input  v-model="orderNo" placeholder="请输入订单编号"></el-input>
        </el-form-item>
      </div>
      <div class="fSearch-2-2">
        <el-form-item label="服务名称：">
          <el-input  v-model="serveName" placeholder="请输入服务名称"></el-input>
        </el-form-item>
      </div>
      <div class="fSearch-2-2">
        <el-form-item size="small" label="下单人：">
          <el-input v-model="memberNameGuid" placeholder="请输入下单人"></el-input>
        </el-form-item>
      </div>
      <div class="fSearch-2-2">
        <el-form-item label="审核状态：">
          <el-select size="small" v-model="status" placeholder="请选择">
            <el-option v-for="(item,index) in orderTypeData" :key="index" :label="item.lableName" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="fSearch-1">
          <el-button size="small" type="primary" @click="orderList()">查 询</el-button>
      </div>
    </el-form>
  </div>

  <div class="listTitle">
    <i></i>
    <span>数据列表</span>
  </div>
  <el-table :data="list" border class="mb10">
    <el-table-column prop="orderNo" label="订单编号" width=""></el-table-column>
    <el-table-column prop="serveName" label="服务名称" width="100"></el-table-column>
    <el-table-column prop="memberNameGuid" label="下单人" width="80"></el-table-column>
    <el-table-column prop="mobile" label="下单人电话" width=""></el-table-column>
    <!-- <el-table-column label="性别" width="50">
      <template slot-scope="scope">
        <span v-if="scope.row.sex == 'MALE'">男</span>
        <span v-if="scope.row.sex == 'FEMALE'">女</span>
        <span v-if="scope.row.sex == 'UNKNOWN'">未知</span>
      </template>
    </el-table-column> -->
    <el-table-column prop="serialNum" label="流水编号"></el-table-column>
    <el-table-column label="付款方式" width="80">
      <template slot-scope="scope">
        <span v-if="scope.row.payType == 'WX'">微信</span>
        <span v-if="scope.row.payType == 'ALI'">支付宝</span>
        <span v-if="scope.row.payType == 'BANK'">银行转账</span>
      </template>
    </el-table-column>
    <el-table-column prop="amount" label="付款金额" width="100">
      <template slot-scope="scope">
        <span>{{scope.row.amount ? (scope.row.amount)/100+ '元': ''}}</span>

      </template>8
    </el-table-column>
    <el-table-column prop="payTime" label="付款时间" width="180"></el-table-column>
    <el-table-column prop="payCert" label="支付凭证" >
      <template slot-scope="scope">
        <span v-if="scope.row.payType">
          <span  v-for="(item,index) in scope.row.upImg" :key="index" class="imgList">
              <img :src="item" alt=""  @click="previewImg(item)" title="查看图片">
          </span>
        </span>
        
      </template>
    </el-table-column>
    <el-table-column label="审核状态" width="80">
      <template slot-scope="scope">
        <span v-if="scope.row.status == 'WAIT'">待审</span>
        <span v-if="scope.row.status == 'PASS'">通过</span>
        <span v-if="scope.row.status == 'UNPASS'">拒绝</span>
      </template>
    </el-table-column>
    <el-table-column prop="remark" label="审核备注" ></el-table-column>

  </el-table>
  <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" background layout="total, prev, pager, next" :total="total">
  </el-pagination>

  <el-dialog title="查看图片" :visible.sync="previewBox" center>
    <div class="previewBox">
      <img :src="showSrc" alt="">
    </div>
    <div class="closeBox">
      <el-button size="" class="paleGreenBt" @click="previewBox = false">关闭</el-button>
    </div>
   </el-dialog>

</div>
</template>
<script>
import storage from '@/tools/local_storage.js'
export default {
  data() {
    let that = this
    return {
      userInfo:  storage.get('userInfo'),
      list: [],
      orderNo:'',
      serveName:'',
      memberNameGuid:'',
      status:'',
      currentPage: 1,
      total: 0,
      pageSize: 10,
      orderTypeData:[
        {lableName:'全部', value:''},
        {lableName:'待审', value:'WAIT'},
        {lableName:'通过', value:'PASS'},
        {lableName:'拒绝', value:'UNPASS'},
      ],
      activeName:'first',
      serverName :'',
      showSrc: '',
      previewBox: false,
    }
  },
  mounted() {
    this.orderList()
  },
  methods: {
    handleCurrentChange(val) {
        this.currentPage = val
        this.orderList()
    },
    orderList () {
      let params = {
        start: (this.currentPage - 1) *  this.pageSize,
        limit: this.pageSize,
        merchantNo:this.userInfo.memberNoMerchant,
        orderNo:this.orderNo,
        serveName:this.serveName,
        memberNameGuid:this.memberNameGuid,
        status:this.status
      }
      this.$http.post('/api/hx/server/orderlist.do', params).then(res=>{
        if(res.data.result == true){
          let data = res.data.returnObject
          let upImg = []
          data.rows.forEach( (item)=>{
            item.upImg = item.payCert.split(',')
          })

          this.list = data.rows
          this.total = data.total

          console.log(this.list)
        }
      })
    },
    //查看图片
    previewImg(src) {
      this.previewBox = true
      this.showSrc = src
    },

  },
}
</script>

<style lang="less">
.imgList{
  img{
    display: inline-block;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
}
.previewBox{margin: 0 auto;}
.previewBox img{display: block;margin: 0 auto;width: 100%;}
</style>
