<template>
  <div>
    <el-table
        ref="multipleTable"
        :data="ArrearageBillList"
        tooltip-effect="dark"
        style="width: 100%">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column label="诊所" prop="merchantName"></el-table-column>
            <el-table-column label="就诊时间" prop="clinicTime"></el-table-column>
            <el-table-column label="医生" prop="remark1"></el-table-column>
            <el-table-column label="应收">
               <template slot-scope="scope">{{ scope.row.reallyAmount / 100 }}</template>
            </el-table-column>
            <el-table-column label="实收">
               <template slot-scope="scope">{{ scope.row.payAmount / 100 }}</template>
            </el-table-column>
            <el-table-column label="欠费">
               <template slot-scope="scope">{{ scope.row.debtAmount / 100 }}</template>
            </el-table-column>
            <el-table-column label="备注" prop="remark"></el-table-column>
    </el-table>
    <div class="amountSum clearfix">
        <div class="pull-right">
            <span v-if="!editFlag">
              <span>欠费折扣&nbsp;&nbsp;<el-input-number v-model="discountNum" :min="1" :max="100" size="mini"></el-input-number>%</span>
            </span>
            <span v-if="editFlag">
              <span>欠费折扣&nbsp;&nbsp;<el-input-number disabled v-model="discountNum" :min="1" :max="100" size="mini"></el-input-number>%</span>
            </span>
            <span>总计：<i>{{ TotalDebtAmount / 100 }}</i></span>
        </div>
    </div>
    <div class="mainBox">
         <div v-if="!editFlag" class="clearfix" v-for="(item,index) in payTypeModel" :key="index" style="margin-bottom: 10px">
            <div class="pull-left" style="margin-right: 30px;">
                支付方式&nbsp;&nbsp;
                <el-select v-model="item.payType" placeholder="请选择">
                    <!-- <el-option
                    label="暂无"
                    value="">
                    </el-option> -->
                    <el-option
                    v-for="item in payTypeList"
                    :key="item.code"
                    :label="item.lableName"
                    :value="item.code">
                    </el-option>
                </el-select>
            </div>
            <div class="pull-left">
                实付金额&nbsp;&nbsp;<el-input v-model="item.yesTotalSum" @keyup.native="number"  placeholder="请输入内容" style="width: 250px"></el-input>
            </div>
            <div class="pull-left" style="margin-left: 20px" v-if="index === payTypeModel.length -1 "><el-button type="primary" icon="el-icon-plus" circle @click="handelAddPayType"></el-button></div>
            <div class="pull-left" style="margin-left: 20px" v-if="index === payTypeModel.length -1 && payTypeModel.length > 1 "><el-button type="primary" icon="el-icon-minus" circle @click="handelDeletePayType"></el-button></div>

        </div>
        <div class="resultSum clearfix"  v-if="!editFlag">
            <div class="pull-left">
                欠费：<span class="error">{{ ArrearageNum / 100 }}</span>
            </div>
            <div class="pull-left" style="margin-left: 20px">
                找零：<span class="success">{{ keepChangeNum / 100 }}</span>
            </div>
            <div class="pull-right" style="margin-left: 20px">
                实付总额：<span class="success">{{ amountPayNum / 100 }}</span>
            </div>
        </div>

        <div v-if="editFlag" class="">
          <div v-for="(item, index) in payRecordList">
            <p style="margin-bottom:20px;font-size:16px;">
              <span style="width:300px;margin-right:100px;display:inline-block;">
                支付方式： {{item.payName}}</span><span>实付金额：{{item.yesTotalSum}}
              </span>
            </p>
          </div>

          <div class="resultSum clearfix">
              <div class="pull-left">
                  欠费：<span class="error">{{ arrearageTotal }}</span>
              </div>
              <!-- <div class="pull-left" style="margin-left: 20px">
                  找零：<span class="success">{{ keepChangeNum / 100 }}</span>
              </div> -->
              <div class="pull-right" style="margin-left: 20px">
                  实付总额：<span class="success">{{ payRecordTotal }}</span>
              </div>
          </div>
        </div>

    </div>

    <div class="clearfix">
        <el-button type="primary" @click="DistributionPaid">分配项目实收</el-button>
    </div>
    <div class="mainBox">
            <el-form :inline="true" ref="formInlineRules" :model="formInline" :rules="formInlineRules" class="demo-form-inline" label-width="100px">
                <el-form-item label="收费时间" prop="payTimeStr">
                        <el-date-picker
                          v-model="formInline.payTimeStr"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择日期时间">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="收费人" prop="memberNoGuidCharge">
                    <el-select v-model="formInline.memberNoGuidCharge" placeholder="请选择" @change="handleSelectCharge">
                        <el-option
                        v-for="(item,index) in EmployeesList"
                        :key="index"
                        :label="item.memberName"
                        :value="item.memberNo">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" style="width: 100%">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        style="width: 500px;"
                        v-model="formInline.remark">
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="bottomBtnBox">
            <div>
                <el-button type="primary" @click="handleSaveCollection('SAVE')">保存</el-button>
                <el-button type="primary" @click="handleSaveCollection('DEBT')">收费</el-button>
                <el-button @click="handleCancelCollection">取消</el-button>
            </div>
        </div>
        <!-- 分配项目实收 -->
        <el-dialog
           title="分配项目实收"
           :visible.sync="dialogVisible_return"
           width="30%">

           <p style="font-size:20px;color:red;">实收可分配金额: <span style="font-size:24px">{{ amountPayNum /100 }}</span></p>
           <br>
           <el-table :data="billDetail.details" show-summary :summary-method="getSummaries">
               <el-table-column type="index" width="50"></el-table-column>
               <el-table-column prop="projectName" label="项目名称" :key="Math.random()"></el-table-column>
               <el-table-column prop="itemDiscountAmount" label="应收" :key="Math.random()">
                   <template slot-scope="scope">
                      <!-- {{(scope.row.originalAmount -scope.row.payAmount) / 100}} -->
                      {{ scope.row.debtAmount / 100 }}
                   </template>
               </el-table-column>

                <el-table-column prop="pay_amount" label="实收" :key="Math.random()">
                   <template slot-scope="scope">

                      <el-input v-model="scope.row.pay_amount" @keyup.native="number" size="mini"></el-input>
                   </template>
               </el-table-column>
               <el-table-column prop="debtAmount"  label="欠费">
                   <template slot-scope="scope">
                       <!-- <span>{{ ((scope.row.originalAmount -scope.row.payAmount) /100) - scope.row.pay_amount || 0 }}</span> -->
                       {{ (scope.row.debtAmount / 100) - scope.row.pay_amount || 0 }}
                   </template>
               </el-table-column>
           </el-table>

           <span slot="footer" class="dialog-footer">
               <el-button @click="handleCancelReturnModal">取消</el-button>
               <el-button type="primary" @click="handleSubmitApply">保存</el-button>
           </span>
         </el-dialog>
  </div>
</template>

<script>
import storage from "@/tools/local_storage.js";

export default {
  components:{},
  props:{
    currentBillRow: {
        type: Object,
        default: {}
    },
    operKey: {
        type: String,
        default: ''
    },
    payTypeList: {
      type: Array,
      default: []
    },
    billDetail: {
        type: Object,
        default: {}
    }
  },
  data(){
    return {
        discountNum: 100,
        ArrearageBillList: [],
        EmployeesList: [],
        payTypeModel: [
            {
                payType: '',
                yesTotalSum: 0
            }
        ],
        formInline: {
           payTimeStr: '',
           memberNoGuidCharge: '',
           remark: ''
        },
        formInlineRules:{
            payTimeStr:[
             { required: true, message: '请选择收费时间', trigger: 'change' },
           ],
           memberNoGuidCharge:[
             { required: true, message: '请选择收费人', trigger: 'change' },
           ]
        },
        chargeFlag: false,
        chargeName: '',
        chargeNo: '',
        editFlag: false,
        payRecordList: [],
        payRecordTotal: 0,
        arrearageTotalL: 0,
        payRecordType: [],
        payRecordName: [],
        dialogVisible_return: false,
        submitArr: []

    }
  },
  watch:{},
  computed:{

    TotalDebtAmount: (_this) => {
       let amount = 0
       _this.ArrearageBillList.forEach(item=>{
           amount = Number(_this.addMath(amount,item.debtAmount ))
       })
       let num = Number(_this.multiplyMath(amount,_this.discountNum / 100 ))
       return num
    },

    // 欠费
    ArrearageNum: (_this) => {
       let amount = 0

       _this.payTypeModel.forEach(item=>{
           amount = Number(_this.addMath(amount, item.yesTotalSum * 100 ))
       })
       let num =  Number(_this.subtractMath(_this.TotalDebtAmount,amount))

       if(  num > 0) {
          return parseInt(num)
       } else {
          return 0
       }
    },

    // 找零
    keepChangeNum: (_this) => {
       let amount = 0
       _this.payTypeModel.forEach(item=>{
           amount =  Number(_this.addMath(amount,item.yesTotalSum * 100))
       })

       let num = Number(_this.subtractMath(_this.TotalDebtAmount,amount))
       if(  num > 0) {
          return 0
       } else {
          return num
       }
    },

    // 实付金额
    amountPayNum: (_this) => {
       let amount = 0
       _this.payTypeModel.forEach(item=>{
           amount = Number(_this.addMath(amount,item.yesTotalSum * 100  ))
       })

       return amount
    },
  },
  methods:{

      // 只能输入整数
      number(){　　
        this.payTypeModel.forEach(item=>{
            let yesTotalSum = item.yesTotalSum.toString()
            if(yesTotalSum){
                item.yesTotalSum =  yesTotalSum.replace(/[^\.\d]/g,'');
                item.yesTotalSum =  yesTotalSum.replace('.','');
                item.yesTotalSum = item.yesTotalSum
            }
        })
　　  },

      // 添加收费方式
      handelAddPayType() {
           this.payTypeModel.push({
               payType: '',
               yesTotalSum: 0
           })
      },

      //  删除收费方式
      handelDeletePayType() {
           this.payTypeModel.pop()
      },

      // 取消收费
      handleCancelCollection() {
        this.$emit('hideCreateBill')
      },

      //选择收费人
      handleSelectCharge (mNo) {
        this.chargeFlag = true
        let obj = {}
        obj = this.EmployeesList.find( item=> {
          return item.memberNo === mNo
        })
        this.chargeName = obj.memberName
        this.chargeNo = mNo
      },


      // 提交/保存收费
      handleSaveCollection(operKeyname) {
        this.$refs['formInlineRules'].validate((valid) => {
            if (valid) {
              const {
                  memberNoGuid,
                  memberNameGuid,
                  memberNoMerchant,
                  memberNameMerchant,
                  roleEnnames,
                  shopNo
              } = storage.get("userInfo")
              const {debtAmount } = this.currentBillRow
              const { billOperate } = this.billDetail
              const {memberNoGuidCharge,remark,payTimeStr } = this.formInline
              let billCode = this.currentBillRow.billCode || this.currentBillRow.code

              const formData = {
                    memberNoGuid,
                    memberNameGuid,
                    remark,
                    optType: operKeyname,
                    billCode: billCode,
                    reallyAmount: parseInt(this.TotalDebtAmount),
                    discountNum: this.discountNum * 100,  //万分比
                    // originalAmount: debtAmount,
                    // payAmount: this.amountPayNum,
                    // debtAmount: this.ArrearageNum,
                    // payType: this.payTypeModel.map(item=> item.payType).join(','),
                    // payTypeName: this.payTypeList.filter(item=> this.payTypeModel.map(subitem=>subitem.payType).indexOf(item.code) !== -1).map(item=>item.lableName).join(','),
                    // payRemark: JSON.stringify(this.payTypeModel),
                    payTimeStr: payTimeStr,
                    // recieverNo: memberNoGuidCharge,
                    // recieverName: recieverName
               }

               if (!this.chargeFlag) {
                   formData.recieverName = this.formInline.memberNoGuidCharge
                   formData.recieverNo = this.billDetail.billOperate.recieverNo
               } else {
                   formData.recieverName = this.chargeName
                   formData.recieverNo = this.chargeNo
               }

               //待处理列表 进入收欠费  提交或者保存
               if(this.editFlag) {
                 formData.payAmount = parseInt(this.payRecordTotal) * 100
                 formData.debtAmount = parseInt(this.arrearageTotal) *100
                 formData.originalAmount = parseInt(this.TotalDebtAmount)
                 formData.payRemark = this.billDetail.billOperate.payRemark
                 formData.payType = this.payRecordType.join(',')
                 formData.payTypeName = this.payRecordName.join(',')
               } else {

                 //已收费列表 进入收欠款  提交或者保存
                 formData.payAmount = this.amountPayNum
                 formData.debtAmount = this.ArrearageNum
                 formData.originalAmount = debtAmount
                 formData.payRemark = JSON.stringify(this.payTypeModel)
                 formData.payType = this.payTypeModel.map(item=> item.payType).join(',')
                 formData.payTypeName =
                 this.payTypeList.filter(item=> this.payTypeModel.map(subitem=>subitem.payType).indexOf(item.code) !== -1).map(item=>item.lableName).join(',')
               }
               let details = []
               details = this.submitArr.map(item=> ({
                 projectCode: item.projectCode,
                 projectName: item.projectName,
                 payAmount: (item.pay_amount) *100,
                 reallyAmount: (item.reallyAmount - item.payAmount),
                 debtAmount: (item.reallyAmount - item.payAmount - item.pay_amount * 100)
               }))

               if (formData.payTypeName =='') {
                 this.$message.error('请选择支付方式')
                 return
               }

               if (details.length == 0) {
                 this.$message.error('请分配项目实收')
                 return
               } else {

                 let totalPaymount = 0
                 details.forEach( val => {
                   totalPaymount += val.payAmount
                 })
                 if (totalPaymount != formData.payAmount) {
                   this.$message.error('请全额分配实收金额')
                   return
                 }

               }
               // console.log(formData)
               // console.log(details)
               if ( this.operKey === 'edit' ) {
                   this.$http.post('/api/hx/bill/debtRepay/edit.do',{
                       code: billOperate.code ,
                       detailsJson:JSON.stringify(details),
                       ...formData
                    }).then(res=>{
                        const { result, errorMessage, returnObject } = res.data
                        if (result) {
                            if(operKeyname === 'SAVE'){
                                this.$message({
                                    type: "success",
                                    message: '保存成功！'
                                })
                            } else {
                                this.$message({
                                    type: "success",
                                    message: '收费成功！'
                                })
                            }
                            this.$emit('hideCreateBill')

                        } else {
                            this.$message({
                                type: "error",
                                message: errorMessage
                            });
                        }
                    })
               } else {
                    this.$http.post('/api/hx/bill/debtRepay.do',{
                      detailsJson:JSON.stringify(details),
                        ...formData
                    }).then(res=>{
                        const { result, errorMessage, returnObject } = res.data
                        if (result) {
                            if(operKeyname === 'SAVE'){
                                this.$message({
                                    type: "success",
                                    message: '保存成功！'
                                })
                            } else {
                                this.$message({
                                    type: "success",
                                    message: '收费成功！'
                                })
                            }
                            this.$emit('hideCreateBill')
                            // console.log(this.billDetail.details)
                            this.reflashPage()
                        } else {
                            this.$message({
                                type: "error",
                                message: errorMessage
                            });
                        }
                    })
               }

            } else {
              console.log('error submit!!');
              return false;
            }
        })
      },

      DistributionPaid () {
        console.log(this.billDetail)
        if (!this.editFlag && this.amountPayNum == 0) {
          this.$message.error("请先填写支付方式和实付金额")
        } else {
          this.dialogVisible_return = true
        }
      },

      handleCancelReturnModal () {
        this.dialogVisible_return = false
      },
      handleSubmitApply () {
        this.dialogVisible_return = false
      },

      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '';
            return;
          } else if (index === 1) {
            sums[index] = '总计';
            return;
          } else if (index === 2) {
            let rowSum = 0;
            data.forEach( (e)=>{
              rowSum += (e.itemNum) * (e.itemDisUnitPrice/100) - (e.payAmount/100)
            })
            sums[index] = rowSum * (this.discountNum / 100) * (this.billDetail.discountNum / 10000)  //整单折扣
          } else if (index === 4) {
            sums[index] = sums[2] - sums[3]
          } else {
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] += '';
            } else {
              sums[index] = '0';
            }
          }

        });
        // this.sub_reallyAmount = sums[2]
        // this.sub_payAmount = sums[3]
        // this.sub_debtAmount = sums[4]
        this.submitArr = data
        return sums;
      },

      // 获取所有员工列表
      getEmployeesList() {
          const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
          } = storage.get("userInfo")
          this.$http.post('/api/hx/guid/list.do',{
            shopNo,
            merchantNo: memberNoMerchant,
            roleEnname: ''
          }).then(res=>{
                const { result, errorMessage, returnObject } = res.data;
                if (result) {
                    this.EmployeesList = returnObject
                } else {
                    this.$message({
                        type: "error",
                        message: errorMessage
                    });
                }
          })
      },
      reflashPage(){
          let NewPage = '_empty' + '?time=' + new Date().getTime()/500;
          this.$router.push(NewPage);
          this.$router.go(-1);
      }
  },
  created(){},
  mounted(){
    // this.ArrearageBillList.push(this.currentBillRow)
    this.ArrearageBillList.push(this.billDetail)
    this.getEmployeesList()
    //待处理  点击欠收费
    if (this.billDetail && this.billDetail.billOperate) {
      this.editFlag = true
      this.formInline.payTimeStr = this.billDetail.billOperate.payTime
      this.formInline.memberNoGuidCharge = this.billDetail.billOperate.recieverName
      this.payRecordList = JSON.parse(this.billDetail.billOperate.payRemark)

      this.payRecordList.forEach( item => {
        this.payTypeList.forEach( list => {
          if(item.payType == list.code) {
            item.payName = list.lableName
          }
        })
        this.payRecordType.push(item.payType)
        this.payRecordName.push(item.payName)
        this.payRecordTotal += parseInt(item.yesTotalSum)
      })
      this.arrearageTotal =   parseInt(this.TotalDebtAmount)/100 - this.payRecordTotal

    }

  }
}
</script>
<style lang="less" scoped>
.amountSum{
    padding: 20px;
    border-top: 1px solid #eeeeee;
}
.amountSum{

    span{
        font-size: 18px;
        margin-right: 50px;
        display: inline-block;
        line-height: 42px;
        i{
            font-size: 28px;
            color: red;
        }
    }
}
.mainBox{
        background: #f7f7f7;
        padding: 40px;
        margin: 20px 0;
        .resultSum{
            padding: 40px 0 0 0;
            font-size: 20px;
            .error{
                color: red;
            }
            .success{
                color: #67C23A;
            }
        }
}

.bottomBtnBox{
    text-align: center;
}
</style>
