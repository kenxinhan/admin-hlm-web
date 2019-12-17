<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="收费类别配置" name="first">
        <Acategory v-if="activeName === 'first'"></Acategory>
    </el-tab-pane>
    <el-tab-pane label="收费项目配置" name="second">
      <Bcategory v-if="activeName === 'second'"></Bcategory>
    </el-tab-pane>
    <el-tab-pane label="支付方式配置" name="third">
      <Ccategory v-if="activeName === 'third'"></Ccategory>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Acategory from './components/Acategory.vue'
import Bcategory from './components/Bcategory.vue'
import Ccategory from './components/Ccategory.vue'

export default {
  components:{
    Acategory,
    Bcategory,
    Ccategory
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