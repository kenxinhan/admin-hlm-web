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
            <span>欠费折扣&nbsp;&nbsp;<el-input-number v-model="discountNum" :min="1" :max="100" size="mini"></el-input-number>%</span>
            <span>总计：<i>{{ TotalDebtAmount }}</i></span>
        </div>
    </div>
    <!-- <div class="pull-right">
        <el-button>分配项目实收</el-button>
    </div> -->
    <div class="mainBox">
         <div class="clearfix" v-for="(item,index) in payTypeModel" :key="index" style="margin-bottom: 10px">
            <div class="pull-left" style="margin-right: 30px;">
                支付方式&nbsp;&nbsp;<el-select v-model="item.payType" placeholder="请选择">
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
        <div class="resultSum clearfix">
            <div class="pull-left">
                欠费：<span class="error">{{ ArrearageNum  }}</span>
            </div>
            <div class="pull-left" style="margin-left: 20px">
                找零：<span class="success">{{ keepChangeNum }}</span>
            </div>
            <div class="pull-right" style="margin-left: 20px">
                实付总额：<span class="success">{{ amountPayNum }}</span>
            </div>
        </div>
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
                    <el-select v-model="formInline.memberNoGuidCharge" placeholder="请选择">
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
                <el-button type="primary" @click="handleSaveCollectArrea('SAVE')">保存</el-button>
                <el-button type="primary" @click="handleSaveCollectArrea('DEBT')">收费</el-button>
                <el-button @click="handleCancelCollectArrea">取消</el-button>
            </div>
        </div>
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
    }
  }, 
  data(){
    return {
        discountNum: 100,
        ArrearageBillList: [],
        checkedList:[],
        payTypeList: [],
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
        EmployeesList: [],
    }
  },
  watch:{},
  computed:{
    TotalDebtAmount: (_this) => {
       let amount = 0
       _this.ArrearageBillList.forEach(item=>{
           amount += item.debtAmount
       })

       return ( amount / 100 ) * (_this.discountNum / 100)
    },

    ArrearageNum: (_this) => {
       let amount = 0
       _this.payTypeModel.forEach(item=>{
           amount += item.yesTotalSum
       })
       let num = _this.TotalDebtAmount - amount
       if(  num > 0) {
          return num
       } else {
          return 0
       }
    },

    keepChangeNum: (_this) => {
       let amount = 0
       _this.payTypeModel.forEach(item=>{
           amount += item.yesTotalSum
       })

       let num = _this.TotalDebtAmount - amount
       if(  num > 0) {
          return 0
       } else {
          return Math.abs(num)
       }
    },

    amountPayNum: (_this) => {
       let amount = 0
       _this.payTypeModel.forEach(item=>{
           amount += item.yesTotalSum
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
                item.yesTotalSum = parseInt(item.yesTotalSum)
            }
        })
　　  },
    //   handleSelectionChange(val) {
    //     this.checkedList = val
    //   },
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
      handleCancelCollectArrea() {
        this.$emit('IsShowCreateBill')
      },


      // 保存收费
      handleSaveCollectArrea(operKeyname) {
        const {
            memberNoGuid,
            memberNameGuid,
            memberNoMerchant,
            memberNameMerchant,
            roleEnnames,
            shopNo
        } = storage.get("userInfo")
        const { code, debtAmount } = this.currentBillRow
        const {memberNoGuidCharge,remark,payTimeStr } = this.formInline
        let payTypeName = this.payTypeList.filter(item=> this.payTypeModel.map(subitem=>subitem.payType).indexOf(item.code) !== -1).map(item=>item.lableName).join(',')
        if (payTypeName =='') {
          this.$message.error('请选择支付方式')
          return
        }
        this.$refs['formInlineRules'].validate((valid) => {
            if (valid) {
               this.$http.post('/api/hx/bill/debtRepay.do',{
                    optType: operKeyname,
                    billCode: code,
                    originalAmount: debtAmount,
                    reallyAmount: this.TotalDebtAmount,
                    discountNum: this.discountNum,
                    payAmount: this.amountPayNum,
                    debtAmount: this.ArrearageNum,
                    memberNoGuid,
                    memberNameGuid,
                    remark,
                    payType: this.payTypeModel.map(item=> item.payType).join(','),
                    payTypeName: payTypeName,
                    payRemark: JSON.stringify(this.payTypeModel),
                    payTimeStr: payTimeStr,
                    recieverNo: memberNoGuidCharge,
                    recieverName: this.EmployeesList.find(item=>item.memberNo === memberNoGuidCharge)['memberName']
                    }).then(res=>{
                        const { result, errorMessage, returnObject } = res.data
                        if (result) {
                            if(operKeyname === 'SAVE'){
                                this.$message({
                                    type: "success",
                                    message: '保存成功！'
                                })
                                this.$emit('IsShowCreateBill','already')
                            } else {
                                this.$message({
                                    type: "success",
                                    message: '收费成功！'
                                })
                                this.$emit('IsShowCreateBill','already')
                            }
                        } else {
                            this.$message({
                                type: "error",
                                message: errorMessage
                            });
                        }
                    })
            } else {
              console.log('error submit!!');
              return false;
            }
        })

      },

      // 账单支付类型列表
      getPayTypeList() {
          const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
          } = storage.get("userInfo")
          this.$http.post('/api/hx/projectPrice/payType/list.do',{
             start: (1 - 1) * 10000,
             limit: 10000,
             merchantNo: memberNoMerchant
          }).then(res=>{
                const { result, errorMessage, returnObject } = res.data;
                if (result) {
                    const { total, rows } = returnObject
                    this.payTypeList = rows
                } else {
                    this.$message({
                        type: "error",
                        message: errorMessage
                    });
                }
          })
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
      }
  },
  created(){},
  mounted(){
    this.ArrearageBillList.push(this.currentBillRow)
    this.getPayTypeList()
    this.getEmployeesList()
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
