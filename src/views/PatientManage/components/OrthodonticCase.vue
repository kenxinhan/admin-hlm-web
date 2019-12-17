<template lang="html">
  <div class="">
    <el-tabs v-model="activeName" type="card" @tab-click="handleChangeTab">
      <el-tab-pane label="正畸检查" name="first">
        <OrthodonticCheck v-if="activeName == 'first'" :patientDetail="patientDetail"></OrthodonticCheck>
      </el-tab-pane>
      <el-tab-pane label="正畸计划" name="second">
        <OrthodonticPlan v-if="activeName == 'second'" :patientDetail="patientDetail"></OrthodonticPlan>
      </el-tab-pane>
      <el-tab-pane label="正畸过程" name="third">
        <OrthodonticProcess v-if="activeName == 'third'" :patientDetail="patientDetail"></OrthodonticProcess>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OrthodonticCheck from './OrthodonticCheck'
import OrthodonticPlan from './OrthodonticPlan'
import OrthodonticProcess from './OrthodonticProcess'

export default {
  components: {
    OrthodonticCheck,
    OrthodonticPlan,
    OrthodonticProcess
  },
  props:{
    patientDetail: {
        type: Object,
        default: {}
    }
  },
  data(){
    return {
      activeName: 'first',

    }
  },
  mounted() {

  },
  methods:{
    handleChangeTab(val) {
      
    },

  },

}
</script>

<style lang="less" scoped>

</style>
