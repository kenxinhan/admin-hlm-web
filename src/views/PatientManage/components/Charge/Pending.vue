<template>
  <div>
    <span slot="label" style="font-size: 18px">
      <i class="el-icon-time" style="margin-right: 10px"></i>待处理
    </span>
    <br>
    <br>
    <el-table :data="PendingList" style="width: 100%">
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.process === 'UNCHECK'"><span class="indicatorA"><span></span>待审核</span></span>
          <span v-if="scope.row.process === 'UNPAY'"><span class="indicatorB"><span></span>待收费</span></span>
          <span v-if="scope.row.process === 'UNPASS'"><span class="indicatorA"><span></span>已拒绝</span></span>
          <span v-if="scope.row.process === 'UNREFUND'"><span class="indicatorC"><span></span>待退费</span></span>
          <span v-if="scope.row.process === 'FINISH'"><span class="indicatorD"><span></span>已处理</span></span>
        </template>
      </el-table-column>
      <el-table-column prop="merchantName" label="操作诊所"></el-table-column>
      <el-table-column prop="memberNameGuid" label="创建人"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" width="150"></el-table-column>
      <el-table-column prop="clinicTime" label="就诊时间" width="150"></el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.operateType === 'PAY'">收费</span>
          <span v-if="scope.row.operateType === 'DEBT'">收欠费</span>
          <span v-if="scope.row.operateType === 'REFUND'">退款</span>
        </template>
      </el-table-column>
      <el-table-column prop="doctorName" label="医生"></el-table-column>
      <el-table-column prop="originalAmount" label="原价">
        <template
          slot-scope="scope"
        >{{scope.row.originalAmount? scope.row.originalAmount / 100 : ''}}</template>
      </el-table-column>
      <el-table-column label="应收">
        <template slot-scope="scope">{{scope.row.reallyAmount / 100}}</template>
      </el-table-column>
      <el-table-column label="实收">
        <template slot-scope="scope">{{scope.row.payAmount / 100}}</template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <!-- <el-button type="text" @click="handleEditPeddingItem(scope.row)">编辑</el-button> -->
          <el-button
            type="text"
            v-if="scope.row.operateType === 'PAY' && scope.row.process === 'UNPAY'"
            @click="handleCharge(scope.row)"
          >收费</el-button>
          <el-button
            type="text"
            v-if="scope.row.operateType === 'DEBT' "
            @click="handleCollectOverdueBill(scope.row)"
          >收欠费</el-button>
          <el-button
            type="text"
            v-if="scope.row.operateType === 'REFUND' && scope.row.process === 'UNREFUND'"
            @click="handleReturnCharge(scope.row)"
          >退费</el-button>
          <el-button type="text" @click="handleCancelPendingItem(scope.row)">作废</el-button>
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
    <!-- 退费 -->
     <el-dialog
        title="退费"
        :visible.sync="dialogVisible_returncharge"
        width="30%">
        <br>
        退款类型 : <span v-if="billOperate ? billOperate.refundType ==='ALL' : ''">退整单</span><span v-if="billOperate? billOperate.refundType ==='PART' : ''">退金额</span>
        <br><br>
        <el-table
            :data="billProjectList"
            ref="tableCheckbox"
            >
            <el-table-column prop="projectName" label="项目名称" :key="Math.random()"></el-table-column>
            <el-table-column label="单价" :key="Math.random()">
                <template slot-scope="scope">
                   {{scope.row.unitPrice / 100}}
                </template>
            </el-table-column>
            <el-table-column prop="itemNum" label="数量" :key="Math.random()"></el-table-column>
            <el-table-column label="应收" :key="Math.random()">
                <template slot-scope="scope">
                   {{scope.row.itemDiscountAmount / 100}}
                </template>
            </el-table-column>
             <el-table-column label="退实收" :key="Math.random()">
                <template slot-scope="scope">
                    {{scope.row.currentRtAmount}}
                </template>
            </el-table-column>
            <el-table-column label="可退数量">
                <template slot-scope="scope">
                    {{scope.row.itemNum - scope.row.rtNum}}
                </template>
            </el-table-column>
            <el-table-column label="需退数量">
                <template slot-scope="scope">
                    <span>{{scope.row.currentRtNum}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="totalBox">
            <span>应收：{{billDetail.reallyAmount / 100}}</span>
            <span>实收：{{billDetail.payAmount / 100 }}</span>
            <span>退实收：{{ retuRecevied(billOperate) / 100}}</span>
            <span>退后应收：{{backReallyAmount / 100}}</span>
            <span>退后实收：{{backPayAmount / 100}}</span>
        </div>
        <div class="returnInfo">
            <span>退费人: {{patientDetail.name}}</span>
            <!-- <span>退费人: {{billDetail.remark2}}</span> -->
            <span>退费总额: <i>{{retuRecevied(billOperate) /100 }}</i></span>
        </div>
        <el-form :inline="true" ref="formReturnAmount" label-width="100px" :model="returnChargeForm" :rules="returnChargeFormRules" style="width: 100%;margin: 30px 0;" class="demo-form-inline">
            <el-form-item label="退费方式" prop="payType">
                <el-select v-model="returnChargeForm.payType" placeholder="活动区域">
                    <el-option label="暂无" value=""></el-option>
                    <el-option v-for="item in payTypeList" :key="item.code" :label="item.lableName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="退费时间"  prop="refundTimeStr">
                <el-date-picker
                    v-model="returnChargeForm.refundTimeStr"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="备注">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="returnChargeForm.remark">
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible_returncharge = false">关闭</el-button>
            <el-button type="primary" v-if="optType ==='REFUND'" @click="handleConfirmReturn">退费</el-button>
            <el-button type="primary" v-if="optType ==='SAVE'" @click="handleConfirmReturn">保存</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import storage from "@/tools/local_storage.js";

export default {
  components: {},
  props: {
    patientDetail: {
      type: Object,
      default: {}
    },
    payTypeList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      dialogVisible_returncharge: false,
      billDetail: {},
      billOperate: {},
      billProjectList: [],
      PendingList: [],
      optType: 'SAVE',
      currentPage: 1,
      limit: 10,
      total: 1,
      returnChargeForm: {
        payType: '',
        refundTimeStr: '',
        remark: ''
      },
      returnChargeFormRules: {
        payType:[
          { required: true, message: '请选择收费方式', trigger: 'change' },
        ],
        refundTimeStr:[
          { required: true, message: '请选择收费时间', trigger: 'change' },
        ]
      }
    }
  },
  watch: {},
  computed: {

    // 退实收
    // returnReallyAmount: (_this) => {
    //    // 退金额
    //    if( _this.refundType === 'PART') {
    //       return _this.billOperate.payAmount
    //    } else {
    //       //退整单
    //       return  _this.billDetail.payAmount
    //    }
    // },

    // 退后应收
    backReallyAmount: (_this) => {

        // 退金额
        if( _this.billOperate.refundType === 'PART') {

          // 20190523 修改
          return _this.subtractMath(_this.billOperate.billPayAmount, _this.billOperate.payAmount)
            // // 剩余实收金额
            // let amount = _this.subtractMath(_this.billDetail.payAmount,_this.returnReallyAmount)
            // // 如果大于应付金额，返回0，如果小于，应付金额-剩余实收金额
            // if( amount >= Number(_this.billDetail.reallyAmount ) ) {
            //     return 0
            // } else {
            //     return _this.subtractMath(_this.billDetail.reallyAmount,amount)
            // }

        } else {
           // 退整单
           return _this.billDetail.reallyAmount
        }

    },

    // 退后实收
    backPayAmount: (_this) => {

       // 退金额
       if( _this.refundType === 'PART') {
            // 所有项目的退款总额
            let amount = _this.subtractMath(_this.billDetail.payAmount,_this.billOperate.payAmount)

            // 实收总额 > 退款总额
            if(  amount > 0) {
                return amount
            } else {
                return 0
            }
       } else {

          // 退整单
          return 0
       }
    }

  },
  methods: {

      // 分页
      handlePageQuery(currentPage) {
        this.currentPage = currentPage
        this.getFollowupList()
      },

      // 编辑(退费/收费)
      handleEditPeddingItem(row) {
        // 退费
        if( row.operateType === 'REFUND' ) {
          this.getBillDetail(row,()=>{
            this.optType = 'SAVE'
            this.dialogVisible_returncharge = true
          })
        }
        // 收费
        else if ( row.operateType === 'PAY'){
          this.$emit('showCreateBill',row,'edit')
        }
        // 收欠费
        else if( row.operateType === 'DEBT'){
          // this.$emit('showCollection',row,'edit')
           this.$emit('showCollection',row,'edit', true)
        }
      },

      // 收费
      handleCharge(row) {
        this.$emit('showCreateBill',row,'edit')
      },

      // 收欠费
      handleCollectOverdueBill(row) {
        this.$emit('showCollection',row,'edit', true)
      },

      // 退费
      handleReturnCharge(row) {
        this.getBillDetail(row,()=>{
          this.optType = 'REFUND'
          this.dialogVisible_returncharge = true
        })
      },

      // 作废
      handleCancelPendingItem(row) {
         this.$confirm('真的要作废吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.$http.post('/api/hx/bill/untreatedCancel.do',{
                code: row.code
              }).then(res=>{
                  const { result, errorMessage } =  res.data
                  if(result){
                      this.$message({
                          type: "success",
                          message: '操作成功!'
                      })
                      this.getPendingList()
                  }else{
                      this.$message({
                      type:'error',
                      message: errorMessage
                      })
                  }
              })
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: `已取消作废`
              })
          })
      },

      // 确认退费/编辑退费保存
      handleConfirmReturn() {
        console.log(this.billDetail.billOperate);
        return false
         const { refundCode ,recieverNo,recieverName,memberNoGuid,memberNameGuid} = this.billDetail.billOperate

         const { payType,refundTimeStr ,remark} = this.returnChargeForm
         this.$http.post('/api/hx/bill/refund.do',{
           code:refundCode,
           optType: this.optType,
           payType,
           payTypeName: this.payTypeList.find(item=>item.code === payType)['lableName'],
           refundGdNo:recieverNo,
           refundGdName:recieverName,
           memberNoGuid,
           memberNameGuid,
           refundTimeStr:refundTimeStr,
           remark
         }).then(res=>{
            const { result, errorMessage, returnObject } = res.data
            if (result) {
                this.getPendingList()
                this.dialogVisible_returncharge = false
                if(this.optType === 'SAVE') {
                    this.$message({
                        type: "success",
                        message: '编辑成功！'
                    })
                 } else{
                    this.$message({
                        type: "success",
                        message: '退费成功！'
                    })
                 }
            } else {
                this.$message({
                    type: "error",
                    message: errorMessage
                });
            }
         })
      },



      // 账单详情
      getBillDetail(row,callback) {
        const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
          } = storage.get("userInfo")
          this.$http.post('/api/hx/bill/detail.do',{
              merchantNo:memberNoMerchant,
              code:   row.code,
              billCode: row.billCode
          }).then(res=>{
                const { result, errorMessage, returnObject } =  res.data
                if(result){
                    this.billDetail = returnObject
                    this.billOperate = returnObject.billOperate
                    this.billProjectList =  returnObject.details

                    if( this.optType === 'SAVE' ) {
                      this.returnChargeForm= {
                        payType: returnObject.billOperate.payType,
                        refundTimeStr:  returnObject.billOperate.payTime,
                        remark:  returnObject.billOperate.remark,
                      }
                    }

                    if(callback)callback()
                }else{
                    this.$message({
                      type:'error',
                      message: errorMessage
                    })
                }
          })
      },

      // 获取待处理列表
      getPendingList() {
            const { currentPage , limit} = this
            const { code } = this.patientDetail
            const {
                    memberNoGuid,
                    memberNoMerchant,
                    memberNameMerchant,
                    roleEnnames,
                    shopNo
            } = storage.get("userInfo")
            this.$http.post('/api/hx/bill/untreatedList.do',{
                start: (currentPage - 1) * limit,
                limit: limit,
                merchantNo: memberNoMerchant,
                patientNo: code
            }).then(res=>{
                    const { result, errorMessage, returnObject } = res.data;
                    if (result) {
                        const { total, rows } = returnObject
                        this.PendingList = rows
                        this.total = total
                    } else {
                        this.$message({
                            type: "error",
                            message: errorMessage
                        })
                    }
            })
      },

      // 20190523
     // 修改退实收 退费总额
     retuRecevied (obj) {
       if (obj.refundType == 'PART') {
         // 退金额
         return obj.payAmount
       } else {
         //退整单
         return this.billDetail.payAmount
       }
     },


  },
  created() {},
  mounted() {
    this.getPendingList()
  }
};
</script>
<style lang="less" scoped>
.totalBox{
    text-align: center;
    span{
        display: inline-block;
        margin: 20px 30px 20px 0;
        font-size: 18px;
    }
}
.returnInfo{
    padding: 30px 0;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    font-size: 16px;
    text-align: center;
    span{
        display: inline-block;
        margin-right: 100px;
        i{
            font-size: 24px;
            color: red;
        }
    }
}
</style>
