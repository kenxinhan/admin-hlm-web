<template>
  <div>
    <div class="topHeader clearfix">
        <div class="pull-left">
            <el-radio-group v-model="ListTypeChecked" @change="handleListTypeChecked">
              <el-radio-button label="billrecord">账单记录</el-radio-button>
              <el-radio-button label="payrecord">支付记录</el-radio-button>
            </el-radio-group>
        </div>
        <div class="pull-right">
        <el-button type="primary" icon="el-icon-plus" @click="handleCreateBill">新建账单</el-button>
        <!-- <el-button type="success" icon="el-icon-tickets">收欠费</el-button> -->
        </div>
    </div>
    <!-- 账单记录 -->
    <Billrecord
       v-if="ListTypeChecked === 'billrecord' && !isShowCreateBill && !isShowCollection && !isShowPayRecordInfo"
       :patientDetail="patientDetail"
       :payTypeList="payTypeList"
       @showCreateBill="showCreateBill"
       @hideCreateBill="hideCreateBill"
       @showCollection="showCollection"
    >
    </Billrecord>
    <!-- 支付记录 -->
    <Payrecord
       v-if="ListTypeChecked === 'payrecord' && !isShowCreateBill && !isShowCollection && !isShowPayRecordInfo"
       :patientDetail="patientDetail"
       :payTypeList="payTypeList"
       @showCreateBill="showCreateBill"
       @hideCreateBill="hideCreateBill"
       @showCollection="showCollection"
       @showPayRecordInfo="showPayRecordInfo"
    >
    </Payrecord>
    <!-- 新建账单 -->
    <CreateBill
       v-if="isShowCreateBill"
       :billDetail="billDetail"
       :payTypeList="payTypeList"
       :patientDetail="patientDetail"
       :operKey="operKey"
       ref="CreateBill"
       @hideCreateBill="hideCreateBill"
    >
    </CreateBill>
    <!-- 收费 -->
    <Collection
       v-if="isShowCollection"
       :currentBillRow="currentBillRow"
       :payTypeList="payTypeList"
       :operKey="operKey"
       :billDetail="billDetail"
       @hideCreateBill="hideCreateBill"
    >
    </Collection>
    <PayRecordInfo
      v-if="isShowPayRecordInfo"
      :payRecordInfo="payRecordInfo"
      :payTypeList="payTypeList"
      @hideCreateBill="hideCreateBill"
    >
    </PayRecordInfo>
  </div>
</template>

<script>
import storage from "@/tools/local_storage.js";
import Billrecord from './Billrecord.vue'
import CreateBill from './CreateBill.vue'
import Collection from './Collection.vue'
import Payrecord from './Payrecord.vue'
import PayRecordInfo from './PayRecordInfo.vue'

export default {
  components:{
    Billrecord,
    CreateBill,
    Collection,
    Payrecord,
    PayRecordInfo
  },
  props:{
    patientDetail: {
      type: Object,
      default: {}
    }
  },
  data(){
    return {
      operKey: '',
      billDetail: {},
      payTypeList: [],
      payRecordInfo: {},
      ListTypeChecked: 'billrecord',
      isShowCreateBill: false,
      isShowCollection:  false,
      isShowPayRecordInfo: false
    }
  },
  watch:{},
  computed:{},
  methods:{

    // 新建/修改/收费显示
    showCreateBill(row,operKey) {
       if( operKey === 'edit' ) {
          this.getBillDetail(row,false,()=>{
            this.operKey = operKey
            this.isShowCreateBill = true
          })
       } else {
          this.operKey = ''
          this.isShowCreateBill = true
       }
    },

    //新建/修改/收费隐藏
    hideCreateBill() {
       this.rows = {}
       this.operKey = ''
       this.isShowCreateBill = false
       this.isShowCollection = false
       this.isShowPayRecordInfo = false
      
    },


    // 收欠费显示
    showCollection(row,operKey,listKey) {
        this.currentBillRow = row
        this.getBillDetail(row, listKey ? false : true,()=>{
            this.operKey = operKey
            this.isShowCollection = true
        })
    },

    // 支付记录详情显示
    showPayRecordInfo(row) {
      this.getPayRecordInfo(row,()=>{
        this.isShowPayRecordInfo = true
      })
    },

    // 新建账单
    handleCreateBill() {

       this.billDetail = {}
       this.isShowCreateBill = true
       if(this.operKey == 'edit') {
        this.operKey = ''
        this.$refs.CreateBill.clearEditData()
       }
    },

    // 列表切换
    handleListTypeChecked() {
      this.hideCreateBill()
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

    // 账单详情
    getBillDetail(row,bool,callback) {
        const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
        } = storage.get("userInfo")
        this.$http.post('/api/hx/bill/detail.do',{
            merchantNo:memberNoMerchant,
            code: bool ? '' : row.code,
            billCode: bool ? row.code : row.billCode
        }).then(res=>{
            const { result, errorMessage, returnObject } =  res.data
            if(result){
                this.billDetail = returnObject
                if(callback)callback()
            }else{
                this.$message({
                    type:'error',
                    message: errorMessage
                })
            }
        })
    },


    // 账单支付类型列表
      getPayTypeList(callback) {
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

  },
  created(){},
  mounted(){
      this.getPayTypeList()
  }
}
</script>
<style lang="less" scoped>
.topHeader{
    margin: 20px 0;
}
</style>
