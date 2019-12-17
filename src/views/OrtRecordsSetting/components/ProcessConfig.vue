<template>
<div class="ChargeMoney">
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
            <el-form-item label="检查" prop="check">
              <el-input type="textarea" v-model="form.check"></el-input>
            </el-form-item>
            <el-form-item label="处置" prop="management">
              <el-input type="textarea" v-model="form.management"></el-input>
            </el-form-item>
            <el-form-item label="医嘱" prop="doctorAdvice">
              <el-input type="textarea" v-model="form.doctorAdvice"></el-input>
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
          <el-form-item label="检查" prop="check">
            <el-input type="textarea" v-model="parentForm.check"></el-input>
          </el-form-item>
          <el-form-item label="处置" prop="management">
            <el-input type="textarea" v-model="parentForm.management"></el-input>
          </el-form-item>
          <el-form-item label="医嘱" prop="doctorAdvice">
            <el-input type="textarea" v-model="parentForm.doctorAdvice"></el-input>
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
        paramsName: [],
        teName: '',
        templateName: "",
        check: '',
        management: '',
        doctorAdvice: '',
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
        check: '',
        management: '',
        doctorAdvice: '',
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
      this.$http.post('/api/hx/orthodonticsTemplate/list.do',{
        start: 1,
        limit: 9999,
      }).then( res => {
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
       // console.log('data:',  data,'\n' ,'node:', node, '\n', 'vuecomponent',vuecomponent)
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
      let params = {
        code: this.form.code,
        name: this.form.templateName
      }

      if (name == 'menu') {
        if (!this.form.templateName) {
          this.$message.error('请先填写模板名称')
        }
      }
      if (name == 'model') {
        params.check = this.form.check //检查
        params.management = this.form.management   //处置
        params.doctorAdvice = this.form.doctorAdvice   //医嘱
      }

      //编辑模板
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/api/hx/orthodonticsTemplate/edit.do',params).then(res=>{
              if (res.data.result) {
                this.getTopMenu()
                this.$message.success("编辑成功!")
                if (name == 'menu') {
                  this.form.fatherTemplate = []
                  this.form.code = ''
                  this.form.templateName = ''
                } else {
                  this.form.check = ''
                  this.form.management = ''
                  this.form.doctorAdvice = ''
                }
              } else {
                this.$message.error(res.data.errorMessage)
              }
            })
          }
        });

      this.showEditDetail = false
    },

    //新建模板
    submitForm(formName, name) {
      let params = {
        name: this.parentForm.teName,
        parentCode: this.addParentCodeVal,
      }
      //添加  1-模板目录   2- 模板
      if (formName == 'parentForm' && name == 'menu') {
        params.type = 1
      }

      if (formName == 'parentForm' && name == 'model') {
        params.type = 2
        params.check = this.parentForm.check //检查
        params.management = this.parentForm.management   //处置
        params.doctorAdvice = this.parentForm.doctorAdvice   //医嘱
      }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/api/hx/orthodonticsTemplate/add.do',params).then(res=>{
              if (res.data.result) {
                this.$message.success("新增成功")
                this.$refs[formName].resetFields()
                this.modelParent = false
                this.getTopMenu()
              } else {
                this.$message.error(res.data.errorMessage)
              }
            })

          }
        })

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

            this.$http.post('/api/hx/orthodonticsTemplate/del.do',{
              code: data.code
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

    //获取模板详情
    getTemplateDetail (code) {
      this.$http.post('/api/hx/orthodonticsTemplate/get.do',{
        code: code
      }).then(res => {
        if (res.data.result) {
          let data = res.data.returnObject
          this.form.check= data.check
          this.form.management= data.management
          this.form.doctorAdvice= data.doctorAdvice
        }
      })
    },

    cancle () {
      this.showEditDetail = false
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
