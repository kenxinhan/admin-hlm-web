<template>
  <div class="patientBox">
    <Modal
      @handleModalConfirm="handleModalConfirm"
      @handleModalCancel="handleModalCancel"
    ></Modal>
    <ComModal
      @handleModalConfirm="handleModalConfirm"
      @handleModalCancel="handleModalCancel"
      :patientDetail="patientDetail"
    ></ComModal>
    <Search @searchData="searchData" @resetSearchData="resetSearchData"></Search>
    <Table :tableData="tableData" tabConKeyName="customcues" @handleRowDblClick="handleRowDblClick">
      <template slot-scope="scope">
        <el-tooltip class="item" effect="dark" content="查看患者" placement="top-start">
          <el-button size="mini" icon="el-icon-view" @click="handleCheckPatient(scope.row)"></el-button>
        </el-tooltip>
        <!-- <el-tooltip class="item" effect="dark" content="IM聊天" placement="top-start">
          <el-button size="mini" type="success" @click="handleImChat(scope.row)">
            <i class="iconfont icon-chat"></i>
          </el-button>
        </el-tooltip> -->
        <el-tooltip class="item" effect="dark" content="创建预约" placement="top-start">
          <el-button
            size="mini"
            icon="el-icon-plus"
            type="primary"
            @click="handleCreateAleray(scope.row)"
          ></el-button>
        </el-tooltip>
      </template>
    </Table>
    <Pagination
      @handlePageQuery="handlePageQuery"
      :currentPage="currentPage"
      :pageSize="limit"
      :total="total"
    ></Pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import storage from '@/tools/local_storage.js'
import Search from "./components/Search";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import ComModal from "../Components/ComModal/ComModal";

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
      patientDetail:{},
      apiUrl: "",
      tableData: [], // 表格数据
      currentPage: 1, // 当前页码
      limit: 10, // 每页条数
      total: 1,  // 总条数
    };
  },
  watch: {},
  computed: {
    ...mapState({
      mutations: state => state["mutations"],
      appVuex: state => state["appVuex"]
    })
  },
  methods: {
    ...mapActions(["ActionToggleModal"]),

    // 初始列表
    initData(formData) {
       const { memberNoMerchant } = this.$cfg.userInfo || storage.get('userInfo')
       const { currentPage, limit } = this
       this.$http.post('/api/hx/patient/list.do',{
           start: (currentPage - 1) * limit,
           limit,
           memberNoMerchant,
           ...formData
       }).then(res=>{
          const { result, errorMessage } =  res.data
          const { total, rows }  = res.data.returnObject
          if(result){
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
    handleCreateAleray(scope) {
      this.getPatientDetail(scope.code,()=>{
          this.ActionToggleModal({
            center: false,
            modalTitle: '创建预约',
            keyName: 'CreateAndEditBooking',
            BookingModalVisible: true
          })
      })
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
      this.initData(data)
    },

    // 双击查看详情
    handleRowDblClick(val){
      this.$router.push({
         path: '/PatientDetail/' + val.code
      })
    },

    // 重置搜索
    resetSearchData() {
      this.currentPage =1
      this.initData({});
    },

    // 查看患者
    handleCheckPatient(scope) {
       this.$router.push({
         path: '/PatientDetail/' + scope.code
       })
    },

    // 公共保存
    handleModalConfirm(formData,callback) {
      const { keyName } = this.mutations
      if( keyName === "CreateAndEditBooking" ){
        this.createBooking(formData,callback)
      }
    },

    // 点击取消
    handleModalCancel() {
      this.ActionToggleModal({
        dialogFormVisible: false,
        BookingModalVisible: false
      })
    },

    // 跳转IM
    handleImChat() {

    }
  },
  created() {},
  mounted() {
    // 初始列表
    this.initData({});
  }
};
</script>
<style lang="less" scoped>
.patientBox {
  .iconfont {
    font-size: 12px;
  }
}
</style>
