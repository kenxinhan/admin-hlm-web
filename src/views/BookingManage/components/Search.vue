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
              <el-form-item size="small" label="患者姓名：">
                <el-input placeholder="请输入患者姓名" v-model="patientName"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="grid-content bg-purple">
               <el-form-item  size="small" label="预约状态：">
                <el-select v-model="vistitingStatus" placeholder="请选择" @change="handleItemChange('vistitingStatus',vistitingStatus)">
                    <el-option label="全部状态" value=""></el-option>
                    <el-option label="未确认" value="UNCONFIRMED"></el-option>
                    <el-option label="治疗中" value="TREATMENT"></el-option>
                    <el-option label="取消" value="CANCEL"></el-option>
                    <el-option label="治疗完成" value="FINISHED"></el-option>
                </el-select>
               </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="grid-content bg-purple">
              <el-form-item size="small" label="预约医生: ">
                <el-select v-model="reservationDoctorNo" placeholder="请选择医生" @change="handleItemChange('reservationDoctorNo',reservationDoctorNo)" style="width:100%">
                  <el-option label="全部医生" value=""></el-option>
                  <el-option
                      v-for="item in appVuex.shop_doctor"
                      :key="item.memberNo"
                      :label="item.memberName"
                      :value="item.memberNo">
                    </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="grid-content bg-purple">
              <el-form-item size="small" label="创建人：">
                <el-input v-model="createName"  placeholder="请输入创建人"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="grid-content bg-purple">
              <el-form-item size="small" label="预约日期">
                <el-date-picker
                  v-model="times"
                  value-format="yyyy-MM-dd" 
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="handleItemChange('times',times)"
                ></el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
            <div class="grid-content bg-purple">
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
import { mapState } from "vuex";
import moment from 'moment'
export default {
  components: {},
  props: {},
  data() {
    return {
      patientName: "",
      vistitingStatus: "",
      reservationDoctorNo: "",
      createName: "",
      times: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
    };
  },
  watch: {},
  computed: {
    ...mapState({
      appVuex: state => state['appVuex']
    })
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
          patientName: this.patientName,
          vistitingStatus: this.vistitingStatus,
          createName: this.createName,
          reservationDoctorNo: this.reservationDoctorNo,
          beginDate: this.times ? this.times[0] : '',
          endDate:  this.times ? this.times[1] : ''
        };
      } else {
        this.patientName = "";
        this.vistitingStatus = "";
        this.createName= "",
        this.reservationDoctorNo = "";
        this.times = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
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