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
              <el-form-item size="small" label="主诉">
                <el-input placeholder="请输入主诉" v-model="zhusu"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="5" :xl="5">
            <div class="grid-content bg-purple-light">
              <el-form-item size="small" label="客户状态">
                <el-select v-model="status" placeholder="请选择客户状态" clearable>
                  <el-option label="英语" value="en"></el-option>
                  <el-option label="简体" value="zh_CN"></el-option>
                  <el-option label="繁体" value="zh_TW"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="5" :xl="5">
            <div class="grid-content bg-purple">
              <el-form-item size="small" label="地区">
                <el-input placeholder="请输入地区" v-model="area"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="5" :xl="5">
            <div class="grid-content bg-purple-light">
              <el-form-item size="small" label="客户类型">
                <el-input placeholder="请输入客户类型" v-model="custype"></el-input>
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
export default {
  components: {},
  props: {},
  data() {
    return {
      zhusu: "",
      status: "",
      area: "",
      custype: ""
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
      this.getOrResetSearchVal("reset");
      this.$emit("resetSearchData");
    },
    getOrResetSearchVal(type) {
      if (type === "get") {
        return {
          zhusu: this.zhusu,
          status: this.status,
          area: this.area,
          custype: this.custype
        };
      } else {
        this.zhusu = "";
        this.status = "";
        this.area = "";
        this.custype = "";
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