<template>
  <div>
    <el-dialog
      :title="mutations.modalTitle"
      :visible="mutations.BookingModalVisible"
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
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">地址 : {{patientDetail.province}} {{patientDetail.city}}{{patientDetail.area}}</el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">初诊日期 :  {{patientDetail.createTime}} </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">初诊医生:  {{patientDetail.firstMemberName}}</el-col>
          </el-row>
      </div>

      <!-- 创建预约/修改预约 -->
      <div v-if=" mutations.keyName === 'CreateAndEditBooking' ">

        <el-form
          :model="formDataCreate"
          ref="formBooking"
          :rules="formDataBookingRules"
          label-width="100px"
          class="formBox"
        >
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="患者类型：" prop="patientType">
                <el-radio-group v-model="formDataCreate.patientType" size="small">
                  <el-radio-button label="PT">普通</el-radio-button>
                  <el-radio-button label="LS">待定</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="就诊类型：" prop="visitingType">
                <el-radio-group v-model="formDataCreate.visitingType" size="small">
                  <el-radio-button label="NEWDIAGNOSIS">初诊</el-radio-button>
                  <el-radio-button label="REVIEW">复诊</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-if="this.mutations.keyName !== 'CreateAndEditBooking'">
              <el-form-item label="就诊状态：" prop="vistitingStatus">
                <el-select v-model="formDataCreate.vistitingStatus" style="width:100%;height: auto">
                    <el-option label="未确认" value="UNCONFIRMED"></el-option>
                    <!-- <el-option label="治疗中" value="TREATMENT"></el-option> -->
                    <!-- <el-option label="取消" value="CANCEL"></el-option> -->
                    <!-- <el-option label="治疗完成" value="FINISHED"></el-option> -->
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="咨询师：">
                <el-select v-model="formDataCreate.advisoryNo" style="width:100%">
                  <el-option
                      v-for="item in appVuex.shop_advisory"
                      :key="item.memberNo"
                      :label="item.memberName"
                      :value="item.memberNo">
                    </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="医生：">
                <el-select v-model="formDataCreate.reservationDoctorNo" placeholder="请选择医生" style="width:100%">
                  <el-option
                      v-for="item in appVuex.shop_doctor"
                      :key="item.memberNo"
                      :label="item.memberName"
                      :value="item.memberNo">
                    </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-if=" formDataCreate.patientType ==='PT' ? ((formDataCreate.vistitingStatus === 'UNCONFIRMED' || formDataCreate.vistitingStatus === 'CANCEL') ? true : false ): (formDataCreate.patientType ? false : true) ">
              <el-form-item label="预约日期：" :prop="formDataCreate.patientType === 'PT' ? 'reservationDate': ''">
                <el-date-picker
                v-model="formDataCreate.reservationDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
                :picker-options="pickerOptions0"
                style="width:100%"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-if=" formDataCreate.patientType ==='PT' ? ((formDataCreate.vistitingStatus === 'UNCONFIRMED' || formDataCreate.vistitingStatus === 'CANCEL') ? true : false ): (formDataCreate.patientType ? false : true) ">
              <el-form-item label="预约时长：" :prop=" formDataCreate.patientType === 'PT' ? 'reservationDateLen': ''">
                <el-select v-model="formDataCreate.reservationDateLen" placeholder="请选择预约时长(分钟)" style="width:100%">
                    <el-option
                      v-for="item in timeLengths"
                      :key="item.time"
                      :label="item.time"
                      :value="item.time">
                    </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" :rows="2" v-model="formDataCreate.remark" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-col>


          </el-row>
          <div style="height: 300px; overflow-y:auto">
             <el-form-item prop="checkeds">
              </el-form-item>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-for="item in appVuex.patient_project" :key="item.code">
                  <el-form-item :label="item.lableName">
                      <el-checkbox
                      v-for="child in item.childs"
                      :label="child.code"
                      :key="child.code"
                      @change="handleCheckedCitiesChange(item)"
                      v-model="checkeds"
                      >
                      {{child.lableName}}
                      </el-checkbox>
                  </el-form-item>
                </el-col>
            </div>
        </el-form>
      </div>
      <!-- 创建预约/修改预约 -->

      <!-- 挂号 -->
      <div v-if=" mutations.keyName === 'register' ">
        <el-form
          :model="formDataRegister"
          ref="formRegister"
          :rules="formRegisterRules"
          label-width="0"
          class="formBox"
        >

          <div class="formTitle">
            <span></span>选择咨询师
          </div>
          <el-form-item >
            <el-radio-group v-model="formDataRegister.advisoryName" size="medium">
              <el-radio
              border
              v-for="item in appVuex.shop_advisory"
              :key="item.memberNo"
              :label="item.memberName"
              :value="item.memberNo"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="formTitle">
            <span></span>选择医生
          </div>
          <el-form-item prop="reservationDoctorName">
              <el-radio-group v-model="formDataRegister.reservationDoctorName" size="medium">
                <el-radio
                border
                v-for="item in appVuex.shop_doctor"
                :key="item.memberNo"
                :label="item.memberName"
                :value="item.memberNo"
                ></el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <el-row :gutter="10">
             <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
               <div class="formTitle">
                  <span></span>挂号时间
                </div>
                <el-form-item prop="registeredDate">
                  <el-date-picker
                    v-model="formDataRegister.registeredDate"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions0"
                    placeholder="选择日期时间"
                    style="width:100%"
                    @change='handleVistiStatus'
                  >
                  </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
               <div class="formTitle">
                  <span></span>就诊状态
                </div>
                <el-form-item prop="vistitingStatus">
                  <el-select v-model="formDataRegister.vistitingStatus" style="width:100%">
                      <el-option label="未确认" v-if="judgeVistiStatus.UNCONFIRMED" value="UNCONFIRMED"></el-option>
                      <el-option label="治疗中" v-if="judgeVistiStatus.TREATMENT" value="TREATMENT"></el-option>
                      <el-option label="取消" v-if="judgeVistiStatus.CANCEL" value="CANCEL"></el-option>
                      <el-option label="治疗完成" v-if="judgeVistiStatus.FINISHED" value="FINISHED"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row> -->
        <div class="formTitle">
          <span></span>预约项目
        </div>
        <div style="height: 300px; overflow-y:auto">
          <div v-for="item in appVuex.patient_project" :key="item.code">
              {{item.lableName}}
              <el-form-item prop="checkeds">
                  <el-checkbox
                  v-for="child in item.childs"
                  :label="child.code"
                  :key="child.code"
                  @change="handleCheckedCitiesChange(item)"
                  v-model="checkeds"
                  >
                  {{child.lableName}}
                  </el-checkbox>
              </el-form-item>
            </div>
        </div>

          <div class="formTitle">
            <span></span>备注
          </div>
          <el-form-item prop="remark">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入备注"
                v-model="formDataRegister.remark"
                >
              </el-input>
           </el-form-item>
          </el-form>
      </div>
      <!-- 挂号 -->

      <!-- 新建咨询 -->
      <div v-if="mutations.keyName === 'createConsul' || mutations.keyName === 'editConsul'">
        <el-form
          :model="formDataConsul"
          ref="formConsul"
          :rules="formDataRules"
          label-width="100px"
          class="formBox"
        >
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="就诊时间：" prop="visitingDate">
                <el-date-picker
                v-model="formDataConsul.visitingDate"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="咨询项目：" prop="projectCodes">
                  <el-select v-model="formDataConsul.projectCodes" multiple placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="item in appVuex.patient_project"
                      :key="item.code"
                      :label="item.lableName"
                      :value="item.code">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="咨询内容：" prop="advisoryContent">
                <el-input type="textarea" :rows="5" v-model="formDataConsul.advisoryContent" placeholder="请输入咨询内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="成交意愿：" prop="want">
                <el-select v-model="formDataConsul.want">
                  <el-option label="高" value="HIGH"></el-option>
                  <el-option label="中" value="CENTRAL"></el-option>
                  <el-option label="低" value="LOW"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="意向说明：" prop="explainRemark">
                <el-input type="textarea" :rows="2" v-model="formDataConsul.explainRemark" placeholder="请输入意向说明"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <el-form-item label="备注："  prop="remark">
                <el-input type="textarea" :rows="2" v-model="formDataConsul.remark" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 新建咨询 -->


      <div slot="footer" class="dialog-footer">
        <el-button @click="handleModalCancel">取 消</el-button>
        <el-button type="primary" @click="handleModalConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from 'moment'
import { _mmSelectOption } from '@/utils/mm.js'
export default {
  components: {},
  props: {
    patientDetail:{
      type: Object,
      default: ()=> ({})
    },
    BookingDetail: {
      type: Object,
      default: ()=> ({})
    },
    consulDetail: {
      type: Object,
      default: ()=> ({})
    },
  },
  data() {
    var cheackProject = (rule, value, callback) => {
      if( this.checkeds.length === 0 ) {
        callback(new Error('请选择其中一个项目'));
      } else {
        callback();
      }
    };
    var cheackResverTime = (rule, value, callback) => {
      if(value === '' ) {
        callback(new Error('请输入预约时长'));
      }
      var reg = /^[0-9]+.?[0-9]*$/;
      if (!reg.test(value)) {
          callback(new Error('请输入数字'));
      } else {
          callback();
      }
    };
    return {
      timeLengths: [{
        time: 15,
      },{
        time: 30,
      },{
        time: 45,
      },{
        time: 60,
      }],
      activeName: "first",
      judgeVistiStatus: {
        UNCONFIRMED: true,
        TREATMENT: true,
        CANCEL: true,
        FINISHED: true
      },
      formDataConsul:{
        projectCodes: []
      },
      checkeds:[],
      serviceChoosesJson: [],
      formDataCreate: {
        patientType: 'PT',
        visitingType: 'NEWDIAGNOSIS',
        advisoryNo:'',
        advisoryName:'',
        reservationDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        reservationDateLen: 30,
        reservationDoctorNo:'',
        reservationDoctorName:'',
        vistitingStatus:'UNCONFIRMED',
        remark:''
      },
      formDataRegister:{
        registeredDate:'',
        vistitingStatus:'UNCONFIRMED',
        advisoryName:'',
        reservationDoctorName:'',
        remark:''
      },
      formRegisterRules:{
        registeredDate: [
           { required: true, message: '请选择挂号时间', trigger: 'change' },
        ],
        vistitingStatus:[
           { required: true, message: '请选择就诊状态', trigger: 'change' },
        ],
        advisoryName:[
           { required: true, message: '请选择咨询师', trigger: 'change' },
        ],
        reservationDoctorName:[
           { required: true, message: '请选择医生', trigger: 'change' },
        ],
        checkeds: [
           { required: true, validator: cheackProject, trigger: 'change' },
        ]
      },
      formDataBookingRules:{
        patientType: [
          { required: true, message: '请选择患者类型', trigger: 'change' },
        ],
        visitingType: [
          { required: true, message: '请选择就诊类型', trigger: 'change' },
        ],
        vistitingStatus: [
          { required: true, message: '请选择就诊状态', trigger: 'change' },
        ],
        // advisoryNo: [
        //    { required: true, message: '请选择咨询师', trigger: 'change' },
        // ],
        // reservationDoctorNo: [
        //    { required: true, message: '请选择医生', trigger: 'change' },
        // ],
        reservationDate: [
           { required: true, message: '请选择预约日期', trigger: 'change' },
        ],
        reservationDateLen:  [
           { required: true,validator:cheackResverTime , trigger: 'blur' },
        ],
        checkeds: [
           { required: true, validator: cheackProject, trigger: 'change' },
        ]
      },
      formDataRules:{
        visitingDate: [
          { required: true, message: '请选择就诊时间', trigger: 'change' },
        ],
        projectCodes: [
          { required: true, message: '请选择咨询项目', trigger: 'change' },
        ],
        want: [
          { required: true, message: '请选择成交意愿', trigger: 'change' },
        ]
      },
      pickerOptions0: {
        disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
        },
      }
    };
  },
  watch: {

  },
  computed: {
    ...mapState({
      mutations: state => state["mutations"],
      appVuex: state => state['appVuex']
    })
  },
  methods: {
    handleModalConfirm(formName) {

      const { keyName } = this.mutations

      if ( keyName ==="createConsul" || keyName === "editConsul") {
          this.$refs['formConsul'].validate((valid) => {
              if (valid) {
                const { formDataConsul } = this;
                formDataConsul['projectNames'] =
                this.appVuex.patient_project.filter(item=> formDataConsul['projectCodes'].indexOf(item.code) >= 0)
                .map(item=>item.lableName)
                console.log(formDataConsul)
                this.$emit("handleModalConfirm", formDataConsul,()=>{
                   this.$refs['formConsul'].resetFields()
                   this.$message({
                        type:'success',
                        message: '新增咨询成功!'
                   })
                })
              } else {
                console.log('error submit!!');
                return false;
              }
          })
      }

      if( keyName === "CreateAndEditBooking" ){

         this.$refs['formBooking'].validate((valid) => {
            if (valid) {
              const { serviceChoosesJson, formDataCreate } = this;
              const {shop_doctor,shop_advisory} = this.appVuex
              const { serviceChooses } = this.BookingDetail
              const { reservationDoctorNo , advisoryNo} = formDataCreate
              if(reservationDoctorNo){
                 formDataCreate['reservationDoctorName'] = shop_doctor.find(item=>item.memberNo == reservationDoctorNo)['memberName']
              }
              if(advisoryNo){
                 formDataCreate['advisoryName'] = shop_advisory.find(item=>item.memberNo == advisoryNo )['memberName']
              }
              formDataCreate['reservationType'] = 'RESERVATION'
              if ( serviceChoosesJson.length === 0 ) {
                 formDataCreate['serviceChoosesJson'] = serviceChooses
              } else {
                formDataCreate['serviceChoosesJson'] = serviceChoosesJson
              }
              this.$emit("handleModalConfirm", formDataCreate,()=>{
                 this.$refs['formBooking'].resetFields()
                 this.checkeds = []
              })
            } else {
              console.log('error submit!!');
              return false;
            }
         })
      }


      if( keyName === "register" ){

         this.$refs['formRegister'].validate((valid) => {
            if (valid) {
              const { serviceChoosesJson, formDataRegister, formDataCreate } = this;
              const {shop_doctor,shop_advisory} = this.appVuex
              const { serviceChooses } = this.BookingDetail
              const { reservationDoctorName , advisoryName } = formDataRegister
              const { type } = this.patientDetail
              const { advisoryNo } = formDataCreate
              if(advisoryNo){
                 formDataRegister['advisoryNo'] = shop_advisory.find(item=>item.memberName == advisoryName )['memberNo']
              }
              formDataRegister['reservationDoctorNo'] = shop_doctor.find(item=>item.memberName == reservationDoctorName)['memberNo']

              formDataRegister['registeredDoctorNo'] = shop_doctor.find(item=>item.memberName == reservationDoctorName)['memberNo']
              formDataRegister['registeredDoctorName'] = formDataRegister['reservationDoctorName']
              formDataRegister['reservationType'] = 'REGISTERED'
              formDataRegister['reservationDateLen'] = 15
              formDataRegister['vistitingStatus'] = 'UNCONFIRMED'
              formDataRegister['visitingType'] = 'NEWDIAGNOSIS'
              formDataRegister['registeredDate'] = moment().format('YYYY-MM-DD HH:mm:ss')
              // formDataRegister['reservationDate'] =  moment().format('YYYY-MM-DD HH:mm:ss')
              if ( serviceChoosesJson.length === 0 ) {

                console.log(this.checkeds) //undefined
                 formDataRegister['serviceChoosesJson'] = serviceChooses
              } else {
                console.log(serviceChoosesJson)
                formDataRegister['serviceChoosesJson'] = serviceChoosesJson
              }
              formDataRegister['patientType'] = type
              console.log(formDataRegister)
              this.$emit("handleModalConfirm", formDataRegister,()=>{
                 this.$refs['formRegister'].resetFields()
                 this.checkeds = []
                 this.$message({
                  type:'success',
                  message: '挂号成功!'
                 })
              })
            } else {
              console.log('error submit!!');
              return false;
            }
         })
      }
    },

    // 处理预约项目数据
    handleCheckedCitiesChange(itemCheck){

      itemCheck.childs.forEach(item=>{
          if( this.checkeds.indexOf(item.code) >=0 ) {
            this.serviceChoosesJson.push({
              projectCode: itemCheck.code,
              projectName: itemCheck.lableName,
              projectPropertyCode: item.code,
              projectPropertyName: item.lableName
            })
          }
      })
      this.serviceChoosesJson = this.serviceChoosesJson.filter(item=> this.checkeds.indexOf(item.projectPropertyCode) >=0)
      const result = [];
      const obj = {};
      for(let i =0; i < this.serviceChoosesJson.length; i++){
        if(!obj[this.serviceChoosesJson[i].projectPropertyCode]){
          result.push(this.serviceChoosesJson[i]);
          obj[this.serviceChoosesJson[i].projectPropertyCode] = true;
        }
      }

      this.serviceChoosesJson = result
      console.log(this.serviceChoosesJson)
    },

    handleVistiStatus(val) {
      let curDate = moment().format('YYYY-MM-DD HH:mm:ss');
      if(!moment(val).isBefore(curDate)){
        this.judgeVistiStatus['TREATMENT'] = false
        this.judgeVistiStatus['CANCEL'] = false
        this.judgeVistiStatus['FINISHED'] = false
      } else {
        this.judgeVistiStatus['TREATMENT'] = true
        this.judgeVistiStatus['CANCEL'] = true
        this.judgeVistiStatus['FINISHED'] = true
      }
    },

    handleModalCancel() {
      this.$emit("handleModalCancel");
      this.checkeds = []
    },

  },

  created() {},
  mounted() {
    const { BookingDetail,consulDetail } = this
    if( BookingDetail['code']) {
      for(let key in this.BookingDetail) {
        if( key !== 'updateId' && key !== 'updateName' && key !== 'serviceChooses'){
            this.formDataCreate[key] = this.BookingDetail[key]
            this.formDataRegister[key] = this.BookingDetail[key]
        }
      }
      this.checkeds = ( this.BookingDetail.serviceChooses.map(item=> item.projectPropertyCode))
    }

    if ( this.consulDetail['projectNames'] ) {
      this.formDataConsul = this.consulDetail
      this.formDataConsul['projectNames'] = this.consulDetail['projectNames'].split(',')
      this.formDataConsul['projectCodes'] = this.consulDetail['projectCodes'].split(',')
    }
  }
};
</script>
<style lang="less" scoped>
.modalConBox {
  text-align: center;
  h2 {
    font-size: 16px;
    margin: 20px 0;
  }
  .inputPassword {
    width: 300px;
    height: 50px;
  }
}
</style>
