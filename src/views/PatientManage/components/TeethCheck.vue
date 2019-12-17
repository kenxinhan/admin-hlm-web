<template>
  <div>
    <div>
      <el-radio-group v-model="type" @change="handleRadioChange('type',type)">
        <el-radio-button label="today">今日检查</el-radio-button>
        <el-radio-button label="history">历史检查</el-radio-button>
      </el-radio-group>
    </div>
    <br><br>
    <div v-if="!showToday" style="margin-bottom: 20px;">
      检查时间：
      <!-- <el-date-picker
        v-model="checkDate"
        type="date"
        @change="todayTeechCkeck(false)"
        placeholder="选择日期">
      </el-date-picker> -->
      <el-select v-model="checkDate" placeholder="请选择" @change="todayTeechCkeck(false)">
        <el-option label="全部" value="" ></el-option>
        <el-option
          size="mini"
          v-for="(item, index) in selectTimeList"
          :key="index"
          :label="seliceTime(item.createDate)"
          :value="item.createDate"
        ></el-option>
      </el-select>
    </div>
    <div>
      <el-form ref="form" :model="ScheduleModel" :rules="rules">
        <table class="ClassSettingTableBox">
          <tr>
            <td>记录时间</td>
            <td>牙位</td>
            <td>症状</td>
            <td>备注</td>
            <td v-if="showToday">操作</td>
          </tr>
          <tr v-for="item in checkedList" :key="item.code">
            <td>
              <span v-if="currentScheduleKey !== item.code">{{item.createDate}}</span>
              <el-form-item prop="createDate" v-if="currentScheduleKey === item.code">
                <el-date-picker
                  v-model="ScheduleModel.createDate"
                  type="date"
                  disabled
                  placeholder="选择日期">
                </el-date-picker>
               </el-form-item>
            </td>
            <td>
              <span v-if="currentScheduleKey !== item.code">{{item.dentalPosition}}</span>
              <el-form-item prop="" v-if="currentScheduleKey === item.code">
                <span v-if="item.dentalPosition">
                  {{item.dentalPosition}}&nbsp;
                  <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="chooseTeethPosition(item,'edit')"></el-button>
                </span>
                <span v-else>
                  <el-button type="primary" size="mini" icon="el-icon-plus" @click="chooseTeethPosition(item,'add')"></el-button>
                </span>
              </el-form-item>
            </td>
            <td>
              <span v-if="currentScheduleKey !== item.code">{{item.symptom}}</span>
              <span v-if="currentScheduleKey === item.code">
                <el-form-item prop="symptom">
                  <el-cascader
                    ref="changeCascader"
                    @change="changeSymptom"
                    :show-all-levels="false"
                    v-model="ScheduleModel.symptom"
                    :options="options"
                    :props="{ value: 'code', label: 'name' }"
                    clearable
                  >
                  </el-cascader>
                </el-form-item>
              </span>

            </td>
            <td>
              <span v-if="currentScheduleKey !== item.code">{{item.remark}}</span>
              <span v-if="currentScheduleKey === item.code">
                <el-input v-model="ScheduleModel.remark" maxlength="50" placeholder="请输入备注" style="width: 90%"></el-input>
              </span>
            </td>
            <td v-if="showToday">
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

          <tr v-if="isAddRecord">
            <td>
              <el-form-item prop="createDate">
                <el-date-picker
                  v-model="ScheduleModel.createDate"
                  type="datetime"
                  disabled
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                  <span v-if="ScheduleModel.dentalPosition">
                    {{ScheduleModel.dentalPosition}}&nbsp;
                    <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="chooseTeethPosition(item,'edit')"></el-button>
                  </span>
                  <span v-else>
                    <el-button type="primary" size="mini" icon="el-icon-plus" @click="chooseTeethPosition(item,'add')"></el-button>
                  </span>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="symptom">
                <el-cascader
                  ref="setCascader"
                  @change="setSymptom"
                  :show-all-levels="false"
                  v-model="ScheduleModel.symptom"
                  :options="options"
                  :props="{ value: 'code', label: 'name' }"
                  clearable
                >
                </el-cascader>
              </el-form-item>
            </td>
            <td>
              <el-form-item>
                <el-input v-model="ScheduleModel.remark" maxlength="50" placeholder="请输入备注"style="width: 90%"></el-input>
              </el-select>
              </el-form-item>
            </td>
            <td>
              <div>
                <el-button type="primary" icon="el-icon-edit-outline" @click="saveAddSchedule">保存</el-button>
                <el-button icon="el-icon-delete" @click=" isAddRecord = false ">取消</el-button>
              </div>
            </td>
          </tr>
          <tr v-if="showToday">
            <td colspan="5">
              <el-button type="primary" icon="el-icon-plus" @click="addSchedule">新增记录</el-button>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
    <el-pagination
      @current-change="handelCurrentPage"
      :current-page.sync="currentPage"
      :page-size="limit"
      background
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
      <el-dialog title="选择牙位" :visible.sync="showTeethView" center width="30%">
          <div class="tooth-dropdown-view">
            <div class="wrapper">
              <div class="cf">
                <div class="tooth-dropdown-main">
                  <table>
                    <tbody>
                      <tr class="tooth-row">
                        <td>
                          <div class="tooth-row-offet-3 tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth5"
                              :key="index"
                              @click="chooseBabyTooth(item,5)"
                              :class="{checked :item.checked}"
                              >{{item.value}}
                            </div>
                          </div>
                          <div class="tooth-group" style="text-align:right">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth1"
                              :key="index"
                              @click="chooseBabyTooth(item,1)"
                              :class="{checked :item.checked}"
                              >{{item.value}}
                            </div>
                          </div>
                        </td>
                        <td class="vertical-gap"></td>
                        <td>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth6"
                              :key="index"
                              @click="chooseBabyTooth(item, 6)"
                              :class="{checked :item.checked}"
                              >{{item.value}}
                            </div>
                          </div>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth2"
                              :key="index"
                              @click="chooseBabyTooth(item,2)"
                              :class="{checked :item.checked}"
                              >{{item.value}}
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="tooth-row horizontal-gap">
                        <td><span>右</span></td>
                        <td class="vertical-gap"></td>
                        <td><span>左</span></td>
                      </tr>
                      <tr class="tooth-row">
                        <td>
                          <div class="tooth-group" style="text-align:right">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth4"
                              :key="index"
                              @click="chooseBabyTooth(item,4)"
                              :class="{checked :item.checked}"
                              >{{item.value}}
                            </div>
                          </div>
                          <div class="tooth-row-offet-3 tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth8"
                              :key="index"
                              @click="chooseBabyTooth(item, 8)"
                              :class="{checked :item.checked}"
                              >{{item.value}}
                            </div>
                          </div>
                        </td>
                        <td class="vertical-gap"></td>
                        <td>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth3"
                              :key="index"
                              @click="chooseBabyTooth(item,3)"
                              :class="{checked :item.checked}"
                              >{{item.value}}
                            </div>
                          </div>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth7"
                              :key="index"
                              @click="chooseBabyTooth(item, 7)"
                              :class="{checked :item.checked}"
                              >{{item.value}}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            </div>
            <div style="text-align:center;margin-top:30px;">
              <el-button @click=" showTeethView = false ">取消</el-button>
              <el-button type="primary" @click="saveTeethPosition">保存</el-button>
            </div>
      </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { mapState, mapActions } from "vuex";
import storage from "@/tools/local_storage.js";
import { parseTime } from '@/utils/index'
export default {
  components: {},
  props: {},
  data() {
    return {
      type: "today",
      patientNo: this.$route.params.code,
      currentScheduleKey: "",
      ScheduleModel: {
        createDate: "",
        symptom: [],
        remark: '',
        dentalPosition: '',
      },
      currentScheduleItem: {},
      isAddRecord: false,
      checkedList: [],
      rules: {
          createDate: [
            { required: true, message: '请输入记录时间', trigger: 'change' },
          ],
          symptom: [
            { type: 'array', required: true, message: '请选择症状', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请输入备注', trigger: 'blur' }
          ]
      },
      options: [],
      showTeethView: false,
      babyTeeth5: [
        {value: '55'}, {value: '54'}, {value: '53'},
        {value: '52'}, {value: '51'}
      ],
      babyTeeth6:[
        {value: '61'}, {value: '62'}, {value: '63'},
        {value: '64'}, {value: '65'}
      ],
      babyTeeth7:[
        {value: '71'}, {value: '72'}, {value: '73'},
        {value: '74'}, {value: '75'}
      ],
      babyTeeth8: [
        {value: '85'}, {value: '84'}, {value: '83'},
        {value: '82'}, {value: '81'}
      ],
      permanentTeeth1: [
        {value: '18'}, {value: '17'}, {value: '16'}, {value: '15'},
        {value: '14'}, {value: '13'}, {value: '12'}, {value: '11'},
      ],
      permanentTeeth2:[
        {value: '21'}, {value: '22'}, {value: '23'}, {value: '24'},
        {value: '25'}, {value: '26'}, {value: '27'}, {value: '28'},
      ],
      permanentTeeth3:[
        {value: '31'}, {value: '32'}, {value: '33'}, {value: '34'},
        {value: '35'}, {value: '36'}, {value: '37'}, {value: '38'},
      ],
      permanentTeeth4: [
        {value: '48'}, {value: '47'}, {value: '46'}, {value: '45'},
        {value: '44'}, {value: '43'}, {value: '42'}, {value: '41'},
      ],
      checkDate: '',
      showToday: true,
      addParentCode: '',
      addParentName: '',
      changeCode: '',
      changeName: '',
      currentPage: 1, // 当前页码
      limit: 10, // 每页条数
      total: 1,  // 总条数
      selectTimeList: [],


    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
      this.todayTeechCkeck(true);
      this.getSymptomList()
  },
  methods: {
    // 分页
    handelCurrentPage(currentPage) {
      this.currentPage = currentPage
      if (this.showToday) {
        this.todayTeechCkeck(true);
      } else {
        this.todayTeechCkeck(false)
      }

    },
    //
    handleRadioChange(key, val) {
       if (val === 'today') {
         this.todayTeechCkeck(true);
         this.showToday = true
       } else {
         this.todayTeechCkeck(false);
         this.showToday = false
         if (!this.selectTimeList.length) {
           this.getTimeList()
         }
       }
    },

    // 获取今日检查
    todayTeechCkeck(flag) {
      let nowTime = parseTime(new Date().getTime())
      let params = {
        patientNo: this.patientNo,
        start: (this.currentPage - 1 ) * this.limit,
        limit: this.limit
      }

      if (flag) {   //今日检查
        params.createDate = nowTime
      } else {    //历史检查
        params.createDate = this.checkDate
      }

      this.$http.post("/api/hx/toochCkeck/page.do", params)
        .then(res => {
          const { result, errorMessage, returnObject } = res.data;
          if (result) {
            const { rows, total } = returnObject;
            this.checkedList = rows;
            this.total = total
          } else {
            this.$message.error(errorMessage)
          }
        })
    },

    // 新增记录
    addSchedule() {
      this.ScheduleModel.dentalPosition = ''
      this.isAddRecord = true;
      this.ScheduleModel.createDate = parseTime(new Date().getTime())
      this.currentScheduleKey = '';
      this.ScheduleModel.symptom = [];
      this.ScheduleModel.remark = "";

    },

    // 编辑记录
    editSchedule(item) {
      const { code, createDate, symptom, remark, dentalPosition } = item;
      this.isAddRecord = false;
      this.currentScheduleKey = code;
      this.currentScheduleItem = item;
      this.ScheduleModel.createDate = createDate;
      this.ScheduleModel.symptom = [];
      this.ScheduleModel.remark = remark;
      this.ScheduleModel.dentalPosition = dentalPosition
    },

    // 删除记录
    deleteSchedule(item) {
      this.$confirm('真的要删除该条记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.post('/api/hx/toochCkeck/del.do',{
              code: item.code,
            }).then(res=>{
              const { result, errorMessage } =  res.data
              if(result){
                this.todayTeechCkeck(true)
                this.$message.success('删除成功!');
              }else{
                this.$message.success(errorMessage);
              }
            })

        }).catch(() => {
          this.$message.info('已取消删除');
        });
    },

    changeSymptom (value) {
      this.changeCode = value[value.length-1]
      // this.changeName = this.$refs.changeCascader.currentLabels  //为什么取不到值
      // console.log(this.changeName)
      this.options.forEach(item => {
        item.children.forEach(op => {
          if (this.changeCode == op.code) {
            this.changeName = op.name
          }
        })
      })
    },

    setSymptom (value) {
      this.addParentCode = value[value.length-1]
      this.addParentName = this.$refs.setCascader.currentLabels
    },

    // 新增
    saveAddSchedule() {
      const { createDate, remark, dentalPosition } = this.ScheduleModel;
      if (dentalPosition == '') {
        this.$message.error("请选择牙位")
        return false
      }
      this.$refs['form'].validate((valid) => {
        if (valid) {
            this.$http.post("/api/hx/toochCkeck/add.do", {
              createDate,
              dentalPosition,
              remark,
              patientNo: this.patientNo,
              symptom: this.addParentName.pop(),  //症状name
              remark2: this.addParentCode,  //症状code
            })
            .then(res => {
              const { result, errorMessage } = res.data;
              if (result) {
                this.isAddRecord = false;
                this.todayTeechCkeck(true);
                this.$message.success( "添加成功！")
              } else {
                this.$message.error(errorMessage);
              }
            })
        }else{
          console.log('submit error')
        }
      })
    },

    // 保存修改记录
    updateSchedule() {
      const { dentalPosition, remark } = this.ScheduleModel;
      const { code, createDate } = this.currentScheduleItem;
      this.$refs['form'].validate((valid) => {
        if (valid) {
            this.$http.post("/api/hx/toochCkeck/edit.do", {
              code,
              dentalPosition,
              createDate,
              remark,
              symptom: this.changeName,  //症状name
              remark2: this.changeCode,  //症状code
              patientNo: this.patientNo,
            })
            .then(res => {
              const { result, errorMessage, returnObject } = res.data;
              if (result) {
                this.currentScheduleKey = "";
                this.todayTeechCkeck(true);
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
    },

    //反显牙位
    chooseTeethPosition (item, type) {
      this.showTeethView = true
      this.clearAll()
      if (type == 'edit') {
        if (item.dentalPosition.slice(0,1) == 1) {
          this.commonFun(item, this.permanentTeeth1)
        }
        if (item.dentalPosition.slice(0,1) == 2) {
          this.commonFun(item, this.permanentTeeth2)
        }
        if (item.dentalPosition.slice(0,1) == 3) {
          this.commonFun(item, this.permanentTeeth3)
        }
        if (item.dentalPosition.slice(0,1) == 4) {
          this.commonFun(item, this.permanentTeeth4)
        }
        if (item.dentalPosition.slice(0,1) == 5) {
          this.commonFun(item, this.babyTeeth5)
        }
        if (item.dentalPosition.slice(0,1) == 6) {
          this.commonFun(item, this.babyTeeth6)
        }
        if (item.dentalPosition.slice(0,1) == 7) {
          this.commonFun(item, this.babyTeeth7)
        }
        if (item.dentalPosition.slice(0,1) == 8) {
          this.commonFun(item, this.babyTeeth8)
        }
      }
    },

    //点击选择牙位
    chooseBabyTooth (item, num) {
      this.ScheduleModel.dentalPosition = item.value
      this.clearAll()
      if (typeof item.checked === 'undefined') {
        this.$set(item, 'checked', true)
      } else {
        item.checked = !item.checked
      }

    },

    //保存选中的牙位
    saveTeethPosition () {
      if (!this.ScheduleModel.dentalPosition) {
        this.$message.error("请先选择牙位!")
        return false
      }
      if (!this.isAddRecord) {
        this.currentScheduleItem.dentalPosition = this.ScheduleModel.dentalPosition
      }
      this.showTeethView = false
    },

    //获取症状列表
    getSymptomList () {
      this.$http.post("/api/hx/patientSymptom/list.do")
        .then(res => {
          if (res.data.result) {
            this.options = res.data.returnObject
          } else {
            console.log(res.data.errorMessage);
          }
        })
    },

    //反显方法
    commonFun (item,obj) {
      obj.forEach(op => {
        if(op.value == item.dentalPosition) {
          op.checked = true
        } else {
          op.checked = false
        }
      })
    },

    clearAll () {
      this.clearPermanentTeeth1()
      this.clearPermanentTeeth2()
      this.clearPermanentTeeth3()
      this.clearPermanentTeeth4()
      this.clearBabyTeeth5()
      this.clearBabyTeeth6()
      this.clearBabyTeeth7()
      this.clearBabyTeeth8()
    },

    //清空
    clearPermanentTeeth1 (flag) {
      this.permanentTeeth1.forEach(item => {
          if (item.checked) {
            item.checked = false
          }
      })
    },
    //清空
    clearPermanentTeeth2 (flag) {
      this.permanentTeeth2.forEach(item => {
          if (item.checked) {
            item.checked = false
          }
      })
    },

    //清空
    clearPermanentTeeth3 (flag) {
      this.permanentTeeth3.forEach(item => {
          if (item.checked) {
            item.checked = false
          }
      })
    },
    //清空
    clearPermanentTeeth4 (flag) {
      this.permanentTeeth4.forEach(item => {
          if (item.checked) {
            item.checked = false
          }
      })
    },
    //清空
    clearBabyTeeth5 (flag) {
      this.babyTeeth5.forEach(item => {
          if (item.checked) {
            item.checked = false
          }
      })
    },
    //清空
    clearBabyTeeth6 (flag) {
      this.babyTeeth6.forEach(item => {
          if (item.checked) {
            item.checked = false
          }
      })
    },
    //清空
    clearBabyTeeth7 (flag) {
      this.babyTeeth7.forEach(item => {
          if (item.checked) {
            item.checked = false
          }
      })
    },
    //清空
    clearBabyTeeth8 (flag) {
      this.babyTeeth8.forEach(item => {
          if (item.checked) {
            item.checked = false
          }
      })
    },

    getTimeList () {
      this.$http.post("/api/hx/toochCkeck/timeList.do",{
        patientNo: this.patientNo
      }).then(res => {
        if (res.data.result) {
          this.selectTimeList = res.data.returnObject
        } else {
          this.$message.error(res.data.errorMessage)
        }
      })
    },

    seliceTime (date) {
      if (date) {
        return date.slice(0,10)
      }
    },

  },

};
</script>
<style lang="less" scoped>
.ClassSettingTableBox {
  width: 100%;
  text-align: center;
  tr td {
    border: 1px solid #eeeeee;
    width: 12.5%;
    height: 60px;
    position: relative;
  }
}

  .tooth-dropdown-view{
    background-color: #fff;
    border: 1px solid #ebebeb;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
    padding: 10px 10px 30px 10px;
    min-width: 600px;

    .wrapper{
      position: relative;

      .tooth-dropdown-main{
        position: relative;

        .tooth-row{
          td:nth-child(1){
            padding-right: 4px;
          }
          td:nth-child(3){
            padding-left: 9px;
          }
        }

        .tooth-row-offet-3{
          padding-left: 120px;
        }

        .tooth-group{
            margin-bottom: 4px;
        }

        .vertical-gap{
          border-right: 1px solid #9397a2;
        }

        .horizontal-gap{
          font-size: 12px;
          color: #a4a5a9;
          text-align: center;
          &:after{
            content: ' ';
            width: 600px;
            display: block;
            position: absolute;
            left: 0;
            border-top: 1px solid #9397a2;
            top: 70px;
          }

          span{
            background-color: #fff;
            display: inline-block;
            z-index: 2;
            position: relative;
            padding: 0 2px;
          }
        }

        .tootn-btn{
          height: 28px;
          line-height: 28px;
          font-size: 14px;
          color: #575d6a;
          text-align: center;
          background-color: #fff;
          display: inline-block;
          cursor: pointer;
          border: 1px solid #e9edf1;
          box-sizing: border-box;
          position: relative;
          user-select: none;
          width: 32px;
          margin-right: 4px;
          &:hover{
            background-color: #e5f7f7;
          }
          &.actived{
            box-shadow: inset 0 0 0 4px rgba(255,255,255,.3), 0 2px 4px rgba(43,56,80,.2);
            border-color: #73c0d9;
          }
          &.checked{
            background-color: #00a6c9;
            color: #fff;
            border: 1px solid #00a6c9;
          }
        }
      }

    }
  }
</style>
