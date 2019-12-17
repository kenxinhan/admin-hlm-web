<template>
  <div class="">
    <el-card>
      <div class="tree-container">
        <div style="margin-bottom:10px;">
          <el-input size="small" placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
        </div>
        <el-tree
          ref="tree"
          :data="TemplateList"
          node-key="code"
          default-expand-all
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          @node-click="treeNodeClick">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.name }}</span>
          </span>
        </el-tree>
      </div>

      <div class="detail-container" v-if="nodeName == '牙骨' || nodeName == '牙型' || nodeName == '主诉' || nodeName == '问题' || nodeName == '矫治目标' || nodeName == '治疗步骤'">
        <div v-if="showDetail">
          <div class="detail-head">
            <span>{{nodeName}}</span>
          </div>
          <el-form ref="form" :model="ScheduleModel" :rules="rules">
            <table class="ClassSettingTableBox">
              <tr>
                <td>序号</td>
                <td>内容</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item, index) in checkedList" :key="item.code">
                <td>{{index + 1}}</td>
                <td>
                  <span v-if="currentScheduleKey !== item.code">{{item.name}}</span>
                  <span v-if="currentScheduleKey === item.code">
                    <el-form-item prop="name">
                      <el-input v-model="ScheduleModel.name" maxlength="50" placeholder="请输入内容" style="width: 90%"></el-input>
                    </el-form-item>
                  </span>
                </td>
                <td>
                  <div v-if="currentScheduleKey === item.code">
                    <el-button size="mini" type="primary" @click="updateSchedule(item)">保存</el-button>
                    <el-button size="mini" @click=" currentScheduleKey ='' ">取消</el-button>
                  </div>
                  <div v-if="currentScheduleKey !== item.code">
                    <el-button type="text" icon="el-icon-edit-outline" @click="editSchedule(item)">编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" @click="deleteSchedule(item)">删除</el-button>
                    <span  v-if="nodeName == '治疗步骤'">
                      <el-button type="text" :disabled="index == 0" icon="el-icon-top" @click="moveSteps(item, index, true)">上移</el-button>
                      <el-button type="text" :disabled="index == checkedList.length -1" icon="el-icon-bottom" @click="moveSteps(item, index, false)">下移</el-button>
                    </span>

                  </div>
                </td>
              </tr>

              <tr v-if="isAddRecord">
                <td>{{checkedList.length + 1}}</td>
                <td>
                  <el-form-item prop="name">
                    <el-input v-model="ScheduleModel.name" maxlength="50" placeholder="请输入内容"style="width: 90%"></el-input>
                  </el-select>
                  </el-form-item>
                </td>
                <td>
                  <div>
                    <el-button size="mini" type="primary"  @click="saveAddSchedule">保存</el-button>
                    <el-button size="mini" @click=" isAddRecord = false ">取消</el-button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="5">
                  <el-button type="primary" icon="el-icon-plus" @click="addSchedule">添加</el-button>
                </td>
              </tr>
            </table>
          </el-form>
        </div>
      </div>

      <!-- 知情同意书 -->
      <div class="detail-container" v-if="nodeName == '知情同意书'">
        <div class="detail-head">
          <span>{{nodeName}}</span>
          <el-button size="medium" @click="addInform()">新建</el-button>
        </div>
        <div class="">
          <el-table :data="informData" style="width: 100%">
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="标题" property="title"></el-table-column>
            <el-table-column label="内容" property="content"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="handleDetail(scope.row)">详情</el-button>
                <el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>


      <!-- 治疗方案 -->
      <div class="detail-container" v-if="nodeName == '治疗方案' ">
        <div v-if="showDetail">
          <div class="detail-head">
            <span>{{nodeName}}</span>
          </div>
          <el-form ref="form" :model="ScheduleModel" :rules="rules">
            <table class="ClassSettingTableBox">
              <tr>
                <td>序号</td>
                <td>方案</td>
                <td>步骤</td>
                <td>是否启用</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item, index) in checkedList" :key="item.code">
                <td>{{index + 1}}</td>
                <td>
                  <span v-if="currentScheduleKey !== item.code">{{item.name}}</span>
                  <span v-if="currentScheduleKey === item.code">
                    <el-form-item prop="name">
                      <el-input v-model="ScheduleModel.name" maxlength="50" placeholder="请输入内容" style="width: 90%"></el-input>
                    </el-form-item>
                  </span>
                </td>
                <td>
                  <span v-if="currentScheduleKey !== item.code">
                    <span v-if="item.step != ''">
                      <el-button type="text" icon="el-icon-add" @click="stepsDetail(item)">步骤详情</el-button>
                    </span>
                    <span v-if="item.step == ''">
                      <el-button type="text" icon="el-icon-add" @click="treatmentSteps(item)">关联步骤</el-button>
                    </span>
                  </span>
                  <span v-if="currentScheduleKey === item.code">关联步骤</span>
                </td>
                <td>
                  <span v-if="currentScheduleKey !== item.code">
                    {{item.status == 1 ? '已启用' : '停用'}}
                  </span>
                  <span v-if="currentScheduleKey === item.code">
                    <el-switch
                      style="display: block"
                      v-model="ScheduleModel.status"
                      active-value="1"
                      inactive-value="2"
                      active-text="启用"
                      inactive-text="停用">
                    </el-switch>
                  </span>
                </td>
                <td>
                  <div v-if="currentScheduleKey === item.code">
                    <el-button size="mini" type="primary" @click="updatePlan(true)">保存</el-button>
                    <el-button size="mini" @click=" currentScheduleKey ='' ">取消</el-button>
                  </div>
                  <div v-if="currentScheduleKey !== item.code">
                    <el-button type="text" icon="el-icon-edit-outline" @click="editSchedule(item)">编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" @click="deleteSchedule(item)">删除</el-button>
                  </div>
                </td>
              </tr>

              <tr v-if="isAddRecord">
                <td>{{checkedList.length + 1}}</td>
                <td>
                  <el-form-item prop="name">
                    <el-input v-model="ScheduleModel.name" maxlength="50" placeholder="请输入内容"style="width: 90%"></el-input>
                  </el-select>
                  </el-form-item>
                </td>
                <td>
                  <span>关联步骤</span>
                </td>
                <td>
                  <el-switch
                    style="display: block"
                    v-model="ScheduleModel.status"
                    active-value="1"
                    inactive-value="2"
                    active-text="启用"
                    inactive-text="停用">
                  </el-switch>
                </td>
                <td>
                  <div>
                    <el-button size="mini" type="primary"  @click="saveAddSchedule">保存</el-button>
                    <el-button size="mini" @click=" isAddRecord = false ">取消</el-button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="5">
                  <el-button type="primary" icon="el-icon-plus" @click="addSchedule">新增方案</el-button>
                </td>
              </tr>
            </table>
          </el-form>
        </div>
      </div>

    </el-card>

    <el-dialog :title="dialogTitle" :visible.sync="showInform">
        <el-form :inline="true" label-width="100px" ref="submitForm" :model="submitForm" :rules="submitFormRules" style="margin: 20px 0;">
            <el-form-item label="标题" prop="title">
              <el-input placeholder="请输入标题" :disabled="addDisabled" v-model="submitForm.title" style="width: 600px"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="内容" prop="content">
              <el-input type="textarea" :rows="12" :disabled="addDisabled" placeholder="请输入内容" v-model="submitForm.content" style="width: 600px"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <span v-if="dialogTitle == '新增知情同意书'">
            <el-button type="primary" @click="handelAdd()">新增</el-button>
          </span>
          <span v-if="dialogTitle == '编辑知情同意书'">
            <el-button type="primary" @click="handleUpdate()">保存</el-button>
          </span>
          <el-button @click="showInform = false ">关闭</el-button>
        </span>
    </el-dialog>

    <!-- 治疗方案 -->
    <el-dialog :title="diffTitle" :visible.sync="showStepsDialog">
      <el-table :data="configStepsList" @selection-change="handleSelectionChange" ref="multipleTable" tooltip-effect="dark" style="width: 100%">
        <span v-if="diffDialog">
          <el-table-column type="selection" width="55"> </el-table-column>
        </span>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="name" label="步骤"></el-table-column>
      </el-table>
        <span slot="footer" class="dialog-footer">
          <span v-if="diffDialog">
            <el-button type="primary" @click="updatePlan(false)">保存</el-button>
          </span>
          <el-button @click="showStepsDialog = false ">关闭</el-button>
        </span>
    </el-dialog>

  </div>
</template>


<script>
import storage from '@/tools/local_storage.js'

export default {
    components:{},
    props:{
      TemplateList: {
        type: Array,
        default: ()=>({})
      }
    },
    data() {
      return {
        userInfo:  storage.get('userInfo'),
        templateList: [],
        filterText: '',
        showDetail: false,
        isAddRecord: false,
        ScheduleModel: {
          status: '1',
          name: '',
        },
        rules: {
            name: [
              { required: true, message: '请输入内容', trigger: 'blur' }
            ]
        },
        currentScheduleKey: "",
        checkedList: [],
        informData: [],
        currentScheduleItem: {},  //编辑保存
        nodeName: '', //点击节点名称
        showInform: false,
        addDisabled: false,
        dialogTitle: '',
        submitForm: {
          title: '',
          content: '',
        },
        submitFormRules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
        },
        configStepsList: [],
        showStepsDialog: false,
        diffDialog: true,
        diffTitle: '关联步骤',
        multipleSelection: [],
        maxSort: '',

      }
    },
    watch: {
        filterText(val) {
          this.$refs.tree.filter(val);
        }
      },
    mounted() {

    },
    methods: {

      //新增
      addSchedule() {
        this.getMaxSort()
        this.isAddRecord = true;
        this.currentScheduleKey = '';
        this.ScheduleModel.name = "";
      },

      // 新增
      saveAddSchedule() {
        const { name } = this.ScheduleModel;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.nodeName == '牙骨') {
              this.addDentale(name, '2')
            }
            if (this.nodeName == '牙型') {
              this.addDentale(name, '1')
            }
            if (this.nodeName == '主诉') {
              this.addOrthodonticsPlan(name, '1')
            }
            if (this.nodeName == '问题') {
              this.addOrthodonticsPlan(name, '2')
            }
            if (this.nodeName == '矫治目标') {
              this.addOrthodonticsPlan(name, '3')
            }
            if (this.nodeName == '治疗步骤') {
              this.addOrthodonticsPlan(name, '4')
            }
            if (this.nodeName == '治疗方案') {
              this.addTreatmentPlan(name)
            }
          }else{
            console.log('submit error')
          }
        })
      },

      // 编辑记录
      editSchedule(item) {
        const { code, name } = item;
        this.isAddRecord = false;
        this.currentScheduleItem = item;
        this.currentScheduleKey = code;
        this.ScheduleModel.name = name;
      },

      // 保存修改记录
      updateSchedule() {
        const { name } = this.ScheduleModel;
        const { code } = this.currentScheduleItem;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.nodeName == '牙骨') {
              this.editDentale(name, '2', code)
            }
            if (this.nodeName == '牙型') {
              this.editDentale(name, '1', code)
            }
            if (this.nodeName == '主诉') {
              this.editOrthodonticsPlan(name, '1', code)
            }
            if (this.nodeName == '问题') {
              this.editOrthodonticsPlan(name, '2', code)
            }
            if (this.nodeName == '矫治目标') {
              this.editOrthodonticsPlan(name, '3', code)
            }
            if (this.nodeName == '治疗步骤') {
              this.editOrthodonticsPlan(name, '4', code)
            }

          }else{
            console.log('submit error')
          }
        })
      },

      //删除
      deleteSchedule(item) {
        this.$confirm('真的要删除该条内容吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.nodeName == '牙骨') {
              this.deleteDentale(item.code, '2')
            }
            if (this.nodeName == '牙型') {
              this.deleteDentale(item.code, '1')
            }
            if (this.nodeName == '主诉') {
              this.deleteOrthodonticsPlan(item.code, '1')
            }
            if (this.nodeName == '问题') {
              this.deleteOrthodonticsPlan(item.code, '2')
            }
            if (this.nodeName == '矫治目标') {
              this.deleteOrthodonticsPlan(item.code, '3')
            }
            if (this.nodeName == '治疗步骤') {
              this.deleteOrthodonticsPlan(item.code, '4')
            }
            if (this.nodeName == '治疗方案') {
              this.deletePlan(item.code)
            }
          }).catch(() => {
            this.$message.info('已取消删除');
          });
      },


      //查看模板目录
      treeNodeClick(data, node, vuecomponent){
        this.nodeName = data.name
        if (data.type == 2) {
          this.showDetail = true
          if (data.name == '牙骨') {
             this.getDentaleDetail('2')
          }
          if (data.name == '牙型') {
             this.getDentaleDetail('1')
          }
          if (data.name == '主诉') {
             this.detailOrthodonticsPlan('1')
          }
          if (data.name == '问题') {
             this.detailOrthodonticsPlan('2')
          }
          if (data.name == '矫治目标') {
             this.detailOrthodonticsPlan('3')
          }
          if (data.name == '治疗步骤') {
             this.detailOrthodonticsPlan('4')
          }
          if (data.name == '治疗方案') {
            this.treatmentPlanList()
          }
          if (data.name == '知情同意书') {
            this.informedconsentList()
          }
        } else {
          this.showDetail = false
        }
      },

      filterNode(value, data) {
          if (!value) return true;
          return data.name.indexOf(value) !== -1;
      },

      //牙骨2  牙型1  详情
      getDentaleDetail (type) {
        this.$http.post('/api/hx/diagnosis/list.do',{
          type
        }).then( res => {
          if (res.data.result) {
            this.checkedList = res.data.returnObject.rows
          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
      },

      //新增牙型-1  牙骨-2
      addDentale(name, type) {
        this.$http.post("/api/hx/diagnosis/add.do", {
          name,
          type
        }).then(res => {
          const { result, errorMessage } = res.data;
          if (result) {
            this.isAddRecord = false;
            this.getDentaleDetail(type);
            this.$message.success( "添加成功！")
          } else {
            this.$message.error(errorMessage);
          }
        })
      },

      //编辑牙骨牙型
      editDentale(name, type, code) {
        this.$http.post("/api/hx/diagnosis/edit.do", {
          name,
          type,
          code
        }).then(res => {
          const { result, errorMessage } = res.data;
          if (result) {
            this.currentScheduleKey = ''
            this.getDentaleDetail(type);
            this.$message.success( "编辑成功！")
          } else {
            this.$message.error(errorMessage);
          }
        })
      },

      //删除牙骨牙型
      deleteDentale(code, type) {
        this.$http.post("/api/hx/diagnosis/del.do", {
          code
        }).then(res => {
          const { result, errorMessage } = res.data;
          if (result) {
            this.isAddRecord = false;
            this.getDentaleDetail(type);
            this.$message.success( "删除成功！")
          } else {
            this.$message.error(errorMessage);
          }
        })
      },

      //详情  1主诉 2问题 3矫治目标 4治疗步骤
      detailOrthodonticsPlan(type) {
        this.$http.post('/api/hx/orthodonticsPlan/list.do',{
          type
        }).then( res => {
          if (res.data.result) {
            this.checkedList = res.data.returnObject.rows

          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
      },



      //新增  1主诉 2问题 3矫治目标 4治疗步骤
      addOrthodonticsPlan(name, type) {
        // let sort = this.checkedList.length + 1
        let params = {
          name,
          type
        }
        if (type == '4') {
          params.sort = this.maxSort + 1
        }

        this.$http.post("/api/hx/orthodonticsPlan/add.do", params).then(res => {
          const { result, errorMessage } = res.data;
          if (result) {
            this.isAddRecord = false;
            this.detailOrthodonticsPlan(type);
            this.$message.success( "添加成功！")
          } else {
            this.$message.error(errorMessage);
          }
        })
      },

      //编辑  1主诉 2问题 3矫治目标 4治疗步骤
      editOrthodonticsPlan(name, type, code) {
        this.$http.post("/api/hx/orthodonticsPlan/edit.do", {
          name,
          code,
          nextCode: '',
          nextSort: '',
          move: false,
        }).then(res => {
          const { result, errorMessage } = res.data;
          if (result) {
            this.currentScheduleKey = ''
            this.detailOrthodonticsPlan(type);
            this.$message.success( "编辑成功！")
          } else {
            this.$message.error(errorMessage);
          }
        })
      },

      //删除 1主诉 2问题 3矫治目标 4治疗步骤
      deleteOrthodonticsPlan(code, type) {
        this.$http.post("/api/hx/orthodonticsPlan/del.do", {
          code
        }).then(res => {
          const { result, errorMessage } = res.data;
          if (result) {
            this.isAddRecord = false;
            this.detailOrthodonticsPlan(type);
            this.$message.success( "删除成功！")
          } else {
            this.$message.error(errorMessage);
          }
        })
      },

      //移动步骤
      moveSteps(item, index, flag) {
        let next
        if (flag) {
          next = this.checkedList[index - 1]
        } else {
          next = this.checkedList[index + 1]
        }

        this.$http.post("/api/hx/orthodonticsPlan/edit.do", {
          // name: item.name,
          code: item.code,
          sort: item.sort,
          nextCode: next.code,
          nextSort: next.sort,
          move: true
        }).then(res => {
          const { result, errorMessage } = res.data;
          if (result) {
            this.detailOrthodonticsPlan('4');
            this.$message.success( "操作成功！")
          } else {
            this.$message.error(errorMessage);
          }
        })
      },

//------- 治疗方案 -------//
  //治疗步骤列表
  treatmentSteps(item) {
    const { code, name } = item;
    this.currentScheduleItem = item;
    this.showStepsDialog = true
    this.diffDialog = true
    this.diffTitle = '关联步骤'

    this.$http.post('/api/hx/orthodonticsPlan/list.do',{
      type: '4'
    }).then( res => {
      if (res.data.result) {
        this.configStepsList = res.data.returnObject.rows
      } else {
        this.$message.error(res.data.errorMessage)
      }
    })
  },

  //治疗方案列表
  treatmentPlanList() {
    this.$http.post('/api/hx/treatmentPlan/list.do').then( res => {
      if (res.data.result) {
        this.checkedList = res.data.returnObject.rows
      } else {
        this.$message.error(res.data.errorMessage)
      }
    })
  },

  //新增
  addTreatmentPlan(name) {
    this.$http.post('/api/hx/treatmentPlan/add.do',{
      name,
      step: '',
    }).then( res => {
      if (res.data.result) {
        this.isAddRecord = false;
        this.treatmentPlanList()
        this.$message.success( "添加成功！")
      } else {
        this.$message.error(res.data.errorMessage)
      }
    })
  },

  //更新
  updatePlan(flag) {
    const { name } = this.ScheduleModel;
    const { code, status, step, } = this.currentScheduleItem;
    let params = {
      code,
    }
    if (flag) {
      params.step = step
      params.name = name
      params.status = this.ScheduleModel.status
    } else {
      if (this.multipleSelection.length == 0) {
        this.$message.error('请勾选步骤！')
        return false
      }
      let arr1 = this.multipleSelection.map(item => item.code)
      params.step = arr1.join(',')
      params.status = status
      params.name = this.currentScheduleItem.name
    }
    // console.log(params)
    this.$http.post('/api/hx/treatmentPlan/edit.do',params).then( res => {
      if (res.data.result) {
        if (!flag) {
          this.showStepsDialog = false
        }
        this.currentScheduleKey = ''
        this.treatmentPlanList()
        this.$message.success( "编辑成功！")
      } else {
        this.$message.error(res.data.errorMessage)
      }
    })
  },

  //删除
  deletePlan(code) {
    this.$http.post('/api/hx/treatmentPlan/del.do',{
      code
    }).then( res => {
      if (res.data.result) {
        this.treatmentPlanList()
        this.$message.success( "删除成功！")
      } else {
        this.$message.error(res.data.errorMessage)
      }
    })
  },

  //步骤详情
  stepsDetail(item) {
    const { code, name } = item;
    this.currentScheduleItem = item;
    this.showStepsDialog = true
    this.diffDialog = false
    this.diffTitle = '步骤详情'

    this.$http.post('/api/hx/treatmentPlan/get.do',{
      code: item.code,
      step: item.step
    }).then( res => {
      if (res.data.result) {
        this.configStepsList = res.data.returnObject
      } else {
        this.$message.error(res.data.errorMessage)
      }
    })
  },

  //全选
  handleSelectionChange(val) {
    this.multipleSelection = val;
  },
//------- 治疗方案 -------//


//------- 知情同意书 -------//
  addInform() {
    this.showInform = true
    this.addDisabled = false
    this.dialogTitle = '新增知情同意书'
  },

  //获取知情同意书列表
  informedconsentList() {
    this.$http.post('/api/hx/informedconsent/list.do').then( res => {
      if (res.data.result) {
        this.informData = res.data.returnObject.rows
      } else {
        this.$message.error(res.data.errorMessage)
      }
    })
  },

  //新增同意书
  handelAdd() {
    const { title, content } = this.submitForm
    this.$refs['submitForm'].validate((valid) => {
      if (valid) {
        this.$http.post('/api/hx/informedconsent/add.do',{
          title,
          content
        }).then( res => {
          if (res.data.result) {
            this.showInform = false
            this.informedconsentList()
            this.$message.success( "新增成功！")
          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
      }
    })
  },

  //删除同意书
  handleDelete(row) {
    this.$confirm('真的要删除该条内容吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post("/api/hx/informedconsent/del.do", {
          code: row.code
        }).then(res => {
          const { result, errorMessage } = res.data;
          if (result) {
            this.informedconsentList()
            this.$message.success( "删除成功！")
          } else {
            this.$message.error(errorMessage);
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除');
      });

  },

  //编辑同意书
  handleEdit(row) {
    this.showInform = true
    this.addDisabled = false
    this.dialogTitle = '编辑知情同意书'
    this.submitForm.code = row.code
    this.getDetail(row)
  },

  //更新
  handleUpdate() {
    const { title, content, code } = this.submitForm
    this.$refs['submitForm'].validate((valid) => {
      if (valid) {
        this.$http.post('/api/hx/informedconsent/edit.do',{
          title,
          content,
          code
        }).then( res => {
          if (res.data.result) {
            this.showInform = false
            this.submitForm = {}
            this.informedconsentList()
            this.$message.success( "编辑成功！")
          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
      }
    })
  },

  //详情
  handleDetail(row) {
    this.showInform = true
    this.addDisabled = true
    this.dialogTitle = '知情同意书'
    this.getDetail(row)
  },

  //同意书详情
  getDetail(row) {
    this.$http.post("/api/hx/informedconsent/get.do", {
      code: row.code
    }).then(res => {
      const { result, errorMessage } = res.data;
      if (result) {
        this.submitForm = res.data.returnObject
      } else {
        this.$message.error(errorMessage);
      }
    })
  },

  //------- 知情同意书 -------//
  //查询最大的sort 新增步骤用
  getMaxSort() {
    this.$http.post("/api/hx/orthodonticsPlan/getMaxSort.do",).then(res => {
      const { result, errorMessage } = res.data;
      if (result) {
        this.maxSort = res.data.returnObject
      } else {
        this.$message.error(res.data.errorMessage)
      }
    })
  },


    },

}
</script>

<style lang="less" scoped>
    .tree-container{
      width: 28%;
      display: inline-block;
      padding-right: 15px;
    }
    .detail-container{
      width: 69%;
      display: inline-block;
      border-left: 1px solid #f1f1f1;
      vertical-align: top;

      .detail-head{
        width: 100%;
        padding: 0 20px;
        font-size: 16px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
    }
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


</style>
