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
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="grid-content bg-purple">
                <el-form-item size="small" label="收款时间" prop="time">
                  <el-date-picker v-model="searchForm.startDateStr" style="width:150px;"  type="date" placeholder="开始日期" value-format="yyyy-MM-dd" :picker-options="maxTime"></el-date-picker>
                    <span>至&nbsp;&nbsp;&nbsp;</span>
                  <el-date-picker v-model="searchForm.endDateStr" style="width:150px;" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" :picker-options="minTime"></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <!-- <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
              <div class="grid-content bg-purple">
                <el-form-item size="small" label="支付类型" prop="payMode">
                  <el-select v-model="searchForm.payMode">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="入账" value="ADD"></el-option>
                    <el-option label="出账" value="SUB"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col> -->
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
        <span>合计：{{totalSum/100}}元</span>

      </span>
    </div>

    <el-table :data="projectPriceList" border class="mb10" style="text-align:center"
     show-summary :summary-method="getSummaries">
      <el-table-column prop="stDate" label="收款日期"></el-table-column>
      <el-table-column prop="wxAmount" label="微信">
        <template slot-scope="scope">
          {{scope.row.wxAmount ? scope.row.wxAmount/100 : '0'}}
        </template>
      </el-table-column>
      <el-table-column prop="cardAmount" label="银行卡">
        <template slot-scope="scope">
          {{scope.row.cardAmount ? scope.row.cardAmount/100 : '0'}}
        </template>
      </el-table-column>
      <el-table-column prop="AliAmount" label="支付宝">
        <template slot-scope="scope">
          {{scope.row.AliAmount ? scope.row.AliAmount/100 : '0'}}
        </template>
      </el-table-column>
      <el-table-column prop="groupAmount" label="团购">
        <template slot-scope="scope">
          {{scope.row.groupAmount ? scope.row.groupAmount/100 : '0'}}
        </template>
      </el-table-column>
      <el-table-column prop="payTypeName" label="代金券">
        <template slot-scope="scope">
          {{scope.row.payTypeName ? scope.row.payTypeName/100 : '0'}}
        </template>
      </el-table-column>
      <el-table-column prop="cashAmount" label="现金">
        <template slot-scope="scope">
          {{scope.row.cashAmount ? scope.row.cashAmount/100 : '0'}}
        </template>
      </el-table-column>

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
import {parseTime} from '@/utils'

export default {
  components: {},
  props: {},
  data() {
    let that = this
    return {
      searchForm: {
        startDateStr: "",
        endDateStr:'',
        payMode: 'ADD'
      },
      projectPriceList: [],
      currentPage: 1, // 当前页码
      limit: 10, // 每页条数
      total: 1, // 总条数
      payAmount: 0,
      debtAmount: 0,
      totalSum: 0,
      maxTime: { // 限制最大时间
          disabledDate(time) {
            if (that.searchForm.endDateStr) {
              return time.getTime() > new Date(that.searchForm.endDateStr).getTime()
            }
            return time.getTime() > Date.now()
          }
        },
     minTime: { // 限制最小时间
          disabledDate(time) {
              if (that.searchForm.startDateStr) {
                  let a = parseTime(time.getTime(), '{y}-{m}-{d}')
                  return time.getTime() > Date.now() || a < that.searchForm.startDateStr
              }
                  return time.getTime() > Date.now()
           }
        },
        sumArr: []

    }
  },
  watch: {},
  computed: {},
  mounted() {
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

      // 获取项目
      getProjectPrice() {
         const {currentPage, limit, total, searchForm } = this
         const { startDateStr, endDateStr, payMode } = searchForm
         const { memberNoMerchant } = storage.get("userInfo")
         this.$http.post('/api/hx/bill/mc/stDailyPay/list.do',{
            start: (currentPage - 1 ) * limit,
            limit: limit,
            merchantNo: memberNoMerchant,
            startDateStr,
            endDateStr,
            payMode
         }).then(res=>{
            const { result, errorMessage, returnObject } = res.data;
            if (result) {
                const { total, rows } = returnObject
                //整合二级数据
                for (var i=0; i<rows.length; i++) {
                  let child = rows[i].payDetails
                  for (var j=0; j<child.length; j++) {

                        if (child[j].payTypeName == '微信') {
                          rows[i].wxAmount = child[j].payAmountStr || 0
                        } else if (child[j].payTypeName == '支付宝' || child[j].payTypeName == '支付宝2') {
                          rows[i].AliAmount = child[j].payAmountStr
                        } else if (child[j].payTypeName == '现金') {
                          rows[i].cashAmount = child[j].payAmountStr
                        } else if (child[j].payTypeName == '银行卡') {
                          rows[i].cardAmount = child[j].payAmountStr
                        } else if (child[j].payTypeName == '代金券') {
                          rows[i].couponAmount = child[j].payAmountStr
                        } else if (child[j].payTypeName == '团购') {
                          rows[i].groupAmount = child[j].payAmountStr
                        }
                  }
                }
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

      // 合计
      getTotalPrice() {
         const {currentPage, limit, total, searchForm } = this
         const { startDateStr, endDateStr, payMode } = searchForm
         const { memberNoMerchant } = storage.get("userInfo")
         this.$http.post('/api/hx/bill/mc/stDailyPay/sum.do',{
            start: (currentPage - 1 ) * limit,
            limit: limit,
            merchantNo: memberNoMerchant,
            startDateStr,
            endDateStr,
            payMode
         }).then(res=>{
            const { result, errorMessage, returnObject } = res.data;
            if (result) {
              let data = returnObject
              let sum = 0
              if(data.length){
                for (var i=0; i<data.length; i++) {
                  sum += data[i].payAmount
                }
              }
              this.sumArr = returnObject
              this.totalSum = sum
            } else {
                this.$message({
                    type: "error",
                    message: errorMessage
                });
            }
         })
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
            return;
          } else {
            this.sumArr.forEach( (item, ind) =>{
              if(column.label === item.payTypeName) {
                sums[index] = item.payAmount / 100
              }
            })
          }
          // else if (index === 1) {
          //   sums[index] = this.sumArr[2].payAmount
          //   return;
          // }
        });
        return sums;
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
