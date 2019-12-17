<template>
  <div class="CaseBox">
    <div class="addBtn cf" v-if="activeName =='first'">
      <el-button size="large" type="success"  @click="handleCreateCase">新建病历</el-button>
    </div>
    <br><br>
    <el-tabs v-model="activeName" type="card" @tab-click="handleChangeTab">
      <el-tab-pane label="病历档案" name="first">

        <el-timeline>
          <el-timeline-item placement="top" v-for="(item,index) in CaseList" :key="index">
            <el-card>
              <h4>{{item.updateDate}}
                <span>{{item.createDate}}</span>
                <span class="alerayTag" v-if="item.visitingType === 'NEWDIAGNOSIS' ">初诊病例</span>
                <span class="goshopTag" v-if="item.visitingType === 'REVIEW' ">复诊病例</span>
                <div style="float:right">
                  <el-button size="mini" type="text" @click="handleCaseDetail(item.code)">详情</el-button>
                  <el-button size="mini" type="text" @click="handleEditCase(item.code)">编辑</el-button>
                  <el-button size="mini" type="text" @click="handleDeleteCase(item)">删除</el-button>
                </div>
              </h4>
              <el-row :gutter="10">
                <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" style="margin:5px 0;border-right:1px solid #eeeeee">
                  <p>主诉 : <strong>{{item.mainRemark}}</strong></p>
                  <p>诊断 : <strong>{{item.planDiagnosisRemark}}</strong></p>
                  <p>处置 : {{item.dmDisposalRemark}}</p>
                  <p>医嘱 : {{item.dmMedicalRemark}}</p>
                  <p>备注 : {{item.otherRemark}}</p>
                </el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" style="margin:5px 0;text-align:center">
                    <p>医生 : <strong> {{item.doctorName}}</strong></p>
                    <p>助手 : <strong>{{item.assistantName}}</strong></p>
                    <p>诊所 : <strong>{{shopName}}</strong></p>
                </el-col>
              </el-row>
              <br>
              <div>
                <span style="float:right">{{item.updateName}} 更新于{{item.updateDate}}</span>
                <div class="clearfix"></div>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-tab-pane>
      <el-tab-pane label="牙齿检查" name="second">
        <TeethCheck v-if="activeName === 'second'" ></TeethCheck>
      </el-tab-pane>
      <el-tab-pane label="牙周检查" name="third">
        <PeriodontalCheck v-if="activeName === 'third'" ></PeriodontalCheck>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
import { mapActions } from 'vuex'
import storage from '@/tools/local_storage.js'
import Modal from './Modal'
import {parseTime} from '@/utils/index'
import TeethCheck from './TeethCheck'
import PeriodontalCheck from './PeriodontalCheck'


export default {
  components: {
    Modal,
    TeethCheck,
    PeriodontalCheck
  },
  props: {
    CaseList:{
      type: Array,
      default: []
    }
  },
  data() {
    return {
      shopName: '',
      activeName: 'first',

    }
  },
  watch: {},
  computed: {},
  methods: {
    ...mapActions(["ActionToggleModal"]),

    // 新建病历
    handleCreateCase() {
      this.$emit('getNewAlreadyInfo')
    },


    handleCaseDetail(CaseCode) {
       this.$emit('handleCaseDetail', CaseCode, true )
    },

    handleEditCase(CaseCode) {
      this.$emit('handleCaseDetail',CaseCode)
    },

    /* 删除病历
    *  创建病历时间一周内能删除，超过一周不能删除
    */
    handleDeleteCase(item) {
      let NowtimeStamp = new Date().getTime()
      let creatTimeStamp = new Date(item.createDate).getTime()
      let diff = NowtimeStamp - creatTimeStamp

      if (diff < (3600 * 24 * 7 * 1000)) {
        this.$confirm('确定要删除当前病历吗?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning',
           center: true
         }).then(() => {
           this.deleteCase(item.code)
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '已取消删除'
           });
         });
      } else {
        this.$alert('当前病例已超出时限范围', '提示', {
          confirmButtonText: '确定',
          center: true,
          callback: action => {}
        });
      }

    },

    //删除病历
    deleteCase(code) {
        this.$http.post('/api/hx/medical/del.do',{code: code}).then(res=>{
          if (res.data.result) {
            this.$message.success('删除成功')
            this.$emit('getNewAlreadyInfo', true)
          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
    },

    // tab切换
    handleChangeTab(val) {
      // console.log(val)
       // if ( val.name === "third" ) {
       //    this.getCaseList()
       // }
       // if( val.name === "fourth" ){
       //   this.getConsulList()
       // }
    },

  },
  created() {},
  mounted() {
    const { shopName } = this.$cfg.userInfo || storage.get('userInfo')
    this.shopName = shopName
  }
};
</script>
<style lang="less" scoped>
.addBtn{
  float:right;
}
.cf{
  clear: both;
  content: '';
  overflow: hidden;
}
.CaseBox {
  h4 {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 20px;
    background: rgba(64, 158, 255, 0.1);
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64, 158, 255, 0.2);
    padding: 10px;
    span {
      margin-left: 10px;
    }
  }
  p {
    padding: 10px;
  }
}
</style>
