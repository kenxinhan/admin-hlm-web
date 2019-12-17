<template lang="html">
  <div class="">
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <span>诊断相关</span>
        <span v-if="!shwoDiagnose">
          <span style="float: right; padding: 3px 0">
            <el-button size="mini" type="primary" @click="shwoDiagnose = true">编辑</el-button>
            <!-- <el-button size="mini" type="primary" @click="">打印</el-button> -->
          </span>
        </span>
        <span v-if="shwoDiagnose">
          <span style="float: right; padding: 3px 0">
            <el-button size="mini" type="primary" @click="submitdiagnose('diagnose')">保存</el-button>
            <el-button size="mini" type="primary" @click="shwoDiagnose = false">取消</el-button>
          </span>
        </span>
      </div>
      <div>
        <el-form :inline="true" ref="diagnose" label-width="80px" :model="diagnose" :rules="diagnoseRules" style="width: 100%;margin: 30px 0;" >
          <div >
            <el-row>
              <el-col :span="15">
                <el-form-item label="主诉:" >
                  <span v-if="!shwoDiagnose">{{diagnose.chiefComplaint || '--'}}</span>
                  <span v-if="shwoDiagnose">
                    <el-input v-model="diagnose.chiefComplaint" style="width:550px;"> </el-input>
                    <el-button type="primary"  @click.prevent="chooseChiefComplaint()">选择</el-button>
                  </span>
                </el-form-item>
              </el-col>
          </el-row>
          </div>
          <div >
            <el-row>
              <el-col :span="5">
                <el-form-item label="牙型:" >
                  <span v-if="!shwoDiagnose">{{diagnose.toothType || '--'}}</span>
                  <span v-if="shwoDiagnose">
                    <el-select v-model="diagnose.toothType">
                      <el-option label="无" value="无"></el-option>
                      <el-option label="单侧完全裂" value="单侧完全裂"></el-option>
                      <el-option label="单侧不完全裂" value="单侧不完全裂"></el-option>
                      <el-option label="单侧混合裂" value="单侧混合裂"></el-option>
                      <el-option label="双侧完全裂" value="双侧完全裂"></el-option>
                      <el-option label="双侧不完全裂" value="双侧不完全裂"></el-option>
                      <el-option label="双侧混合裂" value="双侧混合裂"></el-option>
                    </el-select>
                  </span>
                </el-form-item>
              </el-col>
            <el-col :span="5">
              <el-form-item label="骨型:" >
                <span v-if="!shwoDiagnose">{{diagnose.dentalBone || '--'}}</span>
                <span v-if="shwoDiagnose">
                  <el-select v-model="diagnose.dentalBone">
                    <el-option label="无" value="无"></el-option>
                    <el-option label="软腭裂" value="软腭裂"></el-option>
                    <el-option label="不完全裂" value="不完全裂"></el-option>
                    <el-option label="单侧完全腭裂" value="单侧完全腭裂"></el-option>
                    <el-option label="双侧完全腭裂" value="双侧完全腭裂"></el-option>
                  </el-select>
                </span>
              </el-form-item>
            </el-col>
          </el-row>
          </div>
          <div >
            <el-row>
              <el-col :span="15">
                  <el-form-item
                    v-for="(item, index) in diagnose.problems"
                    :label="'问题' + (index + 1) + ':'"
                    :key="item.index"
                     style="width:100%;display:block"
                  >
                  <span  v-if="!shwoDiagnose">
                    <p>{{item.value || '--'}}</p>
                  </span>
                  <span v-if="shwoDiagnose" style="width:100%;display:block">
                      <el-select v-model="item.value" style="width:550px">
                        <el-option
                          v-for="(op, st) in quertionList"
                          :key="st"
                          :label="op.name"
                          :value="op.name"></el-option>
                      </el-select>
                      <el-button type="text" v-if="index == diagnose.problems.length - 1" circle @click.prevent="addDomain(item)">添加</el-button>
                      <el-button type="text" v-if="index == diagnose.problems.length - 1 &&  diagnose.problems.length > 1" circle @click.prevent="removeDomain(item)">删除</el-button>
                  </span>
                  </el-form-item>

              </el-col>
          </el-row>
          </div>
          <div >
            <el-row>
              <el-col :span="15">
                <el-form-item label="矫治目标:" >
                  <span v-if="!shwoDiagnose">{{diagnose.target || '--'}}</span>
                  <span v-if="shwoDiagnose"><el-input v-model="diagnose.target" style="width:550px;"> </el-input></span>
                </el-form-item>
              </el-col>
          </el-row>
          </div>
        </el-form>
      </div>
    </el-card>

    <div class="">
      <el-card class="box-card" shadow="always" v-for="(val, indx) in planObject" :key="indx">
        <div slot="header" class="clearfix">
          <span>治疗计划</span>
          <span v-if="!val.editFlag">
            <span style="float: right; padding: 3px 0">
              <el-button size="mini" type="primary" @click="editTreamentPlan(val)">编辑</el-button>
              <el-button size="mini" type="primary" @click="deleteTreamentPlan(val)">删除</el-button>
              <el-button size="mini" type="primary" @click="toPrint(val)">打印</el-button>
            </span>
          </span>
          <span v-if="val.editFlag">
            <span style="float: right; padding: 3px 0">
              <el-button size="mini" type="primary" @click="submittreatmenPlan('treatmenPlan')">保存</el-button>
              <el-button size="mini" type="primary" @click="cancleTreamentPlan(val, indx)">取消</el-button>
            </span>
          </span>
        </div>
        <div>
          <el-form :inline="true" ref="treatmenPlan" label-width="90px" :model="treatmenPlan" :rules="treatmenPlanRules" style="width: 100%;margin: 30px 0;" >
            <div >
              <el-row>
                <el-col :span="5">
                  <el-form-item label="治疗方案:" v-if="!val.editFlag">
                     <span>{{val.name || ''}}</span>
                  </el-form-item>
                  <el-form-item label="治疗方案:" v-if="val.editFlag">
                    <span>
                      <el-select v-model="treatmenPlan.name" @change="getPlanSteps(true)">
                        <el-option
                          v-for="(op, st) in PlanList"
                          :key="st"
                          :label="op.name"
                          :value="op.code"
                          ></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="15">
                  <span v-if="!val.editFlag">
                    <el-form-item :label="'治疗步骤' + (dd + 1) +':'"  v-for="(op,dd) in val.orthodonticsPlanDtoList" :key="dd" style="width:100%;display:block">
                      <span>{{op.name || '--'}}</span>
                    </el-form-item>
                  </span>
                  <span v-if="val.editFlag" style="width:100%;display:block">
                    <el-form-item
                      v-for="(item, index) in treatmenPlan.orthodonticsPlanDtoList"
                      :label="'治疗步骤' + (index + 1) + ':'"
                      :key="item.index"
                    >
                      <el-input v-model="item.name" style="width:550px;"> </el-input>
                      <el-button
                        type="text"
                        icon="el-icon-delete"
                        @click="deleteTreatPlan(item)">删除</el-button>
                      <el-button
                        type="text"
                        :disabled="index == 0" icon="el-icon-top"
                        @click="moveSteps(item, index, true)">上移</el-button>
                      <el-button
                        type="text"
                        :disabled="index == treatmenPlan.orthodonticsPlanDtoList.length -1"
                        icon="el-icon-bottom"
                        @click="moveSteps(item, index, false)">下移</el-button>
                    </el-form-item>
                    <el-form-item label="" >
                      <el-button
                        type="primary"
                        style="width:550px;margin-left:90px;"
                        @click="chooseSteps()"
                        >添加步骤</el-button>
                    </el-form-item>
                  </span>
                </el-col>
            </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="15">
                  <el-form-item label="注意事项:" >
                    <span v-if="!val.editFlag">{{val.attention || '--'}}</span>
                    <span v-if="val.editFlag"><el-input v-model="treatmenPlan.attention" style="width:550px;"> </el-input></span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="15">
                  <el-form-item label="其他说明:" >
                    <span v-if="!val.editFlag">{{val.explain || '--'}}</span>
                    <span v-if="val.editFlag"><el-input v-model="treatmenPlan.explain" style="width:550px;"> </el-input></span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="5">
                  <el-form-item label="知情同意书:" >
                    <span v-if="!val.editFlag">{{val.informedName || '--'}}</span>
                    <span v-if="val.editFlag">
                      <el-select v-model="treatmenPlan.informedName" @change="changeInform">
                        <el-option
                          v-for="(op, st) in informData"
                          :key="st"
                          :label="op.title"
                          :value="op.code"
                          ></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="15">
                  <el-form-item label="详情:" >
                    <span v-if="!val.editFlag">{{val.informedConsent || '--'}}</span>
                    <span v-if="val.editFlag">
                      <el-input type="textarea" :rows="5" v-model="treatmenPlan.informedConsent" style="width:550px;"> </el-input>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

          </el-form>
        </div>
      </el-card>
      <br>
      <el-button v-if="addPlanBtn" type="primary" @click="addNewPlan()">新增治疗计划</el-button>
    </div>
    <br>

    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <span>方案确认</span>
        <span v-if="!showFinalPlan">
          <span style="float: right; padding: 3px 0">
            <el-button size="mini" type="primary" @click="showFinalPlan = true">编辑</el-button>
          </span>
        </span>
        <span v-if="showFinalPlan">
          <span style="float: right; padding: 3px 0">
            <el-button size="mini" type="primary" @click="submitFinalPlan('finalPlan')">保存</el-button>
            <el-button size="mini" type="primary" @click="showFinalPlan = false">取消</el-button>
          </span>
        </span>
      </div>
      <div class="">
        <el-form :inline="true" ref="finalPlan" label-width="150px" :model="finalPlan" :rules="finalPlanRules" style="width: 100%;margin: 30px 0;" >
          </el-row>
            <el-col :span="10">
              <el-form-item label="患者最终选中方案:" >
                <span v-if="!showFinalPlan">{{sure || '--'}}</span>
                <span v-if="showFinalPlan">
                  <el-select v-model="finalPlan.sure">
                    <el-option
                      v-for="(op, st) in planObject"
                      :key="st"
                      :label="op.name"
                      :value="op.code"
                      ></el-option>
                  </el-select>
                </span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>

    <el-dialog :title="dialogTitle" :visible.sync="showChiefComplaint" center width="40%">
      <div class="">
        <el-table ref="singleTable" :data="configStepsList" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
              <el-table-column label="序号" type="index" width="50"></el-table-column>
              <el-table-column prop="name" label="步骤"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showChiefComplaint = false">取 消</el-button>
        <el-button v-if="dialogTitle == '选择主诉'" type="primary" @click="confirmChoose()">确 定</el-button>
        <el-button v-if="dialogTitle == '选择步骤'" type="primary" @click="confirmChooseStep()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 打印预览 -->
    <el-dialog title="正畸计划" :visible.sync="showPrint" center width="50%">
      <div ref="print">
        <p class="title">正畸计划</p>
        <div class="printHead">
          <span>患者：{{patientDetail.name}}</span><span style="margin-left: 100px;">病历号：{{patientDetail.code}}</span>
        </div>
        <div>
          <div class="printTitle">诊断相关</div>
          <el-form :inline="true" label-width="80px" :model="diagnose" style="width: 100%;margin: 10px 0;" >
            <div>
              <el-row>
                <el-col :span="15">
                  <el-form-item label="主诉:" >
                    <span>{{diagnose.chiefComplaint}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="牙型:" >
                    <span>{{diagnose.toothType}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="骨型:" >
                    <span>{{diagnose.dentalBone}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-row>
                <el-col :span="15">
                  <el-form-item
                    v-for="(item, index) in diagnose.problems"
                    :label="'问题' + (index + 1) + ':'"
                    :key="item.index"
                     style="width:100%;display:block"
                  >
                  <span>
                    <p>{{item.value || '--'}}</p>
                  </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="15">
                  <el-form-item label="矫治目标:" >
                    <span>{{diagnose.target || '--'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
              <div class="printTitle">治疗计划</div>
                <div class="">
                  <p style="line-height:40px;" v-for="(op,dd) in printPlan.orthodonticsPlanDtoList" :key="dd">{{ dd + 1 + '、' }}{{op.name}}</p>
                </div>
                <br>
                <div class="printTitle">{{printPlan.informedName}}</div>
                <span>{{printPlan.informedConsent}}</span>
                <br><br><br>
                <div class="signatureBox">
                  <span class="printTitle">患者签字:</span>
                  <span class="printTitle">医生签字:</span>
                  <span class="printTitle">监护人签字:</span>
                </div>
          </el-form>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showPrint = false">取 消</el-button>
        <el-button type="primary" @click="print()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
    props:{
      patientDetail: {
          type: Object,
          default: {}
      }
    },
    data() {
      return {
        quertionList: [], //问题列表 type 2
        configStepsList: [],  //步骤列表 type 4
        PlanList: [],  //治疗方案
        informData: [], //知情同意书
        dialogTitle: '',
        showChiefComplaint: false,
        shwoDiagnose: false,
        diagnoseRules:{},
        diagnose: {
          chiefComplaint: '',
          toothType: '',
          dentalBone: '',
          problems: [
            {value: '',}
          ],
          target: '',
        },
        addPlanBtn: true,
        treatmenPlanRules:{},
        treatmenPlan: {
          name: '',
          orthodonticsPlanDtoList: [
            {value: ''}
          ],
          attention: '',
          explain: '',
          informedName: '',
          informedConsent: '',
        },

        currentRow: null,
        showFinalPlan: false,
        finalPlan:{
          sure: '',
        },
        sure: '',
        finalPlanRules: {},
        planObject:[],
        maxSort: '',
        printPlan: {},  //要打印的治疗计划
        showPrint: false,

      }
    },
    mounted() {
      //数据详情
      this.getTreatmentList()
      // this.patientOrthodonticsPlan()
      //下拉
      this.getTreatmentSteps('2')
      this.treatmentPlanList()
      this.informedconsentList()
    },
    methods: {

      submitdiagnose() {
        let arr1 = this.diagnose.problems
        if (arr1.length == 1) {
            this.diagnose.problem = arr1[0].value
        }
        if (arr1.length > 1){
          this.diagnose.problem = arr1.map(item =>(item.value)).join(',')
        }

        let params = { ...this.diagnose }
        params.patientNo = this.patientDetail.code
        console.log(params);

        if (this.diagnose.code) {
          params.code = this.diagnose.code
          this.$http.post('/api/hx/patientOrthodonticsPlan/edit.do',params).then(res => {
            if (res.data.result) {
              this.$message.success("新增成功")
              this.patientOrthodonticsPlan()
              this.shwoDiagnose = false
              this.showFinalPlan = false
            } else {
              this.$message.error(res.data.errorMessage)
            }
          })
        } else {
          this.$http.post('/api/hx/patientOrthodonticsPlan/add.do',params).then(res => {
            if (res.data.result) {
              this.$message.success("编辑成功")
              this.patientOrthodonticsPlan()
              this.shwoDiagnose = false
            } else {
              this.$message.error(res.data.errorMessage)
            }
          })
        }
      },

      submitFinalPlan() {
        let params = { ...this.finalPlan }
        params.patientNo = this.patientDetail.code

        this.$http.post('/api/hx/patientOrthodonticsPlan/edit.do',params).then(res => {
          if (res.data.result) {
            this.$message.success("操作成功")
            this.patientOrthodonticsPlan()
            this.showFinalPlan = false
          } else {
            this.$message.error(res.data.errorMessage)
          }
        })

      },

      //获取整个详情
      patientOrthodonticsPlan() {
        this.$http.post("/api/hx/patientOrthodonticsPlan/get.do",{
          patientNo: this.patientDetail.code
        }).then(res => {
          if (res.data.result) {
              let data = res.data.returnObject || {}
              let arr1 = data.problem.split(',')
              this.diagnose = {
                code: data.code,
                chiefComplaint:data.chiefComplaint,
                toothType: data.toothType,
                dentalBone: data.dentalBone,
                target: data.target,
                problems: []
              }
              arr1.map(e => {
                this.diagnose.problems.push({ value: e })
              })
              this.finalPlan.sure = data.sure
              let obj = this.planObject.find(item =>{
                  return item.code === data.sure //筛选出对应数据
              })
              this.sure = obj.name

          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
      },

      //获取治疗计划列表
      getTreatmentList() {
        this.$http.post("/api/hx/patientTreatmentPlan/list.do",{
          patientNo: this.patientDetail.code
        }).then(res => {
          if (res.data.result) {
              let data = res.data.returnObject || []
              data.map(item =>{
                item.editFlag = false
              })
               this.planObject = data
               this.patientOrthodonticsPlan()
          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
      },




      //选择主诉
      chooseChiefComplaint() {
        this.dialogTitle = "选择主诉"
        this.getTreatmentSteps('1')
        this.showChiefComplaint = true
      },

      //勾选主诉
      handleCurrentChange(val) {
        this.currentRow = val;
      },

      //确认勾选
      confirmChoose() {
        if (!this.currentRow) {
          this.$message.error('请选择主诉!')
          return false
        } else {
          this.diagnose.chiefComplaint = this.currentRow.name
          this.currentRow = null
          this.showChiefComplaint = false
        }
      },

      //删除
      removeDomain(item) {
        var index = this.diagnose.problems.indexOf(item)
        if (index !== -1) {
          this.diagnose.problems.splice(index, 1)
        }
      },

      //新增
      addDomain() {
        this.diagnose.problems.push({
          value: '',
          key: Date.now()
        });
      },


      editTreamentPlan(val) {
        val.editFlag = true
        this.treatmenPlan = val
        this.addPlanBtn = false
        this.getMaxSort()
      },


      //添加步骤
      chooseSteps() {
        this.maxSort += 1
        this.treatmenPlan.orthodonticsPlanDtoList.push({
          code: '',
          sort: this.maxSort,
          createDate: '',
          name: '',
          type: '4',
          move: false,

        });
        // this.dialogTitle = "选择步骤"
        // this.getTreatmentSteps('4')
        // this.showChiefComplaint = true
      },

      //确认勾选步骤
      // confirmChooseStep() {
      //   if (!this.currentRow) {
      //     this.$message.error('请选择步骤!')
      //     return false
      //   } else {
      //     this.treatmenPlan.orthodonticsPlanDtoList.push(this.currentRow)
      //     this.currentRow = null
      //     this.showChiefComplaint = false
      //   }
      // },

      addNewPlan() {
        this.addPlanBtn = false
        this.treatmenPlan = {
          name: '',
          orthodonticsPlanDtoList: [
            {value: ''}
          ],
          attention: '',
          explain: '',
          informedName: '',
          informedConsent: '',
        }
        this.planObject.push({
          code: '',
          name: '',
          attention: '',
          explain: '',
          informedName: '',
          informedConsent: '',
          editFlag: true
        })
      },

      //取消编辑
      cancleTreamentPlan(val, indx) {
        if (val.code) {
          val.editFlag = false
          this.addPlanBtn = true
        } else {
          this.$confirm('该计划暂未保存，是否取消?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var index = this.planObject.indexOf(val)
              if (index !== -1) {
                this.planObject.splice(index, 1)
              }
              this.addPlanBtn = true
            }).catch(() => {
              // this.$message.info('已取消删除');
            });
        }


      },

      //新增治疗计划
      submittreatmenPlan() {
        let params = {
          name: this.treatmenPlan.name,
          attention: this.treatmenPlan.attention,
          explain: this.treatmenPlan.explain,
          informedName: this.treatmenPlan.informedName,
          informedConsent: this.treatmenPlan.informedConsent,
          patientNo: this.patientDetail.code,
          list: JSON.stringify(this.treatmenPlan.orthodonticsPlanDtoList),
          remark: true  //编辑 新增 参数
        }
        console.log(params)

        if (this.treatmenPlan.code) {
          params.code = this.treatmenPlan.code
          this.$http.post('/api/hx/patientTreatmentPlan/edit.do',params).then(res => {
            if (res.data.result) {
              this.$message.success("编辑成功")
              this.getTreatmentList()
              this.shwoDiagnose = false
              this.showFinalPlan = false
              this.addPlanBtn = true
            } else {
              this.$message.error(res.data.errorMessage)
            }
          })
        } else {
          this.$http.post('/api/hx/patientTreatmentPlan/add.do',params).then(res => {
            if (res.data.result) {
              this.$message.success("新增成功")
              this.getTreatmentList()
              this.shwoDiagnose = false
              this.showFinalPlan = false
              this.addPlanBtn = true
            } else {
              this.$message.error(res.data.errorMessage)
            }
          })
        }

      },

      //删除计划
      deleteTreamentPlan(val) {
        this.$http.post('/api/hx/patientTreatmentPlan/del.do',{
          code: val.code,
          patientNo: this.patientDetail.code
        }).then(res => {
          if (res.data.result) {
            this.$message.success("删除成功")
            this.getTreatmentList()
          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
      },

      //删除步骤
      deleteTreatPlan(item) {
        var index = this.treatmenPlan.orthodonticsPlanDtoList.indexOf(item)
        if (index !== -1) {
          this.treatmenPlan.orthodonticsPlanDtoList.splice(index, 1)
        }
      },

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

      //移动步骤
      moveSteps(item, index, flag) {
        let index2
        let next
        if (flag) {
          index2 = index - 1
          next = this.treatmenPlan.orthodonticsPlanDtoList[index2]
        } else {
          index2 = index + 1
          next = this.treatmenPlan.orthodonticsPlanDtoList[index2]
        }
        this.swapArr(this.treatmenPlan.orthodonticsPlanDtoList, index, index2 )
        let sort1 = item.sort
        let sort2 = next.sort

        item.sort = sort2
        next.sort = sort1
      },

      //交换位置
      swapArr(arr, index1, index2) {
          arr[index1] = arr.splice(index2, 1, arr[index1])[0];
          return arr;
      },

      //详情  1主诉 2问题 3矫治目标 4治疗步骤
      getTreatmentSteps(type) {
        this.$http.post('/api/hx/orthodonticsPlan/list.do',{
          type
        }).then( res => {
          if (res.data.result) {
            if (type == '1' || type == '4') {
              this.configStepsList = res.data.returnObject.rows
            }
            if (type == '2') {
              this.quertionList = res.data.returnObject.rows
            }

          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
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

      //治疗方案列表
      treatmentPlanList() {
        this.$http.post('/api/hx/treatmentPlan/list.do').then( res => {
          if (res.data.result) {
            this.PlanList = res.data.returnObject.rows
          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
      },

      //获取所选方案的步骤详情
      getPlanSteps(flag) {
        this.treatmenPlan.orthodonticsPlanDtoList = [
          {value: ''}
        ]
        let obj = {}
        obj = this.PlanList.find(item =>{
                return item.code === this.treatmenPlan.name //筛选出对应数据
            }
        )
        this.treatmenPlan.name = obj.name
        if (obj.step == "") {
          this.$message.error("当前方案暂未关联步骤，请先配置!")
          return false
        }

        let params = {
          step: obj.step
        }
        if (flag) {   //根据方案获取详情
          params.code = obj.code
        } else {  //根据患者获取详情
          params.patientNo = this.patientDetail.code
        }

        this.$http.post('/api/hx/treatmentPlan/get.do',params).then( res => {
          if (res.data.result) {
            this.treatmenPlan.orthodonticsPlanDtoList = res.data.returnObject
          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
      },

      //选择知情同意书
      changeInform() {
        let obj = {}
        obj = this.informData.find(item =>{
                return item.code === this.treatmenPlan.informedName //筛选出对应数据
            }
        )
        this.treatmenPlan.informedName = obj.title
        this.treatmenPlan.informedConsent = obj.content
      },

      toPrint(val) {
          this.printPlan = val
          this.showPrint = true
      },

      //打印
      print() {
        this.$print(this.$refs.print)
      },

    },
}
</script>

<style lang="less" scoped>
  .title{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }
  .printHead{
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    height: 60px;
    line-height: 60px;
    border-top: 4px solid #000;
    border-bottom: 2px solid #000;
  }
  .printTitle{
    text-align: left;
    font-weight: 550;
    font-size: 18px;
    margin: 10px 0;
  }

  .printBox{
    border-bottom: 1px solid #d1d1d1;
  }

  .signatureBox{

    span{
      display: inline-block;
      width: 30%;
    }
  }

</style>
