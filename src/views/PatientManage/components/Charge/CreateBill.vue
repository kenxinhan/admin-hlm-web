<template>
  <div class="CreateBillBox clearfix">
      <div class="pull-left lfBox">
          <p class="title">收费项目列表</p>
          <el-tree
            :data="treeData"
            ref="elTree"
            show-checkbox
            node-key="id"
            :default-expand-all="true"
            @check-change="handleCheckChange">
         </el-tree>
      </div>
      <div class="pull-right rgBox">
           <p class="title clearfix">
                <el-select v-model="chargeToggle" :disabled="this.operKey === 'edit'" @change="handleChargeToggle" placeholder="请选择" class="pull-right">
                    <el-option
                     label="处置收费"
                     value="MX">
                    </el-option>
                    <el-option
                     label="简易收费"
                     value="JY">
                    </el-option>
                </el-select>
           </p>
           <el-table :data="checkList" style="width: 100%">
                <el-table-column prop="projectName" label="项目名称"></el-table-column>
                <el-table-column prop="projectUnit" label="单位"></el-table-column>
                <el-table-column prop="price" label="单价">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.price" @keyup.native="number" placeholder="请输入内容" size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="数量" width="150">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.num" :min="1" :max="10" size="mini"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="金额">
                    <template slot-scope="scope">
                        {{scope.row.price ? scope.row.num * (multiplyMath(scope.row.price,scope.row.minDiscount / 100)): ''}}
                    </template>
                </el-table-column>
                <el-table-column prop="minDiscount" label="折扣" width="200">
                    <template slot-scope="scope">
                         <el-input-number v-model="scope.row.minDiscount" :min="1" :max="100" size="mini"></el-input-number>%
                    </template>
                </el-table-column>
                <el-table-column label="医生">
                    <template slot-scope="scope">
                       <el-select v-model="scope.row.doctorNo" size="mini" placeholder="请选择" class="pull-right">
                            <el-option
                              v-for="(item,index) in appVuex.shop_doctor"
                              :key="index"
                              :label="item.memberName"
                              :value="item.memberNo">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="护士">
                    <template slot-scope="scope">
                       <el-select v-model="scope.row.assistantNo" size="mini" placeholder="请选择" class="pull-right">
                            <el-option
                              v-for="(item,index) in appVuex.shop_nurse"
                              :key="index"
                              :label="item.memberName"
                              :value="item.memberNo">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="咨询师">
                    <template slot-scope="scope">
                       <el-select v-model="scope.row.advisoryNo" size="mini" placeholder="请选择" class="pull-right">
                            <el-option
                              v-for="(item,index) in appVuex.shop_advisory"
                              :key="index"
                              :label="item.memberName"
                              :value="item.memberNo">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" size="small" @click="handleDeleteCheckedPro(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="totalSum">
                总计 : <span>{{totalSum}}</span>
            </div>
            <div class="amountSum clearfix">
                <div class="pull-left">整单折扣&nbsp;&nbsp;<el-input-number v-model="discount" :min="1" :max="100" size="mini"></el-input-number>%</div>
                <div class="pull-right"><span>应付金额：{{shouldTotalSum}}</span></div>
            </div>
            <div class="mainBox">
                <div class="clearfix" v-for="(item,index) in payTypeModel" :key="item.index" style="margin-bottom: 10px">
                    <div class="pull-left" style="margin-right: 30px;">
                     支付方式&nbsp;&nbsp;<el-select v-model="item.payType" placeholder="请选择">
                        <!-- <el-option
                        label="暂无"
                        value="">
                        </el-option> -->
                        <el-option
                        v-for="item in payTypeList"
                        :key="item.code"
                        :label="item.lableName"
                        :value="item.code">
                        </el-option>
                    </el-select>
                  </div>
                  <div class="pull-left">
                    实付金额&nbsp;&nbsp;<el-input v-model="item.yesTotalSum" @keyup.native="number"  placeholder="请输入内容" style="width: 250px"></el-input>
                  </div>
                  <div class="pull-left" style="margin-left: 20px" v-if="index === payTypeModel.length -1 "><el-button type="primary" icon="el-icon-plus" circle @click="handelAddPayType"></el-button></div>
                  <div class="pull-left" style="margin-left: 20px" v-if="index === payTypeModel.length -1 && payTypeModel.length > 1 "><el-button type="primary" icon="el-icon-minus" circle @click="handelDeletePayType"></el-button></div>
                </div>
                <div class="resultSum clearfix">
                    <div class="pull-left">
                        欠费：<span class="error">{{ ArrearageNum }}</span>
                    </div>
                    <div class="pull-left" style="margin-left: 20px">
                        找零：<span class="success">{{ keepChangeNum }}</span>
                    </div>
                    <div class="pull-right" style="margin-left: 20px">
                        实付总额：<span class="success">{{ amountPayNum }}</span>
                    </div>
                </div>
            </div>

            <div class="clearfix">
                <el-button type="primary" @click="DistributionPaid">分配项目实收</el-button>
            </div>
            <div class="mainBox">
                <el-form :inline="true" ref="formInlineRules" :model="formInline" :rules="formInlineRules" class="demo-form-inline" label-width="100px">
                    <el-form-item label="收费时间" prop="payTimeStr">
                        <el-date-picker
                          v-model="formInline.payTimeStr"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="收费人" prop="memberNoGuidCharge">
                        <el-select v-model="formInline.memberNoGuidCharge" placeholder="请选择">
                            <el-option
                            v-for="(item,index) in EmployeesList"
                            :key="index"
                            :label="item.memberName"
                            :value="item.memberNo">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="就诊时间"  prop="clinicTimeStr">
                        <el-date-picker
                          v-model="formInline.clinicTimeStr"
                          type="datetime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="备注" style="width: 100%">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="formInline.remark">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="bottomBtnBox">
                <div class="pull-left">
                    <el-button type="primary" @click="handleSaveBill('SAVE')">保存</el-button>
                    <el-button type="primary" @click="handleSaveBill('PAY')">收费</el-button>
                    <el-button @click="handleCancelCreateBill">取消</el-button>
                </div>
                <!-- <div class="pull-right">
                    <el-button>打印</el-button>
                    <el-button icon="el-icon-setting"></el-button>
                </div> -->
            </div>
      </div>
           <!-- 分配项目实收 -->
           <el-dialog
              title="分配项目实收"
              :visible.sync="dialogVisible_return"
              width="30%">

              <p style="font-size:20px;color:red;">实收可分配金额: <span style="font-size:24px">{{ amountPayNum }}</span></p>
              <!-- <p style="font-size:20px;color:red;">本次整单折扣: <span style="font-size:24px">{{ discount}}%</span></p> -->
              <br>
              <el-table :data="checkList" show-summary :summary-method="getSummaries">
                  <el-table-column type="index" width="50"></el-table-column>
                  <el-table-column prop="projectName" label="项目名称" :key="Math.random()"></el-table-column>
                  <el-table-column prop="price" label="应收" :key="Math.random()">
                      <template slot-scope="scope">
                         {{scope.row.num * (multiplyMath(scope.row.price,scope.row.minDiscount / 100))}}
                      </template>
                  </el-table-column>

                   <el-table-column prop="payAmount" label="实收" :key="Math.random()">
                      <template slot-scope="scope">
                         <el-input v-model="scope.row.payAmount" @keyup.native="number" size="mini"></el-input>
                      </template>
                  </el-table-column>
                  <el-table-column prop="debtAmount"  label="欠费">
                      <template slot-scope="scope">
                          <span>{{scope.row.debtAmount = (scope.row.num * (multiplyMath(scope.row.price,scope.row.minDiscount / 100))) - scope.row.payAmount || 0}}</span>
                      </template>
                  </el-table-column>
              </el-table>

              <span slot="footer" class="dialog-footer">
                  <el-button @click="handleCancelReturnModal">取消</el-button>
                  <el-button type="primary" @click="handleSubmitApply">保存</el-button>
              </span>
            </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapState } from 'vuex'
import storage from "@/tools/local_storage.js";

export default {
  components:{},
  props:{
    patientDetail: {
        type: Object,
        default: {}
    },
    billDetail: {
        type: Object,
        default: {}
    },
    operKey: {
        type: String,
        default: ''
    },
    payTypeList: {
      type: Array,
      default: []
    }
  },
  data(){
    return {
        num: 1,
        treeData: [],
        projectPriceList: [],
        checkList: [],
        discount: 100,
        payTypeModel: [
            {
                payType: '',
                yesTotalSum: 0
            }
        ],
        formInline: {
           payTimeStr: '',
           memberNoGuidCharge: '',
           clinicTimeStr: '',
           remark: ''
        },
        formInlineRules:{
           payTimeStr:[
             { required: true, message: '请选择收费时间', trigger: 'change' },
           ],
           memberNoGuidCharge:[
             { required: true, message: '请选择收费人', trigger: 'change' },
           ],
           clinicTimeStr:[
             { required: true, message: '请选择就诊时间', trigger: 'change' },
           ],
        },
        EmployeesList: [],
        chargeToggle: 'MX',
        dialogVisible_return: false,
        sub_reallyAmount: 0,
        sub_payAmount: 0,
        sub_debtAmount: 0,
    }
  },
  watch:{},
  computed:{
      ...mapState({
        appVuex: state => state["appVuex"]
      }),

      // 应付金额
      shouldTotalSum:(_this) => {
        return _this.multiplyMath(_this.totalSum,_this.discount/100)
      },
      // 欠费
      ArrearageNum:(_this) => {
        return _this.subtractMath(_this.amountPayNum,_this.shouldTotalSum) < 0 ? _this.subtractMath(_this.amountPayNum,_this.shouldTotalSum) : 0
      },
      // 找零
      keepChangeNum: (_this) => {
        return  _this.subtractMath(_this.amountPayNum,_this.shouldTotalSum) > 0 ? _this.subtractMath(_this.amountPayNum,_this.shouldTotalSum) : 0
      },

      // 总计
      totalSum: (_this) => {
        var totalSum = 0
        if(_this.checkList.length > 0) {
           _this.checkList.forEach(item=>{
             if(item.price && item.minDiscount && item.num) {
                totalSum += _this.multiplyMath(item.price,item.minDiscount/100) * item.num
             }
           })
        }
        return totalSum
      },

      originalAmount: (_this) => {
            var originalAmount = 0
            if(_this.checkList.length > 0) {
                _this.checkList.forEach(item=>{
                    if( item.price && item.minDiscount && item.num) {
                        originalAmount = _this.addMath(originalAmount,item.price)
                    }
                })
            }
            return originalAmount
      },

      // 实付总额
      amountPayNum: (_this) => {
           var num = 0
           _this.payTypeModel.forEach(item=>{
              num = _this.addMath(num,item.yesTotalSum)
           })
           return num
      },

      //实收
      payAmount: (_this) => {
        var payAmount = 0
        return payAmount
      },

    //欠费
    debtAmount: (_this) => {
      var debtAmount = 0
      if(_this.checkList.length > 0) {
         _this.checkList.forEach(item=>{
              debtAmount += item.debtAmount
         })
      }
      return debtAmount
    },



  },
  methods:{// 只能输入整数
      number(){　　
        this.checkList.forEach(item=>{
            let price = item.price.toString()
            if(price){
                item.price =  price.replace(/[^\.\d]/g,'');
                item.price =  price.replace('.','');
                item.price =  item.price
            }
        })
        this.payTypeModel.forEach(item=>{
            let yesTotalSum = item.yesTotalSum.toString()
            if(yesTotalSum){
                item.yesTotalSum =  yesTotalSum.replace(/[^\.\d]/g,'');
                item.yesTotalSum =  yesTotalSum.replace('.','');
                item.yesTotalSum = item.yesTotalSum
            }
        })
　　  },

      // 收费类型切换并清空
      handleChargeToggle() {
        this.clearEditData()
        this.getProjectPirceList()
      },

      // 清空数据
      clearEditData() {
        const checkedKeys = this.checkList.map(item=>item.code)
        this.checkList = []
        this.formInline.payTimeStr = ''
        this.formInline.memberNoGuidCharge = ''
        this.formInline.clinicTimeStr = ''
        this.formInline.remark = ''
        this.payTypeModel = [{payType: '',yesTotalSum: 0}]
        this.$refs.elTree.setCheckedKeys(checkedKeys,false)
      },

      // 选择操作
      handleCheckChange(data, checked, indeterminate) {
        if(checked && !data.children){
           this.checkList.push(data)
        } else if( !checked && !data.children ) {
           this.checkList = this.checkList.filter(item=>item.id !== data.id)
        }
      },

      // 删除某个项目
      handleDeleteCheckedPro(row) {
        this.checkList = this.checkList.filter(item=>item.id !== row.id)
        this.$refs.elTree.setChecked(row.id,false)
      },

      // 添加收费方式
      handelAddPayType() {
           this.payTypeModel.push({
               payType: '',
               yesTotalSum: 0
           })
      },

      handelDeletePayType() {
        this.payTypeModel.pop()
      },

      // 取消创建账单
      handleCancelCreateBill() {
          this.$emit('hideCreateBill')
      },

      // 保存收费账单
      handleSaveBill(optType) {
            const {memberNoGuid,memberNoMerchant, memberNameMerchant, roleEnnames,shopNo } = storage.get("userInfo")
            const { code, caseNo,name } = this.patientDetail
            const { clinicTimeStr, memberNoGuidCharge ,remark,payTimeStr } = this.formInline
            const { patientServiceCode } =  this.$route.query
            if( this.checkList.length === 0 ) {
                this.$message({
                    type: "error",
                    message: '请至少选择一个项目'
                });
                return
            }

            this.$refs['formInlineRules'].validate((valid) => {
                if (valid) {
                    let billOperate = {}
                    let details = []
                    billOperate['optType'] = optType
                    billOperate['originalAmount'] = this.totalSum * 100      // 原价总额
                    billOperate['reallyAmount'] = this.shouldTotalSum * 100        // 应付总额
                    billOperate['discountNum'] =  this.discount * 100              // 整单折扣
                    billOperate['payAmount'] = this.amountPayNum * 100             // 实付金额
                    billOperate['debtAmount'] = Math.abs(this.ArrearageNum * 100)  // 欠费总额
                    billOperate['memberNoGuid'] = memberNoGuidCharge
                    billOperate['memberNameGuid'] = this.EmployeesList.find(item=>item.memberNo === memberNoGuidCharge)['memberName']
                    billOperate['remark'] = remark
                    billOperate['payType'] = this.payTypeModel.map(item=>item.payType).join(',')
                    billOperate['payTypeName'] = this.payTypeList.filter(item=> this.payTypeModel.map(subitem=>subitem.payType).indexOf(item.code) !== -1).map(item=>item.lableName).join(',')
                    billOperate['payRemark'] = JSON.stringify(this.payTypeModel)
                    billOperate['payTimeStr'] = payTimeStr
                    billOperate['recieverNo'] = code
                    // billOperate['recieverName'] = name
                    billOperate['recieverName'] = this.EmployeesList.find(item=>item.memberNo === memberNoGuidCharge)['memberName']

                    details = this.checkList.map(item=> ({
                        projectCode: item.id,
                        projectName: item.label,
                        projectUnit: item.projectUnit,
                        unitPrice: ( item.price * 100 ),   // 原价
                        itemDisUnitPrice: (item.minDiscount / 100) * ( item.price * 100 ),   // 折扣价
                        itemNum: item.num,     // 项目数量
                        originalAmount:  ( item.price * 100 ) * item.num,   // 项目总原价
                        itemDiscountAmount: (item.minDiscount / 100) * ( item.price * 100 ) * item.num,   // 项目总折扣价
                        discountItem: item.minDiscount * 100,  // 单个项目折扣
                        doctorNo: item.doctorNo,
                        doctorName: item.doctorNo ? this.appVuex.shop_doctor.find(sssitem=>sssitem.memberNo ===item.doctorNo )['memberName'] : '',
                        advisoryNo: item.advisoryNo ,
                        advisoryName: item.advisoryNo ? this.appVuex.shop_advisory.find(sssitem=>sssitem.memberNo ===item.advisoryNo )['memberName'] : '',
                        assistantNo: item.assistantNo ,
                        assistantName: item.assistantNo ?this.appVuex.shop_nurse.find(sssitem=>sssitem.memberNo ===item.assistantNo )['memberName'] : '',
                        payAmount: (item.payAmount)*100 || 0,   //项目实收
                        reallyAmount: (item.num * (this.multiplyMath(item.price,item.minDiscount / 100)))*100 || 0, //项目应收
                        debtAmount: (item.debtAmount)*100 || 0, //项目欠费

                    }))

                    if (billOperate.payTypeName =='') {
                      this.$message.error('请选择支付方式')
                      return
                    }

                    let totalPaymount = 0
                    details.forEach( val => {
                      totalPaymount += val.payAmount
                    })

                    if( totalPaymount == 0 ) {
                      this.$message.error('请分配项目实收')
                      return
                    }
                    if (totalPaymount != billOperate.payAmount) {
                      this.$message.error('请全额分配实收金额')
                      return
                    }

                    // 修改并保存
                    if( this.operKey === 'edit') {
                       // 交易code
                       billOperate['code'] =  this.billDetail.billOperate.code
                       this.$http.post('/api/hx/bill/editAll.do',{
                           code: this.billDetail.code,  // 账单code
                           clinicTimeStr,
                           UpdateId:memberNoGuid,
                           billOperateJson: JSON.stringify(billOperate),
                           detailsJson:JSON.stringify(details)
                        }).then(res=>{
                            const { result, errorMessage, returnObject } = res.data
                            if (result) {
                                this.$message({
                                    type: "success",
                                    message: '操作成功！'
                                })
                                this.$emit('hideCreateBill')

                            } else {
                                this.$message({
                                    type: "error",
                                    message: errorMessage
                                });
                            }
                        })
                    }

                    // 新增账单/新增收费
                    if( this.operKey !== 'edit' ) {

                        this.$http.post('/api/hx/bill/add.do',{
                            merchantNo: memberNoMerchant,
                            merchantName: memberNameMerchant,
                            patientNo: code,
                            patientName: name,
                            medicalNo: caseNo,
                            billType: this.chargeToggle,
                            clinicTimeStr,
                            patientServiceCode: patientServiceCode ? patientServiceCode : '',
                            billOperateJson: JSON.stringify(billOperate),
                            detailsJson:JSON.stringify(details)
                        }).then(res=>{
                                const { result, errorMessage, returnObject } = res.data
                                if (result) {

                                    if(optType === 'SAVE'){
                                        this.$message({
                                            type: "success",
                                            message: '新增成功！'
                                        })
                                    } else {
                                        this.$message({
                                            type: "success",
                                            message: '收费成功！'
                                        })
                                    }

                                    this.$emit('hideCreateBill')

                                } else {
                                    this.$message({
                                        type: "error",
                                        message: errorMessage
                                    });
                                }
                        })
                    }

                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
      },

      // 获取收费项目列表
      getProjectPirceList() {
            const {
                    memberNoGuid,
                    memberNoMerchant,
                    memberNameMerchant,
                    roleEnnames,
                    shopNo
            } = storage.get("userInfo")
            this.$http.post('/api/hx/projectPrice/list.do',{
                start: (1 - 1 ) * 10000,
                limit: 10000,
                merchantNo: memberNoMerchant
            }).then(res=>{
                const { result, errorMessage, returnObject } = res.data;
                if (result) {
                    const { total, rows } = returnObject

                    if( this.operKey === 'edit') {
                       this.chargeToggle = this.billDetail.billType
                       this.treeData = this.handleTreeData(rows)
                       this.handleEditTreeData()
                    } else {
                       this.treeData = this.handleTreeData(rows)
                    }
                    this.projectPriceList = rows
                } else {
                    this.$message({
                        type: "error",
                        message: errorMessage
                    })
                }
            })
      },

      // 去重
      handleDoWight(data,key) {
          let arr1 = []
          let arr2 = []
          data.forEach(item=>{
              if(arr1.indexOf(item[key]) === -1) {
                arr1.push(item[key])
                arr2.push(item)
              }
          })
          return arr2
      },

      // 处理tree数据
      handleTreeData(rows) {
        const { firstMemberNo ,consMemberNo} = this.patientDetail
        const typeArr_1 = this.handleDoWight(rows.map( item=> ({ id: item.type1Code,label:item.type1Name })),'id')
        const typeArr_2 = this.handleDoWight(rows.map( item=> ({
            parid: item.type1Code,
            id:item.type2Code,
            label:item.type2Name,
            projectName:item.type2Name,
            projectUnit: item.projectUnit,
            num:1,
            price: 0,
            minDiscount: 100,
            doctorNo: firstMemberNo,
            advisoryNo: consMemberNo
        })),'id')
        const typeArr_3 = this.handleDoWight(rows.map( item=> ({
            parid: item.type2Code,
            id:item.code,
            label:item.projectName,
            ...item,
            num:1,
            price: item.price / 100,
            minDiscount:item.minDiscount / 100,
            doctorNo: firstMemberNo,
            advisoryNo: consMemberNo
        })),'id')

        let arr1 = []
        if( this.chargeToggle === 'MX'){
           arr1 = typeArr_2.map(item=> ({...item,children: typeArr_3.filter(subitem=>subitem.parid === item.id)}))
        } else {
           arr1 = typeArr_2
        }
        return typeArr_1.map(item=>({...item,children: arr1.filter(subitem=>subitem.parid === item.id)}))
      },



      // 处理编辑时携带的数据
      handleEditTreeData() {
            const data = this.billDetail
            const arr = data.details.map( item=> ({
                code: item.projectCode,
                id: item.projectCode,
                label: item.projectName,
                ...item,
                num:item.itemNum,
                price: item.unitPrice/100,
                minDiscount: item.discountItem/100
            }))
            this.discount = data.billOperate.discountNum / 100
            this.formInline.payTimeStr = data.billOperate.payTime
            this.formInline.memberNoGuidCharge = data.billOperate.memberNoGuid
            this.formInline.clinicTimeStr = data.clinicTime
            this.formInline.remark = data.remark
            this.payTypeModel = data.billOperate.payRemark ? JSON.parse(data.billOperate.payRemark) : [{payType: '',yesTotalSum: 0}]
            this.checkList = arr
            this.$refs.elTree.setCheckedKeys(arr.map(item=>item.id),true)
      },

      // 获取所有员工列表
      getEmployeesList() {
          const {
                memberNoGuid,
                memberNoMerchant,
                memberNameMerchant,
                roleEnnames,
                shopNo
          } = storage.get("userInfo")
          this.$http.post('/api/hx/guid/list.do',{
            shopNo,
            merchantNo: memberNoMerchant,
            roleEnname: ''
          }).then(res=>{
                const { result, errorMessage, returnObject } = res.data;
                if (result) {
                    this.EmployeesList = returnObject
                } else {
                    this.$message({
                        type: "error",
                        message: errorMessage
                    });
                }
          })
      },

      DistributionPaid () {

        if (this.amountPayNum == 0) {
          this.$message.error("请先填写支付方式和实付金额")
        } else {
          this.dialogVisible_return = true
        }
      },

      handleCancelReturnModal () {
        this.dialogVisible_return = false
      },
      handleSubmitApply () {
        this.dialogVisible_return = false
      },

      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '';
            return;
          } else if (index === 1) {
            sums[index] = '总计';
            return;
          } else if (index === 2) {
            /*
            *自动合计功能无法实现
            *尝试原始数据计算
            */
            let rowSum = 0;
            data.forEach( (e)=>{
              rowSum += (e.num) * (e.price) * (e.minDiscount / 100)
            })
            sums[index] = rowSum * (this.discount / 100)  //整单折扣
          }  else if (index === 4) {
            sums[index] = sums[2] - sums[3]
          } else {
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {          //验证每个value值是否是数字，如果是执行if
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] += '';
            } else {
              sums[index] = '0';
            }
          }

        });
        // this.sub_reallyAmount = sums[2]
        // this.sub_payAmount = sums[3]
        // this.sub_debtAmount = sums[4]
        // console.log(data)
        return sums;
      },


  },
  created(){},
  mounted(){
      this.getProjectPirceList()
      this.getEmployeesList()
  }
}
</script>
<style lang="less" scoped>
.CreateBillBox{
    .title{
        padding: 10px;
        background: #f7f7f7;
        font-size: 16px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        margin-bottom: 20px;
    }
    .lfBox{
        width: 15%;
        margin-right: 2%;
        max-height: 700px;
        overflow-y: auto;
    }
    .rgBox{
        width: 83%;
    }
    .totalSum{
        padding: 20px 0;
        text-align: right;
        span{
            font-size: 18px;
            display: inline-block;
            margin-left: 10px;
        }
    }
    .amountSum{
        padding: 20px;
        border-top: 1px solid #eeeeee;
    }
    .amountSum{
        line-height: 40px;
        span{
            font-size: 18px;
        }
    }
    .mainBox{
        background: #f7f7f7;
        padding: 40px;
        margin: 20px 0;
        .resultSum{
            padding: 40px 0 0 0;
            font-size: 20px;
            .error{
                color: red;
            }
            .success{
                color: #67C23A;
            }
        }
    }
}

</style>
