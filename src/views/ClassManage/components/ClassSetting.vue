<template>
  <div class="ScheduleBox">
    <el-form ref="form" :model="ScheduleModel" :rules="rules">
      <table class="ClassSettingTableBox">
        <tr>
          <td>班次</td>
          <td>上班时间</td>
          <td>下班时间</td>
          <td>是否可约诊</td>
          <td>操作</td>
        </tr>
        <tr v-for="item in scheduleList" :key="item.code">
          <td>
            <span
              v-if="currentScheduleKey !== item.code"
              :class=" item.aptFlag ===  'Y' ? 'indicatorD' : 'indicatorC'"
            >
              <span></span>
              {{item.scheduleName}}
            </span>
            <el-form-item prop="scheduleName" v-if="currentScheduleKey === item.code">
                <el-input
                  v-model="ScheduleModel.scheduleName"
                  placeholder="请输入班次名称"
                  style="width: 80%"
                ></el-input>
             </el-form-item>
          </td>
          <td>
            <span v-if="currentScheduleKey !== item.code">{{item.workTime}}</span>
            <el-form-item prop="workTime" v-if="currentScheduleKey === item.code">
                <el-time-picker
                  v-model="ScheduleModel.workTime"
                  value-format="HH:mm:ss"
                  placeholder="任意时间点"
                ></el-time-picker>
            </el-form-item>
          </td>
          <td>
            <span v-if="currentScheduleKey !== item.code">{{item.offTime}}</span>
            <el-form-item prop="offTime" v-if="currentScheduleKey === item.code">
                <el-time-picker
                  v-model="ScheduleModel.offTime"
                  value-format="HH:mm:ss"
                  placeholder="任意时间点"
                ></el-time-picker>
            </el-form-item>
          </td>
          <td>
            <span v-if="currentScheduleKey !== item.code">
              <span v-if="item.aptFlag === 'N'">否</span>
              <span v-if="item.aptFlag === 'Y'">是</span>
            </span>
            <el-form-item prop="aptFlag" v-if="currentScheduleKey === item.code">
                <el-select
                  v-model="ScheduleModel.aptFlag"
                  placeholder="请选择"
                  style="width: 70%;"
                >
                  <el-option label="可约诊" value="Y"></el-option>
                  <el-option label="不可约诊" value="N"></el-option>
                </el-select>
            </el-form-item>
            
          </td>
          <td>
            <div v-if="currentScheduleKey === item.code">
              <el-button type="primary" icon="el-icon-edit-outline" @click="updateSchedule(item)">保存</el-button>
              <el-button icon="el-icon-delete" @click=" currentScheduleKey ='' ">取消</el-button>
            </div>
            <div v-if="currentScheduleKey !== item.code">
              <el-button type="primary" icon="el-icon-edit-outline" @click="editSchedule(item)">编辑</el-button>
              <el-button icon="el-icon-delete" type="danger" @click="deleteSchedule(item)">删除</el-button>
            </div>
          </td>
        </tr>
        <tr v-if="isAddSchedule">
          <td>
            <el-form-item prop="scheduleName">
                 <el-input v-model="ScheduleModel.scheduleName" placeholder="请输入班次名称" style="width: 80%"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item prop="workTime">
                <el-time-picker v-model="ScheduleModel.workTime" value-format="HH:mm:ss" placeholder="任意时间点"></el-time-picker>
            </el-form-item>
          </td>
          <td>
            <el-form-item prop="offTime">
              <el-time-picker v-model="ScheduleModel.offTime" value-format="HH:mm:ss" placeholder="任意时间点"></el-time-picker>
            </el-form-item>
          </td>
          <td>
            <el-form-item prop="aptFlag">
              <el-select v-model="ScheduleModel.aptFlag" placeholder="请选择" style="width: 70%;">
              <el-option label="可约诊" value="Y"></el-option>
              <el-option label="不可约诊" value="N"></el-option>
            </el-select>
            </el-form-item>
          </td>
          <td>
            <div>
              <el-button type="primary" icon="el-icon-edit-outline" @click="saveAddSchedule">保存</el-button>
              <el-button icon="el-icon-delete" @click=" isAddSchedule = false ">取消</el-button>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <el-button type="primary" icon="el-icon-plus" @click="addSchedule">新增班次</el-button>
          </td>
        </tr>
      </table>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
import { mapState, mapActions } from "vuex";
import storage from "@/tools/local_storage.js";

export default {
  components: {},
  props: {},
  data() {
    return {
      currentScheduleKey: "",
      ScheduleModel: {
        scheduleName: "",
        workTime: "",
        offTime: "",
        aptFlag: "Y",
      },
      currentScheduleItem: {},
      isAddSchedule: false,
      scheduleList: [],
      currentPage: 1,
      limit: 1000,
      total: 1,
      rules: {
          scheduleName: [
            { required: true, message: '请输入班次名称', trigger: 'blur' },
          ],
          workTime: [
            { required: true, message: '请选择上班时间', trigger: 'change' }
          ],
          offTime: [
            { required: true,  message: '请选择下班时间', trigger: 'change' }
          ],
          aptFlag: [
            { required: true,  message: '请选择是否可约诊', trigger: 'change' }
          ]
      }
    };
  },
  watch: {},
  computed: {},
  methods: {

    // 获取班次列表
    getScheduleList() {
      const { currentPage, limit } = this;
      const { memberNoGuid, memberNoMerchant, roleEnnames, shopNo } =
        this.$cfg.userInfo || storage.get("userInfo");
      this.$http
        .post("/api/hx/shop/schedule/list.do", {
          start: (currentPage - 1) * limit,
          limit: limit,
          shopNo: shopNo,
          merchantNo: memberNoMerchant
        })
        .then(res => {
          const { result, errorMessage, returnObject } = res.data;
          if (result) {
            const { limit, total, rows } = returnObject;
            this.total = total;
            this.scheduleList = rows;
            console.log(rows);
          } else {
            this.$message({
              type: "error",
              message: errorMessage
            });
          }
        });
    },

    // 新增班次
    addSchedule() {
      this.isAddSchedule = true;
      this.currentScheduleKey = '';
      this.ScheduleModel.scheduleName = "";
      this.ScheduleModel.workTime = "";
      this.ScheduleModel.offTime = "";
      this.ScheduleModel.aptFlag = "";
    },

    // 编辑班次
    editSchedule(item) {
      const { code, scheduleName, workTime, offTime, aptFlag } = item;
      this.isAddSchedule = false;
      this.currentScheduleKey = code;
      this.currentScheduleItem = item;
      this.ScheduleModel.scheduleName = scheduleName;
      this.ScheduleModel.workTime = workTime;
      this.ScheduleModel.offTime = offTime;
      this.ScheduleModel.aptFlag = aptFlag;
    },

    // 删除班次
    deleteSchedule(item) {
      const { code } = item
      const { memberNoGuid, memberNoMerchant, roleEnnames, shopNo } =this.$cfg.userInfo || storage.get("userInfo");
      this.$confirm('真的要删除该班次吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.post('/api/hx/shop/schedule/remove.do',{
              code,
              updateId: memberNoGuid
            }).then(res=>{
              const { result, errorMessage } =  res.data
              if(result){
                this.getScheduleList()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
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
            message: '已取消删除'
          });          
        });
    },

    // 保存新增班次
    saveAddSchedule() {
      const { scheduleName, workTime, offTime, aptFlag } = this.ScheduleModel;
      const {
        memberNoGuid,
        memberNoMerchant,
        memberNameMerchant,
        roleEnnames,
        shopNo,
        shopName
      } = this.$cfg.userInfo || storage.get("userInfo");

      this.$refs['form'].validate((valid) => {
        if (valid) {
            this.$http.post("/api/hx/shop/schedule/add.do", {
              scheduleName,
              workTimeStr: workTime,
              offTimeStr: offTime,
              aptFlag: aptFlag,
              shopNo: shopNo,
              shopName: shopName,
              merchantNo: memberNoMerchant,
              merchantName: memberNameMerchant,
              createId: memberNoGuid
            })
            .then(res => {
              const { result, errorMessage, returnObject } = res.data;
              if (result) {
                this.isAddSchedule = false;
                this.getScheduleList();
                this.$message({
                  type: "success",
                  message: "添加成功！"
                });
              } else {
                this.$message({
                  type: "error",
                  message: errorMessage
                });
              }
            })
        }else{
          console.log('submit error')
        }
      })
    },

    // 保存修改班次
    updateSchedule() {
      const { scheduleName, workTime, offTime, aptFlag } = this.ScheduleModel;
      const { memberNoGuid } = this.$cfg.userInfo || storage.get("userInfo");
      const { code } = this.currentScheduleItem;

      this.$refs['form'].validate((valid) => {
        if (valid) {
            this.$http.post("/api/hx/shop/schedule/edit.do", {
              code,
              scheduleName,
              workTimeStr: workTime,
              offTimeStr: offTime,
              aptFlag,
              updateId: memberNoGuid
            })
            .then(res => {
              const { result, errorMessage, returnObject } = res.data;
              if (result) {
                this.currentScheduleKey = "";
                this.getScheduleList();
                this.$message({
                  type: "success",
                  message: "修改成功！"
                });
              } else {
                this.$message({
                  type: "error",
                  message: errorMessage
                });
              }
            })
        }else{
          console.log('submit error')
        }
      })
    }
  },
  created() {},
  mounted() {
    this.getScheduleList();
  }
};
</script>
<style lang="less" scoped>
.ClassSettingTableBox {
  width: 100%;
  text-align: center;
  tr td {
    border: 1px solid #eeeeee;
    width: 12.5%;
    height: 80px;
    position: relative;
  }
}
</style>