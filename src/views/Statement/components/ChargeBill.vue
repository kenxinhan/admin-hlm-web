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
                <el-form-item size="small" label="首次缴费时间">
                  <el-date-picker v-model="searchForm.payStartDateStr" style="width:150px;"  type="date" placeholder="开始日期" value-format="yyyy-MM-dd" :picker-options="maxTime"></el-date-picker>
                    <span>至&nbsp;&nbsp;&nbsp;</span>
                  <el-date-picker v-model="searchForm.payEndDateStr" style="width:150px;" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" :picker-options="minTime"></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="grid-content bg-purple">
                <el-form-item size="small" label="就诊时间">
                  <el-date-picker v-model="searchForm.clinicStartDateStr" style="width:150px;"  type="date" placeholder="开始日期" value-format="yyyy-MM-dd" :picker-options="maxTime"></el-date-picker>
                    <span>至&nbsp;&nbsp;&nbsp;</span>
                  <el-date-picker v-model="searchForm.clinicEndDateStr" style="width:150px;" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" :picker-options="minTime"></el-date-picker>
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
                <el-form-item size="small" label="账单状态" prop="payStatus">
                  <el-select v-model="searchForm.payStatus">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="已结清" value="FINISH"></el-option>
                    <el-option label="未结清" value="ARREARAGE"></el-option>
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
      <el-table-column prop="billNo" label="账单(单据)编号"></el-table-column>
      <el-table-column prop="patientName" label="患者姓名"></el-table-column>
      <el-table-column prop="payTime" label="首次缴费时间"></el-table-column>
      <el-table-column prop="clinicTime" label="就诊时间"></el-table-column>
      <el-table-column prop="payStatus" label="账单状态">
        <template slot-scope="scope">
          <span v-if="scope.row.payStatus == 'UNPAY'">待收费</span>
          <span v-if="scope.row.payStatus == 'FINISH'">已结清</span>
          <span v-if="scope.row.payStatus == 'ARREARAGE'">未结清</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark1" label="医生"></el-table-column>
      <el-table-column label="应收">
        <template slot-scope="scope">
          <span>{{scope.row.reallyAmount / 100}}</span>
        </template>
      </el-table-column>
      <el-table-column label="实收">
        <template slot-scope="scope">
          <span>{{scope.row.payAmount / 100}}</span>
        </template>
      </el-table-column>
      <el-table-column label="欠收">
        <template slot-scope="scope">
          <span>{{scope.row.debtAmount / 100}}</span>
        </template>
      </el-table-column>
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
import {parseTime} from '@/utils'

export default {
  components: {},
  props: {},
  data() {
    let that = this
    return {
      searchForm: {
        payStartDateStr: '',
        payEndDateStr: '',
        clinicStartDateStr: '',
        clinicEndDateStr: '',
        patientName: "",
        payStatus: "",
        billNo: '',
      },
      projectPriceList: [],
      currentPage: 1, // 当前页码
      limit: 10, // 每页条数
      total: 1, // 总条数
      payAmount: 0,
      debtAmount: 0,
      maxTime: { // 限制最大时间
          disabledDate(time) {
            if (that.searchForm.payEndDateStr) {
              return time.getTime() > new Date(that.searchForm.payEndDateStr).getTime()
            }
            return time.getTime() > Date.now()
          }
        },
     minTime: { // 限制最小时间
          disabledDate(time) {
              if (that.searchForm.payStartDateStr) {
                  let a = parseTime(time.getTime(), '{y}-{m}-{d}')
                  return time.getTime() > Date.now() || a < that.searchForm.payStartDateStr
              }
                  return time.getTime() > Date.now()
           }
        },

    }
  },
  watch: {},
  created() {
    this.getdatatime()
  },
  mounted() {
      this.getProjectPrice()
      this.getTotalPrice()
  },
  methods: {
    getdatatime(){//默认显示今天
      this.searchForm.payStartDateStr= new Date();
    },
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
         const {
           payStartDateStr,
           payEndDateStr,
           clinicStartDateStr,
           clinicEndDateStr,
           patientName,
           payStatus,
           billNo,

         } = searchForm
         console.log(searchForm)

         const { memberNoMerchant } = storage.get("userInfo")
         this.$http.post('/api/hx/bill/mc/list.do',{
            start: (currentPage - 1 ) * limit,
            limit: limit,
            merchantNo: memberNoMerchant,
            payStartDateStr,
            payEndDateStr,
            patientName,
            payStatus,
            clinicStartDateStr,
            clinicEndDateStr,
            billNo,
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
         const {
           payStartDateStr,
           payEndDateStr,
           clinicStartDateStr,
           clinicEndDateStr,
           patientName,
           payStatus,
           billNo,

         } = searchForm
         const { memberNoMerchant } = storage.get("userInfo")
         this.$http.post('/api/hx/bill/mc/sum.do',{
            start: (currentPage - 1 ) * limit,
            limit: limit,
            merchantNo: memberNoMerchant,
            payStartDateStr,
            payEndDateStr,
            clinicStartDateStr,
            clinicEndDateStr,
            patientName,
            payStatus,
            billNo,
         }).then(res=>{
            const { result, errorMessage, returnObject } = res.data;
            if (result) {
              if(returnObject) {
                this.payAmount = returnObject.payAmount
                this.debtAmount = returnObject.debtAmount
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
