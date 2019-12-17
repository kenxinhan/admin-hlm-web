<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="员工排班" name="first">
      <EmployeeSch v-if="activeName === 'first'"></EmployeeSch>
    </el-tab-pane>
    <el-tab-pane label="班次设置" name="second">
      <ClassSetting v-if="activeName === 'second'"></ClassSetting>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import moment from "moment";
import { mapState, mapActions } from "vuex";
import storage from "@/tools/local_storage.js";
import EmployeeSch from './components/EmployeeSch'
import ClassSetting from './components/ClassSetting'

export default {
  components: {
    EmployeeSch,
    ClassSetting
  },
  props: {},
  data() {
    return {
      activeName: "first",
    };
  },
  watch: {},
  computed: {
    ...mapState({
      mutations: state => state["mutations"],
      appVuex: state => state["appVuex"]
    }),
  },
  methods: {

    handleClick(tab, event) {
      this.activeName = tab.name
    }
  },
  created() {},
  mounted() {
    
  }
};
</script>
<style lang="less" scoped>

</style>