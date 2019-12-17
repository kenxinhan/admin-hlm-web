<template>
  <div>
    <el-dialog
      :title="mutations.modalTitle"
      :visible="mutations.dialogFormVisible"
      :center="mutations.center"
      :show-close="false"
    >

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleModalCancel">取 消</el-button>
        <el-button type="primary" @click="handleModalConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      activeName: "first",
      formData: {
        buyPassword: "",
        status: "",
        demand: ""
      }
    };
  },
  watch: {},
  computed: {
    ...mapState({
      mutations: state => state["mutations"]
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