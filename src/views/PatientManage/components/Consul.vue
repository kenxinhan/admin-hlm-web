<template>
  <div class="ConsulBox">
    <br>
    <div> 
      <el-button size="large" type="success" @click="handleCreateConsul">新建咨询</el-button>
    </div>
    <br><br>
    <el-timeline>
      <el-timeline-item placement="top" v-for="(item,index) in ConsulList" :key="index">
        <el-card>
          <h4>{{item.createDate}}
            <span class="alerayTag" v-if="item.visitingType === 'NEWDIAGNOSIS' ">初诊</span>
            <span class="goshopTag" v-if="item.visitingType === 'REVIEW' ">复诊</span>
          </h4>
          <p>咨询项目:
            <strong>{{item.projectNames}}</strong>
          </p>
          <p>咨询内容:
            <strong>{{item.advisoryContent}}</strong>
          </p>
          <p>成交意愿: <span v-if="item.want === 'HIGH'">高</span> <span v-if="item.want === 'CENTRAL'">中</span><span v-if="item.want === 'LOW'">低</span></p>
          <p>备注: {{item.remark}}</p>
          <br>
          <div>
            <span style="float:right">{{item.createName}} 创建于{{item.createDate}}</span>
            <div class="clearfix"></div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Modal from './Modal'
export default {
  components: {
    Modal
  },
  props: {
    ConsulList: {
      type: Array,
      default: ()=>({})
    }
  },
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {

    ...mapActions(["ActionToggleModal"]),
    
    // 新建咨询
    handleCreateConsul() {
        this.ActionToggleModal({
            modalTitle: '新建咨询',
            keyName: 'createConsul',
            BookingModalVisible: true,
        })
    },
  },
  created() {},
  mounted() {
  }
};
</script>
<style lang="less" scoped>
.ConsulBox {
  h4 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    span {
      margin-left: 10px;
    }
  }
  p {
    padding: 10px;
  }
}
</style>