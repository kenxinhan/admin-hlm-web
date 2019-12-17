<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="收费对账" name="first">
        <ChargeReconciliation v-if="activeName === 'first'"></ChargeReconciliation>
    </el-tab-pane>
    <el-tab-pane label="账单收费统计" name="second">
      <ChargeBill v-if="activeName === 'second'"></ChargeBill>
    </el-tab-pane>
    <el-tab-pane label="项目收费统计" name="third">
      <Charges v-if="activeName === 'third'"></Charges>
    </el-tab-pane>
    <el-tab-pane label="支付方式统计" name="fourth">
      <PayType v-if="activeName === 'fourth'"></PayType>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import ChargeReconciliation from './components/ChargeReconciliation.vue'
import ChargeBill from './components/ChargeBill.vue'
import Charges from './components/Charges.vue'
import PayType from './components/PayType.vue'

export default {
  components:{
    ChargeReconciliation, //收费对账
    ChargeBill,     //账单收费统计
    Charges,        //项目收费统计
    PayType         //支付方式统计
  },
  props:{},
  data() {
    return {
      activeName: 'first'
    }
  },
  watch:{},
  computed:{},
  methods:{
      handleClick(tab) {
        this.activeName = tab.name
      }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
</style>
