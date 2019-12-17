<template>
<div class="ChargeMoney">
  <div class="">
    <el-tabs v-model="activeName">
      <el-tab-pane label="病历模板" name="first">
      </el-tab-pane>
    </el-tabs>
  </div>
  <el-card class="box-card">
    <div class="container">
      <div style="padding-bottom:15px;margin-bottom:15px;border-bottom:1px solid #f1f1f1;">
        <el-button size="mini" @click="createTemplate('addParent')">创建模板目录</el-button>
        <el-button size="mini" @click="createTemplate('add')">创建模板</el-button>
      </div>
      <div class="tree-container">
        <div style="margin-bottom:10px;">
          <el-input size="small" placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
        </div>
        <el-tree
          ref="tree"
          :data="templateList"
          node-key="code"
          default-expand-all
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          @node-click="treeNodeClick">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.name }}</span>
            <span class="fl-r cf" v-if="data.levelCode != 1">
              <el-button type="text" size="mini" @click.stop.prevent="() => remove(node, data)">删除</el-button>
            </span>
          </span>
        </el-tree>
      </div>
      <div class="detail-container">
        <div v-if="showEditDetail">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px"style="max-width:700px;">
            <el-form-item label="上级目录" prop="cascader">
              <el-cascader
                disabled
                ref="myCascader"
                v-model="form.fatherTemplate"
                :options="cascaderData"
                :props="{ checkStrictly: true,value: 'code', label: 'name'}"
                :change-on-select="true"
                 @change="handleChange"
                 expand-trigger="hover"
                clearable
                style="width:400px"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="名称" prop="templateName">
              <el-input :disabled='disTemp' v-model="form.templateName" placeholder="请输入模板名称"></el-input>
            </el-form-item>
        <span v-if="!showFromOther">
            <el-form-item>
              <el-button @click="cancle">取消</el-button>
              <el-button type="primary" @click="editTemplate('form', 'menu')">保存</el-button>
            </el-form-item>
        </span>
        <span v-if="showFromOther">
            <el-form-item label="主诉" prop="mainRemark">
              <el-input type="textarea" v-model="form.mainRemark"></el-input>
            </el-form-item>
            <el-form-item label="现病史" prop="mainCurrentRemark">
              <el-input type="textarea" v-model="form.mainCurrentRemark"></el-input>
            </el-form-item>
            <el-form-item label="既往史" prop="mainPastRemark">
              <el-input type="textarea" v-model="form.mainPastRemark"></el-input>
            </el-form-item>
            <el-form-item label="口腔检查" prop="checkOralRemark">
              <el-input type="textarea" v-model="form.checkOralRemark"></el-input>
            </el-form-item>
            <el-form-item label="辅助检查" prop="checkAuxiliaryRemark">
              <el-input type="textarea" v-model="form.checkAuxiliaryRemark"></el-input>
            </el-form-item>
            <el-form-item label="诊断" prop="planDiagnosisRemark">
              <el-input type="textarea" v-model="form.planDiagnosisRemark"></el-input>
            </el-form-item>
            <el-form-item label="治疗方案" prop="planTreatmentRemark">
              <el-input type="textarea" v-model="form.planTreatmentRemark"></el-input>
            </el-form-item>
            <el-form-item label="处置" prop="dmDisposalRemark">
              <el-input type="textarea" v-model="form.dmDisposalRemark"></el-input>
            </el-form-item>
            <el-form-item label="医嘱" prop="dmMedicalRemark">
              <el-input type="textarea" v-model="form.dmMedicalRemark"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="cancle">取消</el-button>
              <el-button type="primary" @click="editTemplate('form', 'model')">保存</el-button>
            </el-form-item>
        </span>
          </el-form>
        </div>
      </div>
    </div>
  </el-card>

  <el-dialog :title="dialogTitle" :visible.sync="modelParent" center>
    <div>
        <el-form ref="parentForm" :model="parentForm" :rules="parentRules" label-width="100px"style="max-width:700px;min-height:400px;">
          <el-form-item label="上级目录" prop="paramsName">
            <el-cascader
                ref="addParentCascader"
                v-model="parentForm.paramsName"
                :options="cascaderData"
                :props="{ checkStrictly: true,value: 'code', label: 'name', expandTrigger: 'hover' }"
                :change-on-select="true"
                @change="handleChangeParent"
                expand-trigger="hover"
                clearable
                style="width:600px"
                ></el-cascader>
          </el-form-item>
          <el-form-item label="名称" prop="teName">
            <el-input v-model="parentForm.teName" placeholder="请输入模板名称"></el-input>
          </el-form-item>
        <div v-if="!showPropOther">
          <br><br>
          <el-form-item>
            <el-button type="primary" @click="submitForm('parentForm', 'menu')">保存</el-button>
            <el-button @click="modelParent = false">取消</el-button>
          </el-form-item>
        </div>
        <div v-if="showPropOther">
          <el-form-item label="主诉" prop="mainRemark">
            <el-input v-model="parentForm.mainRemark"></el-input>
          </el-form-item>
          <el-form-item label="现病史" prop="mainCurrentRemark">
            <el-input type="textarea" v-model="parentForm.mainCurrentRemark"></el-input>
          </el-form-item>
          <el-form-item label="既往史" prop="mainPastRemark">
            <el-input type="textarea" v-model="parentForm.mainPastRemark"></el-input>
          </el-form-item>
          <el-form-item label="口腔检查" prop="checkOralRemark">
            <el-input type="textarea" v-model="parentForm.checkOralRemark"></el-input>
          </el-form-item>
          <el-form-item label="辅助检查" prop="checkAuxiliaryRemark">
            <el-input type="textarea" v-model="parentForm.checkAuxiliaryRemark"></el-input>
          </el-form-item>
          <el-form-item label="诊断" prop="planDiagnosisRemark">
            <el-input type="textarea" v-model="parentForm.planDiagnosisRemark"></el-input>
          </el-form-item>
          <el-form-item label="治疗方案" prop="planTreatmentRemark">
            <el-input type="textarea" v-model="parentForm.planTreatmentRemark"></el-input>
          </el-form-item>
          <el-form-item label="处置" prop="dmDisposalRemark">
            <el-input type="textarea" v-model="parentForm.dmDisposalRemark"></el-input>
          </el-form-item>
          <el-form-item label="医嘱" prop="dmMedicalRemark">
            <el-input type="textarea" v-model="parentForm.dmMedicalRemark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('parentForm', 'model')">保存</el-button>
            <el-button @click="modelParent = false">取消</el-button>
          </el-form-item>
        </div>

      </el-form>
    </div>
  </el-dialog>

</div>
</template>
<script>
import storage from '@/tools/local_storage.js'

let id = 1000;
export default {
  data() {
    return {
      templateList: [],
      cascaderData: [],
      userInfo:  storage.get('userInfo'),
      activeName:'first',
      dialogTitle: '',
      filterText: '',
      modelParent: false,
      showFromOther: false,
      showPropOther: false,
      disTemp: false,
      showEditDetail: false,
      parentForm: {
        paramsName: '',
        teName: '',
        templateName: "",
        mainRemark: '',
        mainCurrentRemark: '',
        mainPastRemark: '',
        checkOralRemark: '',
        checkAuxiliaryRemark: '',
        planDiagnosisRemark: '',
        planTreatmentRemark: '',
        dmDisposalRemark: '',
        dmMedicalRemark: '',
      },
      parentRules: {
          teName: [
            { required: true, message: '请填写模板目录名称', trigger: 'blur' }
          ],
          paramsName: [
            { type: 'array', required: true, message: '请选择上级目录', trigger: 'blur' }
          ],
      },
      form: {
        code: '',
        fatherTemplate: [],
        templateName: '',
        mainRemark: '',
        mainCurrentRemark: '',
        mainPastRemark: '',
        checkOralRemark: '',
        checkAuxiliaryRemark: '',
        planDiagnosisRemark: '',
        planTreatmentRemark: '',
        dmDisposalRemark: '',
        dmMedicalRemark: '',
      },
      rules: {
          templateName: [
            { required: true, message: '请填写模板名称', trigger: 'blur' },
          ],
          // cascader: [
          //   { type: 'array', required: true, message: '请选择上级目录', trigger: 'blur' }
          // ],
      },
      addParentCodeVal: '',
      addParentCodeName: '',
    }
  },
  watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
  mounted() {
      this.getTopMenu()
  },
  methods: {
    filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
    //获取模板目录
    getTopMenu () {
      this.$http.post('/api/hx/medical/templateList/list.do',{}).then( res => {
        if (res.data.result) {
          let arr = []
          this.cascaderData = this.addDisabled(res.data.returnObject)
          arr = res.data.returnObject
          arr = JSON.parse(JSON.stringify(arr))
          this.templateList = arr
        } else {
          this.$message.error(res.data.errorMessage)
        }

      })
    },

    //创建模板
    createTemplate (name) {
      this.modelParent = true
      if (name == 'addParent') {
        this.dialogTitle = '创建模板目录'
        this.showPropOther = false
      }

      if (name == 'add') {
        this.dialogTitle = '创建模板'
        this.showPropOther = true
      }
    },

    //查看模板目录
    treeNodeClick(data, node, vuecomponent){
       console.log('data:',  data,'\n' ,'node:', node, '\n', 'vuecomponent',vuecomponent)
      this.form.fatherTemplate = []
      this.form.templateName = data.name
      this.form.code = data.code
      this.showEditDetail = true
      if (data.levelCode == 1) {
         this.disTemp = true
      } else {
        this.form.fatherTemplate = data.parentCodes.split(',')
        this.disTemp = false
      }

      if (data.type == 2) {
        this.showFromOther = true
        this.addParentCodeVal = data.parentCode
        //获取病历详情
        this.getTemplateDetail(data.code)
      } else {
        this.showFromOther = false
      }

    },

    //编辑模板
    editTemplate (formName, name) {
      if (name == 'menu') { //编辑模板目录
            if (this.form.templateName) {
              this.$http.post('/api/hx/medical/templateList/edit.do',{
                code: this.form.code,
                name: this.form.templateName
              }).then(res=>{
                if (res.data.result) {
                  this.$message.success("修改成功")
                  this.getTopMenu()
                  this.form.fatherTemplate = []
                  this.form.code = ''
                  this.form.templateName = ''
                } else {
                  this.$message.error(res.data.errorMessage)
                }
              })
            } else {
              this.$message.error('请先填写模板名称')
            }
      }

      //编辑模板
      if (name == 'model') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              name: this.form.templateName,   //模版名称
              mainRemark: this.form.mainRemark,   //主诉
              mainCurrentRemark: this.form.mainCurrentRemark, //现病史
              mainPastRemark: this.form.mainPastRemark, //既往史
              checkOralRemark: this.form.checkOralRemark,  //口腔检查
              checkAuxiliaryRemark: this.form.checkAuxiliaryRemark, //辅助检查
              planDiagnosisRemark: this.form.planDiagnosisRemark, //诊断
              planTreatmentRemark: this.form.planTreatmentRemark, //治疗计划
              dmDisposalRemark: this.form.dmDisposalRemark,   //处置
              dmMedicalRemark: this.form.dmMedicalRemark,   //医嘱
              listCode: this.addParentCodeVal,   //模版目录Code
              remark4: this.form.templateName,
              code: this.form.code ,
            }

            this.$http.post('/api/hx/medical/template/edit.do',params).then(res=>{
              if (res.data.result) {
                this.getTopMenu()
                this.$message.success("修改模板成功")
                this.form.mainRemark = ''
                this.$refs[formName].resetFields()

              } else {
                this.$message.error(res.data.errorMessage)
              }
            })
          }
        });
      }
      this.showEditDetail = false
    },

    //新建模板
    submitForm(formName, name) {

      //添加模板目录
      if (formName == 'parentForm' && name == 'menu' ) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/api/hx/medical/templateList/add.do',{
              name: this.parentForm.teName,
              parentCode: this.addParentCodeVal,
              parentName: this.addParentCodeName.pop()
            }).then(res=>{
              if (res.data.result) {
                this.$message.success("创建模板目录成功")
                this.$refs[formName].resetFields()
                this.modelParent = false
                this.getTopMenu()
              } else {
                this.$message.error(res.data.errorMessage)
              }
            })

          }
        });
      }

      //添加模板病历
      if (formName == 'parentForm' && name == 'model' ) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              name: this.parentForm.teName,   //模版名称
              mainRemark: this.parentForm.mainRemark,   //主诉
              mainCurrentRemark: this.parentForm.mainCurrentRemark, //现病史
              mainPastRemark: this.parentForm.mainPastRemark, //既往史
              checkOralRemark: this.parentForm.checkOralRemark,  //口腔检查
              checkAuxiliaryRemark: this.parentForm.checkAuxiliaryRemark, //辅助检查
              planDiagnosisRemark: this.parentForm.planDiagnosisRemark, //诊断
              planTreatmentRemark: this.parentForm.planTreatmentRemark, //治疗计划
              dmDisposalRemark: this.parentForm.dmDisposalRemark,   //处置
              dmMedicalRemark: this.parentForm.dmMedicalRemark,   //医嘱
              listCode: this.addParentCodeVal,   //模版目录Code
              remark: '',
            }

            this.$http.post('/api/hx/medical/template/add.do',params).then(res=>{
              if (res.data.result) {
                this.$message.success("创建模板成功")
                this.modelParent = false
                this.$refs[formName].resetFields()
                this.getTopMenu()
              } else {
                this.$message.error(res.data.errorMessage)
              }
            })
          }
        });
      }
    },

    handleChangeParent (value) {
      // console.log(value)
      this.addParentCodeVal = value[value.length-1]
      this.addParentCodeName = this.$refs.addParentCascader.currentLabels
    },


    handleChange(value) {
      // console.log(value)
      // console.log(this.$refs.myCascader.currentLabels)
    },


    //删除模板目录
     remove(node, data) {
       if (data.children && data.children.length > 0) {
          this.$alert('请先删除子目录或模板?', '提示', {
            confirmButtonText: '确定',
            center: true,
            callback: action => {}
          });
       } else {
         this.$confirm('确定要删除当前模板吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {

            this.$http.post('/api/hx/medical/templateList/del.do',{
              code: data.code,
              type: data.type
            }).then(res=>{
              if (res.data.result) {
                this.$message.success('删除成功!')
                this.getTopMenu()
              } else {
                this.$message.error(res.data.errorMessage)
              }
            })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

       }
     },

    //获取模板病历详情
    getTemplateDetail (code) {
      this.$http.post('/api/hx/medical/template/get.do',{
        code: code
      }).then(res => {
        if (res.data.result) {
          let data = res.data.returnObject
          this.form.mainRemark = data.mainRemark
          this.form.mainCurrentRemark = data.mainCurrentRemark
          this.form.mainPastRemark= data.mainPastRemark
          this.form.checkOralRemark= data.checkOralRemark
          this.form.checkAuxiliaryRemark= data.checkAuxiliaryRemark
          this.form.planDiagnosisRemark= data.planDiagnosisRemark
          this.form.planTreatmentRemark= data.planTreatmentRemark
          this.form.dmDisposalRemark= data.dmDisposalRemark
          this.form.dmMedicalRemark= data.dmMedicalRemark
        }
      })
    },

    cancle () {
      this.showEditDetail = false
      this.form.mainRemark = ''
      this.$refs[formName].resetFields()
    },

    //递归给 type==2 的模板加上禁用选项
    addDisabled (data) {
      for (var i=0; i<data.length;i++) {
        if (data[i].type == '2') {
          data[i].disabled = true
        } else {
          data[i].disabled = false
          this.addDisabled(data[i].children)
        }
      }
      return data
    }

  },
}
</script>

<style lang="less">
.custom-tree-node{
  width: 100%;
  .fl-r{
    float: right;
    display: inline-block;
  }
}

.container{
  width: 100%;
  background: #fff;
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
  }
}


</style>
