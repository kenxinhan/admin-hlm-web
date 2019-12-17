<template>
  <div>
    <el-dialog
        title="打印"
        :visible.sync="dialogVisible_billprint"
        width="30%">
        <div id="wrap_a" ref="printBill" class="printBox wrap">
         <div style="font-size: 18px;text-align:center">{{billDetail.merchantName}}收费单据</div>
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
                     <span>单据编号：{{billDetail.billNo}}</span>
                 </td>
             </tr>
             <tr>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">收费项目</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">单价</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">数量</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">单位</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;">折扣%</td>
                 <td style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-bottom: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">金额</td>
             </tr>
             <tr v-for="(item,index) in billDetail.details" :key="index">
                 <td style="border-left: 1px solid #eeeeee;">{{item.projectName}}</td>
                 <td>{{item.unitPrice / 100}}</td>
                 <td>{{item.itemNum}}</td>
                 <td>{{item.projectUnit}}</td>
                 <td>{{item.itemDisUnitPrice / 100 }}</td>
                 <td style="border-right: 1px solid #eeeeee;">{{item.itemDiscountAmount / 100}}</td>
             </tr>
             <tr>
                 <td style="border-left: 1px solid #eeeeee;border-right: 1px solid #eeeeee;" height="60" colspan="6"></td>
             </tr>
             <tr>
                 <td colspan="2" style="border-top: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">
                     <span>本次费用：{{billDetail.originalAmount / 100}}</span>
                 </td>
                 <td colspan="2" style="border-top: 1px solid #eeeeee">
                     <span>整单折扣：{{billDetail.discountNum / 100}}</span>
                 </td>
                 <td colspan="2" style="border-top: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
                     <span>本次应收：{{billDetail.reallyAmount / 100}}</span>
                 </td>
             </tr>
             <tr>
                 <td colspan="2" style="border-left: 1px solid #eeeeee;">
                     <span>整单优惠：{{subtractMath(billDetail.originalAmount,billDetail.reallyAmount) / 100}}</span>
                 </td>
                 <td colspan="2">
                     <span>欠费：{{billDetail.debtAmount / 100}}</span>
                 </td>
                 <td colspan="2" style="border-right: 1px solid #eeeeee;">
                     <span>实收：{{billDetail.payAmount / 100}}</span>
                 </td>
             </tr>
             <tr>
                 <td colspan="6" style="border-bottom: 1px solid #eeeeee;border-left: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
                     <span>备注：{{billDetail.remark}}</span>
                 </td>
             </tr>
             <tr>
                 <td colspan="2" style="border-bottom: 1px solid #eeeeee;border-left: 1px solid #eeeeee;">
                     <span>收款人：{{billDetail.remark2}}</span>
                 </td>
                 <td colspan="2" style="border-bottom: 1px solid #eeeeee;">
                     <span>收款时间：{{billDetail.payTime}}</span>
                 </td>
                 <td colspan="2" style="border-bottom: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
                     <span>收款方式：{{billDetail.remark3}}</span>
                 </td>
             </tr>
         </table>
     </div>
     <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_billprint = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmPrintBill">打印</el-button>
     </span>
    </el-dialog>


    <span slot="label" style="font-size: 18px">
      <i class="el-icon-circle-check" style="margin-right: 10px"></i>已收费
    </span>
    <div style="margin: 20px 0 30px 0; text-align:center">
      <el-checkbox label="结清" value="FINISH" v-model="payStatus1" @change="SearchHasChargeyList"></el-checkbox>
      <el-checkbox
        label="欠费"
        value="ARREARAGE"
        v-model="payStatus2"
        @change="SearchHasChargeyList"
      ></el-checkbox>
      <el-checkbox label="退费" value="RT" v-model="rtStatus" @change="SearchHasChargeyList"></el-checkbox>
      <el-checkbox label="作废" value="CANCEL" v-model="status" @change="SearchHasChargeyList"></el-checkbox>
    </div>
    <el-table :data="hasChargeList" style="width: 100%">
      <el-table-column prop="merchantName" label="操作诊所"></el-table-column>
      <el-table-column prop="payTime" label="首次收费时间"></el-table-column>
      <el-table-column label="账单状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 'NORMAL'">
              <span v-if="scope.row.payStatus === 'UNPAY'"><span class="indicatorA"><span></span>待收费</span></span>
              <span v-if="scope.row.payStatus === 'ARREARAGE'"><span class="indicatorC"><span></span>未结清</span></span>
              <span v-if="scope.row.payStatus === 'FINISH'"><span class="indicatorD"><span></span>已结清</span></span>
          </span>
          <span v-if="scope.row.status === 'CANCEL'" class="indicatorA"><span></span>作废</span>
        </template>
      </el-table-column>
      <el-table-column prop="clinicTime" label="就诊时间"></el-table-column>
      <el-table-column prop="remark1" label="医生"></el-table-column>
      <el-table-column label="应收">
        <template slot-scope="scope">{{scope.row.reallyAmount / 100}}</template>
      </el-table-column>
      <el-table-column prop="address" label="实收">
        <template slot-scope="scope">{{scope.row.payAmount / 100}}</template>
      </el-table-column>
      <el-table-column prop="address" label="欠费">
        <template slot-scope="scope">{{scope.row.debtAmount / 100}}</template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作" width="250" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEditHasCharge(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="handlePrint(scope.row)">打印</el-button>
          <el-button
            size="mini"
            type="text"
            v-if="scope.row.status === 'NORMAL' && scope.row.rtStatus === 'NO' && scope.row.payAmount "
            @click="handleReturnCharge(scope.row)"
          >退费</el-button>
          <el-button
            size="mini"
            type="text"
            v-if="scope.row.payStatus === 'ARREARAGE' && scope.row.status === 'NORMAL'"
            @click="handleCollectOverdueBill(scope.row)"
          >收欠款</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            v-if="scope.row.status === 'NORMAL'"
            @click="handleCancelHasCharge(scope.row)"
          >作废</el-button> -->
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

    <!-- 退费申请 -->
     <el-dialog
        title="退费申请"
        :visible.sync="dialogVisible_return"
        width="30%">
        <br>
        <el-radio-group v-model="refundType" size="mini">
            <el-radio-button label="ALL">退整单</el-radio-button>
            <el-radio-button label="PART">退金额</el-radio-button>
        </el-radio-group>
        <br><br>
        <el-table
            :data="billProjectList"
            ref="tableCheckbox"
            >
            <el-table-column prop="projectName" label="项目名称" :key="Math.random()"></el-table-column>
            <el-table-column label="单价" v-if="refundType !== 'PART'" :key="Math.random()">
                <template slot-scope="scope">
                   {{scope.row.unitPrice / 100}}
                </template>
            </el-table-column>
            <el-table-column prop="itemNum" label="数量" v-if="refundType !== 'PART'" :key="Math.random()"></el-table-column>
            <el-table-column label="应收" :key="Math.random()">
                <template slot-scope="scope">
                   {{scope.row.itemDiscountAmount / 100}}
                </template>
            </el-table-column>
             <el-table-column label="退实收" v-if="refundType === 'PART'" :key="Math.random()">
                <template slot-scope="scope">
                   <el-input v-model="scope.row.returnReallyAmount" @keyup.native="number" placeholder="请输入内容" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="可退数量">
                <template slot-scope="scope">
                    {{subtractMath(scope.row.itemNum,scope.row.rtNum) }}
                </template>
            </el-table-column>
            <el-table-column label="需退数量">
                <template slot-scope="scope">
                    <span>{{subtractMath(scope.row.itemNum,scope.row.rtNum)}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="totalBox">
            <span>应收：{{ billDetail.reallyAmount / 100}}</span>
            <span>实收：{{ billDetail.payAmount / 100 }}</span>
            <span>退实收：{{ returnReallyAmount / 100}}</span>
            <span>退后应收：{{ backReallyAmount / 100}}</span>
            <span>退后实收：{{ backPayAmount / 100 }}</span>
        </div>
        <div class="returnInfo">
            <span>退费人: {{patientDetail.name}}</span>
            <!-- <span>退费人: {{billDetail.remark2}}</span> -->
            <span>退费总额: <i>{{ returnReallyAmount /100 }}</i></span>
        </div>
        <el-form :inline="true" ref="formReturnAmount" label-width="100px" :model="formReturnAmount" :rules="formReturnAmountRules" style="width: 100%;margin: 30px 0;" class="demo-form-inline">
            <el-form-item label="退费方式" prop="payType">
                <el-select v-model="formReturnAmount.payType" placeholder="退费方式">
                    <!-- <el-option label="暂无" value=""></el-option> -->
                    <el-option v-for="item in payTypeList" :key="item.code" :label="item.lableName" :value="item.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="退费时间"  prop="refundTimeStr">
                <el-date-picker
                    v-model="formReturnAmount.refundTimeStr"
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
                    v-model="formReturnAmount.remark">
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible_return = false ">关闭</el-button>
            <el-button type="primary" @click="handleSubmitApply">提交</el-button>
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

      <el-dialog
        title="绩效分配至"
        :visible.sync="dialogVisible_edit"
        width="30%">
        <br>
        <el-table
            :data="billProjectList"
            style="width: 100%">
            <el-table-column prop="projectName" label="项目名称"></el-table-column>
            <el-table-column prop="unitPrice" label="单价">
              <template slot-scope="scope">
                {{scope.row.unitPrice / 100}}
              </template>
            </el-table-column>
            <el-table-column prop="itemNum" label="数量"></el-table-column>
            <el-table-column prop="discountItem" label="折扣">
              <template slot-scope="scope">
                {{scope.row.discountItem / 100}}%
              </template>
            </el-table-column>
            <el-table-column label="金额">
              <template slot-scope="scope">
                {{scope.row.reallyAmount / 100}}
              </template>
            </el-table-column>
            <el-table-column label="医生">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.doctorNo" size="mini" placeholder="请选择" class="pull-right">
                        <el-option
                            v-for="(item,index) in appVuex.shop_doctor"
                            :key="index"
                            :label="item.memberName"
                            :value="item.memberNo">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="护士">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.assistantNo" size="mini" placeholder="请选择" class="pull-right">
                        <el-option
                            v-for="(item,index) in appVuex.shop_nurse"
                            :key="index"
                            :label="item.memberName"
                            :value="item.memberNo">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="咨询师">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.advisoryNo" size="mini" placeholder="请选择" class="pull-right">
                        <el-option
                            v-for="(item,index) in appVuex.shop_advisory"
                            :key="index"
                            :label="item.memberName"
                            :value="item.memberNo">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
        <div class="returnInfo">
          <span></span>
            <span>总计: <i>{{billDetail.reallyAmount / 100}}</i></span>
        </div>
        <div class="returnInfo">
            <span>整单折扣：{{billDetail.discountNum / 100}}%</span>
            <span>应付金额: <i>{{billDetail.reallyAmount / 100}}</i></span>
        </div>
        <div class="returnInfo">
            <span>欠费：{{billDetail.debtAmount / 100}}</span>
            <span>实际总额: <i>{{billDetail.payAmount / 100}}</i></span>
        </div>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible_edit = false">取 消</el-button>
            <el-button type="primary" @click="handleSaveEditAlreadyBill">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {mapState } from 'vuex'
import storage from "@/tools/local_storage.js";
// import Print from '@/tools/Print.js'

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
      dialogVisible_return: false,
      dialogVisible_cancel: false,
      dialogVisible_edit: false,
      dialogVisible_billprint: false,  // 账单打印
      hasChargeList: [],
      payStatus1: '',
      payStatus2: '',
      rtStatus: '',
      status: '',
      billDetail: {},
      billOperate: {},
      billProjectList: [],
      currentBillRow: {},
      refundType: 'ALL',
      currentPage: 1,
      limit: 10,
      total: 1,
      HasChargeSearchOptions: {
        payStatus: '',
        status:'',
        rtStatus:''
      },
      formReturnAmount:{
        payType: '',
        refundTimeStr: '',
        remark: ''
      },
      formReturnAmountRules: {
        payType:[
            { required: true, message: '请选择收费方式', trigger: 'change' },
        ],
        refundTimeStr:[
            { required: true, message: '请选择收费时间', trigger: 'change' },
        ]
      },
      formCancelBill: {
          remark: ''
      },
      formCancelBillRules: {
            remark:[
              { required: true, message: '请输入备注', trigger: 'blur' },
            ]
      },
    }
  },
  watch: {},
  computed: {
    ...mapState({
      appVuex: state => state["appVuex"]
    }),

    // 退实收
    returnReallyAmount: (_this) => {
       // 退金额
       if( _this.refundType === 'PART') {
           // 所有项目的退款总额
            let amount = 0
            _this.billProjectList.forEach(item=>{
               amount =  _this.addMath(amount, _this.multiplyMath(item.returnReallyAmount,100))
            })
           return amount
       } else {

           //退整单
           return  _this.subtractMath(_this.billDetail.payAmount,_this.billDetail.rtAmount)
       }

    },

    // 退后应收
    backReallyAmount: (_this) => {
        // 退金额
        if( _this.refundType === 'PART') {

            // 剩余实收金额
            let amount = _this.subtractMath(_this.billDetail.payAmount, _this.returnReallyAmount)

            // 如果大于应付金额，返回0，如果小于，应付金额-剩余实收金额
            if( amount >=  _this.billDetail.reallyAmount  ) {
                return 0
            } else {
                return _this.subtractMath(_this.billDetail.reallyAmount, amount)
            }

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
            let amount = 0
            _this.billProjectList.forEach(item=>{
              amount =  _this.addMath(amount,_this.multiplyMath(item.returnReallyAmount,100))
            })

            // 实收总额 > 退款总额
            if(  _this.billDetail.payAmount > amount ) {
                return _this.subtractMath(_this.billDetail.payAmount, amount)
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

      // 只能输入整数
      number(){　　
        let returnAmount = 0
        let amount = (this.billDetail.payAmount/100) - (this.billDetail.rtAmount / 100)
        this.billProjectList.forEach((item,index)=>{
            if( Number(item.returnReallyAmount) > item.itemDiscountAmount) {
                item.returnReallyAmount =  item.itemDiscountAmount
            }
            returnAmount += Number(item.returnReallyAmount)

            if( amount < returnAmount) {
                const num = Number(item.returnReallyAmount) - Number(returnAmount - amount)
                if(num >= 0 ){
                    if(num > item.itemDiscountAmount) {
                       item.returnReallyAmount = item.itemDiscountAmount
                    } else {
                       item.returnReallyAmount = num
                    }
                } else {
                    item.returnReallyAmount = 0
                }
            }

        })
　　  },

    // 分页
    handlePageQuery(currentPage) {
      this.currentPage = currentPage
      this.getHasChargeList()
    },

    // 编辑
    handleEditHasCharge(row) {
      this.getBillDetail(row,()=>{
          this.dialogVisible_edit = true
      })
    },

    // 退费
    handleReturnCharge(row) {
       this.getBillDetail(row,()=>{
          this.dialogVisible_return = true
       })
    },

    // 收欠费
    handleCollectOverdueBill(row) {
       this.$emit('showCollection',row)
    },

    // 作废
    handleCancelHasCharge(row) {
      this.dialogVisible_cancel = true
      this.currentBillRow = row
    },

    // 打印
    handlePrint(row) {
      this.getBillDetail(row,()=>{
        this.dialogVisible_billprint = true
      })
    },

    // 确定打印账单
    handleConfirmPrintBill() {
          this.$print(this.$refs.printBill)
          // Print('#wrap_a', {
          //     onStart: function () {
          //       console.log('onStart', new Date())
          //     },
          //     onEnd: function () {
          //       console.log('onEnd', new Date())
          //     }
          // })
    },

    // 搜索过滤
    SearchHasChargeyList() {
        const { payStatus1,payStatus2,rtStatus,status } = this
        if( payStatus1 && !payStatus2 ) {
            this.HasChargeSearchOptions.payStatus = 'FINISH'
        }
        if( !payStatus1 && payStatus2 ) {
            this.HasChargeSearchOptions.payStatus = 'ARREARAGE'
        }
        if( payStatus1 &&  payStatus2) {
            this.HasChargeSearchOptions.payStatus = ''
        }
        if( !payStatus1 &&  !payStatus2) {
            this.HasChargeSearchOptions.payStatus = ''
        }
        if( rtStatus ) {
           this.HasChargeSearchOptions.rtStatus = 'RT'
        } else {
           this.HasChargeSearchOptions.rtStatus = ''
        }
        if( status ) {
           this.HasChargeSearchOptions.status = 'CANCEL'
        } else {
           this.HasChargeSearchOptions.status = ''
        }
        this.getHasChargeList()
    },


    // 保存编辑已收费账单
    handleSaveEditAlreadyBill() {
        const { code } = this.billDetail
        const {
              memberNoGuid,
              memberNoMerchant,
              memberNameMerchant,
              roleEnnames,
              shopNo
        } = storage.get("userInfo")

        const detailsJson = this.billProjectList.map(item=>({
          ...item,
          doctorName: item.doctorNo ? this.appVuex.shop_doctor.find(sssitem=>sssitem.memberNo ===item.doctorNo )['memberName'] : '',
          advisoryName: item.advisoryNo ? this.appVuex.shop_advisory.find(sssitem=>sssitem.memberNo ===item.advisoryNo )['memberName'] : '',
          assistantName: item.assistantNo ?this.appVuex.shop_nurse.find(sssitem=>sssitem.memberNo ===item.assistantNo )['memberName'] : '',
        }))
        this.$http.post('/api/hx/bill/editMember.do',{
          code,
          UpdateId: memberNoGuid,
          detailsJson: JSON.stringify(detailsJson)
        }).then(res=>{
              const { result, errorMessage, returnObject } = res.data
              if (result) {
                  this.$message({
                      type: "success",
                      message: '编辑成功！'
                  })
                  this.getHasChargeList()
                  this.dialogVisible_edit = false
              } else {
                  this.$message({
                      type: "error",
                      message: errorMessage
                  });
              }
        })

    },

    // 提交作废
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
                    this.$http.post('/api/hx/bill/cancel.do',{
                        ...formData
                    }).then(res=>{
                            const { result, errorMessage } =  res.data
                            if(result){
                                this.$message({
                                    type: "success",
                                    message: '操作成功!'
                                })
                                this.getHasChargeList()
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

    // 提交退费申请
    handleSubmitApply() {
        const {
            memberNoGuid,
            memberNameGuid,
            memberNoMerchant,
            memberNameMerchant,
            roleEnnames,
            shopNo
        } = storage.get("userInfo")
        const {code,payAmount, refundCode, billOperate} = this.billDetail
        const { payType,refundTimeStr ,remark} = this.formReturnAmount
        const detailsJson = this.billProjectList.map(item=>({
            projectCode: item.projectCode,
            projectName: item.projectName,
            returnNum: this.refundType === 'PART' ? 0 : item.itemNum - item.rtNum,
            returnAmount: this.refundType === 'PART' ? item.returnReallyAmount : 0
        }))

        if (payType == '') {
          this.$message.error('请选择支付方式')
          return
        }
        this.$refs['formReturnAmount'].validate((valid) => {
            if (valid) {
                const formData = {
                    billCode: code,
                    payType,
                    payTypeName: this.payTypeList.find(item=>item.code === payType)['lableName'],
                    rtAmount: Number(this.returnReallyAmount),
                    refundGdNo: this.patientDetail.code,
                    refundGdName: this.patientDetail.name,
                    refundTimeStr,
                    refundType: this.refundType,
                    memberNoGuid,
                    memberNameGuid,
                    remark,
                    detailsJson: JSON.stringify(detailsJson)
                }

                this.$http.post('/api/hx/bill/refund/apply.do',{
                    ...formData
                }).then(res=>{
                    const { result, errorMessage, returnObject } = res.data
                    if (result) {
                        this.$message({
                            type: "success",
                            message: '申请退费成功！'
                        })
                        this.dialogVisible_return = false
                        this.billDetail = {}
                        this.billOperate = {}
                        this.billProjectList  = []
                    } else {
                        this.$message({
                            type: "error",
                            message: errorMessage
                        });
                    }
                })
                this.dialogVisible_return = false
                this.isEditWaitApproval = false
            } else {
              console.log('error submit!!');
              return false;
            }
        })

      },

    // 已收费列表
    getHasChargeList() {
        const { currentPage , limit } = this
        const { payStatus,status,rtStatus } = this.HasChargeSearchOptions
        const {
            memberNoGuid,
            memberNoMerchant,
            memberNameMerchant,
            roleEnnames,
            shopNo
        } = storage.get("userInfo")
        const { code } = this.patientDetail
        this.$http.post('/api/hx/bill/haspayList.do',{
            start: (currentPage - 1) * limit,
            limit: limit,
            merchantNo: memberNoMerchant,
            patientNo: code,
            payStatus,
            status,
            rtStatus
        }).then(res=>{
            const { result, errorMessage, returnObject } = res.data;
            if (result) {
                const { total, rows } = returnObject
                this.hasChargeList = rows
                this.total = total
            } else {
                this.$message({
                    type: "error",
                    message: errorMessage
                })
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
              billCode: row.code
          }).then(res=>{
                const { result, errorMessage, returnObject } =  res.data
                if(result){
                    this.billDetail = returnObject
                    this.billOperate = returnObject.billOperate
                    this.billProjectList =  returnObject.details.map(item=> ({
                        ...item,
                        returnReallyAmount: item.itemDiscountAmount / 100
                    }))
                    this.number()
                    if(callback)callback()
                }else{
                    this.$message({
                      type:'error',
                      message: errorMessage
                    })
                }
          })
      },
  },
  created() {},
  mounted() {
    this.getHasChargeList()
    console.log(this.billProjectList)
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
    padding: 20px 0;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    span{
        display: inline-block;
        margin-right: 100px;
        i{
            font-size: 24px;
            color: red;
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
