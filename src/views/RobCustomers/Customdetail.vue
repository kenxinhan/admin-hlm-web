<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="$router.go(-1)">返回</el-button>
      </div>
      <el-row :gutter="10">
        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">姓名：{{detailList.name}}</el-col>
        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
          <div class="grid-content bg-purple-light"> 电话号码：{{detailList.phone}} </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
          <div class="grid-content bg-purple">
            性别：
            <span v-if="detailList.sex == 'MALE'">男</span>
            <span v-if="detailList.sex == 'FEMALE'">女</span>
            <span v-if="detailList.sex == 'UNKNOWN'">未知</span>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
          <div class="grid-content bg-purple-light"> 年龄：{{detailList.age}} </div>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="mt-15">
        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6"> 所在地区： {{detailList.addrInfo}}</el-col>
        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
          <div class="grid-content bg-purple-light"> 添加日期：{{detailList.createTime}} </div>
        </el-col>

      </el-row>
    </el-card>
    <br>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>工单信息</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <el-row :gutter="10">
        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">客户编号：{{detailList.orderNo}}</el-col>
        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
          <div class="grid-content bg-purple-light">客户类型：{{detailList.userTypeName}}</div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
          <div class="grid-content bg-purple">
            客户状态：
            <span v-if="detailList.status == 'FREEZE'">冻结中</span>
            <span v-if="detailList.status == 'CANG'">可抢</span>
            <span v-if="detailList.status == 'HASG'">已被抢</span>
          </div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
          <div class="grid-content bg-purple-light">预约到店时间：{{detailList.reserveDate}}</div>
        </el-col>
      </el-row>

      <el-row :gutter="10" class="mt-15">
        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">购买门诊：{{detailList.clinicName}}</el-col>
        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
          <div class="grid-content bg-purple-light">跟进人员：{{detailList.followName}}</div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
          <div class="grid-content bg-purple">意愿等级：{{detailList.wishLevel}}</div>
        </el-col>
        <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6">
          <div class="grid-content bg-purple-light">预约项目：{{detailList.project}}</div>
        </el-col>
      </el-row>
      <p class="mt-15">主诉：{{detailList.complaint}}</p>
      <p class="mt-15">备注：{{detailList.remark}}</p>
    </el-card>

  </div>
</template>

<script>
import moment from 'moment'
export default {
  components: {},
  props: {},
  data() {
    return {
      detailList:{},
    };
  },
  methods: {},
  created() {
  },
  mounted() {
    const { clueMemberInfo } = this.$cfg
    clueMemberInfo['reserveDate'] = moment(clueMemberInfo['reserveDate']).format('YYYY-MM-DD')
    this.detailList = clueMemberInfo
  },
};
</script>
<style lang="less" scoped>
.mt-15{
  margin-top: 15px;
}
</style>
