<template>
  <div>
    <el-dialog :title="mutations.modalTitle" :visible="mutations.dialogFormVisible" :center="mutations.center" :show-close="false">
      <!-- 接单 -->
      <!-- <el-tabs v-if=" mutations.keyName === 'receipt' " v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="金额购买" name="first">
          <div class="modalConBox">
            <h2>请输入支付密码进行购买！</h2>
            <el-input
              maxlength="6"
              v-model="formData.buyPassword"
              class="inputPassword"
              type="password"
            ></el-input>
          </div>
        </el-tab-pane>
        <el-tab-pane label="服务抵扣" name="second">
          <div class="modalConBox">
            <h2>选择抵扣服务</h2>
            <el-select v-model="formData.status" placeholder="请选择客户状态" clearable>
              <el-option label="英语" value="en"></el-option>
              <el-option label="简体" value="zh_CN"></el-option>
              <el-option label="繁体" value="zh_TW"></el-option>
            </el-select>
          </div>
        </el-tab-pane>
      </el-tabs> -->
      <div  v-if=" mutations.keyName === 'receipt' " class="modalConBox" >
            <h2>选择抵扣服务</h2>
            <el-select v-model="formData.status" placeholder="请选择客户状态" clearable>
              <el-option label="英语" value="en"></el-option>
              <el-option label="简体" value="zh_CN"></el-option>
              <el-option label="繁体" value="zh_TW"></el-option>
            </el-select>
            <br><br><br>
            <p>接诊后将扣除服务次数，同时为你新增患者。</p>
          </div>
      <div v-if=" mutations.keyName === 'goshop' " class="modalConBox">
        <p>提需求之后，销售员为您服务将客户预约到店。</p>
        <h2>提需求</h2>
        <el-select v-model="formData.demand" placeholder="请选择客户状态" clearable>
          <el-option label="英语" value="en"></el-option>
          <el-option label="简体" value="zh_CN"></el-option>
          <el-option label="繁体" value="zh_TW"></el-option>
        </el-select>
      </div>
      <!-- 接单 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleModalCancel">取 消</el-button>
        <el-button type="primary" @click="handleModalConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import  { mapState } from 'vuex'
export default {
  components: {},
  data() {
    return {
      activeName: "first",
      formData: {
        buyPassword: "",
        status: "",
        demand: ''
      }
    };
  },
  watch: {},
  computed: {
    ...mapState({
      mutations: state => state['mutations']
    })
  },
  methods: {
    handleModalConfirm() {
      const { formData } = this;
      this.$emit("handleModalConfirm", formData);
    },
    handleModalCancel() {
      this.$emit("handleModalCancel");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.modalConBox {
  text-align: center;
  h2 {
    font-size: 16px;
    margin: 20px 0;
  }
  .inputPassword {
    width: 300px;
    height: 50px;
  }
}
</style>