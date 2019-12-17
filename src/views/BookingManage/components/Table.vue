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
    <el-table :data="tableData" border class="mb10" style="text-align:center" height="650" @selection-change="handleSelectionChange">
        <el-table-column type="index" label="序号" width="50"> </el-table-column>
          <el-table-column prop="patientName" label="患者姓名" width="80"> </el-table-column>
          <el-table-column prop="medicalNo" label="病历号"></el-table-column>
          <el-table-column prop="mobile" label="手机号"> </el-table-column>
          <el-table-column prop="reservationDate" label="预约时间" width="160"> </el-table-column>
          <el-table-column prop="reservationDoctorName" label="预约医生"> </el-table-column>
          <el-table-column label="预约状态" prop="vistitingStatus">
            <template slot-scope="scope">
              <span v-if="scope.row.vistitingStatus === 'UNCONFIRMED'"><span class="indicatorA"><span></span>未确认</span></span>
              <span v-if="scope.row.vistitingStatus === 'TREATMENT'"><span class="indicatorB"><span></span>治疗中</span></span>
              <span v-if="scope.row.vistitingStatus === 'CANCEL'"><span class="indicatorC"><span></span>取消</span></span>
              <span v-if="scope.row.vistitingStatus === 'FINISHED'"><span class="indicatorD"><span></span>治疗完成</span></span>
            </template>
          </el-table-column>
          <el-table-column label="预约项目" width="160">
            <template slot-scope="scope">
              <span v-for="(item,index) in scope.row.serviceChooses" :key="item.code">
                {{item.projectPropertyName}}<span v-if="scope.row.serviceChooses.length -1 > index">/</span>
             </span>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" label="创建时间" width="160"> </el-table-column>
          <el-table-column prop="createName" label="创建人"> </el-table-column>
          <el-table-column prop="remark" label="备注"> </el-table-column>
          <el-table-column label="预约类型">
            <template slot-scope="scope">
              <span v-if="scope.row.reservationType == 'RESERVATION' ">预约</span>
              <span v-if="scope.row.reservationType == 'REGISTERED' ">挂号</span>
            </template>
          </el-table-column>
          <el-table-column prop="advisoryName" label="咨询师"> </el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">
              <span v-if="scope.row.patientType == 'PT' ">普通</span>
              <span v-if="scope.row.patientType == 'LS' ">待定</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240" fixed="right">
            <slot :row="scope.row" slot-scope="scope"></slot>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
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
    }
  },
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{
    handleSelectionChange() {
      this.$emit('handleSelectionChange')
    }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
</style>