<template>
  <div class="searchForm">
    <div class="title">
      <i></i>
      <span>筛选查询</span>
    </div>
    <el-form class="clearfix">
      <div class="fSearch-f">
        <el-row :gutter="10" style="width:100%">
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="grid-content bg-purple">
              <el-form-item size="small" label="患者姓名">
                <el-input placeholder="请输入患者姓名" v-model="name"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="grid-content bg-purple">
              <el-form-item size="small" label="初诊日期">
                <el-date-picker
                  v-model="times"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="handleItemChange('times',times)"
                ></el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="grid-content bg-purple">
              <el-form-item size="small" label="患者来源">
                <el-select v-model="source1Code" @change="handleItemChange('source1Code',source1Code)" placeholder="请选择患者来源">
                  <el-option
                    label="全部"
                    value=""
                  ></el-option>
                  <el-option
                    v-for="item in appVuex.user_source"
                    :key="item.code"
                    :label="item.lableName"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="grid-content bg-purple">
              <el-form-item size="small" label="手机号码">
                <el-input placeholder="请输入手机号码" v-model="phone"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="grid-content bg-purple">
              <el-form-item size="small" label="初诊医生">
                <el-select v-model="firstMemberNo"  @change="handleItemChange('firstMemberNo',firstMemberNo)" placeholder="请选择初诊医生">
                  <el-option
                    label="全部"
                    value=""
                  ></el-option>
                  <el-option
                    v-for="item in appVuex.shop_doctor"
                    :key="item.memberNo"
                    :label="item.memberName"
                    :value="item.memberNo"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
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
import { mapState,mapActions } from "vuex";
import moment from 'moment'
import { _mmAddress } from '@/utils/mm.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      name: "",
      source1Code: "",
      phone: "",
      firstMemberNo: "",
      times: ""
    };
  },
  watch: {},
  computed: {
    ...mapState({
       appVuex: state => state["appVuex"]
    }),
  },
  methods: {
    
    // 搜索
    searchData() {
      const data = this.getOrResetSearchVal("get");
      this.$emit("searchData", data);
    },
    
    // 重置
    resetSearchData() {
      this.getOrResetSearchVal("reset");
      this.$emit("resetSearchData");
    },

    getOrResetSearchVal(type) {
      if (type === "get") {
        return {
          name: this.name,
          source1Code: this.source1Code,
          phone: this.phone,
          firstMemberNo: this.firstMemberNo,
          startTime: this.times[0],
          endTime:  this.times[1]
        };
      } else {
        this.name = "";
        this.source1Code = "";
        this.phone = "";
        this.firstMemberNo = "";
        this.times = ""
      }
    },
    
    // select搜索
    handleItemChange(key,val) {
      this[key] = val
      const data = this.getOrResetSearchVal("get");
      this.$emit("searchData", data);
    },
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