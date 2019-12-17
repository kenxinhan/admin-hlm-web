<template>
  <div>
    <div class="listTitle">
        <i></i>
        <span>数据列表</span>
        <!-- <el-button
          class="fr"
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="handleEdit(scope.$index, scope.row)"
        >
          新建预约
        </el-button> -->
    </div>

    <el-table :data="tableData" @row-dblclick="handleRowDblClick" border class="mb10" style="text-align:center" height="600" @selection-change="handleSelectionChange">
        <el-table-column fixed="left" type="selection"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="caseNo" label="病历号"></el-table-column>
        <el-table-column prop="type" label="患者类型">
          <template slot-scope="scope">
            <span>{{scope.row.type === 'PT' ? '普通': '临时' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span v-if="scope.row.sex === 'MALE'">男</span>
            <span v-if="scope.row.sex === 'FEMALE'">女</span>
            <span v-if="scope.row.sex === 'UNKNOWN'">未知</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="初诊日期"></el-table-column>
        <el-table-column prop="firstMemberName" label="初诊医生"></el-table-column>
        <el-table-column prop="source1" label="患者一级来源"></el-table-column>
        <el-table-column prop="source2" label="患者二级来源"></el-table-column>
        <el-table-column prop="source3" label="患者三级来源"></el-table-column>
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
    },
    handleRowDblClick(val){
      this.$emit('handleRowDblClick',val)
    }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="less" scoped>
</style>