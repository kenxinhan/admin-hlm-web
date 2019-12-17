<template>
  <div class="RecordBox">
    <el-timeline>
      <el-timeline-item 
      placement="top" 
      v-for="(item,index) in RecordList" 
      :key="index"
      >
        <el-card>
          <h4>{{item.visitingDate}}
            <span class="alerayTag" v-if="item.visitingType === 'NEWDIAGNOSIS' ">初诊预约</span>
            <span class="goshopTag" v-if="item.visitingType === 'REVIEW' ">复诊预约</span>
          </h4>
          <p>挂号类型:
            <strong v-if="item.visitingType === 'NEWDIAGNOSIS' ">初诊</strong>
            <strong v-if="item.visitingType === 'REVIEW' ">复诊</strong>
          </p>
          <p>医生:
            <strong>{{item.registeredDoctorName}}</strong>
          </p>
          <p>项目: {{item.remark2}}</p>
          <p>备注: {{item.remark}}</p>
          <br>
          <div>
            <el-button size="mini" style="float:left" @click="handleIsCase(item)">电子病历</el-button>
            <span style="float:right">{{item.createName}} 创建于{{item.createDate}}</span>
            <div class="clearfix"></div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  components: {},
  props: {},
  data() {
    return {
      RecordList: [],
    }
  },
  watch: {},
  computed: {},
  methods: {
    ...mapActions(["ActionToggleModal"]),

    // 获取就诊记录
    getRecordList() {
      const { code } = this.$route.params
      this.$http.post('/api/hx/patient/visitrecords.do',{
        code
      }).then(res=>{
          const { result, errorMessage, returnObject } = res.data
          if( result ) {
            this.RecordList = returnObject
          }else {
            this.$message({
              type:'error',
              message: errorMessage
            })
          }
      })
    },
     
    // 电子病历
    handleIsCase(ItemCase) { 
       const { medicalNo ,code, patientNo } = ItemCase
       if(medicalNo){
         this.$emit('handleCaseDetail', medicalNo )
       } else {
         this.$emit('getCaseCode', code, patientNo )
       }
    },

  },
  created() {},
  mounted() {
    this.getRecordList()
  }
};
</script>
<style lang="less" scoped>
.RecordBox {
  margin: 30px 0;
  h4 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    span {
      margin-left: 10px;
    }
  }
  p {
    padding: 10px;
  }
}
</style>