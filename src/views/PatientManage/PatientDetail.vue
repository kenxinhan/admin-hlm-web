<template>
  <div class="patientDetailBox">
    <Modal
      @closeDialog="closeDialog"
      @handleSaveOper="handleSaveOper"
      @handleModalCancel="handleModalCancel"
      :CaseDetail="CaseDetail"
      :newAlreadyInfo="newAlreadyInfo"
      :isCaseInfo="isCaseInfo"
      v-if="this.mutations.dialogFormVisible"
    ></Modal>
    <ComModal
      @handleModalConfirm="handleModalConfirm"
      @handleModalCancel="handleModalCancel"
      :patientDetail="patientDetail"
    ></ComModal>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>患者详情</span>
        <div style="float: right;">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-plus"
            @click="handleCreateAleray"
          >创建预约</el-button>
          <!-- <el-tooltip class="item" effect="dark" content="IM聊天" placement="top-start">
            <el-button size="small" type="success">
              <i class="iconfont icon-chat"></i>
            </el-button>
          </el-tooltip> -->
          <el-button
            size="small"
            @click="handleGoBack"
          >返回</el-button>
        </div>
      </div>
      <div class="patientInfoBox">
        <div class="photo">
           <img src="/hlm-web/static/img/avatar.jpg">
        </div>
        <div class="mainInfo">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
              <h2>{{patientDetail.name}}</h2>
              <p>{{patientDetail.caseNo}}</p>
              <el-tag size="mini" type="success">{{patientDetail.age}}岁</el-tag>
              <el-tag size="mini" v-if="patientDetail.sex === 'MALE'">男</el-tag>
              <el-tag size="mini" type="danger" v-if="patientDetail.sex === 'FEMALE'">女</el-tag>
              <el-tag size="mini"  v-if="patientDetail.sex === 'UNKNOWN'">未知</el-tag>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18" class="mobileStyle">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" style="margin:5px 0">初诊医生: {{patientDetail.firstMemberName}}</el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" style="margin:5px 0">责任医生: {{patientDetail.dutyMemberName}}</el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" style="margin:5px 0">患者来源: {{ patientDetail.source1}} {{patientDetail.source2 ? '/' + patientDetail.source2 : ''}} {{ patientDetail.source3 ? '/' + patientDetail.source3 : ''}} </el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" style="margin:5px 0">咨询师:{{patientDetail.consMemberName}}</el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" style="margin:5px 0">创建时间: {{patientDetail.createDate}}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="operBox">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleToogleTab">
          <el-tab-pane label="患者信息" name="first">
            <PatientInfo
              v-if="activeName2 === 'first'"
              :patientDetail="patientDetail"
              @getPatientDetail="getPatientDetail">
            </PatientInfo>
          </el-tab-pane>
          <el-tab-pane label="就诊记录" name="second">
            <Record v-if="activeName2 === 'second'" @handleCaseDetail="handleCaseDetail" @getCaseCode="getCaseCode"></Record>
          </el-tab-pane>
          <el-tab-pane label="收费" name="charge">
            <Charge v-if="activeName2 === 'charge'" :patientNo="patientNo" :patientDetail="patientDetail"></Charge>
          </el-tab-pane>
          <el-tab-pane label="电子病历" name="third">
            <Case v-if="activeName2 === 'third'" :CaseList="CaseList" @getNewAlreadyInfo="getNewAlreadyInfo" @handleCaseDetail="handleCaseDetail"></Case>
          </el-tab-pane>
          <el-tab-pane label="影像资料" name="fourth">
            <ImageLibrary v-if="activeName2 === 'fourth'" ></ImageLibrary>
          </el-tab-pane>
          <el-tab-pane label="正畸病历" name="sixth">
            <OrthodonticCase  v-if="activeName2 === 'sixth'" :patientDetail="patientDetail"></OrthodonticCase>
          </el-tab-pane>
          <el-tab-pane label="咨询记录" name="fifth">
            <Consul v-if="activeName2 === 'fifth'" :ConsulList="ConsulList"></Consul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import moment from 'moment'
import qs from 'qs'
import Modal from "./components/Modal";
import PatientInfo from "./components/PatientInfo";
import Record from "./components/Record";
import Case from "./components/Case";
import Consul from './components/Consul'
import Charge from './components/Charge/Charge'
import ComModal from "../Components/ComModal/ComModal";
import ImageLibrary from './components/ImageLibrary'
import OrthodonticCase from './components/OrthodonticCase'
import storage from '@/tools/local_storage.js'
import { setTimeout } from 'timers';

export default {
  components: {
    PatientInfo,
    Record,
    Modal,
    Case,
    Consul,
    ComModal,
    Charge,
    ImageLibrary,
    OrthodonticCase
  },
  props: {},
  data() {
    return {
      patientDetail: {},
      CaseList: [],
      ConsulList: [],
      newAlreadyInfo: {},
      isCaseInfo: false,
      patientNo: this.$route.params.code,
      CaseDetail: {
        visitingType: 'NEWDIAGNOSIS'
      },
      isEditCase: false,
      activeName2: 'first',
    };
  },
  watch: {},
  computed: {
    ...mapState({
      mutations: state => state["mutations"],
    })
  },
  methods: {
    ...mapActions(["ActionToggleModal"]),

    // 患者详情
    getPatientDetail() {
       const { code } = this.$route.params
       this.$http.post('/api/hx/patient/details.do',{
          code
       }).then(res=>{
          const { returnObject , result ,errorMessage} = res.data
          if(result){
            this.patientDetail = returnObject
            if (this.$route.query.patientServiceCode) {
              this.activeName2 = 'charge'
            }
          }else{
            this.$message({
              type:'error',
              message: errorMessage
            })
          }
       })
    },


    // 获取电子病例
    getCaseList() {
      const { code } = this.$route.params
      this.$http.post('/api/hx/medical/list.do',{
        patientNo: code
      }).then(res=>{
          const { result, errorMessage, returnObject } = res.data
          if( result ) {
            this.CaseList = returnObject
          }else {
            this.$message({
              type:'error',
              message: errorMessage
            })
          }
      })
    },

    // 获取咨询记录
    getConsulList() {
      const { code } = this.$route.params
      this.$http.post('/api/hx/patient/advisoryrecords.do',{
        code
      }).then(res=>{
          const { result, errorMessage, returnObject } = res.data
          if( result ) {
            this.ConsulList = returnObject
          }else {
            this.$message({
              type:'error',
              message: errorMessage
            })
          }
      })
    },

    // 保存操作
    handleSaveOper(formData,callback) {
        const { keyName } = this.mutations
        const { code, name } = this.patientDetail
        const { memberNoGuid , memberNameGuid } = this.$cfg.userInfo || storage.get('userInfo')
        const data = {
          patientNo: code,
          patientName: name,
          createId: memberNoGuid,
          createName: memberNameGuid,
          ...formData
        }

        console.log(data)
        // 病历操作
        if ( keyName === "createCase" ){
            if ( formData.code ) {
                data.imgs = []
                this.handelEditCase(data,callback)
            } else {
                this.handleSaveCase(data,callback)
            }
        }
    },

    // 保存病历
    handleSaveCase(data,callback) {
      const { currentCaseCode } = this
      this.$http.post('/api/hx/medical/addMedical.do',{
        patientReservationCode:currentCaseCode,
        ...data
      }).then(res=>{
          const { result , errorMessage } = res.data
          if(result){
            this.currentCaseCode = ""
            this.resetCaseDetail()
            this.getCaseList()
            this.ActionToggleModal({
                dialogFormVisible: false,
                BookingModalVisible: false
            })
             this.$message({
                type:'success',
                message: '创建病历成功!'
            })
            if(callback)callback()
          } else {
            this.$message({
                type:'error',
                message: errorMessage
            })
          }
      })
    },

    // 编辑病历
    handelEditCase(data,callback) {
      console.log(data)
      data.checks = []
      data.dms = []
      data.plans = []
      data.updateId = data.createId
      data.updateName = data.createName
       this.$http.post('/api/hx/medical/editMedical.do',data).then(res=>{
          const { result , errorMessage } = res.data
          if(result){
            this.currentCaseCode = ""
            this.resetCaseDetail()
            this.getCaseList()
            this.$message({
                type:'success',
                message: '编辑病历成功!'
            })
            this.ActionToggleModal({
                dialogFormVisible: false,
                BookingModalVisible: false
            })
            if(callback)callback()
          } else {
            this.$message({
                type:'error',
                message: errorMessage
            })
          }
       })
    },

    // 病历详情
    handleCaseDetail(CaseCode, isCaseInfo) {
        const { code } = this.patientDetail
        this.$http.post('/api/hx/medical/findMedicalByCode.do',{
          code: CaseCode,
          patientNo: code
        }).then(res=>{
            const { result , errorMessage, returnObject } = res.data
            if(result){
              this.CaseDetail = returnObject
              if (isCaseInfo) {
                this.isCaseInfo = isCaseInfo
                this.ActionToggleModal({
                  modalTitle: '病历详情',
                  keyName: 'createCase',
                  dialogFormVisible: true
                })
              } else {
                this.ActionToggleModal({
                  modalTitle: '编辑病历',
                  keyName: 'createCase',
                  dialogFormVisible: true,
                  type: 1,
                })
              }
            } else {
              this.$message({
                type:'error',
                message: errorMessage
              })
            }
        })
    },

    // 新增咨询
    addConsul(formData,callback) {
        const { code, name } = this.patientDetail
        const { memberNoGuid } = this.$cfg.userInfo || storage.get("userInfo");
        formData['projectCodes'] = formData['projectCodes'].join(",")
        formData['projectNames'] = formData['projectNames'].join(",")
        this.$http.post('/api/hx/advisory/addAdvisory.do',{
          patientNo: code,
          patientName: name,
          createId: memberNoGuid,
          ...formData
        }).then(res=>{
            const { result , errorMessage, returnObject } = res.data
            if(result){
              this.ActionToggleModal({
                  dialogFormVisible: false,
                  BookingModalVisible: false
              })
              this.getConsulList()
              if(callback) callback()
            } else {
              this.$message({
                  type:'error',
                  message: errorMessage
              })
            }
        })
    },

    // 创建预约
    createBooking(formData,callback) {
        const { memberNoGuid,memberNameGuid ,shopNo,shopName } = this.$cfg.userInfo || storage.get('userInfo')
        const { code, name, phone,caseNo ,merchantNo, merchantName } = this.patientDetail
        formData['reservationDateLen'] = parseInt(formData['reservationDateLen'])
        formData['serviceChoosesJson'] = JSON.stringify(formData['serviceChoosesJson'])
        this.$http.post('/api/hx/ps/addPatientReservation.do',{
           patientNo:code,
           patientName:name,
           mobile:phone,
           medicalNo:caseNo,
           shopNo,
           shopName,
           merchantNo,
           merchantName,
           createId: memberNoGuid,
           createName: memberNameGuid,
           ...formData
        }).then(res=>{
            const { result , errorMessage, returnObject } = res.data
            if(result){
              this.ActionToggleModal({
                  dialogFormVisible: false,
                  BookingModalVisible: false
              })
              this.$message({
                type:'success',
                message: '创建预约成功!'
              })
              if(callback) callback()
            } else {
              this.$message({
                  type:'error',
                  message: errorMessage
              })
            }
        })
    },

    // 弹出创建预约
    handleCreateAleray() {
      this.ActionToggleModal({
        center: false,
        modalTitle: "创建预约",
        keyName: "CreateAndEditBooking",
        BookingModalVisible: true
      });
    },

    // 重置病历详情
    resetCaseDetail() {
       this.CaseDetail = {
         doctorNo: "",
          assistantNo: "",
          visitingDate: "",
          visitingType: "NEWDIAGNOSIS",
          mainRemark: ""
       }
    },

    // 公共保存
    handleModalConfirm(formData,callback){
      const { keyName } = this.mutations
      if ( keyName ==="createConsul") {
        this.addConsul(formData,callback)
      }
      if( keyName === "CreateAndEditBooking" ){
        this.createBooking(formData,callback)
      }
    },

    // 获取患者最新预约信息
    getNewAlreadyInfo(flag) {
      if (flag) {
        this.getCaseList()
      } else {
        const { code } = this.patientDetail
        this.getPaitentNewAlreadyRecord(code,(newAlreadyInfo)=>{
          this.newAlreadyInfo = newAlreadyInfo
          this.ActionToggleModal({
            modalTitle: '新建病历',
            keyName: 'createCase',
            dialogFormVisible: true
          })
        })
      }
    },

    // 获取病历code和患者最新预约信息
    getCaseCode(code,patientNo ){
      this.getPaitentNewAlreadyRecord(patientNo,(newAlreadyInfo)=>{
        this.newAlreadyInfo = newAlreadyInfo
        this.currentCaseCode = code
        this.ActionToggleModal({
          modalTitle: '新建病历',
          keyName: 'createCase',
          dialogFormVisible: true
        })
      })
    },


    // 获取患者最新预约记录
    getPaitentNewAlreadyRecord(patientNo,callback) {
       const { memberNoGuid , memberNameGuid , shopNo,memberNoMerchant} = this.$cfg.userInfo || storage.get('userInfo')
       this.$http.post('/api/hx/ps/infoByUpToDate.do',{
          merchantNo: memberNoMerchant,
          patientNo
       }).then(res=>{
          const { result, errorMessage, returnObject } =  res.data
          if(result){
            if(callback) callback(returnObject)
          }else{
            this.$message({
              type:'error',
              message: errorMessage
            })
          }
       })
    },

    // tab切换
    handleToogleTab(val) {
       if ( val.name === "third" ) {
          this.getCaseList()
       }
       if( val.name === "fifth" ){
         this.getConsulList()
       }
       if( val.name === "sixth" ){

       }
    },

    //关闭dialog
    closeDialog () {
      this.isCaseInfo = false
    },

    // 点击取消
    handleModalCancel() {
      this.resetCaseDetail()
      this.ActionToggleModal({
        dialogFormVisible: false,
        BookingModalVisible: false
      });
      this.newAlreadyInfo={}
      this.isCaseInfo = false
    },

    // 返回
    handleGoBack() {
       this.$router.go(-1)
    }

  },
  created() {},
  mounted() {
    this.getPatientDetail()

  }
};
</script>
<style lang="less" scoped>
.patientDetailBox {
  .iconfont {
    font-size: 12px;
  }
  .patientInfoBox {
    width: 100%;
    height: 100px;
    position: relative;
    display: table;
    margin-bottom: 30px;
    h2 {
      font-size: 18px;
      font-weight: bold;
    }
    p {
      margin: 10px 0;
    }
    .mainInfo {
      width: 100%;
      padding-left: 150px;
      display: table-cell;
      vertical-align: middle;
    }
    .photo {
      width: 100px;
      height: 120px;
      position: absolute;
      left: 0;
      top: 0;
      img {
        width: 100px;
        height: 120px;
      }
    }
  }

  .operBox {
    padding: 30px 0;
  }
}

@media screen and (max-width: 992px) {
  .patientDetailBox {
    .patientInfoBox {
      width: auto;
      height: auto;
      .mobileStyle {
        margin-top: 30px;
      }
    }
  }
}
</style>
