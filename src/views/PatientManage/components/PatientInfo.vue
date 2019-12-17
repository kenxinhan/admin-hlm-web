<template>
  <div class="PatientInfoBox" style="border-bottom: none">
    <el-form :model="localPatientDetail" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <br>
    <div> 
      <el-button size="large" v-if="!isEdit" type="success" @click="handleEditPatinet">编辑患者</el-button>
      <el-button size="large" v-if="isEdit" style="margin-right: 10px" @click="handleEditCancel">取消</el-button>
      <el-button size="large" v-if="isEdit" type="success" @click="handleSavePatinet('ruleForm')">保存</el-button>
    </div>
    <br><br>
    <div class="formTitle">
      <span></span>个人信息
    </div>
    <el-row :gutter="10" class="PatientInfoBox">
      
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">
         <span v-if="!isEdit">姓名: {{patientDetail.name}}</span>
         <el-form-item label="姓名:" v-if="isEdit" prop="name">
            <el-input v-model="localPatientDetail.name"></el-input>
         </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">
        <span v-if="!isEdit">患者类型: {{patientDetail.type === 'PT' ? '普通' :'临时'}}</span>
        <el-form-item label="患者类型:"  v-if="isEdit">
          <el-radio-group v-model="localPatientDetail.type" size="small">
            <el-radio-button label="PT" value="PT">普通</el-radio-button>
            <el-radio-button label="LS" value="LS">临时</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">
        <span v-if="!isEdit">生日: {{patientDetail.birthDate}}</span>
        <el-form-item label="生日:" v-if="isEdit">
          <el-date-picker 
            v-model="localPatientDetail.birthDate" 
            type="date" 
            value-format="yyyy-MM-dd"
            @change="handleGetAge('age',localPatientDetail.birthDate)"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">
        <span v-if="!isEdit">年龄: {{patientDetail.age}}</span>
         <el-form-item label="年龄:" v-if="isEdit">
            <el-input v-model="localPatientDetail.age" placeholder="请输入年龄(数字)"></el-input>
         </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">
         <span v-if="!isEdit">性别: <el-tag size="mini" v-if="patientDetail.sex === 'MALE'">男</el-tag>
              <el-tag size="mini" type="danger" v-if="patientDetail.sex === 'FEMALE'">女</el-tag>
              <el-tag size="mini"  v-if="patientDetail.sex === 'UNKNOWN'">未知</el-tag></span>
         <el-form-item label="姓名:" v-if="isEdit">
            <el-radio-group v-model="localPatientDetail.sex">
              <el-radio label="MALE">男</el-radio>
              <el-radio label="FEMALE">女</el-radio>
              <el-radio label="UNKNOWN">未知</el-radio>
            </el-radio-group>
         </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">
        <span v-if="!isEdit">身份证号: {{patientDetail.idno}}</span>
        <el-form-item label="身份证号: " v-if="isEdit">
          <el-input v-model="localPatientDetail.idno" :disabled=" localPatientDetail.nationality ==='美国'"  placeholder="请输入身份证号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">
        <span v-if="!isEdit">国籍: {{patientDetail.nationality}}</span>
         <el-form-item label="国籍:" v-if="isEdit">
            <el-select v-model="localPatientDetail.nationality" placeholder="请选择">
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
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin:10px 0">
        <span v-if="!isEdit">患者备注:{{patientDetail.remark}}</span>
         <el-form-item label="患者备注:" v-if="isEdit">
            <el-input type="textarea" v-model="localPatientDetail.remark" placeholder="请输入患者备注"></el-input>
         </el-form-item>
      </el-col>
    </el-row>

    <div class="formTitle">
      <span></span>联系方式
    </div>
    <el-row :gutter="10" class="PatientInfoBox">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">
         <span v-if="!isEdit">手机: {{patientDetail.phone}}</span>
         <el-form-item label="手机:" v-if="isEdit">
           <el-input placeholder="请输入手机号" v-model="localPatientDetail.phone" class="input-with-select">
            <el-select v-model="localPatientDetail.phoneRemark" slot="append" placeholder="请选择" style="width:80px">
                <el-option key="本人" label="本人" value="本人"></el-option>
                <el-option key="爸爸" label="爸爸" value="爸爸"></el-option>
                <el-option key="妈妈" label="妈妈" value="妈妈"></el-option>
                <el-option key="其他" label="其他" value="其他"></el-option>
            </el-select>
          </el-input>
         </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">
        <span v-if="!isEdit">电话:  {{patientDetail.phoneNo}}</span>
         <el-form-item label="电话: " v-if="isEdit">
           <el-input placeholder="请输入电话号" v-model="localPatientDetail.phoneNo" class="input-with-select">
            <el-select v-model="localPatientDetail.phoneNoRemark" slot="append" placeholder="请选择" style="width:80px">
                <el-option key="家" label="家" value="家"></el-option>
                <el-option key="公司" label="公司" value="公司"></el-option>
            </el-select>
          </el-input>
         </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">
         <span v-if="!isEdit">微信:{{patientDetail.wechat}}</span>
         <el-form-item label="微信:" v-if="isEdit">
            <el-input v-model="localPatientDetail.wechat"  placeholder="请输入微信"></el-input>
         </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">
        <span v-if="!isEdit">QQ:{{patientDetail.qqNo}}</span>
         <el-form-item label="QQ:" v-if="isEdit">
            <el-input v-model="localPatientDetail.qqNo"  placeholder="请输入QQ"></el-input>
         </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">
        <span v-if="!isEdit">邮箱:{{patientDetail.mail}}</span>
         <el-form-item label="邮箱:" v-if="isEdit">
            <el-input v-model="localPatientDetail.mail"  placeholder="请输入邮箱"></el-input>
         </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">
        <span v-if="!isEdit">地址: {{patientDetail.province}}{{patientDetail.city}}{{patientDetail.area}}{{patientDetail.addrDetail}}</span>
        <el-form-item label="地址:" v-if="isEdit">
            <el-cascader
              size="large"
              :options="options"
              v-model="selectedOptions">
            </el-cascader>
         </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0" v-if="isEdit">
        <el-form-item label="详细地址:">
             <el-input type="textarea" v-model="localPatientDetail.addrDetail"  placeholder="请输入详细地址"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="formTitle">
      <span></span>患者信息
    </div>
    <el-row :gutter="10" class="PatientInfoBox">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="margin:10px 0">
        <span v-if="!isEdit">患者来源: {{ patientDetail.source1}} {{patientDetail.source2 ? '/' + patientDetail.source2 : ''}} {{ patientDetail.source3 ? '/' + patientDetail.source3 : ''}} </span>
        <el-form-item label="患者来源: " v-if="isEdit">
            <el-select 
            v-model="localPatientDetail.source1Code" 
            placeholder="请选择"
            @change="handleItemChange('source1Code',localPatientDetail.source1Code)"
          >
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
            <el-select v-model="localPatientDetail.source2Code" @change="handleItemChange('source2Code',localPatientDetail.source2Code)" placeholder="请选择">
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
              <el-select v-model="localPatientDetail.source3Code" @change="handleItemChange('source3Code',localPatientDetail.source3Code)" placeholder="请选择">
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
    </el-row>
    <div class="formTitle">
      <span></span>客户关系
    </div>
    <el-row :gutter="10" class="PatientInfoBox">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">责任医生: {{patientDetail.dutyMemberName}}</el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">咨询师: {{patientDetail.consMemberName}}</el-col>
    </el-row>
    <div class="formTitle">
      <span></span>全身检查
    </div>
    <el-row :gutter="10" class="PatientInfoBox">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">既往史: {{patientDetail.pastHistory}}</el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">过敏源: {{patientDetail.allergyHistory}}</el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">用药史: {{patientDetail.medicationHistory}}</el-col>
    </el-row>
    <div class="formTitle">
      <span></span>初诊信息
    </div>
    <el-row :gutter="10" class="PatientInfoBox">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">日期: {{patientDetail.createTime}}</el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin:10px 0">初诊医生: {{patientDetail.firstMemberName}}</el-col>
    </el-row>
     </el-form>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState,mapActions } from "vuex";
import storage from '@/tools/local_storage.js'
import { regionData, CodeToText} from 'element-china-area-data'
import { _mmAddress,_mmGetAge } from '@/utils/mm.js'
export default {
  components: {},
  props: {
    patientDetail:{
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isEdit: false,
      source2: [],
      source3: [],
      options: regionData,
      selectedOptions: ["150000", "150400", "150421"],
      localPatientDetail: {
        name: '',
        type: '',
        birthDate: '',
        age: '',
        sex: '',
        idno: '',
        nationality: '',
        remark: '',
        phone: '',
        phoneRemark: '',
        phoneNo: '',
        phoneNoRemark: '',
        wechat: '',
        qqNo: '',
        mail: '',
        provinceCode:'',
        cityCode:'',
        areaCode:'',
        addrDetail: '',
        source1Code: '',
        source2Code: '',
        source3Code: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择患者类型', trigger: 'blur' }
        ],
        phone:[
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {},
  computed: {
    ...mapState({
       appVuex: state => state["appVuex"]
    }),
  },
  methods: {

    // 编辑
    handleEditPatinet() {
      const { source1Code, source2Code , source3Code}  = this.patientDetail
      const arr = []
      for(let key in this.patientDetail){
        this.localPatientDetail[key] = this.patientDetail[key]
      }
      arr.push(this.patientDetail['provinceCode'])
      arr.push(this.patientDetail['cityCode'])
      arr.push(this.patientDetail['areaCode'])
      this.selectedOptions = arr

      this.isEdit = true
      
      if( source1Code ) {
        this.getUserSourceList(source1Code,2,false)
      } 

      if( source2Code ) {
        this.getUserSourceList(source2Code,3,false)
      }
    },

    // 保存编辑
    handleSavePatinet(formName) {
      const data = _mmAddress(this.localPatientDetail,this.selectedOptions,CodeToText)
      if( data.source1Code){
        data['source1'] = this.appVuex.user_source.find(item=> item.code === data.source1Code)['lableName']
      } else {
        data['source1'] = ''
      }
      if( data.source2Code){
        data['source2'] = this.source2.find(item=> item.code === data.source2Code)['lableName']
      } else {
        data['source2'] = ''
      }
      if( data.source3Code){
        data['source3'] = this.source3.find(item=> item.code === data.source3Code)['lableName']
      } else{
        data['source3'] = ''
      } 
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/api/hx/patient/save.do',{
               ...data
            }).then(res=>{
                const { result, errorMessage } = res.data
                if( result ) {
                  this.$message({
                    type:'success',
                    message: '编辑成功'
                  })
                  this.$emit('getPatientDetail')
                  this.isEdit = false
                }else {
                  this.$message({
                    type:'error',
                    message: errorMessage
                  })
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
       });
    },

    // 获取年龄
    handleGetAge(key,val) {
      console.log(key,val)
      if( val ) {
         this.localPatientDetail[key] = _mmGetAge(val)
      } else {
         this.localPatientDetail[key] = val
      }
    },

    // 取消编辑
    handleEditCancel() {
      this.isEdit = false
    },
    
    // 获取患者来源
    getUserSourceList(parentCode,key,isClear) {
      const { shopNo, memberNoMerchant } = this.$cfg.userInfo || storage.get("userInfo");
      this.$http.post("/api/hx/configList.do", {
          shopNo,
          merchantNo: memberNoMerchant,
          lableNo: "user_source",
          parentCode
        }).then(res => {
          const { returnObject } = res.data;
          if( key === 2) {
            if( isClear){
              this.localPatientDetail.source2Code = ''
              this.localPatientDetail.source3Code = ''
            }
            this.source2 = returnObject;
            this.source3 = []
          }
          if( key === 3) {
             if( isClear){
              this.localPatientDetail.source3Code = ''
            }
            this.source3 = returnObject;
          }
        })
    },

    // 动态查询；来源
    handleItemChange(key,val) {
      if( key === "source1Code" && val){
         this.getUserSourceList(val,2,true)
      }
      if( key === "source2Code" && val){
         this.getUserSourceList(val,3,true)
      }
    },
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.PatientInfoBox{
  width: 100%;
}
</style>