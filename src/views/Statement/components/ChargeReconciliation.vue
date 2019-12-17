<template>
  <div class="BcategoryBox">
    <div class="searchForm">
      <div class="title">
        <i></i>
        <span>筛选查询</span>
      </div>
      <el-form class="clearfix" ref="searchRef" :model="searchForm">
        <div class="fSearch-f">
          <el-row :gutter="10" style="width:100%">
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple">
                <el-form-item size="small" label="收款时间" prop="payTimeStr">
                  <el-date-picker v-model="searchForm.payTimeStr" style="width:150px;"  type="date" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple">
                <el-form-item size="small" label="患者姓名" prop="patientName">
                  <el-input v-model="searchForm.patientName"></el-input>
                </el-form-item>
              </div>
            </el-col>


            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple">
                <el-form-item size="small" label="收款人" prop="recieverName">
                  <el-input v-model="searchForm.recieverName"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple">
                <el-form-item size="small" label="收款状态" prop="status">
                  <el-select v-model="searchForm.status">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="正常" value="NORMAL"></el-option>
                    <el-option label="作废" value="CANCEL"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple">
                <el-form-item size="small" label="账单(单据)编号" prop="billNo">
                  <el-input type="text" v-model="searchForm.billNo"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple">
                <el-form-item size="small" label="支付(单据)编号" prop="payNo">
                  <el-input type="text" v-model="searchForm.payNo"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple-light">
                <div class="btnSrarch">
                  <el-button size="small" type="primary" @click="searchData">查 询</el-button>
                  <el-button size="small" type="primary" @click="resetSearchData('searchRef')">重 置</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
    <div class="listTitle">
      <i></i>
      <span>数据列表</span>
      <span class="pull-right total">
        <span>实收：{{payAmount/100}}元</span>
        <span>欠收：{{debtAmount/100}}元</span>
      </span>
    </div>

    <el-table :data="projectPriceList" border class="mb10" style="text-align:center" >
      <el-table-column prop="billNo" label="账单(票据)编号"></el-table-column>
      <el-table-column prop="payNo" label="支付(票据)编号"></el-table-column>
      <el-table-column prop="patientName" label="患者姓名"></el-table-column>
      <el-table-column label="应收">
        <template slot-scope="scope">
          <span>{{scope.row.receivableAmt / 100}}</span>
        </template>
      </el-table-column>
      <el-table-column label="实收">
        <template slot-scope="scope">
          <span v-if="scope.row.bizType == 'REFUND'">0</span>
          <span v-else>{{scope.row.payAmount / 100}}</span>
        </template>
      </el-table-column>
      <el-table-column label="欠收">
        <template slot-scope="scope">
          <span v-if="scope.row.bizType == 'REFUND'">0</span>
          <span v-else>{{scope.row.debtAmt / 100}}</span>
        </template>
      </el-table-column>
      <el-table-column label="退费">
        <template slot-scope="scope">
          <span v-if="scope.row.bizType == 'REFUND'">{{scope.row.billPayAmount / 100}}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column prop="payTypeName" label="收款方式"></el-table-column>
      <el-table-column prop="status" label="交易状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 'NORMAL'">正常</span>
          <span v-if="scope.row.status == 'CANCEL'">作废</span>
        </template>
      </el-table-column>
      <el-table-column prop="bizType" label="交易类型">
        <template slot-scope="scope">
          <span v-if="scope.row.bizType == 'PAY'">收费</span>
          <span v-if="scope.row.bizType == 'DEBT'">收欠费</span>
          <span v-if="scope.row.bizType == 'REFUND'">退款</span>
        </template>
      </el-table-column>
      <el-table-column prop="recieverName" label="收款人"></el-table-column>
      <el-table-column prop="payTime" label="收款时间"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>
    <br>
    <el-pagination
        @current-change="handlePageQuery"
        :current-page="currentPage"
        :page-size="limit"
        background
        layout="total, prev, pager, next"
        :total="total"
    ></el-pagination>

  </div>
</template>

<script>
import storage from "@/tools/local_storage.js";

export default {
  components: {},
  props: {},
  data() {
    return {
      searchForm: {
        payTimeStr: "",
        patientName: "",
        recieverName: "",
        status: "",
        billNo: '',
        payNo:'',
      },
      projectPriceList: [],
      currentPage: 1, // 当前页码
      limit: 10, // 每页条数
      total: 1, // 总条数
      payAmount: 0,
      debtAmount: 0,
      nowData: new Date()
    };
  },
  watch: {},
  computed: {},
  mounted() {
      let year = this.nowData.getFullYear()
      let month = (this.nowData.getMonth() + 1) < 10 ? '0' + (this.nowData.getMonth() + 1) : (this.nowData.getMonth() + 1)
      let date = this.nowData.getDate() < 10 ? '0' + this.nowData.getDate() : this.nowData.getDate()
      let de = `${year}-${month}-${date}`

      this.searchForm.payTimeStr = de
      this.getProjectPrice()
      this.getTotalPrice()
  },
  methods: {

        // 搜索查询
        searchData() {
            this.currentPage = 1
            this.getProjectPrice()
            this.getTotalPrice()
        },
        // 重置搜索
        resetSearchData(keyname) {
            this.$refs[keyname].resetFields()
            this.getProjectPrice()
            this.getTotalPrice()
        },

        // 分页
        handlePageQuery(currentPage) {
            this.currentPage = currentPage;
            this.getProjectPrice();
        },

      // 列表
      getProjectPrice() {
         const {currentPage, limit, total, searchForm } = this
         const { payTimeStr, patientName, recieverName, status,billNo, payNo } = searchForm
         const { memberNoMerchant } = storage.get("userInfo")
         this.$http.post('/api/hx/bill/mc/payment/list.do',{
            start: (currentPage - 1 ) * limit,
            limit: limit,
            merchantNo: memberNoMerchant,
            payTimeStr,
            patientName,
            recieverName,
            status,
            billNo,
            payNo
         }).then(res=>{
            const { result, errorMessage, returnObject } = res.data;
            if (result) {
                const { total, rows } = returnObject
                this.projectPriceList = rows
                this.total = total
            } else {
                this.$message({
                    type: "error",
                    message: errorMessage
                });
            }
         })
      },
      //统计
      getTotalPrice() {
         const {currentPage, limit, total, searchForm } = this
         const { payTimeStr, patientName, recieverName, status,billNo, payNo } = searchForm
         const { memberNoMerchant } = storage.get("userInfo")
         this.$http.post('/api/hx/bill/mc/payment/sum.do',{
            start: (currentPage - 1 ) * limit,
            limit: limit,
            merchantNo: memberNoMerchant,
            payTimeStr,
            patientName,
            recieverName,
            status,
            billNo,
            payNo
         }).then(res=>{
            const { result, errorMessage, returnObject } = res.data;
            if (result) {
              if(returnObject) {
                this.payAmount = returnObject.payAmount
                this.debtAmount = returnObject.rtAmount
              } else {
                this.payAmount =  0
                this.debtAmount = 0
              }
            
            } else {
                this.$message({
                    type: "error",
                    message: errorMessage
                });
            }
         })
      },

  },

};
</script>
<style lang="less" scoped>
.BcategoryBox {
  position: relative;
  height: 100%;
  .headerBox {
    font-size: 22px;
    background: #f3f3f3;
    text-align: left;
    padding: 10px 20px;
    color: #686868;
    line-height: 40px;
  }
  .lfBigClass {
    float: left;
    width: 20%;
    margin-right: 2%;
    p {
      color: #409eff;
      padding: 5px;
    }
    p:hover {
      background: #409eff;
      color: #ffffff;
    }
  }
  .rgProjectBox {
    float: left;
    width: 78%;
  }
}
.total{
  font-size: 18px;
  color: red;
  margin-right: 50px;
  span{
    margin-right: 50px;
  }
}
</style>
