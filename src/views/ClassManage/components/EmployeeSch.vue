<template>
  <div class="ScheduleBox">
    <div class="headerBox clearfix">
      <div style="float:left">
        <el-radio-group v-model="type" @change="handleRadioChange('type',type)">
          <el-radio-button label="FIXED">固定排班</el-radio-button>
          <el-radio-button label="WEEK">当周排班</el-radio-button>
        </el-radio-group>
      </div>
      <div class="indicateBox" style="float:right">
        <span class="indicatorD">
          <span></span>可约诊
        </span>
        <span class="indicatorC">
          <span></span>不可约诊
        </span>
      </div>
    </div>
    <div class="rolesBox">
      <el-radio-group v-model="roleEnname" @change="handleRadioChange('roleEnname',roleEnname)">
        <el-radio-button label="SYS_SHOP_DOCTOR">医生</el-radio-button>
        <el-radio-button label="SYS_SHOP_ADVISORY">咨询师</el-radio-button>
        <el-radio-button label="SYS_SHOP_NURSE">护士</el-radio-button>
      </el-radio-group>
    </div>
    <table class="ScheduleTableBox">
      <tr v-if= "type === 'WEEK'">
        <td>
          <i class="iconfont icon-shizhong"></i>
        </td>
        <td v-for="(item,index) in weekDate" :key="index">{{item}}</td>
      </tr>
      <tr>
        <td>
          <i class="iconfont icon-user"></i>
        </td>
        <td>星期一</td>
        <td>星期二</td>
        <td>星期三</td>
        <td>星期四</td>
        <td>星期五</td>
        <td>星期六</td>
        <td>星期日</td>
      </tr>
      <tr v-for="item in tableData" :key="item.memberNameGuid">
        <td class="headerItem">{{item.memberNameGuid}}</td>
        <td>
          <div v-if="item.schedules.length > 0">
              <div v-for="subitem in item.schedules" :key="subitem.code">
                <div 
                  v-if=" subitem.dayNum === 1 " 
                  :class=" subitem.aptFlag ===  'Y' ? 'scuccessBox' : 'errorBox'"
                  >
                    {{subitem.scheduleName}}
                    <span class="operBtnBox">
                      <i class="el-icon-plus" @click="addSingleSchedule(item,1)" />
                      <i class="el-icon-edit-outline" @click="updateSchedule(subitem,item)" />
                      <i class="el-icon-close" @click="deleteSchedule(subitem,item)" />
                    </span>
                  </div>
              </div>
          </div>
          <el-button v-if="!timeObj[item.memberNoGuid].dayNum1"  icon="el-icon-plus" @click="addSingleSchedule(item,1)" circle></el-button>
        </td>
        <td>
          <div v-for="subitem in item.schedules" :key="subitem.code">
             <div 
               v-if=" subitem.dayNum === 2 " 
               :class=" subitem.aptFlag ===  'Y' ? 'scuccessBox' : 'errorBox'"
              >
                {{subitem.scheduleName}}
                <span class="operBtnBox">
                   <i class="el-icon-plus" @click="addSingleSchedule(item,2)" />
                   <i class="el-icon-edit-outline" @click="updateSchedule(subitem,item)" />
                   <i class="el-icon-close" @click="deleteSchedule(subitem,item)" />
                </span>
              </div>
          </div>
          <el-button v-if="!timeObj[item.memberNoGuid].dayNum2"  icon="el-icon-plus" @click="addSingleSchedule(item,2)" circle></el-button>
        </td>
        <td>
          <div v-for="subitem in item.schedules" :key="subitem.code">
             <div 
               v-if=" subitem.dayNum === 3 " 
               :class=" subitem.aptFlag ===  'Y' ? 'scuccessBox' : 'errorBox'"
              >
                {{subitem.scheduleName}}
                <span class="operBtnBox">
                   <i class="el-icon-plus" @click="addSingleSchedule(item,3)" />
                   <i class="el-icon-edit-outline" @click="updateSchedule(subitem,item)" />
                   <i class="el-icon-close" @click="deleteSchedule(subitem,item)" />
                </span>
              </div>
          </div>
          <el-button v-if="!timeObj[item.memberNoGuid].dayNum3"  icon="el-icon-plus" @click="addSingleSchedule(item,3)" circle></el-button>
        </td>
        <td>
          <div v-for="subitem in item.schedules" :key="subitem.code">
             <div 
               v-if=" subitem.dayNum === 4 " 
               :class=" subitem.aptFlag ===  'Y' ? 'scuccessBox' : 'errorBox'"
              >
                {{subitem.scheduleName}}
                <span class="operBtnBox">
                   <i class="el-icon-plus" @click="addSingleSchedule(item,4)" />
                   <i class="el-icon-edit-outline" @click="updateSchedule(subitem,item)" />
                   <i class="el-icon-close" @click="deleteSchedule(subitem,item)" />
                </span>
              </div>
          </div>
          <el-button v-if="!timeObj[item.memberNoGuid].dayNum4" icon="el-icon-plus" @click="addSingleSchedule(item,4)" circle></el-button>
        </td>
        <td>
          <div v-for="subitem in item.schedules" :key="subitem.code">
             <div 
               v-if=" subitem.dayNum === 5 " 
               :class=" subitem.aptFlag ===  'Y' ? 'scuccessBox' : 'errorBox'"
              >
                {{subitem.scheduleName}}
                <span class="operBtnBox">
                   <i class="el-icon-plus" @click="addSingleSchedule(item,5)" />
                   <i class="el-icon-edit-outline" @click="updateSchedule(subitem,item)" />
                   <i class="el-icon-close" @click="deleteSchedule(subitem,item)" />
                </span>
              </div>
          </div>
          <el-button v-if="!timeObj[item.memberNoGuid].dayNum5"  icon="el-icon-plus" @click="addSingleSchedule(item,5)" circle></el-button>
        </td>
        <td>
          <div v-for="subitem in item.schedules" :key="subitem.code">
             <div 
               v-if=" subitem.dayNum === 6 " 
               :class=" subitem.aptFlag ===  'Y' ? 'scuccessBox' : 'errorBox'"
              >
                {{subitem.scheduleName}}
                <span class="operBtnBox">
                   <i class="el-icon-plus" @click="addSingleSchedule(item,6)" />
                   <i class="el-icon-edit-outline" @click="updateSchedule(subitem,item)" />
                   <i class="el-icon-close" @click="deleteSchedule(subitem,item)" />
                </span>
              </div>
          </div>
          <el-button v-if="!timeObj[item.memberNoGuid].dayNum6"  icon="el-icon-plus" @click="addSingleSchedule(item,6)" circle></el-button>
        </td>
        <td>
          <div v-for="subitem in item.schedules" :key="subitem.code">
             <div 
               v-if=" subitem.dayNum === 7 " 
               :class=" subitem.aptFlag ===  'Y' ? 'scuccessBox' : 'errorBox'"
              >
                {{subitem.scheduleName}}
                <span class="operBtnBox">
                   <i class="el-icon-plus" @click="addSingleSchedule(item,7)" />
                   <i class="el-icon-edit-outline" @click="updateSchedule(subitem,item)" />
                   <i class="el-icon-close" @click="deleteSchedule(subitem,item)" />
                </span>
              </div>
          </div>
          <el-button v-if="!timeObj[item.memberNoGuid].dayNum7" icon="el-icon-plus" @click="addSingleSchedule(item,7)" circle></el-button>
        </td>
      </tr>
      <tr v-if="isAddSchedule">
          <td>
          <el-form ref="form1" :model="ScheduleModel" :rules="rules1">
            <el-form-item prop="memberNoGuid" v-if="roleEnname === 'SYS_SHOP_DOCTOR'">
                <el-select v-model="ScheduleModel.memberNoGuid" placeholder="请选择" style="width: 70%;">
                  <el-option
                    v-for="item in this.appVuex.shop_doctor"
                    :key="item.memberNo"
                    :label="item.memberName"
                    :value="item.memberNo">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="memberNoGuid" v-if="roleEnname === 'SYS_SHOP_ADVISORY'">
                <el-select v-model="ScheduleModel.memberNoGuid" placeholder="请选择" style="width: 70%;">
                  <el-option
                    v-for="item in this.appVuex.shop_advisory"
                    :key="item.memberNo"
                    :label="item.memberName"
                    :value="item.memberNo">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="memberNoGuid" v-if="roleEnname === 'SYS_SHOP_NURSE'">
                <el-select v-model="ScheduleModel.memberNoGuid" placeholder="请选择" style="width: 70%;">
                  <el-option
                    v-for="item in this.appVuex.shop_nurse"
                    :key="item.memberNo"
                    :label="item.memberName"
                    :value="item.memberNo">
                  </el-option>
                </el-select>
            </el-form-item>
            </el-form>
          </td>
          <td>
            <div v-if=" daNumObj['dayNum1'].length > 0">
              <div v-for="item in daNumObj['dayNum1']" :key="item.code">
              <div 
                :class=" item.aptFlag ===  'Y' ? 'scuccessBox' : 'errorBox'"
                >
                  {{item.scheduleName}}
                  <span class="operBtnBox">
                    <i class="el-icon-close" @click="removeSingerSchedule('dayNum1',item.code)" />
                  </span>
                </div>
              </div>
            </div>
            <el-button v-if="daNumObj['dayNum1'].length === 0" icon="el-icon-plus" @click="BatchAddSchedule(1)" circle></el-button>
          </td>
          <td>
            <div v-if=" daNumObj['dayNum2'].length > 0">
              <div v-for="item in daNumObj['dayNum2']" :key="item.code">
              <div 
                :class=" item.aptFlag ===  'Y' ? 'scuccessBox' : 'errorBox'"
                >
                  {{item.scheduleName}}
                  <span class="operBtnBox">
                    <i class="el-icon-close" @click="removeSingerSchedule('dayNum2',item.code)" />
                  </span>
                </div>
              </div>
            </div>
            <el-button v-if="daNumObj['dayNum2'].length === 0" icon="el-icon-plus" @click="BatchAddSchedule(2)" circle></el-button>
          </td>
          <td>
            <div v-if=" daNumObj['dayNum3'].length > 0">
              <div v-for="item in daNumObj['dayNum3']" :key="item.code">
              <div 
                :class=" item.aptFlag ===  'Y' ? 'scuccessBox' : 'errorBox'"
                >
                  {{item.scheduleName}}
                  <span class="operBtnBox">
                    <i class="el-icon-close" @click="removeSingerSchedule('dayNum3',item.code)" />
                  </span>
                </div>
              </div>
            </div>
            <el-button v-if="daNumObj['dayNum3'].length === 0" icon="el-icon-plus" @click="BatchAddSchedule(3)" circle></el-button>
          </td>
          <td>
           <div v-if=" daNumObj['dayNum4'].length > 0">
              <div v-for="item in daNumObj['dayNum4']" :key="item.code">
              <div 
                :class=" item.aptFlag ===  'Y' ? 'scuccessBox' : 'errorBox'"
                >
                  {{item.scheduleName}}
                  <span class="operBtnBox">
                    <i class="el-icon-close" @click="removeSingerSchedule('dayNum4',item.code)" />
                  </span>
                </div>
              </div>
            </div>
            <el-button v-if="daNumObj['dayNum4'].length === 0" icon="el-icon-plus" @click="BatchAddSchedule(4)" circle></el-button>
          </td>
          <td>
            <div v-if=" daNumObj['dayNum5'].length > 0">
              <div v-for="item in daNumObj['dayNum5']" :key="item.code">
              <div 
                :class=" item.aptFlag ===  'Y' ? 'scuccessBox' : 'errorBox'"
                >
                  {{item.scheduleName}}
                  <span class="operBtnBox">
                    <i class="el-icon-close" @click="removeSingerSchedule('dayNum5',item.code)" />
                  </span>
                </div>
              </div>
            </div>
            <el-button v-if="daNumObj['dayNum5'].length === 0" icon="el-icon-plus" @click="BatchAddSchedule(5)" circle></el-button>
          </td>
          <td>
            <div v-if=" daNumObj['dayNum6'].length > 0">
              <div v-for="item in daNumObj['dayNum6']" :key="item.code">
              <div 
                :class=" item.aptFlag ===  'Y' ? 'scuccessBox' : 'errorBox'"
                >
                  {{item.scheduleName}}
                  <span class="operBtnBox">
                    <i class="el-icon-close" @click="removeSingerSchedule('dayNum6',item.code)" />
                  </span>
                </div>
              </div>
            </div>
            <el-button v-if="daNumObj['dayNum6'].length === 0" icon="el-icon-plus" @click="BatchAddSchedule(6)" circle></el-button>
          </td>
          <td>
            <div v-if=" daNumObj['dayNum7'].length > 0">
              <div v-for="item in daNumObj['dayNum7']" :key="item.code">
              <div 
                :class=" item.aptFlag ===  'Y' ? 'scuccessBox' : 'errorBox'"
                >
                  {{item.scheduleName}}
                  <span class="operBtnBox">
                    <i class="el-icon-close" @click="removeSingerSchedule('dayNum7',item.code)" />
                  </span>
                </div>
              </div>
            </div>
            <el-button v-if="daNumObj['dayNum7'].length === 0" icon="el-icon-plus" @click="BatchAddSchedule(7)" circle></el-button>
          </td>
        </tr>
        <tr>
          <td colspan="8">
            <el-button v-if="!isAddSchedule" type="primary" icon="el-icon-plus" @click="addSchedule">新增排班</el-button>
            <el-button v-if="isAddSchedule" @click=" isAddSchedule = false ">取消</el-button>
            <el-button v-if="isAddSchedule" type="primary" @click="saveBatchSchedule">保存</el-button>
          </td>
      </tr>
    </table>
    <br>
    <el-pagination
      background
      layout="prev, pager, next"
      current-change="handelCurrentPage"
      :total="total"
    ></el-pagination>
    <el-dialog :title=" operKey === 'add' ? '添加排班': ( operKey === 'update' ? '修改排班': '批量新增排班')" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form2" :model="ScheduleModel" :rules="rules2" v-if="operKey !== 'batchAdd'">
            <el-form-item prop="scheduleCode"  >
                <el-radio-group v-model="ScheduleModel.scheduleCode" style="margin: 20px 0">
                  <el-radio
                    v-for="item in scheduleList"
                    :key="item.code"
                    :label="item.code"
                  >{{item.scheduleName}}</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-form ref="form3" :model="ScheduleModel" :rules="rules3" v-if="operKey === 'batchAdd'" >
            <el-form-item prop="scheduleCodes" >
              <el-checkbox-group v-if="operKey === 'batchAdd'" v-model="ScheduleModel.scheduleCodes" @change="handleScheduleChange">
                  <el-checkbox v-for="item in scheduleList" :label="item.code" :key="item.code">{{item.scheduleName}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible =false">取 消</el-button>
        <el-button type="primary" @click="saveUpdateSchedule">确 定</el-button>
      </span>
    </el-dialog>
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
    var cheackScheduleCodes = (rule, value, callback) => {
        if (value.length > 0 ) {
            callback();
        } else {
          callback(new Error('请选择班次'));
        }
    };
    return {
      type: "FIXED",
      roleEnname: "SYS_SHOP_DOCTOR",
      weekDate: [],
      tableData: [],        
      operKey: '',         // 新增排班/修改排班/批量新增(标识)
      isAddSchedule:false, 
      currentDayNum: 1,
      scheduleItem: {},

      // 表单验证
      ScheduleModel: {
        memberNoGuid: '',  // 当前新增排班员工编号
        scheduleCode: '',  // 单个排班数据
        scheduleCodes: [],
      },

      // 批量排班数据
      scheduleobj: {},   

      // 新增排班临时数据
      daNumObj: {
        dayNum1: [],
        dayNum2: [],
        dayNum3: [],
        dayNum4: [],
        dayNum5: [],
        dayNum6: [],
        dayNum7: []
      },
      scheduleCodes_val: [],
      currentEmployee: {},
      dialogVisible: false,
      scheduleList: [],
      timeObj: {},
      currentSchedulePage: 1,

      rules1: {
        memberNoGuid: [
          { required: true, message: '请选择医生', trigger: 'change' },
        ]
      },

      rules2: {
        scheduleCode: [
           { required: true, message: '请选择班次', trigger: 'change' },
        ]
      },
      rules3: {
        scheduleCodes: [
           { required: true,  validator: cheackScheduleCodes , trigger: 'change' },
        ]
      },
      currentPage: 1, // 当前页码
      limit: 10, // 每页条数
      total: 1 // 总条数
    };
  },
  watch: {},
  computed: {
      ...mapState({
      mutations: state => state["mutations"],
      appVuex: state => state["appVuex"]
    }),
  },
  methods: {

      // 员工排班
    getEmployeeSchedule() {
       const {currentPage, limit, type, roleEnname} = this
       const { memberNoGuid, memberNoMerchant, roleEnnames, shopNo } = this.$cfg.userInfo || storage.get("userInfo");
       this.$http.post('/api/hx/guid/schedule/list.do',{
          start: (currentPage - 1 ) * limit,
          limit: limit,
          shopNo: shopNo,
          merchantNo: memberNoMerchant,
          type: type,
          roleEnname: roleEnname
       }).then(res=>{
          const { result , errorMessage, returnObject } = res.data
          if(result) {
            const { limit, total, rows } = returnObject
            this.timeObj = this.getherScheduleEachDayNum(rows)
            this.total = total
            this.tableData = rows
          } else {
            this.$message({
              type: "error",
              message: errorMessage
            });
          }
       })
    },
    
    // 用于判断是当天是否有排班
    getherScheduleEachDayNum(rows) {
        let obj = {}
        let weekArr  = ['dayNum1','dayNum2','dayNum3','dayNum4','dayNum5','dayNum6','dayNum7']
        rows.forEach(item=>{
          let obj1 = {}
          item.schedules.forEach(subitem=>{
            obj1[weekArr[subitem.dayNum -1]] = obj1[weekArr[subitem.dayNum -1]] ? obj1[weekArr[subitem.dayNum -1]] += 1 : 1
          })
          obj[item.memberNoGuid] = obj1
        })
        return obj
    },

    // 获取班次列表
    getScheduleList(callback) {
        const {currentSchedulePage, limit, type, roleEnname, currentEmployee} = this
        const { memberNoGuid, memberNoMerchant, roleEnnames, shopNo } = this.$cfg.userInfo || storage.get("userInfo");
        this.$http.post('/api/hx/shop/schedule/list.do',{
          start: (currentSchedulePage - 1 ) * 10000,
          limit: 10000,
          shopNo: shopNo,
          merchantNo: memberNoMerchant
        }).then(res=>{
          const { result , errorMessage, returnObject } = res.data
          if(result) {
            const { limit, total, rows } = returnObject
            this.scheduleList = rows
            if(callback) callback()
          } else {
            this.$message({
              type: "error",
              message: errorMessage
            });
          }
        })
    },

    // 修改排班
    updateSchedule(scheduleItem,currentEmployee) {
      this.scheduleItem = scheduleItem
      this.currentEmployee = currentEmployee
      this.ScheduleModel.scheduleCode = scheduleItem.scheduleCode
      this.getScheduleList(()=>{
        this.dialogVisible = true
        this.operKey = 'update'
      })
    },
    
    // 保存修改
    saveUpdateSchedule() {
      const { type, scheduleItem , currentEmployee , currentDayNum, operKey, ScheduleModel} = this
      const { scheduleCodes,scheduleCode } = ScheduleModel
      const { dayNum } = scheduleItem
      const { memberNoGuid } = currentEmployee
      if( operKey === 'update') {
        this.$http.post('/api/hx/guid/schedule/edit.do',{
          memberNoGuid,
          type,
          dayNum,
          scheduleCodes: scheduleCode
        }).then(res=>{
          const { result , errorMessage, returnObject } = res.data
            if(result) {
              this.getEmployeeSchedule()
              this.dialogVisible = false
              this.$message({
                type: "success",
                message: '修改成功！'
              });
            } else {
              this.$message({
                type: "error",
                message: errorMessage
              });
            }
        })
      }

      if( operKey === 'add'){
        this.$http.post('/api/hx/guid/schedule/add.do',{
          memberNoGuid,
          type,
          dayNum:currentDayNum,
          scheduleCode: scheduleCode
        }).then(res=>{
          const { result , errorMessage, returnObject } = res.data
            if(result) {
              this.getEmployeeSchedule()
              this.dialogVisible = false
              this.$message({
                type: "success",
                message: '添加成功！'
              });
            } else {
              this.$message({
                type: "error",
                message: errorMessage
              });
            }
        })
      }

      if(operKey === 'batchAdd') {
        this.$refs['form3'].validate((valid) => {
          if (valid) {
            this.gtherAddTempData(currentDayNum)
            this.dialogVisible = false
          }else{
            console.log('submit error')
          }
        })
      }
      
    },

    // 收集新增排班临时数据
    gtherAddTempData(currentDayNum) {
        let weekArr  = ['dayNum1','dayNum2','dayNum3','dayNum4','dayNum5','dayNum6','dayNum7']
        let obj = {}
        obj['dayNum'] = currentDayNum
        this.daNumObj[weekArr[currentDayNum-1]] = this.scheduleList.filter(item=>this.scheduleCodes_val.indexOf(item.code) !== -1)
        obj['scheduleCodes'] = this.scheduleCodes_val
        this.scheduleobj[weekArr[currentDayNum-1]] = obj
    },

    // 保存批量新增班次
    saveBatchSchedule() {
        const { type , ScheduleModel, scheduleCodes_val, scheduleList, scheduleobj } = this
        const { memberNoGuid } = ScheduleModel
        const scheduleJson = []
        for(let key in scheduleobj){
          const obj = {}
          if(scheduleobj[key].scheduleCodes){
              obj['dayNum']=  scheduleobj[key].dayNum
              obj['scheduleCodes'] = scheduleobj[key].scheduleCodes.join(',')
              scheduleJson.push(obj)
          }
        }
        this.$refs['form1'].validate((valid) => {
          if (valid) {
            this.$http.post('/api/hx/guid/schedule/addBatch.do',{
               memberNoGuid,
               type,
               scheduleJson: JSON.stringify(scheduleJson)
            }).then(res=>{
                const { result , errorMessage, returnObject } = res.data
                if(result) {
                  this.getEmployeeSchedule()
                  this.isAddSchedule = false
                  // 清空临时数据
                  this.scheduleobj = {}
                  // 清空临时数据
                  for(let key in this.daNumObj) {
                    this.daNumObj[key] = []
                  }
                  this.$message({
                    type: "success",
                    message: '新增成功！'
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
    
    // 删除某个班次(批量增加的时候)
    removeSingerSchedule(dayKey, code) {
      this.daNumObj[dayKey] = this.daNumObj[dayKey].filter(item=>item.code !== code)
    },

    // 新增当天某一班次
    addSingleSchedule(currentEmployee,dayNum) {
      this.currentEmployee = currentEmployee
      this.getScheduleList(()=>{
        this.dialogVisible = true
        this.operKey = 'add'
        this.currentDayNum = dayNum
      })
    },
    
    // 批量新增班次
    BatchAddSchedule(dayNum) {
      this.ScheduleModel.scheduleCodes = []
      this.getScheduleList(()=>{
        this.dialogVisible = true
        this.operKey = 'batchAdd'
        this.currentDayNum = dayNum
      })
    },
    
    // 多选操作
    handleScheduleChange(checkeds) {
       this.scheduleCodes_val = checkeds
    },

    // 新增排班
    addSchedule() {
      this.isAddSchedule = true
    },

    // 删除排班
    deleteSchedule(scheduleItem) {
      const { code } = scheduleItem
      this.$confirm('真的要删除该排班吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$http.post('/api/hx/guid/schedule/remove.do',{
              code
            }).then(res=>{
              const { result, errorMessage } =  res.data
              if(result){
                this.getEmployeeSchedule()
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
    
    // 班次列表分页
    handelCurrentSchedulePage(currentPage) {
       this.currentSchedulePage = currentPage
       this.getScheduleList()
    },
    // 分页
    handelCurrentPage(currentPage) {
      this.currentPage = currentPage
      this.getEmployeeSchedule()
    },

    // 查询
    handleRadioChange(key, val) {
       this[key] = val
       this.isAddSchedule = false
       this.resetAddScheduleForm()
       this.getEmployeeSchedule()
    },
    
    // 重置新增班次表单
    resetAddScheduleForm() {
      this.ScheduleModel.memberNoGuid = ''
      this.ScheduleModel.scheduleobj = {}
      this.scheduleCodes_val = []
    },
    
    handleDateView() {
      var d = this.getMonDate();
      var arr = [];
      for (var i = 0; i < 7; i++) {
        arr.push(
          d.getFullYear() + "-" +(d.getMonth() + 1) +"-" + d.getDate()
        );
        d.setDate(d.getDate() + 1);
      }
      
      this.weekDate = arr
    },
    getMonDate() {
      var d = new Date(),
        day = d.getDay(),
        date = d.getDate();
      if (day == 1) return d;
      if (day == 0) d.setDate(date - 6);
      else d.setDate(date - day + 1);
      return d;
    },
  },
  created() {},
  mounted() {
    this.handleDateView();
    this.getEmployeeSchedule()
  }
};
</script>
<style lang="less" scoped>
.headerBox {
  background-color: #eeeeee;
  padding: 20px;
  .indicateBox {
    line-height: 40px;
    .indicatorD,
    .indicatorC {
      margin-right: 10px;
    }
  }
}
.rolesBox {
  padding: 20px 0;
  text-align: center;
}

.ScheduleTableBox {
  width: 100%;
  text-align: center;
  tr td {
    border: 1px solid #eeeeee;
    width: 12.5%;
    height: 80px;
    position: relative;
  }
  tr td:hover{
    .operBtnBox{
      display: block;
    }
  }
}
.headerItem {
    height: 50px;
    color: #33bbc5;
    font-weight: bold;
    font-size: 18px;
}
.operBtnBox{
  position: absolute;
  top:5px;
  right: 5px;
  display: none;
  line-height: normal;
  i{
    margin-right: 5px;
    cursor: pointer;
  }
}
.updateBtn{

}
.scuccessBox{
  background: #67c23a;
  color: #ffffff;
  height: 80px;
  position: relative;
  line-height: 80px;
}
.scuccessBox:hover,.errorBox:hover{
  transition: 0.3s;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.4);
}
.errorBox{
  height: 80px;
  background: #E6A23C;
  color: #ffffff;
  position: relative;
  line-height: 80px;
}
</style>