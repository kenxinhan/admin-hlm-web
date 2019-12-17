<template>
  <div>
    <Modal
    @handleModalConfirm="handleModalConfirm"
    @handleModalCancel="handleModalCancel"
    :patientDetail="patientDetail"
    :scopeItem="scopeItem"
    :CaseDetail="CaseDetail"
    :newAlreadyInfo="newAlreadyInfo"
    v-if="isLoadModal"
    ></Modal>
    <ComModal
      @handleModalConfirm="handleModalConfirm"
      @handleModalCancel="handleModalCancel"
      :patientDetail="patientDetail"
      :consulDetail="consulDetail"
      v-if="isLoadComModal"
    ></ComModal>

      <el-dialog
        title="审核"
        :visible.sync="dialogVisible_approve"
        width="30%">

        <br>
        退款类型 : <span v-if="billOperate ? billOperate.refundType ==='ALL' : ''">退整单</span><span v-if="billOperate? billOperate.refundType ==='PART' : ''">退金额</span>
        <br><br>
        <el-table
            :data="billProjectList"
            ref="tableCheckbox"
            >
            <el-table-column prop="projectName" label="项目名称" :key="Math.random()"></el-table-column>
            <el-table-column label="单价" :key="Math.random()">
                <template slot-scope="scope">
                   {{scope.row.unitPrice / 100}}
                </template>
            </el-table-column>
            <el-table-column prop="itemNum" label="数量" :key="Math.random()"></el-table-column>
            <el-table-column label="应收" :key="Math.random()">
                <template slot-scope="scope">
                   {{scope.row.itemDiscountAmount / 100}}
                </template>
            </el-table-column>
            <span v-if="billOperate.refundType ==='PART'">
              <el-table-column label="退实收" :key="Math.random()">
                 <template slot-scope="scope">
                     {{scope.row.currentRtAmount}}
                 </template>
              </el-table-column>
            </span>
            <el-table-column label="可退数量">
                <template slot-scope="scope">
                    {{scope.row.itemNum - scope.row.rtNum}}
                </template>
            </el-table-column>
            <el-table-column label="需退数量">
                <template slot-scope="scope">
                    <span>{{scope.row.currentRtNum}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="totalBox">
            <span>应收：{{billDetail.reallyAmount / 100}}</span>
            <span>实收：{{billDetail.payAmount / 100 }}</span>
            <span>退实收：{{ returnReallyAmount / 100}}</span>
            <span>退后应收：{{backReallyAmount / 100}}</span>
            <span>退后实收：{{backPayAmount / 100}}</span>
        </div>
        <div class="returnInfo">
            <span>退费人: {{billOperate.recieverName}}</span>
            <!-- <span>退费人: {{billDetail.remark2}}</span> -->
            <span>退费总额: <i>{{returnReallyAmount /100 }}</i></span>
        </div>
        <el-form :inline="true" ref="formReturnAmount" label-width="100px" style="width: 100%;margin: 30px 0 0 0;" class="demo-form-inline">
            <el-form-item label="退费方式">
                 {{billOperate.payTypeName}}
            </el-form-item>
            <el-form-item label="退费时间">
                {{billOperate.payTime}}
            </el-form-item>
        </el-form>
        <div style="padding: 0 30px 30px 30px">
          备注<br><br>
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="remark">
        </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleOperApprove('PASS')">通过</el-button>
          <el-button type="danger"  @click="handleOperApprove('UNPASS')">拒绝</el-button>
          <el-button @click="dialogVisible_approve = false">关闭</el-button>
        </span>
      </el-dialog>

      <el-tabs tab-position="left"  v-model="activeName" @tab-click="handleClickTab">
        <el-tab-pane label="今日工作" name="worktoday">
              <Search @searchData="searchData" @resetSearchData="resetSearchData"></Search>
              <Table :tableData="tableData" tabConKeyName="customcues">

                <!-- 咨询师接诊 -->
                <template slot-scope="scope" slot="Advisory">
                    <el-button v-if=" scope.row.visitingAdvisoryDate ? true : false " type="success" size="mini" icon="el-icon-check" circle></el-button>
                    <el-button v-if=" !scope.row.visitingAdvisoryDate ? true : false " type="primary" size="mini" icon="el-icon-plus" @click="handleClinicReceipt(scope.row)" circle></el-button>
                </template>
                <!-- 咨询师接诊 -->

                <!-- 医生接诊 -->
                <template slot-scope="scope" slot="Doctor">
                    <el-button v-if=" scope.row.visitingDate ? true : false " type="success" size="mini" icon="el-icon-check" circle></el-button>
                    <el-button v-if=" !scope.row.visitingDate ? true : false " type="primary" size="mini" icon="el-icon-plus" @click="handleClinicReceipt(scope.row)" circle></el-button>
                </template>
                <!-- 医生接诊 -->

                <!-- 收费 -->
                <template slot-scope="scope" slot="Collection">
                    <el-button v-if=" scope.row.remark4 ? true : false " type="success" size="mini" icon="el-icon-check" circle  @click="handleCollection(scope.row)"></el-button>
                    <el-button v-if=" !scope.row.remark4 ? true : false " type="primary" size="mini" icon="el-icon-plus" @click="handleCollection(scope.row)" circle></el-button>
                </template>
                <!-- 收费 -->


                <!-- 咨询 -->
                <template slot-scope="scope" slot="bb">
                  <el-button v-if="scope.row.advisoryDate" type="info" size="mini" icon="el-icon-edit" @click="handleEditConsul(scope.row)" circle></el-button>
                  <el-button v-if="!scope.row.advisoryDate" type="primary" size="mini" icon="el-icon-plus" @click="handleCreateConsul(scope.row)" circle></el-button>
                </template>
                <!-- 咨询 -->

                <!-- 分诊 -->
                <template slot-scope="scope" slot="cc">
                  <el-button :disabled=" scope.row.visitingDate ? true : false" type="primary" size="mini" icon="el-icon-plus" @click="handleTriage(scope.row)" circle></el-button>
                </template>
                <!-- 分诊 -->


                <!-- 转诊 -->
                <template slot-scope="scope" slot="ff">
                  <el-button :disabled="scope.row.vistitingStatus === 'FINISHED'" type="primary" size="mini" icon="el-icon-plus" @click="handleTransfer(scope.row)" circle></el-button>
                </template>
                <!-- 转诊 -->

                <!-- 病历 -->
                <template slot-scope="scope" slot="gg">
                  <el-button v-if="scope.row.medicalDate" type="info" size="mini" icon="el-icon-edit" @click="handleEditCase(scope.row)" circle></el-button>
                  <el-button v-if="!scope.row.medicalDate" type="primary" size="mini" icon="el-icon-plus" @click="handleAddCase(scope.row)" circle></el-button>
                </template>
                <!-- 病历 -->

                <!-- 复诊预约 -->
                <template slot-scope="scope" slot="dd">
                  <el-button v-if="scope.row.reviewReservationDate" type="success" size="mini" icon="el-icon-check" circle></el-button>
                  <el-button v-if="!scope.row.reviewReservationDate" type="primary" size="mini" icon="el-icon-plus" @click="handleFollowUp(scope.row)" circle></el-button>
                </template>
                <!-- 复诊预约 -->

                <!-- 治疗完成 -->
                <template slot-scope="scope" slot="ee">
                  <el-button v-if="scope.row.finishedDate" type="success" size="mini" icon="el-icon-check" circle></el-button>
                  <el-button v-if="!scope.row.finishedDate" :disabled="scope.row.vistitingStatus !== 'TREATMENT' && !scope.row.visitingDate" type="primary" size="mini" icon="el-icon-plus" circle @click="handleTreaSuccess(scope.row)"></el-button>
                </template>
                <!-- 治疗完成 -->

              </Table>
              <Pagination
                @handlePageQuery="handlePageQuery"
                :currentPage="currentPage"
                :pageSize="limit"
                :total="total"
              ></Pagination>
        </el-tab-pane>
        <el-tab-pane label="费用审批" name="chargeapprove" v-if="this.appVuex.menulist.find( item=> item.permission === 'HlmBillCheck')">
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
                          <el-form-item size="small" label="初诊日期">
                            <el-date-picker
                              v-model="chargeApproveForm.times"
                              type="daterange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              @change="handleSearchItemChange"
                            ></el-date-picker>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
                        <div class="grid-content bg-purple">
                          <el-form-item size="small" label="患者来源">
                            <el-select v-model="chargeApproveForm.checkStatus" @change="handleSearchItemChange" placeholder="请选择患者来源">
                              <el-option label="全部" value=""></el-option>
                              <el-option label="待审核" value="UNCHECK"></el-option>
                              <el-option label="已批准" value="PASS"></el-option>
                              <el-option label="已拒绝" value="UNPASS"></el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :xs="24" :sm="8" :md="8" :lg="6" :xl="4">
                        <div class="grid-content bg-purple-light">
                          <div class="btnSrarch">
                            <el-button size="small" type="primary" @click="searchChargeApprove">查 询</el-button>
                            <el-button size="small" type="primary" @click="resetChargeApprove">重 置</el-button>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-form>
              </div>
              <div class="listTitle">
                    <i></i>
                    <span>数据列表</span>
                    <!-- <el-button
                      class="fr"
                      type="primary"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                </div>
                <el-table :data="chargeApproveList" style="width: 100%">
                  <el-table-column prop="applyTime" label="申请日期"></el-table-column>
                  <el-table-column prop="memberNameGuid" label="申请人"></el-table-column>
                  <el-table-column label="申请类型">
                    <template slot-scope="scope">
                      <span v-if="scope.row.operateType === 'PAY'">收费</span>
                      <span v-if="scope.row.operateType === 'DEBT'">收欠费</span>
                      <span v-if="scope.row.operateType === 'REFUND'">退款</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="退费金额">
                    <template slot-scope="scope">
                          {{scope.row.payAmount / 100}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="merchantName" label="诊所"></el-table-column>
                  <el-table-column prop="applyTime" label="状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.checkStatus === 'UNPASS'"><span class="indicatorA"><span></span>已拒绝</span></span>
                      <span v-if="scope.row.checkStatus === 'UNCHECK'"><span class="indicatorB"><span></span>待审核</span></span>
                      <span v-if="scope.row.checkStatus === 'PASS'"><span class="indicatorD"><span></span>已批准</span></span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="checkTime" label="审批时间"></el-table-column>
                  <el-table-column prop="checkerNameGuid" label="审批人"></el-table-column>
                  <el-table-column prop="remark" label="备注"></el-table-column>
                  <el-table-column prop="address" label="操作">
                    <template slot-scope="scope" v-if="scope.row.checkStatus ==='UNCHECK'">
                      <el-button type="warning" size="small" @click="handleApproveCharge(scope.row)">审批</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <br>
                <el-pagination
                  @current-change="handlePageQueryApprove"
                  :current-page="approvePagination.currentPage"
                  :page-size="approvePagination.pageSize"
                  background
                  layout="total, prev, pager, next"
                  :total="approvePagination.total"
                ></el-pagination>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import moment from 'moment'
import Search from "./components/Search";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import ComModal from "../Components/ComModal/ComModal";
import storage from '@/tools/local_storage.js'

export default {
  components: {
    Search,
    Table,
    Pagination,
    Modal,
    ComModal
  },
  props: {},
  data() {
    return {
      patientReservationCode: '',
      reservationDateStr: moment().format('YYYY-MM-DD'),
      patientDetail:{},
      consulDetail:{},
      scopeItem: {},
      newAlreadyInfo: {},
      roleEnnames: '',
      chargeApproveList: [],
      activeName: 'worktoday',
      remark:'',
      CaseDetail:{
        visitingType: 'NEWDIAGNOSIS'
      },
      chargeApproveForm: {
        times: '',
        checkStatus: ''
      },
      isLoadComModal: false,
      dialogVisible_approve: false,
      currentChargeItem: {},
      isLoadModal:false,
      billDetail: {},
      billOperate: {},
      billProjectList: [],
      tableData: [], // 表格数据
      currentPage: 1, // 当前页码
      limit: 10, // 每页条数
      total: 1,  // 总条数
      approvePagination: {
        currentPage: 1, // 当前页码
        limit: 10, // 每页条数
        total: 1,  // 总条数
      }
    };
  },
  watch: {},
  computed: {
    ...mapState({
      mutations: state => state["mutations"],
      appVuex: state => state["appVuex"]
    }),
    // 退实收
    returnReallyAmount: (_this) => {
       // 退金额
       if( _this.refundType === 'PART') {
          return _this.billOperate.payAmount
       } else {
          //退整单
          return  _this.billDetail.payAmount
       }
    },

    // 退后应收
    backReallyAmount: (_this) => {
        // 退金额
        if( _this.refundType === 'PART') {

            // 剩余实收金额
            let amount = _this.subtractMath(_this.billDetail.payAmount,_this.returnReallyAmount)

            // 如果大于应付金额，返回0，如果小于，应付金额-剩余实收金额
            if( amount >= Number(_this.billDetail.reallyAmount ) ) {
                return 0
            } else {
                return _this.subtractMath(_this.billDetail.reallyAmount,amount)
            }

        } else {
           // 退整单
           return _this.billDetail.reallyAmount
        }

    },

    // 退后实收
    backPayAmount: (_this) => {

       // 退金额
       if( _this.refundType === 'PART') {
            // 所有项目的退款总额
            let amount = _this.subtractMath(_this.billDetail.payAmount,_this.billOperate.payAmount)

            // 实收总额 > 退款总额
            if(  amount > 0) {
                return amount
            } else {
                return 0
            }
       } else {

          // 退整单
          return 0
       }
    }
  },
  methods: {
    ...mapActions(["ActionToggleModal"]),

    // tab切换
    handleClickTab(tab){
      if(tab.name === 'worktoday') {
        this.initData()
      } else {
        this.getApproveList()
      }
    },

    // 选择查询
    handleSearchItemChange() {
      this.getApproveList()
    },

    // 搜索查询审批列表
    searchChargeApprove() {
      this.getApproveList()
    },

    // 重置查询审批列表
    resetChargeApprove() {
      this.chargeApproveForm.times = []
      this.chargeApproveForm.checkStatus = ''
      this.getApproveList()
    },

    // 审批列表分页
    handlePageQueryApprove(currentPage) {
      this.approvePagination.currentPage = currentPage
      this.getApproveList()
    },

    // 弹出审批
    handleApproveCharge(row) {
      this.getBillDetail(row,false,()=>{
         this.currentChargeItem = row
         this.dialogVisible_approve = true
      })
    },

    // 账单详情
    getBillDetail(row,bool,callback) {
        const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
        } = storage.get("userInfo")
        this.$http.post('/api/hx/bill/detail.do',{
            merchantNo:memberNoMerchant,
            code: bool ? '' : row.code,
            billCode: bool ? row.code : row.billCode
        }).then(res=>{
            const { result, errorMessage, returnObject } =  res.data
            if(result){
                this.billDetail = returnObject
                this.billProjectList = returnObject.details
                this.billOperate = returnObject.billOperate
                this.refundType = returnObject.billOperate.refundType
                if(callback)callback()
            }else{
                this.$message({
                    type:'error',
                    message: errorMessage
                })
            }
        })
    },

    // 审批操作
    handleOperApprove(checkStatus) {
       const {code,checkerNoGuid,checkerNameGuid } = this.currentChargeItem
       const { memberNoGuid, memberNameGuid,memberNoMerchant , roleEnnames} = this.$cfg.userInfo || storage.get('userInfo')
       this.$http.post('/api/hx/bill/check.do',{
          code,
          remark: this.remark,
          checkStatus,
          checkerNoGuid: memberNoGuid,
          checkerNameGuid: memberNameGuid
       }).then(res=>{
          const { result, errorMessage } =  res.data
          if(result){
            this.$message({
              type:'success',
              message: '操作成功！'
            })
            this.getApproveList()
            this.dialogVisible_approve = false
          }else{
            this.$message({
              type:'error',
              message: errorMessage
            })
          }
       })
    },

    // 获取审批列表
    getApproveList() {
        const { currentPage, limit} = this.approvePagination
        const { times ,  checkStatus }  = this.chargeApproveForm
        const { memberNoGuid, memberNoMerchant , roleEnnames} = this.$cfg.userInfo || storage.get('userInfo')
        this.$http.post('/api/hx/bill/checkList.do',{
          start: (currentPage - 1) * limit,
          limit,
          merchantNo:memberNoMerchant,
          startDateStr: times[0],
          endDateStr: times[1],
          checkStatus
        }).then(res=>{
          const { result, errorMessage } =  res.data
          if(result){
            const { total, rows }  = res.data.returnObject
            this.approvePagination.total = total
            this.chargeApproveList = rows
          }else{
            this.$message({
              type:'error',
              message: errorMessage
            })
          }
        })
    },

    // 初始化数据
    initData(formData) {
       const { memberNoGuid, memberNoMerchant , roleEnnames} = this.$cfg.userInfo || storage.get('userInfo')
       const { currentPage, limit , reservationDateStr} = this
       this.$http.post('/api/hx/ps/findWorkTodayPage.do',{
           start: (currentPage - 1) * limit,
           limit,
           merchantNo:memberNoMerchant,
           updateId: memberNoGuid,
           reservationDateStr,
           ...formData
       }).then(res=>{
          const { result, errorMessage } =  res.data
          if(result){
            const { total, rows }  = res.data.returnObject
            this.total = total
            this.tableData = rows
          }else{
            this.$message({
              type:'error',
              message: errorMessage
            })
          }
       })
    },

    // 接诊
    handleClinicReceipt(scope) {
        const { code,patientName } = scope
        const { menulist } = this.appVuex
        const { memberNoGuid, memberNameGuid , roleEnnames} = this.$cfg.userInfo || storage.get('userInfo')
        const VisitingForAdvisory = menulist.find(item=>item.permission === 'VisitingForAdvisory')
        const VsitingForDoctor = menulist.find(item=>item.permission === 'VsitingForDoctor')
        this.$confirm('接诊患者'+ patientName +', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // 咨询师接诊
          if ( VisitingForAdvisory )  {
              this.$http.post('/api/hx/ps/visitingForAdvisory.do',{
                code,
                updateId: memberNoGuid,
                updateName: memberNameGuid
              }).then(res=>{
                const { result, errorMessage } =  res.data
                if(result){
                  this.$message({
                    type: 'success',
                    message: '接诊成功!'
                  });
                  this.initData({
                    reservationDateStr:this.reservationDateStr
                  })
                }else{
                  this.$message({
                    type:'error',
                    message: errorMessage
                  })
                }
              })
          }

          // 医生接诊
          if ( VsitingForDoctor ) {
              this.$http.post('/api/hx/ps/visitingForDoctor.do',{
                code,
                updateId: memberNoGuid,
                updateName: memberNameGuid
              }).then(res=>{
                const { result, errorMessage } =  res.data
                if(result){
                  this.$message({
                    type: 'success',
                    message: '接诊成功!'
                  });
                  this.initData({
                    reservationDateStr:this.reservationDateStr
                  })
                }else{
                  this.$message({
                    type:'error',
                    message: errorMessage
                  })
                }
              })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消接诊'
          });
        });
    },

    // 咨询
    handleCreateConsul(scope) {
      this.patientReservationCode = scope.code
      this.getPatientDetail(scope.patientNo,()=>{
        this.isLoadComModal=true
        this.ActionToggleModal({
            modalTitle: '记录咨询',
            keyName: 'createConsul',
            BookingModalVisible: true,
        })
      })

    },

    // 编辑咨询
    handleEditConsul(scope) {
      this.patientReservationCode = scope.code
      this.getPatientDetail(scope.patientNo,()=>{
        this.getConsulDetail(scope.code,()=>{
          this.isLoadComModal=true
          this.ActionToggleModal({
              modalTitle: '编辑咨询',
              keyName: 'editConsul',
              BookingModalVisible: true,
          })
        })
      })
    },

    // 分诊
    handleTriage(scope) {
      this.scopeItem = scope
      this.patientReservationCode = scope.code
      this.getPatientDetail(scope.patientNo,()=>{
        this.isLoadModal=true
        this.ActionToggleModal({
            modalTitle: '分诊',
            keyName: 'triage',
            dialogFormVisible: true,
        })
      })
    },

    // 转诊
    handleTransfer(scope) {
      this.scopeItem = scope
      this.patientReservationCode = scope.code
      this.getPatientDetail(scope.patientNo,()=>{
        this.isLoadModal=true
        this.ActionToggleModal({
            modalTitle: '转诊',
            keyName: 'transfer',
            dialogFormVisible: true,
        })
      })
    },

    // 收费
    handleCollection(row) {
      this.$router.push({
        path: '/PatientDetail/' + row.patientNo,
        query:{
          patientServiceCode: row.code
        }
      })
    },

    // 复诊预约
    handleFollowUp(scope) {
        this.patientReservationCode = scope.code
        this.getPatientDetail(scope.patientNo,()=>{
            this.isLoadComModal=true
            this.ActionToggleModal({
              modalTitle: '复诊预约',
              keyName: 'CreateAndEditBooking',
              BookingModalVisible: true,
            })
        })
    },

    // 新增病历
    handleAddCase(scope) {
        this.scopeItem = scope
        this.patientReservationCode = scope.code
        this.getPatientDetail(scope.patientNo,()=>{
            this.getPaitentNewAlreadyRecord(scope.patientNo,scope.code,(newAlreadyInfo)=>{
              this.isLoadModal=true
              this.newAlreadyInfo = newAlreadyInfo
              this.ActionToggleModal({
                modalTitle: '新增病历',
                keyName: 'createCase',
                dialogFormVisible: true,
              })
            })
        })
    },

    // 编辑病历
    handleEditCase(scope) {
        this.patientReservationCode = scope.code
        this.getPatientDetail(scope.patientNo,()=>{
            this.getCaseDetail(scope.code,()=>{
              this.isLoadModal=true
              this.ActionToggleModal({
                modalTitle: '编辑病历',
                keyName: 'createCase',
                dialogFormVisible: true,
              })
            })
        })
    },

    // 获取患者最新预约记录
    getPaitentNewAlreadyRecord(patientNo,code,callback) {
       const { memberNoGuid , memberNameGuid , shopNo,memberNoMerchant} = this.$cfg.userInfo || storage.get('userInfo')
       this.$http.post('/api/hx/ps/infoByUpToDate.do',{
          merchantNo: memberNoMerchant,
          code,
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


    // 保存病历
    handleSaveCase(formData,callback) {
      const { patientReservationCode } = this
      const { code, name } = this.patientDetail
      const { memberNoGuid , memberNameGuid } = this.$cfg.userInfo || storage.get('userInfo')
      const data = {
        patientNo: code,
        patientName: name,
        createId: memberNoGuid,
        createName: memberNameGuid,
        ...formData
      }
      this.$http.post('/api/hx/medical/addMedical.do',{
        patientReservationCode,
        ...data
      }).then(res=>{
         const { result, errorMessage } =  res.data
        if(result){
          this.$message({
            type: 'success',
            message: '新增病历成功!'
          });
          this.isLoadModal=false
          this.initData({})
        }else{
          this.$message({
            type:'error',
            message: errorMessage
          })
        }
      })
    },


    // 编辑病历
    handelEditCase(formData,callback) {

      const { patientReservationCode } = this
      const { code, name } = this.patientDetail
      const { memberNoGuid , memberNameGuid } = this.$cfg.userInfo || storage.get('userInfo')
      const data = {
        patientNo: code,
        patientName: name,
        createId: memberNoGuid,
        createName: memberNameGuid,
        ...formData
      }
       this.$http.post('/api/hx/medical/editMedical.do',
       data
       ).then(res=>{
          const { result, errorMessage } =  res.data
        if(result){
          this.$message({
            type: 'success',
            message: '编辑病历成功!'
          });
          this.CaseDetail = {
            visitingType: 'NEWDIAGNOSIS'
          }
          this.isLoadModal=false
          this.initData({})
        }else{
          this.$message({
            type:'error',
            message: errorMessage
          })
        }
       })
    },

    // 治疗完成
    handleTreaSuccess(scope) {
      const { code,patientName } = scope
      const { memberNoGuid, memberNameGuid , roleEnnames} = this.$cfg.userInfo || storage.get('userInfo')
       this.$confirm('确认患者'+ patientName +'已完成治疗么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/api/hx/ps/editByFinished.do',{
             code,
             updateId: memberNoGuid,
             updateName: memberNameGuid
          }).then(res=>{
            const { result, errorMessage } =  res.data
            if(result){
              this.$message({
                type: 'success',
                message: '确认治疗完成!'
              });
            this.initData({})
            }else{
              this.$message({
                type:'error',
                message: errorMessage
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消确认'
          });
        });
    },

    // 新增咨询
    addConsul(formData,callback) {
        const { patientReservationCode } = this
        const { code, name } = this.patientDetail
        const { memberNoGuid } = this.$cfg.userInfo || storage.get("userInfo");
        formData['projectCodes'] = formData['projectCodes'].join(",")
        formData['projectNames'] = formData['projectNames'].join(",")
        this.$http.post('/api/hx/advisory/addAdvisory.do',{
          patientReservationCode,
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
              this.initData({})
              this.consulDetail = {}
              this.isLoadComModal =false
              if(callback) callback()
            } else {
              this.$message({
                  type:'error',
                  message: errorMessage
              })
            }
        })
    },

     // 编辑咨询
    editConsul(formData,callback) {
        const { patientReservationCode } = this
        const { code } = this.consulDetail
        const { memberNoGuid } = this.$cfg.userInfo || storage.get("userInfo");
        formData['projectCodes'] = formData['projectCodes'].join(",")
        formData['projectNames'] = formData['projectNames'].join(",")
        this.$http.post('/api/hx/advisory/editAdvisory.do',{
          code,
          patientReservationCode,
          createId: memberNoGuid,
          ...formData
        }).then(res=>{
            const { result , errorMessage, returnObject } = res.data
            if(result){
              this.ActionToggleModal({
                  dialogFormVisible: false,
                  BookingModalVisible: false
              })
              this.initData({})
              this.consulDetail = {}
              this.isLoadComModal =false
              if(callback) callback()
            } else {
              this.$message({
                  type:'error',
                  message: errorMessage
              })
            }
        })
    },

    // 分诊
    editByTriage(formData,callback) {
      const { memberNoGuid,memberNameGuid } = this.$cfg.userInfo || storage.get("userInfo");
       this.$http.post('/api/hx/ps/editByTriage.do',{
         code: this.patientReservationCode,
         updateId: memberNoGuid,
         updateName: memberNameGuid,
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
              message: '分诊成功!'
            })
            this.isLoadModal=false
            this.initData({})
            if(callback) callback()
          } else {
            this.$message({
                type:'error',
                message: errorMessage
            })
          }
       })
    },

    // 转诊
    editByReferral(formData,callback) {
       const { memberNoGuid,memberNameGuid } = this.$cfg.userInfo || storage.get("userInfo");
       this.$http.post('/api/hx/ps/editByReferral.do',{
         code: this.patientReservationCode,
         updateId: memberNoGuid,
         updateName: memberNameGuid,
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
              message: '转诊成功!'
            })
            this.isLoadModal=false
            this.initData({})
            if(callback) callback()
          } else {
            this.$message({
                type:'error',
                message: errorMessage
            })
          }
       })
    },


    // 复诊预约预约
    createBooking(formData,callback) {
        const { memberNoGuid,memberNameGuid ,shopNo,shopName } = this.$cfg.userInfo || storage.get('userInfo')
        const { code, name, phone,caseNo ,merchantNo, merchantName } = this.patientDetail
        formData['reservationDateLen'] = parseInt(formData['reservationDateLen'])
        formData['serviceChoosesJson'] = JSON.stringify(formData['serviceChoosesJson'])
        this.$http.post('/api/hx/ps/addPatientReservation.do',{
           reviewCode: this.patientReservationCode,
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
              this.initData({})
              this.isLoadComModal=false
              if(callback) callback()
            } else {
              this.$message({
                  type:'error',
                  message: errorMessage
              })
            }
        })
    },

    // 患者详情
    getPatientDetail(code,callback) {
       this.$http.post('/api/hx/patient/details.do',{
          code
       }).then(res=>{
          const { returnObject , result ,errorMessage} = res.data
          if(result){
               this.patientDetail = returnObject
               if(callback) callback()
          }else{
            this.$message({
              type:'error',
              message: errorMessage
            })
          }
       })
    },

    // 咨询详情
    getConsulDetail(code,callback) {
       this.$http.post('/api/hx/advisory/findAdvisoryByCode.do',{
         patientReservationCode: code
       }).then(res=>{
          const { returnObject , result ,errorMessage} = res.data
          if(result){
               this.consulDetail = returnObject
               if(callback) callback()
          }else{
            this.$message({
              type:'error',
              message: errorMessage
            })
          }
       })
    },

    // 病历详情
    getCaseDetail(code,callback) {
        this.$http.post('/api/hx/medical/findMedicalByCode.do',{
          patientReservationCode: code,
        }).then(res=>{
            const { result , errorMessage, returnObject } = res.data
            if(result){
              this.CaseDetail = returnObject
              if(callback)callback()
            } else {
              this.$message({
                type:'error',
                message: errorMessage
              })
            }
        })
    },



    // 公共保存
    handleModalConfirm(formData,callback){
      const { keyName } = this.mutations
      if ( keyName ==="createConsul") {
        this.addConsul(formData,callback)
      }
      if ( keyName ==="editConsul") {
        this.editConsul(formData,callback)
      }
      if ( keyName === 'triage' ){
        this.editByTriage(formData,callback)
      }
      if ( keyName === 'transfer' ){
        this.editByReferral(formData,callback)
      }
      if( keyName === "CreateAndEditBooking" ){
        this.createBooking(formData,callback)
      }
      // 病历操作
      if ( keyName === "createCase" ){
          if ( formData.code ) {
              this.handelEditCase(formData,callback)
          } else {
              this.handleSaveCase(formData,callback)
          }
      }
    },

     // 全选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 处理分页
    handlePageQuery(currentPage) {
      this.currentPage = currentPage;
      this.initData({});
    },

    // 搜索查询
    searchData(data) {
      this.currentPage =1
      this.reservationDateStr = data['reservationDateStr']
      this.initData(data)
    },

    // 重置搜索
    resetSearchData(data) {
      this.currentPage = 1
      this.reservationDateStr = data['reservationDateStr']
      this.initData(data);
    },

    // 点击取消
    handleModalCancel() {
      this.ActionToggleModal({
        dialogFormVisible: false,
        BookingModalVisible: false
      });
      this.scopeItem = {}
      this.consulDetail = {}
      this.CaseDetail = {
        visitingType: 'NEWDIAGNOSIS'
      }
      this.isLoadComModal =false
      this.isLoadModal=false
    }
  },
  created() {},
  mounted() {
    this.initData({})
  }
};
</script>
<style lang="less" scoped>
.totalBox{
    text-align: center;
    span{
        display: inline-block;
        margin: 20px 30px 20px 0;
        font-size: 18px;
    }
}
.returnInfo{
    padding: 30px 0;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    font-size: 16px;
    text-align: center;
    span{
        display: inline-block;
        margin-right: 100px;
        i{
            font-size: 24px;
            color: red;
        }
    }
}
</style>
