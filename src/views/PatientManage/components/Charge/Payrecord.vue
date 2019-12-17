<template>
  <div>
      <el-dialog
        title="打印"
        :visible.sync="dialogVisible_returnprint"
        width="30%">
        <div id="wrap_b" class="printBox wrap">
         <div style="font-size: 18px;text-align:center">{{payRecordInfo.billOperate ? payRecordInfo.billOperate.merchantName : ''}}收费单据</div>
         <br>
         <table>
             <tr>
                 <td colspan="2" style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">
                     <span>病历号：{{patientDetail.caseNo}}</span>
                 </td>
                 <td colspan="2" style="border-top: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
                     <span>姓名：{{patientDetail.name}}</span>
                 </td>
             </tr>
             <tr>
                 <td colspan="2" style="border-left: 1px solid #eeeeee;">
                     <span>就诊时间：{{payRecordInfo.billOperate ? payRecordInfo.billOperate.clinicTime : ''}}</span>
                 </td>
                 <td colspan="2" style="border-right: 1px solid #eeeeee;">
                     <span>单据编号：{{payRecordInfo.billOperate ? payRecordInfo.billOperate.billCode : ''}}</span>
                 </td>
             </tr>
             <tr>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">交易类型</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">应收</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">实收</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">退费</td>
             </tr>
             <tr>
                 <td style="border-left: 1px solid #eeeeee;">
                    <span v-if="payRecordInfo.payment ? payRecordInfo.payment.bizType === 'PAY' : ''">收费</span>
                    <span v-if="payRecordInfo.payment ? payRecordInfo.payment.bizType === 'DEBT' :''">收欠费</span>
                    <span v-if="payRecordInfo.payment ? payRecordInfo.payment.bizType === 'REFUND' :''">退款</span>
                 </td>
                 <td>{{payRecordInfo.payment ? payRecordInfo.payment.receivableAmt : ''}} </td>
                 <td>{{ payRecordInfo.payment ? payRecordInfo.payment.billPayAmount :''}}</td>
                 <td style="border-right: 1px solid #eeeeee;">{{payRecordInfo.paymentpayAmount}}</td>
             </tr>
             <tr>
                 <td style="border-left: 1px solid #eeeeee;border-right: 1px solid #eeeeee;" height="60" colspan="6"></td>
             </tr>
             <tr>
                 <td colspan="2" style="border-bottom: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">
                     <span>退费人：{{payRecordInfo.billOperate?payRecordInfo.billOperate.memberNameGuid:''}}</span>
                 </td>
                 <td colspan="2" style="border-bottom: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
                     <span>退费时间：{{payRecordInfo.billOperate?payRecordInfo.billOperate.createDate:''}}</span>
                 </td>
             </tr>
             <tr>
                 <td colspan="4" style="border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
                     <span>退费方式：{{payRecordInfo.payment?payRecordInfo.payment.payTypeName:''}}</span>
                 </td>
             </tr>
         </table>
     </div>
     <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_returnprint = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmPrintReturn">打印</el-button>
     </span>
    </el-dialog>
     <el-dialog
        title="打印"
        :visible.sync="dialogVisible_collectprint"
        width="30%">
        <div id="wrap_c" class="printBox wrap">
         <div style="font-size: 18px;text-align:center">{{payRecordInfo.billOperate ? payRecordInfo.billOperate.merchantName : ''}}收费单据</div>
         <br>
         <table>
             <tr>
                 <td colspan="2" style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">
                     <span>病历号：{{patientDetail.caseNo}}</span>
                 </td>
                 <td colspan="2" style="border-top: 1px solid #eeeeee;">
                     <span>姓名：{{patientDetail.name}}</span>
                 </td>
                 <td colspan="2" style="border-top: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
                     <span>单据编号：{{payRecordInfo.billOperate ? payRecordInfo.billOperate.billCode :''}}</span>
                 </td>
             </tr>
             <tr>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">交易类型</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">应收欠费</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">欠费折扣</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">折后欠费</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">实收</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">欠费</td>
             </tr>
             <tr>
                 <td style="border-left: 1px solid #eeeeee;">
                    <span v-if="payRecordInfo.payment ? payRecordInfo.payment.bizType === 'PAY' : ''">收费</span>
                    <span v-if="payRecordInfo.payment ? payRecordInfo.payment.bizType === 'DEBT' :''">收欠费</span>
                    <span v-if="payRecordInfo.payment ? payRecordInfo.payment.bizType === 'REFUND' :''">退款</span>
                 </td>
                 <td>{{payRecordInfo.payment && payRecordInfo.payment.receivableAmt ? payRecordInfo.payment.receivableAmt / 100 : ''}}</td>
                 <td>{{payRecordInfo.billOperate && payRecordInfo.billOperate.discountNum ? payRecordInfo.billOperate.discountNum / 100: ''}}</td>
                 <td>{{payRecordInfo.billOperate && payRecordInfo.billOperate.debtAmt ? payRecordInfo.billOperate.debtAmt / 100 : ''}}</td>
                 <td>{{payRecordInfo.billOperate && payRecordInfo.billOperate.payAmount ? payRecordInfo.billOperate.payAmount / 100 : '' }}</td>
                 <td style="border-right: 1px solid #eeeeee;">{{payRecordInfo.payment ? (subtractMath(payRecordInfo.payment.receivableAmt,payRecordInfo.billOperate.payAmount)  / 100  > 0 ? subtractMath(payRecordInfo.payment.receivableAmt,payRecordInfo.billOperate.payAmount)  / 100 : 0 ): '' }}</td>
             </tr>
             <tr>
                 <td style="border-left: 1px solid #eeeeee;border-right: 1px solid #eeeeee;" height="60" colspan="6"></td>
             </tr>
             <tr>
                 <td colspan="2" style="border-bottom: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">
                     <span>收款人：{{payRecordInfo.payment ? payRecordInfo.payment.recieverName : ''}}</span>
                 </td>
                 <td colspan="2" style="border-bottom: 1px solid #eeeeee;">
                     <span>交易时间：{{payRecordInfo.payment ? payRecordInfo.payment.createDate : ''}}</span>
                 </td>
                 <td colspan="2" style="border-bottom: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
                     <span>收款方式：{{payRecordInfo.payment ? payRecordInfo.payment.payTypeName : ''}}</span>
                 </td>
             </tr>
         </table>
     </div>
     <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_collectprint = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmPrintCollect">打印</el-button>
     </span>
    </el-dialog>
    <el-dialog
        title="作废"
        :visible.sync="dialogVisible_cancel"
        width="30%">
        <el-form :inline="true" ref="formCancelBill" label-width="100px" :model="formCancelBill" :rules="formCancelBillRules" style="width: 100%;margin: 30px 0;" class="demo-form-inline">
            <el-form-item label="备注" prop="remark">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="formCancelBill.remark"
                    style="width: 400px"
                    >
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible_cancel = false ">关闭</el-button>
            <el-button type="primary" @click="handleSubmitCancelBill">作废</el-button>
        </span>
    </el-dialog>
    <div class="sumBox">
      <span>
        实收总额：
        <i class="success">{{ paymentSumObj.payAmount ? paymentSumObj.payAmount / 100 : 0}}</i>
      </span>
      <span>
        欠费总额：
        <i class="error">{{ paymentSumObj.debtAmount ? paymentSumObj.debtAmount / 100 : 0}}</i>
      </span>
      <span>
        退款总额：
        <i class="warning">{{paymentSumObj.rtAmount ? paymentSumObj.rtAmount / 100 : 0}}</i>
      </span>
    </div>
    <el-table :data="payRecordList" style="width: 100%">
      <el-table-column prop="merchantName" label="操作诊所"></el-table-column>
      <el-table-column prop="createDate" label="交易时间"></el-table-column>
      <el-table-column label="交易类型">
        <template slot-scope="scope">
          <span v-if="scope.row.bizType === 'PAY'">收费</span>
          <span v-if="scope.row.bizType === 'DEBT'">收欠费</span>
          <span v-if="scope.row.bizType === 'REFUND'">退款</span>
        </template>
      </el-table-column>
       <el-table-column label="交易状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 'NORMAL'"><span class="indicatorB"><span></span>正常</span></span>
          <span v-if="scope.row.status === 'CANCEL'"><span class="indicatorA"><span></span>作废</span></span>
        </template>
      </el-table-column>
      <el-table-column prop="recieverName" label="收费人"></el-table-column>
      <el-table-column label="应收">
        <template slot-scope="scope">{{scope.row.receivableAmt / 100}}</template>
      </el-table-column>
      <el-table-column label="实收">
        <template slot-scope="scope">
          <span v-if="scope.row.bizType === 'REFUND'">0</span>
          <span v-else>{{scope.row.payAmount / 100}}</span>
        </template>
      </el-table-column>
      <el-table-column label="退费" >
        <template slot-scope="scope">{{scope.row.bizType === 'REFUND' ? scope.row.payAmount / 100 : 0}}</template>
      </el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="handlePayRecordInfo(scope.row)">详情</el-button>
          <el-button
            type="text"
            v-if="scope.row.bizType === 'REFUND'"
            @click="handlePrintReturn(scope.row)"
          >打印</el-button>
          <el-button
            type="text"
            v-if="scope.row.bizType === 'DEBT'"
            @click="handlePrintCollect(scope.row)"
          >打印</el-button>
          <el-button type="text" v-if="scope.row.status === 'NORMAL'" @click="handleCancelPayRecord(scope.row)">作废</el-button>
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
import {mapState } from 'vuex'
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
      default: ()=> []
    }
  },
  data() {
    return {
        dialogVisible_returnprint: false, // 退款打印
        dialogVisible_collectprint: false,  // 收欠费打印
        dialogVisible_cancel:false,
        paymentSumObj: {},
        payRecordList: [],
        payRecordInfo: {},
        currentBillRow: {},
        formCancelBill: {
          remark: ''
        },
        formCancelBillRules: {
                remark:[
                { required: true, message: '请输入备注', trigger: 'blur' },
                ]
        },
        currentPage: 1,
        limit: 10,
        total: 1,
    }
  },
  watch: {},
  computed: {},
  methods: {

    // 分页
    handlePageQuery(currentPage){
        this.currentPage = currentPage
        this.getPayRecordList()
    },

    // 打印退费
    handlePrintReturn(row) {
        this.getPayRecordInfo(row,()=>{
             this.dialogVisible_returnprint = true
        })
    },

      // 打印收欠费
    handlePrintCollect(row) {
        this.getPayRecordInfo(row,()=>{
             this.dialogVisible_collectprint = true
        })
    },

    // 作废支付记录列表
      handleCancelPayRecord(row) {
         this.dialogVisible_cancel = true
         this.currentBillRow = row
      },

    // 支付记录详情
    handlePayRecordInfo(row) {
        this.$emit('showPayRecordInfo',row)
    },


    // 确定打印退费
      handleConfirmPrintReturn() {
            Print('#wrap_b', {
                onStart: function () {
                  console.log('onStart', new Date())
                },
                onEnd: function () {
                  console.log('onEnd', new Date())
                }
            })
      },

      // 确定打印收欠费
      handleConfirmPrintCollect() {
            Print('#wrap_c', {
                onStart: function () {
                  console.log('onStart', new Date())
                },
                onEnd: function () {
                  console.log('onEnd', new Date())
                }
            })
      },

    // 提交作废支付记录
    handleSubmitCancelBill() {
            const {
                memberNoGuid,
                memberNameGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
            } = storage.get("userInfo")
            const formData = {
                code: this.currentBillRow.code,
                memberNoGuid,
                memberNameGuid,
                remark: this.formCancelBill.remark
            }
            this.$refs['formCancelBill'].validate((valid) => {
                if (valid) {
                    this.$http.post('/api/hx/bill/payment/cancel.do',{
                        ...formData
                    }).then(res=>{
                        const { result, errorMessage } =  res.data
                        if(result){
                            this.$message({
                                type: "success",
                                message: '操作成功!'
                            })
                            this.getPayRecordList()
                            this.getPaymentSum()
                            this.dialogVisible_cancel = false
                            this.currentBillRow = {}
                        }else{
                            this.$message({
                            type:'error',
                            message: errorMessage
                            })
                        }
                    })
            } else {
              console.log('error submit!!');
              return false;
            }
        })

      },

    // 支付记录详情
    getPayRecordInfo(row,callback){
            const {
                memberNoGuid,
                memberNameGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
            } = storage.get("userInfo")
            this.$http.post('/api/hx/bill/payment/detail.do',{
                merchantNo: memberNoGuid,
                code: row.code
            }).then(res=>{
                    const { result, errorMessage, returnObject } =  res.data
                    if(result){
                        this.payRecordInfo = returnObject
                        if(callback) callback()
                    }else{
                        this.$message({
                        type:'error',
                        message: errorMessage
                        })
                    }
            })
      },




    // 获取支付统计
    getPaymentSum() {
        const {
            memberNoGuid,
            memberNoMerchant,
            memberNameMerchant,
            roleEnnames,
            shopNo
        } = storage.get("userInfo")
        const { code } = this.patientDetail
        this.$http.post('/api/hx/bill/payment/sum.do',{
        merchantNo:memberNoMerchant,
        patientNo: code
        }).then(res=>{
        const { result, errorMessage, returnObject } = res.data;
        if (result) {
            this.paymentSumObj = returnObject ? returnObject : {}
        } else {
            this.$message({
                type: "error",
                message: errorMessage
            });
        }
        })
    },

    // 获取支付记录列表
    getPayRecordList() {
        const { currentPage , limit} = this
        const {
            memberNoGuid,
            memberNoMerchant,
            memberNameMerchant,
            roleEnnames,
            shopNo
        } = storage.get("userInfo")
        this.$http.post('/api/hx/bill/payment/list.do',{
            start: (currentPage - 1) * limit,
            limit: limit,
            merchantNo: memberNoMerchant,
            patientNo: this.patientDetail.code,
            billCode: ''
        }).then(res=>{
            const { result, errorMessage, returnObject } = res.data;
            if (result) {
                const { total, rows } = returnObject
                this.payRecordList = rows
                this.total = total
            } else {
                this.$message({
                    type: "error",
                    message: errorMessage
                })
            }
        })
    },
  },
  created() {},
  mounted() {
      this.getPaymentSum()
      this.getPayRecordList()
  }
};
</script>
<style lang="less" scoped>
.sumBox{
    font-size: 20px;
    padding: 20px 0 30px 0;
    span{
        margin-right: 50px;
        .success{
           color:#67C23A
        }
        .error{
            color: red
        }
        .warning{
            color:#E6A23C
        }
    }
}
.printBox{
    width: 100%;
    table{
        width: 100%;
    }
    tr td {
        padding: 10px;
        text-align: left;
        font-size: 12px;
    }
}

</style>
