<template>
  <div>
    <Modal
      @handleModalConfirm="handleModalConfirm"
      @handleModalCancel="handleModalCancel"
    ></Modal>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="客户线索" name="first">
        <Search @searchData="searchData" @resetSearchData="resetSearchData"></Search>
        <Table 
          :tableData="tableData"
          tabConKeyName="customcues"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDetails(scope.row)">查看</el-button>
            <el-button size="mini" type="primary" @click="handleReceipt(scope.row)">接诊</el-button>
            <el-button size="mini" @click="handleHasShop(scope.row)" type="danger">到店</el-button>
          </template>
        </Table>
        <Pagination
          @handlePageQuery="handlePageQuery"
          :currentPage="currentPage"
          :pageSize="pageSize"
          :total="total"
        ></Pagination>
      </el-tab-pane>
      <el-tab-pane label="已接诊客户" name="second">
        <Search @searchData="searchData" @resetSearchData="resetSearchData"></Search>
        <Table 
         :tableData="tableData"
         tabConKeyName="recomcustom"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDetails(scope.row)">查看</el-button>
          </template>
        </Table>
        <Pagination
          @handlePageQuery="handlePageQuery"
          :currentPage="currentPage"
          :pageSize="pageSize"
          :total="total"
        ></Pagination>
      </el-tab-pane>
      <el-tab-pane label="到店客户" name="third">
        <Search @searchData="searchData" @resetSearchData="resetSearchData"></Search>
        <Table 
         :tableData="tableData"
         tabConKeyName="aleraybuycus"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDetails(scope.row)">查看</el-button>
            <el-button size="mini" @click="handleHasShop(scope.row)" type="danger">确认到店</el-button>
          </template>
        </Table>
        <Pagination
          @handlePageQuery="handlePageQuery"
          :currentPage="currentPage"
          :pageSize="pageSize"
          :total="total"
        ></Pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Search from "./components/Search";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";

export default {
  components: {
    Search,
    Table,
    Pagination,
    Modal
  },
  props: {},
  data() {
    return {
      apiUrl: "",
      activeName: "first", // tabkey
      tableData: [], // 表格数据
      searchValue: {}, // 搜索参数
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页条数
      total: 10, // 总条数
    };
  },
  watch: {},
  computed: {},
  methods: {
    ...mapActions(["ActionToggleModal"]),
    // 初始化数据
    initData(formData) {
      let apiUrl = formData["apiUrl"] ? formData["apiUrl"] : this.apiUrl;
      formData["page"] = formData["page"] ? formData["page"] : this["currentPage"];
      formData["limit"] = formData["limit"] ? formData["limit"] : this["pageSize"];
      this.$api.post("/api/robcustomers", formData, res => {
        this.tableData = res;
        this.total = res.length + 1;
      })
    },
    // 标签切换回调
    handleClick(tab, event) {
      this.initData({});
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
      this.searchValue = data;
      this.initData({ page: 1, ...data });
    },
    // 重置搜索
    resetSearchData() {
      this.initData({});
    },
    // 查看客户资料
    handleDetails(scope) {
      console.log(scope);
      this.$router.push({
        path: `/RobCustomers/${scope.noorder}`
      })
    },
    // 接诊
    handleReceipt(scope) {
      console.log(scope)
      this.ActionToggleModal({
        center: true,
        modalTitle: '接诊',
        keyName: 'receipt',
        dialogFormVisible: true
      })
    },
    // 到店
    handleHasShop(scope) {
      this.ActionToggleModal({
        center: true,
        modalTitle: '到店',
        keyName: 'receipt',
        dialogFormVisible: true
      })
    },
    // 点击确定
    handleModalConfirm(formData) {
      console.log(formData);
      this.ActionToggleModal({
        dialogFormVisible: false
      })
    },
    // 点击取消
    handleModalCancel() {
      this.ActionToggleModal({
        dialogFormVisible: false
      })
    }
  },
  created() {},
  mounted() {
    this.initData({});
  }
};
</script>
<style lang="less" scoped>
</style>