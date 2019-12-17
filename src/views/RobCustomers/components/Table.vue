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
    <el-table :data="tableData" border class="mb10" @selection-change="handleSelectionChange">
        <el-table-column fixed="left" type="selection"></el-table-column>
        <el-table-column prop="noorder" label="工单号"></el-table-column>
        <el-table-column label="头像" min-width="80">
          <template slot-scope="scope">
            <div>
              <img v-if="scope.row.avatar" :src="scope.row.avatar" width="30" height="30">
              <img v-if="!scope.row.avatar" src="/static/img/icon_14.png" width="30" height="30">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="客户姓名(备注)"></el-table-column>
        <el-table-column prop="wxnum" label="微信号"></el-table-column>
        <el-table-column prop="wxname" label="微信昵称"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{scope.row.sex === 0 ? '男': '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="zhusu" label="主诉" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="area" label="所在地区"></el-table-column>
        <el-table-column prop="resouce" label="客户来源"></el-table-column>
        <el-table-column prop="custype" label="客户类型"></el-table-column>
        <el-table-column prop="cusprice" label="客户单价"></el-table-column>
        <el-table-column prop="adddata" label="添加日期"></el-table-column>
        <el-table-column v-if=" tabConKeyName === 'recomcustom' || tabConKeyName === 'aleraybuycus' " prop="recommender" label="推荐人"> </el-table-column>
        <el-table-column v-if=" tabConKeyName === 'aleraybuycus' " prop="singleperson" label="下单人"></el-table-column>
        <el-table-column fixed="right" label="客户状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1" style="color:#67C23A">可抢</span>
            <span v-else style="color:red">已被抢</span>
            <!-- <span>{{scope.row.status === 0 ? '可抢': '已被抢' }}</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="buyclinic" label="购买门诊"></el-table-column>
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