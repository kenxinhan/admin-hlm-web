<template>
  <div class="addPatientBox">
    <Modal
      @handleModalConfirm="handleModalConfirm"
      @handleModalCancel="handleModalCancel"
      :patientDetail="patientDetail"
    ></Modal>
    <ComModal
      @handleModalConfirm="handleModalConfirm"
      @handleModalCancel="handleModalCancel"
      :patientDetail="patientDetail"
    ></ComModal>
    <el-card class="box-card" >
      <div slot="header" class="clearfix" style="text-align:center">
        <span>新增患者</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" style="max-width:1200px;margin:0 auto">
        <div class="formTitle">
          <span></span>个人信息
        </div>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio label="MALE">男</el-radio>
                <el-radio label="FEMALE">女</el-radio>
                <el-radio label="UNKNOWN">未知</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="患者类型" prop="type">
              <el-radio-group v-model="form.type" size="small">
                <el-radio-button label="PT" value="PT">普通</el-radio-button>
                <el-radio-button label="LS" value="LS">临时</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="出生日期">
              <el-date-picker v-model="form.birthDate"
              type="date"
              value-format="yyyy-MM-dd"
              @change="handleGetAge('age',form.birthDate)"
              placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="年龄">
              <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="国籍">
              <el-select v-model="form.nationality" placeholder="请选择">
                <el-option
                  key="中国"
                  label="中国"
                  value="中国"
                ></el-option>
                <el-option
                  key="美国"
                  label="美国"
                  value="美国"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="身份证号">
              <el-input v-model="form.idno" :disabled="form.nationality === '美国'" placeholder="请输入身份证号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="formTitle">
          <span></span>联系方式
        </div>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="手机号" prop="phone">
              <el-input placeholder="请输入手机号" v-model="form.phone" class="input-with-select">
                <el-select v-model="form.phoneRemark" slot="append" placeholder="请选择" style="width:80px">
                  <el-option label="本人" value="本人"></el-option>
                  <el-option label="爸爸" value="爸爸"></el-option>
                  <el-option label="妈妈" value="妈妈"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="电话">
              <el-input placeholder="请输入电话" v-model="form.phoneNo" class="input-with-select">
                <el-select v-model="form.phoneNoRemark" slot="append" placeholder="请选择" style="width:80px">
                  <el-option label="家" value="家"></el-option>
                  <el-option label="公司" value="公司"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="微信">
              <el-input placeholder="请输入微信" v-model="form.wechat" class="input-with-select"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="qq号码">
              <el-input v-model="form.qqNo" placeholder="请输入qq号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="邮箱">
              <el-input v-model="form.mail"  placeholder="请输入邮箱"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="家庭地址:">
                <el-cascader
                  size="large"
                  :options="optionsAddress"
                  v-model="selectedOptions">
                </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="formTitle">
          <span></span>患者信息
        </div>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="患者来源">
              <el-select v-model="form.source1Code" placeholder="请选择"  @change="handleItemChange('source1Code',form.source1Code)">
                <el-option
                  label="请选择"
                  value=""
                ></el-option>
                <el-option
                  v-for="item in appVuex.user_source"
                  :key="item.code"
                  :label="item.lableName"
                  :value="item.code"
                ></el-option>
              </el-select>
              <el-select v-model="form.source2Code" @change="handleItemChange('source2Code',form.source2Code)" placeholder="请选择">
                <el-option
                  label="请选择"
                  value=""
                ></el-option>
                <el-option
                  v-for="item in source2"
                  :key="item.code"
                  :label="item.lableName"
                  :value="item.code"
                ></el-option>
              </el-select>
              <el-select v-model="form.source3Code" @change="handleItemChange('source3Code',form.source3Code)" placeholder="请选择">
                <el-option
                  label="请选择"
                  value=""
                ></el-option>
                <el-option
                  v-for="item in source3"
                  :key="item.code"
                  :label="item.lableName"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="患者备注">
              <el-input type="textarea" v-model="form.remark"  placeholder="请输入患者备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="既往史">
              <el-input type="textarea" placeholder="请输入既往史" v-model="form.pastHistory"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="过敏史">
              <el-input type="textarea" placeholder="请输入过敏史" v-model="form.allergyHistory"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="10">
           <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="用药史">
              <el-input type="textarea" placeholder="请输入用药史" v-model="form.medicationHistory"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="formTitle">
          <span></span>首诊信息
        </div>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="初诊时间">
              <el-date-picker
                v-model="form.createTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
             <el-form-item label="初诊医生">
              <el-select v-model="form.firstMemberNo" placeholder="请选择">
                <el-option
                    v-for="item in appVuex.shop_doctor"
                    :key="item.memberNo"
                    :label="item.memberName"
                    :value="item.memberNo"
                  ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="责任医生">
              <el-select v-model="form.dutyMemberNo" placeholder="请选择">
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
            <el-form-item label="咨询师">
              <el-select v-model="form.consMemberNo" placeholder="请选择">
                <el-option
                  v-for="item in appVuex.shop_advisory"
                  :key="item.memberNo"
                  :label="item.memberName"
                  :value="item.memberNo">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <br><br>
        <el-form-item>
          <el-button @click="handleAddCancel">取消</el-button>
          <el-button type="primary" @click="handleSaveAndAleray">保存并预约</el-button>
          <el-button type="primary" @click="handleSaveAndRegister">保存并挂号</el-button>
          <el-button type="primary" @click="handleSavePatient">保存患者</el-button>
        </el-form-item>
        <br><br>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { regionData, CodeToText } from 'element-china-area-data'
import storage from '@/tools/local_storage.js'
import { _mmAddress, _mmGetAge } from '@/utils/mm.js'
import Modal from "./components/Modal";
import ComModal from "../Components/ComModal/ComModal";

export default {
  components: {
    Modal,
    ComModal
  },
  props: {

  },
  data() {
    var cheackTelphone = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入正确的电话号码'));
        }
        var reg = /^1[3456789]\d{9}$/;
        if (!reg.test(value) || value.length != 11) {
            callback(new Error('请输入正确的电话号码'));
        } else {
            callback();
        }
    };
    return {
      source1: [],
      source2: [],
      source3: [],
      shop_doctor:[],
      shop_advisory:[],
      optionsAddress: regionData,
      selectedOptions: ["", "", ""],
      patientDetail: {},
      form: {
        name: "",
        sex: "MALE",
        type: "PT",
        age: '',
        source2Code: '',
        source3Code: '',
        phoneRemark: "本人",
        phoneNoRemark: "家"
      },
      rules: {
          name: [
            { required: true, message: '请输入患者姓名', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请选择患者类型', trigger: 'change' }
          ],
          phone: [
            { required: true, validator: cheackTelphone , trigger: 'blur' }
          ]
      }
    };
  },
  watch: {},
  computed: {
    ...mapState({
      mutations: state => state["mutations"],
      appVuex: state => state["appVuex"],
    })
  },
  methods: {
    ...mapActions(["ActionToggleModal"]),

    // 保存患者
    handleSavePatient(callback) {
      const { memberNoMerchant , memberNameMerchant} = this.$cfg.userInfo || storage.get('userInfo')
      const data = _mmAddress(this.form,this.selectedOptions,CodeToText)
      // console.log(data)
      if(data['firstMemberNo']){
         data['firstMemberName'] =  this.appVuex.shop_doctor.find(item=>item.memberNo === data['firstMemberNo'])['memberName']
      }

      if(data['dutyMemberNo']){
        data['dutyMemberName'] =  this.appVuex.shop_doctor.find(item=>item.memberNo === data['dutyMemberNo'])['memberName']
      }

      if(data['source1Code']){
         data['source1'] =  this.appVuex.user_source.find(item=>item.code === data['source1Code'])['lableName']
      } else {
        data['source1'] = ''
      }

      if(data['source2Code']){
        data['source2'] =  this.source2.find(item=>item.code === data['source2Code'])['lableName']
      } else {
        data['source2'] = ''
      }

      if(data['source3Code']){
         data['source3'] =  this.source3.find(item=>item.code === data['source3Code'])['lableName']
      }else {
        data['source3'] = ''
      }

      if(data['consMemberNo']){
         data['consMemberName'] =  this.appVuex.shop_advisory.find(item=>item.memberNo === data['consMemberNo'])['memberName']
      }



      this.$refs['form'].validate((valid) => {
        if (valid) {
           this.$http.post('/api/hx/patient/save.do',{
              ...data,
              merchantName: memberNameMerchant,
              merchantNo: memberNoMerchant
           }).then(res=>{
              const { result , errorMessage, returnObject } = res.data
              if(result){
                  if(typeof callback === "function"){
                    callback(returnObject)
                  }else{
                    this.$message({
                      type:'success',
                      message: '新增患者成功!'
                    })
                    this.$router.push({
                      path: '/PatientManage'
                    })
                  }
              } else {
                this.$message({
                    type:'error',
                    message: errorMessage
                })
              }
           })
        }else{
          console.log('submit error')
        }
      })
    },

    // 保存并预约
    handleSaveAndAleray() {
        this.handleSavePatient((code)=>{
          this.getPatientDetail(code,()=>{
            this.ActionToggleModal({
              modalTitle: '创建预约',
              keyName: 'CreateAndEditBooking',
              BookingModalVisible: true
            })
          })
        })
    },

    // 保存并挂号
    handleSaveAndRegister() {
      this.handleSavePatient(code=>{
          this.getPatientDetail(code,()=>{
            this.ActionToggleModal({
              center: false,
              modalTitle: '挂号',
              keyName: 'register',
              BookingModalVisible: true
            })
          })
      })
    },


    // 患者详情
    getPatientDetail(code,callback) {
       this.$http.post('/api/hx/patient/details.do',{
          code
       }).then(res=>{
          const { returnObject , result ,errorMessage} = res.data
          if(result){
               this.patientDetail = returnObject
               if(callback)callback()
          }else{
            this.$message({
              type:'error',
              message: errorMessage
            })
          }
       })
    },


    // 创建预约
    createBooking(formData,callback) {
        const { memberNoGuid,memberNameGuid ,shopNo,shopName } = this.$cfg.userInfo || storage.get('userInfo')
        const { code, name, phone,caseNo ,merchantNo, merchantName } = this.patientDetail
        formData['reservationDateLen'] = parseInt(formData['reservationDateLen'])
        formData['serviceChoosesJson'] = JSON.stringify(formData['serviceChoosesJson'])
        // console.log(formData)
        this.$http.post('/api/hx/ps/addPatientReservation.do',{
           patientNo:code,
           patientName:name,
           mobile:phone,
           medicalNo:caseNo,
           shopNo,
           shopName,
           merchantNo,
           merchantName,
           createId: memberNoGuid,
           createName: memberNameGuid,
           ...formData
        }).then(res=>{
            const { result , errorMessage, returnObject } = res.data
            if(result){
              this.ActionToggleModal({
                  dialogFormVisible: false,
                  BookingModalVisible: false
              })
              this.$router.push({
                path: '/PatientManage'
              })
              this.$message({
                type:'success',
                message: '创建预约成功!'
              })
              if(callback) callback()
            } else {
              this.$message({
                  type:'error',
                  message: errorMessage
              })
            }
        })
    },

    // 获取年龄
    handleGetAge(key,val) {
      if( val ) {
         this.form[key] = _mmGetAge(val)
      } else {
         this.form[key] = val
      }
    },


    // 获取患者来源
    getUserSourceList(parentCode,key) {
      const { shopNo, memberNoMerchant } = this.$cfg.userInfo || storage.get("userInfo");
      this.$http.post("/api/hx/configList.do", {
          shopNo,
          merchantNo: memberNoMerchant,
          lableNo: "user_source",
          parentCode
        }).then(res => {
          const { returnObject } = res.data;
          if( key === 2) {
            this.source2 = returnObject;
            this.source3 = []
            this.form.source2Code = ''
            this.form.source3Code = ''
          }
          if( key === 3) {
            this.form.source3Code = ''
            this.source3 = returnObject;
          }
        })
    },

    // 动态查询；来源
    handleItemChange(key,val) {
      if( key === "source1Code" && val){
         this.getUserSourceList(val,2)
      }
      if( key === "source2Code" && val){
         this.getUserSourceList(val,3)
      }
    },

       // 取消
    handleAddCancel() {
       this.$router.go(-1)
    },

    // 公共保存
    handleModalConfirm(formData,callback) {
      const { keyName } = this.mutations
      if( keyName === "CreateAndEditBooking" ){
        this.createBooking(formData,callback)
      }
      if( keyName === "register" ){
        this.createBooking(formData,callback)
      }
    },

    // 点击取消
    handleModalCancel() {
      this.ActionToggleModal({
        dialogFormVisible: false,
        BookingModalVisible: false
      })
      this.$router.push({
        path: '/PatientManage'
      })
    },
  },
  created() {},
  mounted() {
    // this.getUserSourceList("",1)
  }
};
</script>
<style lang="less" scoped>
.el-form-item{
  margin-bottom: 22px;
}
</style>
