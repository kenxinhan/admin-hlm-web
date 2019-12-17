<template>
  <div>
    <el-table
        ref="multipleTable"
        :data="PayRecordList"
        tooltip-effect="dark"
        style="width: 100%">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column label="诊所" prop="billOperate.merchantName"></el-table-column>
            <el-table-column label="就诊时间" prop="billOperate.clinicTime"></el-table-column>
            <el-table-column label="医生" prop="billOperate.doctorName"></el-table-column>
            <el-table-column label="实收">
               <template slot-scope="scope">{{ scope.row.billOperate.payAmount / 100 }}</template>
            </el-table-column>
            <el-table-column label="备注" prop="billOperate.remark"></el-table-column>
    </el-table>
    <div class="mainBox">
         <div class="clearfix" v-for="(item,index) in payTypeModel" :key="index" style="margin-bottom: 10px">
            <div class="pull-left" style="width:200px;">
                支付方式:&nbsp;&nbsp; {{ payTypeList.find(items=> items.code === item.payType)? payTypeList.find(items=> items.code === item.payType).lableName : ''}}
            </div>
            <div class="pull-left" style="width:200px;">
                实付金额:&nbsp;&nbsp; {{item.yesTotalSum}}
            </div>
        </div>
        <div class="resultSum clearfix">
            <div class="pull-right" style="margin-left: 20px;width:200px;">
                实付总额：<span class="success">{{ amountPayNum }}</span>
            </div>
        </div>
    </div>
    <div class="mainBox">
            <el-form :inline="true" ref="formInlineRules" class="demo-form-inline" label-width="100px">
                <el-form-item label="收费时间" prop="payTimeStr">
                    {{payRecordInfo.payment.payTimeStr}}
                </el-form-item>
                <el-form-item label="收费人" prop="memberNoGuidCharge">
                    {{ payRecordInfo.payment.recieverName }}
                </el-form-item>
                <el-form-item label="备注" style="width: 100%">
                    {{payRecordInfo.payment.remark}}
                </el-form-item>
            </el-form>
        </div>
        <div class="bottomBtnBox">
            <div>
                <el-button @click="handleCancelCollectArrea">返回</el-button>
            </div>
        </div>
  </div>
</template>

<script>
import storage from "@/tools/local_storage.js";

export default {
  components:{},
  props:{
    payRecordInfo: {
        type: Object,
        default: {}
    },
  },
  data(){
    return {
        discountNum: 100,
        PayRecordList: [],
        checkedList:[],
        payTypeList: [],
        payTypeModel: [
            {
                payType: '',
                yesTotalSum: 0
            }
        ],
        EmployeesList: [],
    }
  },
  watch:{},
  computed:{
    amountPayNum: (_this) => {
       let amount = 0
       _this.payTypeModel.forEach(item=>{
           amount += item.yesTotalSum 
       })

       return amount
    },
  },
  methods:{

      
      // 取消收费
      handleCancelCollectArrea() {
        this.$emit('IsShowCreateBill')
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
    this.PayRecordList.push(this.payRecordInfo)
    this.payTypeModel = JSON.parse(this.payRecordInfo.payment.payRemark)
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
        font-size: 14px;
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