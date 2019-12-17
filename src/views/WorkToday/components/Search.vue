<template>
  <div class="searchForm">
    <div class="title">
      <i></i>
      <span>筛选查询</span>
    </div>
    <el-form class="clearfix">
      <div class="fSearch-f">
        <el-row :gutter="10" style="width:100%">
          <el-col :xs="12" :sm="8" :md="8" :lg="5" :xl="5">
            <div class="grid-content bg-purple">
              <el-form-item size="small" label="今日预约">
                <el-date-picker 
                v-model="searchForm.reservationDateStr" 
                type="date" 
                value-format="yyyy-MM-dd" 
                placeholder="选择日期"
                :clearable="false"
                @change="handleItemChange('reservationDateStr',searchForm.reservationDateStr)"
                ></el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="4" :xl="4">
            <div class="grid-content bg-purple-light">
              <div class="btnSrarch">
                <el-button size="small" type="primary" @click="searchData">查 询</el-button>
                <el-button size="small" type="primary" @click="resetSearchData">重 置</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  components: {},
  props: {},
  data() {
    return {
      searchForm:{
        reservationDateStr:  moment().format('YYYY-MM-DD')
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    searchData() {
      const data = this.getOrResetSearchVal("get");
      this.$emit("searchData", data);
    },
    resetSearchData() {
      const data = this.getOrResetSearchVal("reset");
      this.$emit("resetSearchData", data);
    },
    // select搜索
    handleItemChange(key,val) {
      this.searchForm[key] = val
      const data = this.getOrResetSearchVal("get");
      this.$emit("searchData", data);
    },
    getOrResetSearchVal(type) {
      if (type === "get") {
        return {
          reservationDateStr: this.searchForm.reservationDateStr,
        };
      } else {
        this.searchForm.reservationDateStr =  moment().format('YYYY-MM-DD')
        return {
          reservationDateStr:  moment().format('YYYY-MM-DD')
        }
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.btnSrarch {
  padding-top: 2px;
  margin-left: 10px;
}
</style>