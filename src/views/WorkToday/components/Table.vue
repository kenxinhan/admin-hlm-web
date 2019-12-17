<template>
  <div>
    <div class="listTitle">
        <i></i>
        <span>数据列表</span>
        <!-- <el-button
          class="fr"
          type="primary"
        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
    </div>
    <el-table :data="tableData" border class="mb10" style="text-align:center" height="600" @selection-change="handleSelectionChange">
        <el-table-column fixed="left" type="selection"></el-table-column>
        <el-table-column prop="patientName" label="患者姓名"></el-table-column>
        <el-table-column prop="reservationDate" label="预约时间">
            <template slot-scope="scope">
              <span>{{scope.row.reservationDate}}</span>
            </template>
        </el-table-column>
         <el-table-column prop="reservationDate" label="挂号时间">
            <template slot-scope="scope">
              <span>{{scope.row.registeredDate}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="reservationType" label="预约进度">
          <template slot-scope="scope">
            <span v-if="scope.row.reservationType === 'RESERVATION'">预约</span>
            <span v-if="scope.row.reservationType === 'REGISTERED'">挂号</span>
          </template>
        </el-table-column>
        <el-table-column prop="patientType" label="挂号类型">
           <template slot-scope="scope">
            <span v-if="scope.row.patientType === 'PT'">普通</span>
            <span v-if="scope.row.patientType === 'LS'">待定</span>
          </template>
        </el-table-column>
        <el-table-column prop="reservationDoctorName" label="医生"></el-table-column>
        <el-table-column prop="serviceChooses" label="预约项目" min-width="150">
          <template slot-scope="scope">
             <span v-for="(item,index) in scope.row.serviceChooses" :key="item.code">
                {{item.projectPropertyName}}<span v-if="scope.row.serviceChooses.length -1 > index">/</span>
             </span>
          </template>
        </el-table-column>
        <el-table-column prop="visitingType" label="预约类型">
           <template slot-scope="scope">
            <span v-if="scope.row.visitingType === 'NEWDIAGNOSIS'">初诊</span>
            <span v-if="scope.row.visitingType === 'REVIEW'">复诊</span>
          </template>
        </el-table-column>
        <el-table-column prop="vistitingStatus" label="就诊状态">
            <template slot-scope="scope">
              <span v-if="scope.row.vistitingStatus === 'UNCONFIRMED'"><span class="indicatorA"><span></span>未确认</span></span>
              <span v-if="scope.row.vistitingStatus === 'TREATMENT'"><span class="indicatorB"><span></span>治疗中</span></span>
              <span v-if="scope.row.vistitingStatus === 'CANCEL'"><span class="indicatorC"><span></span>取消</span></span>
              <span v-if="scope.row.vistitingStatus === 'FINISHED'"><span class="indicatorD"><span></span>治疗完成</span></span>
            </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="150"></el-table-column>

        <el-table-column label="接诊" fixed="right" v-if="this.appVuex.menulist.find( item=> item.permission === 'VisitingForAdvisory')">
          <slot :row="scope.row" slot-scope="scope" name="Advisory"></slot>
        </el-table-column>
        <el-table-column label="接诊" fixed="right" v-if=" this.appVuex.menulist.find( item=> item.permission === 'VsitingForDoctor')">
          <slot :row="scope.row" slot-scope="scope" name="Doctor"></slot>
        </el-table-column>
        <el-table-column label="收费" fixed="right">
          <slot :row="scope.row" slot-scope="scope" name="Collection"></slot>
        </el-table-column>
        <el-table-column label="咨询" fixed="right" v-if="this.appVuex.menulist.find( item=> item.permission === 'Advisory')">
          <slot :row="scope.row" slot-scope="scope" name="bb"></slot>
        </el-table-column>
        <el-table-column label="分诊" fixed="right" v-if="this.appVuex.menulist.find( item=> item.permission === 'Triage')">
          <slot :row="scope.row" slot-scope="scope" name="cc"></slot>
        </el-table-column>
        <el-table-column label="转诊" fixed="right" v-if="this.appVuex.menulist.find( item=> item.permission === 'Referral')">
          <slot :row="scope.row" slot-scope="scope" name="ff"></slot>
        </el-table-column>
        <el-table-column label="病历" fixed="right" v-if="this.appVuex.menulist.find( item=> item.permission === 'Medical')">
          <slot :row="scope.row" slot-scope="scope" name="gg"></slot>
        </el-table-column>
        <el-table-column label="复诊预约" fixed="right" v-if="this.appVuex.menulist.find( item=> item.permission === 'PatientReservation')">
          <slot :row="scope.row" slot-scope="scope" name="dd"></slot>
        </el-table-column>
        <el-table-column label="治疗完成" fixed="right" v-if="this.appVuex.menulist.find( item=> item.permission === 'Finished')">
          <slot :row="scope.row" slot-scope="scope" name="ee"></slot>
        </el-table-column>
        
      </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components:{},
  props:{
    tableData: {
      type: Array,
      default: []
    },
    tabConKeyName: {
      type: String,
      default: ''
    },
  },
  data(){
    return {
       roleEnnames: '',
    }
  },
  watch:{},
  computed:{
    ...mapState({
      appVuex: state => state["appVuex"]
    })
  },
  methods:{
    handleSelectionChange() {
      this.$emit('handleSelectionChange')
    }
  },
  created(){},
  mounted(){
  }
}
</script>
<style lang="less" scoped>

</style>