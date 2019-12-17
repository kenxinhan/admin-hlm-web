<template>
  <div>
    <el-dialog
      :title="mutations.modalTitle"
      :visible="mutations.dialogFormVisible"
      :center="mutations.center"
      :show-close="false"
    >
      <div class="PatientInfoBox">
          <div class="photo">
            <img src="/hlm-web/static/img/avatar.jpg">
          </div>
          <el-row :gutter="10" class="textBox">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">姓名 : {{patientDetail.name}}</el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">病例号 : {{patientDetail.caseNo}}</el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">生日 : {{patientDetail.birthDate}}</el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">手机: {{patientDetail.phone}}</el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">地址 : {{patientDetail.province}}{{patientDetail.city}}{{patientDetail.area}}</el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">初诊日期 :  {{patientDetail.createTime}} </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">初诊医生:  {{patientDetail.firstMemberName}}</el-col>
          </el-row>
      </div>

      <!-- 分诊 -->
      <div v-if=" mutations.keyName === 'triage' ">
          <el-form
                :model="formData"
                ref="formData"
                :rules="formDataRules"
                label-width="100px"
                class="formBox"
            >
            <div class="TriageBox">
              <h2>今日预约 {{scopeItem.reservationDate}} {{scopeItem.reservationDoctorName}}</h2>
              <div class="triageType">
                <el-radio v-model="formData.visitingType" label="NEWDIAGNOSIS" border>初诊</el-radio>
                <el-radio v-model="formData.visitingType" label="REVIEW" border>复诊</el-radio>
              </div>
               <br>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <el-form-item label="咨询师：">
                      {{scopeItem.advisoryName}}
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <el-form-item label="医生：" prop="reservationDoctorNo">
                      <el-select v-model="formData.reservationDoctorNo" placeholder="请选择医生">
                        <el-option
                          v-for="item in appVuex.shop_doctor"
                          :key="item.memberNo"
                          :label="item.memberName"
                          :value="item.memberNo">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <el-form-item label="护士：">
                      <el-select v-model="formData.assistantNo" placeholder="请选择医生">
                        <el-option
                          label="暂无"
                          value="">
                        </el-option>
                        <el-option
                          v-for="item in appVuex.shop_nurse"
                          :key="item.memberNo"
                          :label="item.memberName"
                          :value="item.memberNo">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item label="备注：" prop="time">
                      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formData.remark"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </div>
        </el-form>
      </div>
      <!-- 分诊 -->

      <!-- 转诊 -->
      <div v-if=" mutations.keyName === 'transfer' ">
          <el-form
                :model="formDataTransfer"
                ref="formDataTransfer"
                :rules="formTransferRules"
                label-width="100px"
                class="formBox"
            >
            <div class="TriageBox">
              <h2>今日预约 {{scopeItem.reservationDate}} {{scopeItem.reservationDoctorName}}</h2>
              <div class="triageType">
                <el-radio v-model="formDataTransfer.visitingType" label="NEWDIAGNOSIS" border>初诊</el-radio>
                <el-radio v-model="formDataTransfer.visitingType" label="REVIEW" border>复诊</el-radio>
              </div>
              <br>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <el-form-item label="预约日期：" prop="visitingDate">
                      <el-date-picker 
                      v-model="formDataTransfer.visitingDate" 
                      type="datetime" 
                      value-format="yyyy-MM-dd HH:mm:ss" 
                      placeholder="选择日期时间"
                      :picker-options="pickerOptions0"
                      style="width:100%"
                      >
                    </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <el-form-item label="接诊医生：" prop="registeredDoctorNo">
                      <el-select v-model="formDataTransfer.registeredDoctorNo" placeholder="请选择医生">
                        <el-option
                          v-for="item in appVuex.shop_doctor"
                          :key="item.memberNo"
                          :label="item.memberName"
                          :value="item.memberNo">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item label="备注：">
                      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formDataTransfer.remark"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </div>
        </el-form>
      </div>
      <!-- 转诊 -->

      <!-- 新建病历 -->
      <div v-if=" mutations.keyName === 'createCase'">
        <el-form
          :model="formDataCase"
          ref="formDataCase"
          :rules="formCaseRules"
          label-width="100px"
          class="formBox"
        >
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="医生：">
                <el-select v-model="formDataCase.doctorNo" placeholder="请选择">
                  <el-option
                    label="请选择"
                    value=""
                  ></el-option>
                  <el-option
                    v-for="item in appVuex.shop_doctor"
                    :key="item.memberNo"
                    :label="item.memberName"
                    :value="item.memberNo"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="护士：">
                <el-select v-model="formDataCase.assistantNo" placeholder="请选择">
                  <el-option
                    label="请选择"
                    value=""
                  ></el-option>
                  <el-option
                    v-for="item in appVuex.shop_nurse"
                    :key="item.memberNo"
                    :label="item.memberName"
                    :value="item.memberNo"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="就诊时间：" prop="visitingDate">
                <el-date-picker 
                  v-model="formDataCase.visitingDate" 
                  type="datetime" 
                  value-format="yyyy-MM-dd HH:mm:ss" 
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="类型：" prop="visitingType">
                <el-radio v-model="formDataCase.visitingType" label="NEWDIAGNOSIS"  border>初诊病历</el-radio>
                <el-radio v-model="formDataCase.visitingType" label="REVIEW" border>复诊病历</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="formTitle">
            <span></span>主诉及病史
          </div>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="主诉：">
                <el-input type="textarea" :rows="2" v-model="formDataCase.mainRemark" placeholder="请输入主诉"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="现病史：">
                <el-input type="textarea" :rows="2" v-model="formDataCase.mainCurrentRemark" placeholder="请输入现病史"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="既往史：">
                <el-input type="textarea" :rows="2" v-model="formDataCase.mainPastRemark" placeholder="请输入既往史"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="formTitle">
            <span></span>口腔检查
          </div>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="口腔检查：">
                <el-input type="textarea" :rows="2" v-model="formDataCase.checkOralRemark" placeholder="请输入口腔检查"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="辅助检查：">
                <el-input type="textarea" :rows="2" v-model="formDataCase.checkAuxiliaryRemark"  placeholder="请输入辅助检查"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="formTitle">
            <span></span>诊断与治疗计划
          </div>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="诊断：">
                <el-input type="textarea" :rows="2" v-model="formDataCase.planDiagnosisRemark" placeholder="请输入诊断"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="治疗计划：">
                <el-input type="textarea" :rows="2" v-model="formDataCase.planTreatmentRemark" placeholder="请输入治疗计划"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="formTitle">
            <span></span>处置与医嘱
          </div>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="处置：">
                <el-input type="textarea" :rows="2" v-model="formDataCase.dmDisposalRemark" placeholder="请输入处置"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="医嘱：">
                <el-input type="textarea" :rows="2" v-model="formDataCase.dmMedicalRemark" placeholder="请输入医嘱"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="formTitle">
            <span></span>其他
          </div>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="标签：">
                <el-input type="textarea" :rows="2" v-model="formDataCase.otherLabelRemark" placeholder="请输入标签"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="备注：">
                <el-input type="textarea" :rows="2" v-model="formDataCase.otherRemark" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          </el-form>
      </div>
      <!-- 新建病历 -->


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
  props:{
    patientDetail:{
      type: Object,
      default: ()=> ({})
    },
    CaseDetail: {
      type: Object,
      default: () => ({})
    },
    scopeItem:{
      type: Object,
      default: ()=> ({})
    },
    newAlreadyInfo: {
      type: Object,
      default: ()=> ({})
    }
  },
  data() {
    return {
      activeName: "first",
      formData: {
        visitingType: "NEWDIAGNOSIS",
        reservationDoctorNo:'',
        assistantNo:'',
        remark:''
      },
      formDataTransfer: {
        visitingType: "NEWDIAGNOSIS",
        visitingDate: '',
        registeredDoctorNo:'',
        remark:''
      },
      formDataCase: {
         visitingType: 'NEWDIAGNOSIS'
      },
      formDataRules:{
        reservationDoctorNo:[
          { required: true, message: '请选择接诊医生', trigger: 'change' },
        ]
      },
      formTransferRules:{
        registeredDoctorNo:[
          { required: true, message: '请选择接诊医生', trigger: 'change' },
        ]
      },
      formCaseRules: {
        visitingDate: [
          { required: true, message: '请选择就诊时间', trigger: 'blur' },
        ],
        visitingType: [
          { required: true, message: '请选择患者类型', trigger: 'change' }
        ]
      },
      pickerOptions0: {
        disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
        },
      }  
    };
  },
  watch: {},
  computed: {
    ...mapState({
      mutations: state => state["mutations"],
      appVuex: state=> state['appVuex']
    })
  },
  methods: {
    handleModalConfirm() {

      const { keyName } = this.mutations

      if ( keyName ==="triage" ) {

          this.$refs['formData'].validate((valid) => {
            if (valid) {
              const { formData,appVuex } = this;
              formData['reservationDoctorName'] = appVuex.shop_doctor.find(item=>item.memberNo == formData['reservationDoctorNo'] )['memberName']
              if( formData['assistantNo'] ) {
                formData['assistantName'] = appVuex.shop_nurse.find(item=>item.memberNo == formData['assistantNo'] )['memberName']
              }
              this.$emit("handleModalConfirm", formData);
            } else {
              console.log('error submit!!');
              return false;
            }
          })
      }

      if ( keyName ==="transfer" ) {
        
          this.$refs['formDataTransfer'].validate((valid) => {
            if (valid) {
              const { formDataTransfer, appVuex } = this;
              formDataTransfer['registeredDoctorName'] = appVuex.shop_doctor.find(item=>item.memberNo == formDataTransfer['registeredDoctorNo'] )['memberName']
              this.$emit("handleModalConfirm", formDataTransfer);
            } else {
              console.log('error submit!!');
              return false;
            }
          })
      }

      if ( keyName ==="createCase") {
        
          this.$refs['formDataCase'].validate((valid) => {
            if (valid) {
              const { formDataCase } = this;
              if(formDataCase.doctorNo){
                formDataCase['doctorName'] = this.appVuex.shop_doctor.find(item=>item.memberNo === formDataCase.doctorNo)['memberName']
              }

              if(formDataCase.assistantNo){
                formDataCase['assistantName'] = this.appVuex.shop_nurse.find(item=>item.memberNo === formDataCase.assistantNo)['memberName']
              }
              
              this.$emit("handleModalConfirm", formDataCase,()=>{
                 this.$ref['formDataCase'].resetFields()
              })
            } else {
              console.log('error submit!!');
              return false;
            }
        })

      }
      
    },
    handleModalCancel() {
      this.$emit("handleModalCancel");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  created() {},
  mounted() {
    this.formData.visitingType = this.scopeItem.visitingType
    this.formDataCase = this.CaseDetail 
    if( !this.formDataCase['doctorNo'] ) {
      this.formDataCase['doctorNo'] = this.newAlreadyInfo.reservationDoctorNo
    }
    if( !this.formDataCase['visitingDate'] ) {
      this.formDataCase['visitingDate'] = this.newAlreadyInfo.reservationDate
    }
    this.formDataTransfer.visitingDate = this.scopeItem.reservationDate
    this.formDataTransfer.remark = this.scopeItem.remark
  }
};
</script>
<style lang="less" scoped>
.TriageBox {
  h2 {
    font-size: 26px;
    text-align: center;
    margin: 30px 0;
  }
  .triageType {
    text-align: center;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 30px;
  }
}
</style>