<template>
<div class="ChargeMoney">
  <div class="">
    <el-tabs v-model="activeName">
      <el-tab-pane label="病历模板" name="first">
      </el-tab-pane>
      <!-- <el-tab-pane label="已接诊客户" name="second">
      </el-tab-pane> -->
    </el-tabs>
  </div>
  <el-card class="box-card">
    <div class="container">
      <div style="padding-bottom:15px;margin-bottom:15px;border-bottom:1px solid #f1f1f1;">
        <el-button size="mini" @click="createParentTemplate">创建模板目录</el-button>
        <el-button size="mini" @click="createTemplate">创建模板</el-button>
      </div>
      <div class="tree-container">
        <el-tree
          :data="templateList"
          node-key="code"
          default-expand-all
          :expand-on-click-node="false"
          @node-click="treeNodeClick">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.name }}</span>
            <span class="fl-r cf">
              <!-- <el-button type="text" size="mini" @click="() => append(data)">新增子目录</el-button>
              <el-button type="text" size="mini">编辑</el-button> -->
              <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
            </span>
          </span>
        </el-tree>
      </div>
      <div class="detail-container">
        <div class="">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px"style="max-width:700px;">
            <el-form-item label="上级目录" prop="cascader">
              <el-cascader
                ref="myCascader"
                v-model="form.cascader"
                :options="cascaderData"
                :props="{ expandTrigger: 'hover', checkStrictly: true,value: 'code', label: 'name' }"
                :change-on-select="true"
                 @change="handleChange"
                clearable
              >
              </el-cascader>

            </el-form-item>
            <el-form-item label="模板名称" prop="templateName">
              <el-input v-model="form.templateName" placeholder="请输入模板名称"></el-input>
            </el-form-item>
            <el-form-item label="主诉">
              <el-input v-model="form.action"></el-input>
            </el-form-item>
            <el-form-item label="现病史">
              <el-input type="textarea" v-model="form.medicalHistory"></el-input>
            </el-form-item>
            <el-form-item label="既往史">
              <el-input type="textarea" v-model="form.previousHistory"></el-input>
            </el-form-item>
            <el-form-item label="口腔检查">
              <el-input type="textarea" v-model="form.oralExamination"></el-input>
            </el-form-item>
            <el-form-item label="辅助检查">
              <el-input type="textarea" v-model="form.auxiliaryExamination"></el-input>
            </el-form-item>
            <el-form-item label="诊断">
              <el-input type="textarea" v-model="form.diagnose"></el-input>
            </el-form-item>
            <el-form-item label="治疗方案">
              <el-input type="textarea" v-model="form.treatProject"></el-input>
            </el-form-item>
            <el-form-item label="处置">
              <el-input type="textarea" v-model="form.disposition"></el-input>
            </el-form-item>
            <el-form-item label="医嘱">
              <el-input type="textarea" v-model="form.docAdvice"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button>取消</el-button>
              <el-button type="primary" @click="submitForm('form')">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </el-card>

  <el-dialog title="创建模板目录" :visible.sync="modelParent" center>
    <div class="">
        <el-form ref="parentForm" :model="parentForm" :rules="parentRules" label-width="100px"style="max-width:700px;min-height:400px;">
          <el-form-item label="上级目录">
            <el-cascader
                ref="addParentCascader"
                v-model="parentForm.paramsName"
                :options="cascaderData"
                :props="{ expandTrigger: 'hover', checkStrictly: true,value: 'code', label: 'name' }"
                :change-on-select="true"
                 @change="handleChangeParent"
                clearable
                ></el-cascader>
          </el-form-item>
          <el-form-item label="模板名称" prop="">
            <el-input v-model="parentForm.teName" placeholder="请输入模板名称"></el-input>
          </el-form-item>
          <br><br>
          <el-form-item>
            <el-button type="primary" @click="submitForm('parentForm')">保存</el-button>
            <el-button @click="modelParent = false">取消</el-button>
          </el-form-item>
      </el-form>
    </div>
  </el-dialog>


  <el-dialog title="创建模板" :visible.sync="previewBox" center>
    <div class="">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px"style="max-width:700px;">
        <el-form-item label="上级目录">
          <el-cascader
              ref="myCascader"
              v-model="form.cascader"
              :options="cascaderData"
              :props="{ expandTrigger: 'hover', checkStrictly: true,value: 'code', label: 'name'  }"
              :change-on-select="true"
               @change="handleChange"
              clearable
              ></el-cascader>
        </el-form-item>
        <el-form-item label="模板名称" prop="templateName">
          <el-input v-model="form.templateName" placeholder="请输入模板名称"></el-input>
        </el-form-item>
        <el-form-item label="主诉">
          <el-input v-model="form.action"></el-input>
        </el-form-item>
        <el-form-item label="现病史">
          <el-input type="textarea" v-model="form.medicalHistory"></el-input>
        </el-form-item>
        <el-form-item label="既往史">
          <el-input type="textarea" v-model="form.previousHistory"></el-input>
        </el-form-item>
        <el-form-item label="口腔检查">
          <el-input type="textarea" v-model="form.oralExamination"></el-input>
        </el-form-item>
        <el-form-item label="辅助检查">
          <el-input type="textarea" v-model="form.auxiliaryExamination"></el-input>
        </el-form-item>
        <el-form-item label="诊断">
          <el-input type="textarea" v-model="form.diagnose"></el-input>
        </el-form-item>
        <el-form-item label="治疗方案">
          <el-input type="textarea" v-model="form.treatProject"></el-input>
        </el-form-item>
        <el-form-item label="处置">
          <el-input type="textarea" v-model="form.disposition"></el-input>
        </el-form-item>
        <el-form-item label="医嘱">
          <el-input type="textarea" v-model="form.docAdvice"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
          <el-button @click="previewBox = false">取消</el-button>
        </el-form-item>
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
      previewBox: false,
      modelParent: false,
      parentForm:{
        paramsName: '',
        teName: '',
      },
      parentRules:{
        teName: [
          { required: true, message: '请填写模板目录名称', trigger: 'blur' }
        ]
      },
      form: {
        templateName: "",
        action: '',
        medicalHistory: '',
        previousHistory: '',
        oralExamination: '',
        auxiliaryExamination: '',
        diagnose: '',
        treatProject: '',
        disposition: '',
        docAdvice: '',
      },
      rules: {
          templateName: [
            { required: true, message: '请填写模板名称', trigger: 'blur' },
          ],
          cascader: [
            { type: 'array', required: true, message: '请选择上级目录', trigger: 'blur' }
          ],
      },
      addParentCodeVal: '',
      addParentCodeName: '',
    }
  },
  mounted() {
      this.getTopMenu()
  },
  methods: {
    getTopMenu () {
      this.$http.post('/api/hx/medical/templateList/list.do',{}).then( res => {
        if (res.data.result) {
          let arr = []
          this.cascaderData = res.data.returnObject
          arr = res.data.returnObject
          arr = JSON.parse(JSON.stringify(arr))
          this.templateList = arr
        } else {
          this.$message.error(res.data.errorMessage)
        }

      })
    },

    createParentTemplate() {
      this.modelParent = true
    },

    createTemplate () {
        this.previewBox = true
    },

    treeNodeClick(data, node, vuecomponent){
      console.log('data:',  data,'\n' ,'node:', node, '\n', 'vuecomponent',vuecomponent);
      this.form.templateName = data.name
      // this.form.cascader = data.id
    },

    submitForm(formName) {
      if (formName == 'parentForm') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/api/hx/medical/templateList/add.do',{
              name: this.parentForm.teName,
              parentCode: this.addParentCodeVal,
              parentName: this.addParentCodeName.pop()
            }).then(res=>{
              console.log(res);
            })

          }
        });
      }

    },

    handleChangeParent (value) {
      this.addParentCodeVal = value[value.length-1]
      this.addParentCodeName = this.$refs.addParentCascader.currentLabels
    },


    handleChange(value) {
      console.log(value)
      console.log(this.$refs.myCascader.currentLabels)
    },

    append(data) {
      console.log(data)
      return false
       const newChild = { id: id++, label: '子目录', children: [] };
       if (!data.children) {
         this.$set(data, 'children', []);
       }
       data.children.push(newChild);
     },

     remove(node, data) {
       console.log(data);
       if (data.children && data.children.length > 0) {
         this.$confirm('请先删除子目录或模板?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
       } else {
         const parent = node.parent;
         const children = parent.data.children || parent.data;
         const index = children.findIndex(d => d.id === data.id);
         children.splice(index, 1);
       }
       return false

     },

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
.previewBox{
  margin: 0 auto;
}

</style>
