<template>
  <div class="createPatientBox">
    <el-dialog
      :title="mutations.modalTitle"
      :visible="mutations.dialogFormVisible"
      :center="mutations.center"
      :show-close="false"
      width="70%"
    >

      <!-- 新建病历 -->
      <div v-if=" mutations.keyName === 'createCase'">
        <el-form
          :model="caseForm"
          ref="form"
          :rules="formDataRules"
          label-width="100px"
          class="formBox"
        >
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="医生：">
                <span v-if="isCaseInfo">{{caseForm.doctorNo}}</span>
                <el-select v-model="caseForm.doctorNo" v-if="!isCaseInfo" placeholder="请选择">
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
                <span v-if="isCaseInfo">{{caseForm.assistantNo}}</span>
                <el-select v-model="caseForm.assistantNo" v-if="!isCaseInfo" placeholder="请选择">
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
                <span v-if="isCaseInfo">{{caseForm.visitingDate}}</span>
                <el-date-picker
                  v-if="!isCaseInfo"
                  v-model="caseForm.visitingDate"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="类型：" prop="visitingType">
                <span v-if="isCaseInfo">
                  <span v-if="caseForm.visitingType === 'NEWDIAGNOSIS'">初诊病历</span>
                  <span v-if="caseForm.visitingType === 'REVIEW'">复诊病历</span>
                </span>
                <el-radio v-model="caseForm.visitingType" label="NEWDIAGNOSIS" v-if="!isCaseInfo" border>初诊病历</el-radio>
                <el-radio v-model="caseForm.visitingType" label="REVIEW" v-if="!isCaseInfo" border>复诊病历</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="fl-r cf" v-if="!isCaseInfo" @click="userTemplate"><el-button size="medium" type="primary">使用模板</el-button></div>
          <div class="formTitle">
            <span></span>主诉及病史
          </div>

          <el-row>
            <el-col>
              <el-form-item label="主诉：">
                <span v-if="isCaseInfo">{{caseForm.mainRemark}}</span>
                <el-input type="textarea" :rows="2" v-model="caseForm.mainRemark" v-if="!isCaseInfo" placeholder="请输入主诉"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="现病史：">
                <span v-if="isCaseInfo">{{caseForm.mainCurrentRemark}}</span>
                <el-input type="textarea" :rows="2" v-model="caseForm.mainCurrentRemark" v-if="!isCaseInfo" placeholder="请输入现病史"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="既往史：">
                <span v-if="isCaseInfo">{{caseForm.mainPastRemark}}</span>
                <el-input type="textarea" :rows="2" v-model="caseForm.mainPastRemark"  v-if="!isCaseInfo" placeholder="请输入既往史"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="formTitle">
            <span></span>口腔检查
          </div>
            <div style="border: 1px solid #DCDFE6;padding:10px;" v-for="(item,index) in oralModelList" :key="index">
                <span v-if="isCaseInfo">{{caseForm.checkOralRemark}}</span>
                <table style="width:100%" v-if="!isCaseInfo">
                  <tbody>
                    <tr class="flex-box">
                      <td class="labelBox" @click="showTeethView(1)">
                          <div class="labelBox-area">
                            <span class="label-area-text" v-if="labelArr1.length">
                              {{labelArr1.join(',')}}
                              <span class="label-area-tm" v-if="sideArr1.length">{{sideArr1.join(',')}}</span>
                            </span>
                          </div>
                      </td>
                      <td class="input-box"><el-input type="textarea" :rows="3" v-model="caseForm.checkOralRemark"  placeholder="请输入口腔检查"></el-input></td>
                      <td style="padding-left:10px;">
                        <el-button v-if="index === oralModelList.length -1 " @click="handelAddPayType" type="primary" size="mini" icon="el-icon-plus" circle></el-button>
                        <el-button v-if="index === oralModelList.length -1 && oralModelList.length > 1 " @click="handelDeletePayType" type="primary" size="mini" icon="el-icon-minus" circle></el-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="tooth-dropdown-view" v-if="showToothBox && showViewLabel === 1">
                <div class="wrapper">
                  <div class="cf">
                    <div class="tooth-dropdown-main fl-l">
                      <div class="mb-10">
                        <div class="action-btn" style="margin-right: 10px" @click="clearChecked">清空</div>
                        <div class="action-btn" @click="checked_babyTeeth_all">乳-全口</div>
                        <div class="action-btn" @click="checked_babyTeeth_bottom">乳-下半口</div>
                        <div class="action-btn" @click="checked_babyTeeth_top">乳上半口</div>
                        <div class="action-btn" @click="checked_permanentTeeth_all">恒-全口</div>
                        <div class="action-btn" @click="checked_permanentTeeth_top">恒-上半口</div>
                        <div class="action-btn" @click="checked_permanentTeeth_bottom">恒-下半口</div>
                      </div>
                      <table>
                        <tbody>
                          <tr class="tooth-row">
                            <td>
                              <div class="tooth-row-offet-3 tooth-group">
                                <div
                                  class="tootn-btn"
                                  v-for="(item, index) in babyTeeth5"
                                  :key="index"
                                  @click="chooseBabyTooth(item,5)"
                                  :class="{checked :item.checked}"
                                  >{{item.teethName}}
                                </div>
                              </div>
                              <div class="tooth-group">
                                <div
                                  class="tootn-btn"
                                  v-for="(item, index) in permanentTeeth1"
                                  :key="index"
                                  @click="chooseBabyTooth(item,1)"
                                  :class="{checked :item.checked}"
                                  >{{item.teethName}}
                                </div>
                              </div>
                            </td>
                            <td class="vertical-gap"></td>
                            <td>
                              <div class="tooth-group">
                                <div
                                  class="tootn-btn"
                                  v-for="(item, index) in babyTeeth6"
                                  :key="index"
                                  @click="chooseBabyTooth(item, 6)"
                                  :class="{checked :item.checked}"
                                  >{{item.teethName}}
                                </div>
                              </div>
                              <div class="tooth-group">
                                <div
                                  class="tootn-btn"
                                  v-for="(item, index) in permanentTeeth2"
                                  :key="index"
                                  @click="chooseBabyTooth(item,2)"
                                  :class="{checked :item.checked}"
                                  >{{item.teethName}}
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="tooth-row horizontal-gap">
                            <td><span>右</span></td>
                            <td class="vertical-gap"></td>
                            <td><span>左</span></td>
                          </tr>
                          <tr class="tooth-row">
                            <td>
                              <div class="tooth-group">
                                <div
                                  class="tootn-btn"
                                  v-for="(item, index) in permanentTeeth4"
                                  :key="index"
                                  @click="chooseBabyTooth(item,4)"
                                  :class="{checked :item.checked}"
                                  >{{item.teethName}}
                                </div>
                              </div>
                              <div class="tooth-row-offet-3 tooth-group">
                                <div
                                  class="tootn-btn"
                                  v-for="(item, index) in babyTeeth8"
                                  :key="index"
                                  @click="chooseBabyTooth(item, 8)"
                                  :class="{checked :item.checked}"
                                  >{{item.teethName}}
                                </div>
                              </div>
                            </td>
                            <td class="vertical-gap"></td>
                            <td>
                              <div class="tooth-group">
                                <div
                                  class="tootn-btn"
                                  v-for="(item, index) in permanentTeeth3"
                                  :key="index"
                                  @click="chooseBabyTooth(item,3)"
                                  :class="{checked :item.checked}"
                                  >{{item.teethName}}
                                </div>
                              </div>
                              <div class="tooth-group">
                                <div
                                  class="tootn-btn"
                                  v-for="(item, index) in babyTeeth7"
                                  :key="index"
                                  @click="chooseBabyTooth(item, 7)"
                                  :class="{checked :item.checked}"
                                  >{{item.teethName}}
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="tooth-dropdown-fight fl-l" :class="{'disabled': isDisabled }">
                      <div class="tooth-side-selector">
                        <div class="header">
                          <span v-if="checkedTeethArr && checkedTeethArr.length == 1" class="text-light">{{checkedTeethArr.join(',')}}</span>
                          <span v-if="checkedTeethArr && checkedTeethArr.length == 0" class="text-light">暂未选择牙位</span>
                        </div>
                        <div class="body">
                          <div class="tooth-side-row">
                            <div
                              class="tooth-side-btn"
                              v-for="(item, index) in teethSide1"
                              :key="index"
                              @click="chooseTeethSide(item, 1)"
                              :class="{checked :item.checked}"
                              :title="item.title"
                              >{{item.sideName}}
                            </div>
                          </div>
                          <div class="tooth-side-row">
                            <div
                              class="tooth-side-btn"
                              v-for="(item, index) in teethSide2"
                              :key="index"
                              @click="chooseTeethSide(item, 2)"
                              :class="{checked :item.checked}"
                              :title="item.title"
                              >{{item.sideName}}
                            </div>
                          </div>
                          <div class="tooth-side-row">
                            <div
                              class="tooth-side-btn"
                              v-for="(item, index) in teethSide3"
                              :key="index"
                              @click="chooseTeethSide(item, 3)"
                              :class="{checked :item.checked}"
                              :title="item.title"
                              >{{item.sideName}}
                            </div>

                          </div>
                        </div>
                    </div>
                  </div>
                </div>
                <div class="close-btn" @click="showToothBox = false">
                    <i class="el-icon-circle-close"></i>
                </div>
                </div>
              </div>
            <br>

            <div class="formTitle">
              <span></span>辅助检查
            </div>
            <div style="border: 1px solid #DCDFE6;padding:10px;">
              <span v-if="isCaseInfo">{{caseForm.checkAuxiliaryRemark}}</span>
              <table style="width:100%" v-if="!isCaseInfo">
                <tbody>
                  <tr class="flex-box">
                    <td class="labelBox" @click="showTeethView(2)">
                        <div class="labelBox-area">
                          <span class="label-area-text" v-if="labelArr2.length">
                            {{labelArr2.join(',')}}
                            <span class="label-area-tm" v-if="sideArr2.length">{{sideArr2.join(',')}}</span>
                          </span>
                        </div>
                    </td>
                    <td class="input-box"><el-input type="textarea" :rows="3" v-model="caseForm.checkAuxiliaryRemark" placeholder="请输入辅助检查"></el-input></td>
                  </tr>
                </tbody>
              </table>
          </div>
          <div class="tooth-dropdown-view" v-if="showToothBox && showViewLabel === 2">
            <div class="wrapper">
              <div class="cf">
                <div class="tooth-dropdown-main fl-l">
                  <div class="mb-10">
                    <div class="action-btn" style="margin-right: 10px" @click="clearChecked">清空</div>
                    <div class="action-btn" @click="checked_babyTeeth_all">乳-全口</div>
                    <div class="action-btn" @click="checked_babyTeeth_bottom">乳-下半口</div>
                    <div class="action-btn" @click="checked_babyTeeth_top">乳上半口</div>
                    <div class="action-btn" @click="checked_permanentTeeth_all">恒-全口</div>
                    <div class="action-btn" @click="checked_permanentTeeth_top">恒-上半口</div>
                    <div class="action-btn" @click="checked_permanentTeeth_bottom">恒-下半口</div>
                  </div>
                  <table>
                    <tbody>
                      <tr class="tooth-row">
                        <td>
                          <div class="tooth-row-offet-3 tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth5"
                              :key="index"
                              @click="chooseBabyTooth(item,5)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth1"
                              :key="index"
                              @click="chooseBabyTooth(item,1)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                        </td>
                        <td class="vertical-gap"></td>
                        <td>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth6"
                              :key="index"
                              @click="chooseBabyTooth(item, 6)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth2"
                              :key="index"
                              @click="chooseBabyTooth(item,2)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="tooth-row horizontal-gap">
                        <td><span>右</span></td>
                        <td class="vertical-gap"></td>
                        <td><span>左</span></td>
                      </tr>
                      <tr class="tooth-row">
                        <td>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth4"
                              :key="index"
                              @click="chooseBabyTooth(item,4)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                          <div class="tooth-row-offet-3 tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth8"
                              :key="index"
                              @click="chooseBabyTooth(item, 8)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                        </td>
                        <td class="vertical-gap"></td>
                        <td>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth3"
                              :key="index"
                              @click="chooseBabyTooth(item,3)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth7"
                              :key="index"
                              @click="chooseBabyTooth(item, 7)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="tooth-dropdown-fight fl-l" :class="{'disabled': isDisabled }">
                  <div class="tooth-side-selector">
                    <div class="header">
                      <span v-if="checkedTeethArr && checkedTeethArr.length == 1" class="text-light">{{checkedTeethArr.join(',')}}</span>
                      <span v-if="checkedTeethArr && checkedTeethArr.length == 0" class="text-light">暂未选择牙位</span>
                    </div>
                    <div class="body">
                      <div class="tooth-side-row">
                        <div
                          class="tooth-side-btn"
                          v-for="(item, index) in teethSide1"
                          :key="index"
                          @click="chooseTeethSide(item, 1)"
                          :class="{checked :item.checked}"
                          :title="item.title"
                          >{{item.sideName}}
                        </div>
                      </div>
                      <div class="tooth-side-row">
                        <div
                          class="tooth-side-btn"
                          v-for="(item, index) in teethSide2"
                          :key="index"
                          @click="chooseTeethSide(item, 2)"
                          :class="{checked :item.checked}"
                          :title="item.title"
                          >{{item.sideName}}
                        </div>
                      </div>
                      <div class="tooth-side-row">
                        <div
                          class="tooth-side-btn"
                          v-for="(item, index) in teethSide3"
                          :key="index"
                          @click="chooseTeethSide(item, 3)"
                          :class="{checked :item.checked}"
                          :title="item.title"
                          >{{item.sideName}}
                        </div>

                      </div>
                    </div>
                </div>
              </div>
            </div>
            <div class="close-btn" @click="showToothBox = false">
                <i class="el-icon-circle-close"></i>
            </div>
            </div>
          </div>
          <br>

          <div class="formTitle">
            <span></span>诊断
          </div>
          <div style="border: 1px solid #DCDFE6;padding:10px;">
            <span v-if="isCaseInfo">{{caseForm.planDiagnosisRemark}}</span>
            <table style="width:100%" v-if="!isCaseInfo">
              <tbody>
                <tr class="flex-box">
                  <td class="labelBox" @click="showTeethView(3)">
                      <div class="labelBox-area">
                        <span class="label-area-text" v-if="labelArr3.length">
                          {{labelArr3.join(',')}}
                          <span class="label-area-tm" v-if="sideArr3.length">{{sideArr3.join(',')}}</span>
                        </span>
                      </div>
                  </td>
                  <td class="input-box"><el-input type="textarea" :rows="2" v-model="caseForm.planDiagnosisRemark" v-if="!isCaseInfo" placeholder="请输入诊断"></el-input></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tooth-dropdown-view" v-if="showToothBox && showViewLabel === 3">
            <div class="wrapper">
              <div class="cf">
                <div class="tooth-dropdown-main fl-l">
                  <div class="mb-10">
                    <div class="action-btn" style="margin-right: 10px" @click="clearChecked">清空</div>
                    <div class="action-btn" @click="checked_babyTeeth_all">乳-全口</div>
                    <div class="action-btn" @click="checked_babyTeeth_bottom">乳-下半口</div>
                    <div class="action-btn" @click="checked_babyTeeth_top">乳上半口</div>
                    <div class="action-btn" @click="checked_permanentTeeth_all">恒-全口</div>
                    <div class="action-btn" @click="checked_permanentTeeth_top">恒-上半口</div>
                    <div class="action-btn" @click="checked_permanentTeeth_bottom">恒-下半口</div>
                  </div>
                  <table>
                    <tbody>
                      <tr class="tooth-row">
                        <td>
                          <div class="tooth-row-offet-3 tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth5"
                              :key="index"
                              @click="chooseBabyTooth(item,5)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth1"
                              :key="index"
                              @click="chooseBabyTooth(item,1)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                        </td>
                        <td class="vertical-gap"></td>
                        <td>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth6"
                              :key="index"
                              @click="chooseBabyTooth(item, 6)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth2"
                              :key="index"
                              @click="chooseBabyTooth(item,2)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="tooth-row horizontal-gap">
                        <td><span>右</span></td>
                        <td class="vertical-gap"></td>
                        <td><span>左</span></td>
                      </tr>
                      <tr class="tooth-row">
                        <td>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth4"
                              :key="index"
                              @click="chooseBabyTooth(item,4)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                          <div class="tooth-row-offet-3 tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth8"
                              :key="index"
                              @click="chooseBabyTooth(item, 8)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                        </td>
                        <td class="vertical-gap"></td>
                        <td>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth3"
                              :key="index"
                              @click="chooseBabyTooth(item,3)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth7"
                              :key="index"
                              @click="chooseBabyTooth(item, 7)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="tooth-dropdown-fight fl-l" :class="{'disabled': isDisabled }">
                  <div class="tooth-side-selector">
                    <div class="header">
                      <span v-if="checkedTeethArr && checkedTeethArr.length == 1" class="text-light">{{checkedTeethArr.join(',')}}</span>
                      <span v-if="checkedTeethArr && checkedTeethArr.length == 0" class="text-light">暂未选择牙位</span>
                    </div>
                    <div class="body">
                      <div class="tooth-side-row">
                        <div
                          class="tooth-side-btn"
                          v-for="(item, index) in teethSide1"
                          :key="index"
                          @click="chooseTeethSide(item, 1)"
                          :class="{checked :item.checked}"
                          :title="item.title"
                          >{{item.sideName}}
                        </div>
                      </div>
                      <div class="tooth-side-row">
                        <div
                          class="tooth-side-btn"
                          v-for="(item, index) in teethSide2"
                          :key="index"
                          @click="chooseTeethSide(item, 2)"
                          :class="{checked :item.checked}"
                          :title="item.title"
                          >{{item.sideName}}
                        </div>
                      </div>
                      <div class="tooth-side-row">
                        <div
                          class="tooth-side-btn"
                          v-for="(item, index) in teethSide3"
                          :key="index"
                          @click="chooseTeethSide(item, 3)"
                          :class="{checked :item.checked}"
                          :title="item.title"
                          >{{item.sideName}}
                        </div>

                      </div>
                    </div>
                </div>
              </div>
            </div>
            <div class="close-btn" @click="showToothBox = false">
                <i class="el-icon-circle-close"></i>
            </div>
            </div>
          </div>
          <br>

          <div class="formTitle">
            <span></span>治疗计划
          </div>
          <div style="border: 1px solid #DCDFE6;padding:10px;">
            <span v-if="isCaseInfo">{{caseForm.planTreatmentRemark}}</span>
            <table style="width:100%" v-if="!isCaseInfo">
              <tbody>
                <tr class="flex-box">
                  <td class="labelBox" @click="showTeethView(4)">
                      <div class="labelBox-area">
                        <span class="label-area-text" v-if="labelArr4.length">
                          {{labelArr4.join(',')}}
                          <span class="label-area-tm" v-if="sideArr4.length">{{sideArr4.join(',')}}</span>
                        </span>
                      </div>
                  </td>
                  <td class="input-box"><el-input type="textarea" :rows="2" v-model="caseForm.planTreatmentRemark" v-if="!isCaseInfo" placeholder="请输入治疗计划"></el-input></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tooth-dropdown-view" v-if="showToothBox && showViewLabel === 4">
            <div class="wrapper">
              <div class="cf">
                <div class="tooth-dropdown-main fl-l">
                  <div class="mb-10">
                    <div class="action-btn" style="margin-right: 10px" @click="clearChecked">清空</div>
                    <div class="action-btn" @click="checked_babyTeeth_all">乳-全口</div>
                    <div class="action-btn" @click="checked_babyTeeth_bottom">乳-下半口</div>
                    <div class="action-btn" @click="checked_babyTeeth_top">乳上半口</div>
                    <div class="action-btn" @click="checked_permanentTeeth_all">恒-全口</div>
                    <div class="action-btn" @click="checked_permanentTeeth_top">恒-上半口</div>
                    <div class="action-btn" @click="checked_permanentTeeth_bottom">恒-下半口</div>
                  </div>
                  <table>
                    <tbody>
                      <tr class="tooth-row">
                        <td>
                          <div class="tooth-row-offet-3 tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth5"
                              :key="index"
                              @click="chooseBabyTooth(item,5)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth1"
                              :key="index"
                              @click="chooseBabyTooth(item,1)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                        </td>
                        <td class="vertical-gap"></td>
                        <td>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth6"
                              :key="index"
                              @click="chooseBabyTooth(item, 6)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth2"
                              :key="index"
                              @click="chooseBabyTooth(item,2)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="tooth-row horizontal-gap">
                        <td><span>右</span></td>
                        <td class="vertical-gap"></td>
                        <td><span>左</span></td>
                      </tr>
                      <tr class="tooth-row">
                        <td>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth4"
                              :key="index"
                              @click="chooseBabyTooth(item,4)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                          <div class="tooth-row-offet-3 tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth8"
                              :key="index"
                              @click="chooseBabyTooth(item, 8)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                        </td>
                        <td class="vertical-gap"></td>
                        <td>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth3"
                              :key="index"
                              @click="chooseBabyTooth(item,3)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth7"
                              :key="index"
                              @click="chooseBabyTooth(item, 7)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="tooth-dropdown-fight fl-l" :class="{'disabled': isDisabled }">
                  <div class="tooth-side-selector">
                    <div class="header">
                      <span v-if="checkedTeethArr && checkedTeethArr.length == 1" class="text-light">{{checkedTeethArr.join(',')}}</span>
                      <span v-if="checkedTeethArr && checkedTeethArr.length == 0" class="text-light">暂未选择牙位</span>
                    </div>
                    <div class="body">
                      <div class="tooth-side-row">
                        <div
                          class="tooth-side-btn"
                          v-for="(item, index) in teethSide1"
                          :key="index"
                          @click="chooseTeethSide(item, 1)"
                          :class="{checked :item.checked}"
                          :title="item.title"
                          >{{item.sideName}}
                        </div>
                      </div>
                      <div class="tooth-side-row">
                        <div
                          class="tooth-side-btn"
                          v-for="(item, index) in teethSide2"
                          :key="index"
                          @click="chooseTeethSide(item, 2)"
                          :class="{checked :item.checked}"
                          :title="item.title"
                          >{{item.sideName}}
                        </div>
                      </div>
                      <div class="tooth-side-row">
                        <div
                          class="tooth-side-btn"
                          v-for="(item, index) in teethSide3"
                          :key="index"
                          @click="chooseTeethSide(item, 3)"
                          :class="{checked :item.checked}"
                          :title="item.title"
                          >{{item.sideName}}
                        </div>

                      </div>
                    </div>
                </div>
              </div>
            </div>
            <div class="close-btn" @click="showToothBox = false">
                <i class="el-icon-circle-close"></i>
            </div>
            </div>
          </div>
          <br>

          <div class="formTitle">
            <span></span>处置
          </div>
          <div style="border: 1px solid #DCDFE6;padding:10px;">
            <span v-if="isCaseInfo">{{caseForm.dmDisposalRemark}}</span>
            <table style="width:100%" v-if="!isCaseInfo">
              <tbody>
                <tr class="flex-box">
                  <td class="labelBox" @click="showTeethView(5)">
                      <div class="labelBox-area">
                        <span class="label-area-text" v-if="labelArr5.length">
                          {{labelArr5.join(',')}}
                          <span class="label-area-tm" v-if="sideArr5.length">{{sideArr5.join(',')}}</span>
                        </span>
                      </div>
                  </td>
                  <td class="input-box"><el-input type="textarea" :rows="2" v-model="caseForm.dmDisposalRemark" v-if="!isCaseInfo" placeholder="请输入处置"></el-input></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tooth-dropdown-view" v-if="showToothBox && showViewLabel === 5">
            <div class="wrapper">
              <div class="cf">
                <div class="tooth-dropdown-main fl-l">
                  <div class="mb-10">
                    <div class="action-btn" style="margin-right: 10px" @click="clearChecked">清空</div>
                    <div class="action-btn" @click="checked_babyTeeth_all">乳-全口</div>
                    <div class="action-btn" @click="checked_babyTeeth_bottom">乳-下半口</div>
                    <div class="action-btn" @click="checked_babyTeeth_top">乳上半口</div>
                    <div class="action-btn" @click="checked_permanentTeeth_all">恒-全口</div>
                    <div class="action-btn" @click="checked_permanentTeeth_top">恒-上半口</div>
                    <div class="action-btn" @click="checked_permanentTeeth_bottom">恒-下半口</div>
                  </div>
                  <table>
                    <tbody>
                      <tr class="tooth-row">
                        <td>
                          <div class="tooth-row-offet-3 tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth5"
                              :key="index"
                              @click="chooseBabyTooth(item,5)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth1"
                              :key="index"
                              @click="chooseBabyTooth(item,1)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                        </td>
                        <td class="vertical-gap"></td>
                        <td>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth6"
                              :key="index"
                              @click="chooseBabyTooth(item, 6)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth2"
                              :key="index"
                              @click="chooseBabyTooth(item,2)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="tooth-row horizontal-gap">
                        <td><span>右</span></td>
                        <td class="vertical-gap"></td>
                        <td><span>左</span></td>
                      </tr>
                      <tr class="tooth-row">
                        <td>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth4"
                              :key="index"
                              @click="chooseBabyTooth(item,4)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                          <div class="tooth-row-offet-3 tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth8"
                              :key="index"
                              @click="chooseBabyTooth(item, 8)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                        </td>
                        <td class="vertical-gap"></td>
                        <td>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in permanentTeeth3"
                              :key="index"
                              @click="chooseBabyTooth(item,3)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                          <div class="tooth-group">
                            <div
                              class="tootn-btn"
                              v-for="(item, index) in babyTeeth7"
                              :key="index"
                              @click="chooseBabyTooth(item, 7)"
                              :class="{checked :item.checked}"
                              >{{item.teethName}}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="tooth-dropdown-fight fl-l" :class="{'disabled': isDisabled }">
                  <div class="tooth-side-selector">
                    <div class="header">
                      <span v-if="checkedTeethArr && checkedTeethArr.length == 1" class="text-light">{{checkedTeethArr.join(',')}}</span>
                      <span v-if="checkedTeethArr && checkedTeethArr.length == 0" class="text-light">暂未选择牙位</span>
                    </div>
                    <div class="body">
                      <div class="tooth-side-row">
                        <div
                          class="tooth-side-btn"
                          v-for="(item, index) in teethSide1"
                          :key="index"
                          @click="chooseTeethSide(item, 1)"
                          :class="{checked :item.checked}"
                          :title="item.title"
                          >{{item.sideName}}
                        </div>
                      </div>
                      <div class="tooth-side-row">
                        <div
                          class="tooth-side-btn"
                          v-for="(item, index) in teethSide2"
                          :key="index"
                          @click="chooseTeethSide(item, 2)"
                          :class="{checked :item.checked}"
                          :title="item.title"
                          >{{item.sideName}}
                        </div>
                      </div>
                      <div class="tooth-side-row">
                        <div
                          class="tooth-side-btn"
                          v-for="(item, index) in teethSide3"
                          :key="index"
                          @click="chooseTeethSide(item, 3)"
                          :class="{checked :item.checked}"
                          :title="item.title"
                          >{{item.sideName}}
                        </div>

                      </div>
                    </div>
                </div>
              </div>
            </div>
            <div class="close-btn" @click="showToothBox = false">
                <i class="el-icon-circle-close"></i>
            </div>
            </div>
          </div>
          <br>

          <div class="formTitle">
            <span></span>医嘱
          </div>
          <el-row>
            <el-col>
              <el-form-item label="医嘱：">
                <span v-if="isCaseInfo">{{caseForm.dmMedicalRemark}}</span>
                <el-input type="textarea" :rows="2" v-model="caseForm.dmMedicalRemark" v-if="!isCaseInfo" placeholder="请输入医嘱"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="formTitle">
            <span></span>其他
          </div>
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="标签：">
                <span v-if="isCaseInfo">{{caseForm.otherLabelRemark}}</span>
                <el-input type="textarea" :rows="2" v-model="caseForm.otherLabelRemark" v-if="!isCaseInfo" placeholder="请输入标签"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="备注：">
                <span v-if="isCaseInfo">{{caseForm.otherRemark}}</span>
                <el-input type="textarea" :rows="2" v-model="caseForm.otherRemark" v-if="!isCaseInfo" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 新建病历 -->
      <br><br>
      <div slot="footer" class="dialog-footer" v-if="!isCaseInfo">
        <el-button @click="handleModalCancel">取 消</el-button>
        <el-button type="primary" @click="handleSaveOper">保存</el-button>
        <el-button type="primary" @click="saveTemplates">另存为模板</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-if="isCaseInfo">
        <el-button @click="handleModalCancel">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog title="病历模板" :visible.sync="caseTemplate" center>
      <div class="tree-container">
        <div style="margin-bottom:10px;">
          <el-input size="small" placeholder="目录名称" v-model="filterText"> </el-input>
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
          </span>
        </el-tree>
      </div>
      <div class="detail-container">
          <p class="title">{{this.templateName}}</p>
          <br>
          <el-form ref="form" :model="form" :rules="rules" label-width="100px"style="max-width:700px;">
            <el-form-item label="主诉：" prop="mainRemark">
              <span>{{form.mainRemark}}</span>
            </el-form-item>
            <el-form-item label="现病史：" prop="mainCurrentRemark">
              <span>{{form.mainCurrentRemark}}</span>
            </el-form-item>
            <el-form-item label="既往史：" prop="mainPastRemark">
              <span>{{form.mainPastRemark}}</span>
            </el-form-item>
            <el-form-item label="口腔检查：" prop="checkOralRemark">
              <span>{{form.checkOralRemark}}</span>
            </el-form-item>
            <el-form-item label="辅助检查：" prop="checkAuxiliaryRemark">
              <span>{{form.checkAuxiliaryRemark}}</span>
            </el-form-item>
            <el-form-item label="诊断：" prop="planDiagnosisRemark">
              <span>{{form.planDiagnosisRemark}}</span>
            </el-form-item>
            <el-form-item label="治疗方案：" prop="planTreatmentRemark">
              <span>{{form.planTreatmentRemark}}</span>
            </el-form-item>
            <el-form-item label="处置：" prop="dmDisposalRemark">
              <span>{{form.dmDisposalRemark}}</span>
            </el-form-item>
            <el-form-item label="医嘱：" prop="dmMedicalRemark">
              <span>{{form.dmMedicalRemark}}</span>
            </el-form-item>
            <el-form-item>
              <el-button @click="caseTemplate = false">取消</el-button>
              <el-button type="primary" @click="chooseTemplate">保存</el-button>
            </el-form-item>
          </el-form>
      </div>
    </el-dialog>

    <el-dialog title="病历模板保存" :visible.sync="modelParent" center>
      <div>
          <el-form ref="parentForm" :model="parentForm" :rules="parentRules" label-width="100px"style="max-width:700px;min-height:400px;">
            <el-form-item label="上级目录" prop="paramsName">
              <el-cascader
                  ref="addParentCascader"
                  v-model="parentForm.paramsName"
                  :options="cascaderData"
                  :props="{ checkStrictly: true,value: 'code', label: 'name' }"
                  :change-on-select="true"
                  @change="handleChangeParent"
                  clearable
                  style="width:600px"
                  ></el-cascader>
            </el-form-item>
            <el-form-item label="名称" prop="teName">
              <el-input v-model="parentForm.teName" placeholder="请输入模板名称"></el-input>
            </el-form-item>
          <div>
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
import { mapState } from "vuex"
import storage from '@/tools/local_storage.js'

export default {
  components: {},
  props: {
    CaseDetail: {
      type: Object,
      default: () => ({})
    },
    patientDetail:{
      type: Object,
      default: ()=> ({})
    },
    newAlreadyInfo: {
      type: Object,
      default: ()=> ({})
    },
    isCaseInfo: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      caseForm: {
        doctorNo: '',
        assistantNo: '',
        visitingDate: '',
        visitingType: '',
        mainRemark: '',
        mainCurrentRemark: '',
        mainPastRemark: '',
        checkOralRemark: '',
        checkAuxiliaryRemark: '',
        planDiagnosisRemark: '',
        planTreatmentRemark:'',
        dmDisposalRemark:'',
        dmMedicalRemark:'',
        otherLabelRemark:'',
        otherRemark: '',

      },
      formDataRules: {
        visitingDate: [
          { required: true, message: '请选择就诊时间', trigger: 'blur' },
        ],
        visitingType: [
          { required: true, message: '请选择患者类型', trigger: 'change' }
        ]
      },
      babyTeeth5: [
        {teethName: 'E', value: '5'}, {teethName: 'D', value: '4'}, {teethName: 'C', value: '3'},
        {teethName: 'B', value: '2'}, {teethName: 'A', value: '1'}
      ],
      babyTeeth6:[
        {teethName: 'A', value: '1'}, {teethName: 'B', value: '2'}, {teethName: 'C', value: '3'},
        {teethName: 'D', value: '4'}, {teethName: 'E', value: '5'}
      ],
      babyTeeth7:[
        {teethName: 'A', value: '1'}, {teethName: 'B', value: '2'}, {teethName: 'C', value: '3'},
        {teethName: 'D', value: '4'}, {teethName: 'E', value: '5'}
      ],
      babyTeeth8: [
        {teethName: 'E', value: '5'}, {teethName: 'D', value: '4'}, {teethName: 'C', value: '3'},
        {teethName: 'B', value: '2'}, {teethName: 'A', value: '1'}
      ],
      permanentTeeth1: [
        {teethName: '8'}, {teethName: '7'}, {teethName: '6'}, {teethName: '5'},
        {teethName: '4'}, {teethName: '3'}, {teethName: '2'}, {teethName: '1'},
      ],
      permanentTeeth2:[
        {teethName: '1'}, {teethName: '2'}, {teethName: '3'}, {teethName: '4'},
        {teethName: '5'}, {teethName: '6'}, {teethName: '7'}, {teethName: '8'},
      ],
      permanentTeeth3:[
        {teethName: '1'}, {teethName: '2'}, {teethName: '3'}, {teethName: '4'},
        {teethName: '5'}, {teethName: '6'}, {teethName: '7'}, {teethName: '8'},
      ],
      permanentTeeth4: [
        {teethName: '8'}, {teethName: '7'}, {teethName: '6'}, {teethName: '5'},
        {teethName: '4'}, {teethName: '3'}, {teethName: '2'}, {teethName: '1'},
      ],
      teethSide1: [
        {sideName: 'La', title: '唇面'}, {sideName: 'B', title: '颊面'}, {sideName: 'F', title: '唇面颊面'}
      ],
      teethSide2: [
        {sideName: 'M', title: '近中面'}, {sideName: 'O/i', title: '颌面/切缘'}, {sideName: 'D', title: '远中面'}
      ],
      teethSide3: [
        {sideName: 'L', title: '舌侧'}, {sideName: 'P', title: '腭侧'}
      ],
      showToothBox: false,  //
      isDisabled: false,    //能否选择牙面
      checkedTeethArr: [],  //选中的牙位
      checkedSideArr: [],  //选择的牙面
      showViewLabel: null,
      labelArr1: [],  //口腔检查 牙位
      labelArr2: [],  //辅助检查 牙位
      labelArr3: [],  //诊断 牙位
      labelArr4: [],  //治疗计划 牙位
      labelArr5: [],  //处置 牙位
      sideArr1: [],   //
      sideArr2: [],   //
      sideArr3: [],   //
      sideArr4: [],   //
      sideArr5: [],   //
      caseTemplate: false,
      filterText: '',
      templateName: '',
      form: {
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
      rules: {},
      modelParent: false,
      templateList: [],
      cascaderData: [],
      addParentCodeVal: '',
      addParentCodeName: '',
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
      parentRules: {},
      oralModelList: [
          {
            checkOralRemark: '',
            dentalPosition: '',  //牙位
            dentalSurface: '',  //牙面
            type: '1'
          }
      ],


    };
  },
  watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
  },
  computed: {
    ...mapState({
      mutations: state => state["mutations"],
      appVuex: state => state["appVuex"]
    })
  },
  methods: {
    filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
    },
    // 保存操作
    handleSaveOper() {

      if(this.labelArr1.length > 0 && this.caseForm.checkOralRemark == '') {
        this.$message.error("口腔检查中牙位缺少描述")
        return false
      }
      if(this.labelArr2.length > 0 && this.caseForm.checkAuxiliaryRemark == '') {
        this.$message.error("辅助检查中牙位缺少描述")
        return false
      }
      if(this.labelArr3.length > 0 && this.caseForm.planDiagnosisRemark == '') {
        this.$message.error("诊断中牙位缺少描述")
        return false
      }
      if(this.labelArr4.length > 0 && this.caseForm.planTreatmentRemark == '') {
        this.$message.error("治疗计划中牙位缺少描述")
        return false
      }
      if(this.labelArr5.length > 0 && this.caseForm.dmDisposalRemark == '') {
        this.$message.error("处置中牙位缺少描述")
        return false
      }

      const { keyName } = this.mutations
      if ( keyName ==="createCase") {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              const { caseForm } = this
              const { memberNoGuid , memberNameGuid } = this.$cfg.userInfo || storage.get('userInfo')
              if( caseForm.doctorNo ) {
                caseForm['doctorName'] = this.appVuex.shop_doctor.find(item=>item.memberNo === caseForm.doctorNo)['memberName']
              }
              if( caseForm.assistantNo ) {
                caseForm['assistantName'] = this.appVuex.shop_nurse.find(item=>item.memberNo === caseForm.assistantNo)['memberName']
              }
              let checks = [
                {
                  checkOralRemark: caseForm.checkOralRemark,
                  dentalPosition: this.labelArr1.join(','),  //牙位
                  dentalSurface: this.sideArr1,  //牙面
                  remark: '1',
                },
                {
                  checkAuxiliaryRemark: caseForm.checkAuxiliaryRemark,
                  dentalPosition: this.labelArr2.join(','),  //牙位
                  dentalSurface: this.sideArr2,  //牙面
                  remark: '2',
                },
              ]
              let dms = [
                {
                  dmDisposalRemark: caseForm.dmDisposalRemark,
                  dentalPosition: this.labelArr5.join(','),  //牙位,
                  dentalSurface: this.sideArr5,
                },
              ]
              let plans = [
                {
                  planDiagnosisRemark: caseForm.planDiagnosisRemark,
                  dentalPosition: this.labelArr3.join(','),
                  dentalSurface: this.sideArr3,
                  remark: '1',
                },
                {
                  planTreatmentRemark: caseForm.planTreatmentRemark,
                  dentalPosition: this.labelArr4.join(','),
                  dentalSurface: this.sideArr4,
                  remark: '2',
                },
              ]

              caseForm.checksJson = JSON.stringify(checks)
              caseForm.dmsJson = JSON.stringify(dms)
              caseForm.plansJson = JSON.stringify(plans)

              this.$emit("handleSaveOper", caseForm,()=>{
                this.$refs['form'].resetFields()
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

    // 添加口腔检查
    handelAddPayType() {
       this.oralModelList.push({
           checkOralRemark: '',
           dentalPosition: '',  //牙位
           dentalSurface: '',  //牙面
           type: '1'
       })
    },

    //  删除口腔检查
    handelDeletePayType() {
      this.oralModelList.pop()
    },


    showTeethView (num) {
      this.clearChecked()
      this.showToothBox = !this.showToothBox
      if ( num === 1) {
        this.showViewLabel = 1
        if (this.labelArr1.length) {
          this.labelArr1.map(item => {
            this.reverseShow(item)
          })
        }
      }
      else if (num === 2) {
        this.showViewLabel = 2
        if (this.labelArr2.length) {
          this.labelArr2.map(item => {
            this.reverseShow(item)
          })
        }
      }
      else if (num === 3) {
        this.showViewLabel = 3
        if (this.labelArr3.length) {
          this.labelArr3.map(item => {
            this.reverseShow(item)
          })
        }
      }
      else if (num === 4) {
        this.showViewLabel = 4
        if (this.labelArr4.length) {
          this.labelArr4.map(item => {
            this.reverseShow(item)
          })
        }
      } else {
        this.showViewLabel = 5
        if (this.labelArr5.length) {
          this.labelArr5.map(item => {
            this.reverseShow(item)
          })
        }
      }
    },

    //定义统一的反显方法
    reverseShow (item) {
      if(item.slice(0,1) == '1') {
        this.permanentTeeth1.forEach(val => {
          if (val.teethName == item.slice(1,2)) {
            val.checked = true
          }
        })
      }
      else if (item.slice(0,1) == '2') {
        this.permanentTeeth2.forEach(val => {
          if (val.teethName == item.slice(1,2)) {
            val.checked = true
          }
        })
      }
      else if (item.slice(0,1) == '3') {
        this.permanentTeeth3.forEach(val => {
          if (val.teethName == item.slice(1,2)) {
            val.checked = true
          }
        })
      }
      else if (item.slice(0,1) == '4') {
        this.permanentTeeth4.forEach(val => {
          if (val.teethName == item.slice(1,2)) {
            val.checked = true
          }
        })
      }
      else if (item.slice(0,1) == '5') {
        this.babyTeeth5.forEach(val => {
          if (val.value == item.slice(1,2)) {
            val.checked = true
          }
        })
      }
      else if (item.slice(0,1) == '6') {
        this.babyTeeth6.forEach(val => {
          if (val.value == item.slice(1,2)) {
            val.checked = true
          }
        })
      }
      else if (item.slice(0,1) == '7') {
        this.babyTeeth7.forEach(val => {
          if (val.value == item.slice(1,2)) {
            val.checked = true
          }
        })
      }
      else if (item.slice(0,1) == '8') {
        this.babyTeeth8.forEach(val => {
          if (val.value == item.slice(1,2)) {
            val.checked = true
          }
        })
      }
    },



    //存值
    setCheckedArr () {
        //保存选中的牙位
        let arr1 = [],arr2 = [],arr3 = [],arr4 = [],arr5 = [],arr6 = [],arr7 = [],arr8 = [];
        //第一象限
        this.babyTeeth5.forEach(item => {
          if (item.checked) {
            arr5.push('5'+ item.value)
          }
        })
        this.permanentTeeth1.forEach(item => {
          if (item.checked) {
            arr1.push('1'+ item.teethName)
          }
        })

        //第二象限
        this.babyTeeth6.forEach(item => {
          if (item.checked) {
            arr6.push('6'+ item.value)
          }
        })
        this.permanentTeeth2.forEach(item => {
          if (item.checked) {
            arr2.push('2'+ item.teethName)
          }
        })
        //第三象限
        this.permanentTeeth3.forEach(item => {
          if (item.checked) {
            arr3.push('3'+ item.teethName)
          }
        })
        this.babyTeeth7.forEach(item => {
          if (item.checked) {
            arr7.push('7'+ item.value)
          }
        })
        //第四象限
        this.permanentTeeth4.forEach(item => {
          if (item.checked) {
            arr4.push('4'+ item.teethName)
          }
        })
        this.babyTeeth8.forEach(item => {
          if (item.checked) {
            arr8.push('8'+ item.value)
          }
        })

      this.checkedTeethArr = [...arr1, ...arr2, ...arr3, ...arr4, ...arr5, ...arr6, ...arr7, ...arr8]
      console.log(this.checkedTeethArr)

      //如果选择牙位大于两个 则清空牙面
      if (this.checkedTeethArr.length > 1) {
        this.isDisabled = true
        this.clearBabyTeethAll()
      } else {
        this.isDisabled = false
      }

      if (this.showViewLabel == 1) {
        this.labelArr1 = this.checkedTeethArr
      }
      else if (this.showViewLabel == 2) {
        this.labelArr2 = this.checkedTeethArr
      }
      else if (this.showViewLabel == 3) {
        this.labelArr3 = this.checkedTeethArr
      }
      else if (this.showViewLabel == 4) {
        this.labelArr4 = this.checkedTeethArr
      }
      else if (this.showViewLabel == 5) {
        this.labelArr5 = this.checkedTeethArr
      }
  },

    //选择牙位
    chooseBabyTooth (item, num) {
      if (typeof item.checked === 'undefined') {
        this.$set(item, 'checked', true)
      } else {
        item.checked = !item.checked
      }
      this.setCheckedArr()
    },

    //选择牙面
    chooseTeethSide (item) {
      if (!this.isDisabled) {
          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', true)
          } else {
            item.checked = !item.checked
          }
          let arr1 = [],arr2 = [],arr3 = [];
          //选中的牙面
          this.teethSide1.forEach(item => {
            if (item.checked) {
              arr1.push(item.sideName)
            }
          })
          this.teethSide2.forEach(item => {
            if (item.checked) {
              arr2.push(item.sideName)
            }
          })
          this.teethSide3.forEach(item => {
            if (item.checked) {
              arr3.push(item.sideName)
            }
          })
          this.checkedSideArr = [...arr1, ...arr2, ...arr3]
           console.log(this.checkedSideArr)
          if (this.showViewLabel == 1) {
            this.sideArr1 = this.checkedSideArr
          }
          else if (this.showViewLabel == 2) {
            this.sideArr2 = this.checkedSideArr
          }
          else if (this.showViewLabel == 3) {
            this.sideArr3 = this.checkedSideArr
          }
          else if (this.showViewLabel == 4) {
            this.sideArr4 = this.checkedSideArr
          }
          else if (this.showViewLabel == 5) {
            this.sideArr5 = this.checkedSideArr
          }
      }

    },

    //清空牙面
    clearBabyTeethAll () {
      this.checkedSideArr = []
      this.sideArr1 = []
      this.sideArr2 = []
      this.sideArr3 = []
      this.sideArr4 = []
      this.sideArr5 = []
      this.teethSide1.forEach(item => {
        if (item.checked) {
          item.checked = false
        }
      })
      this.teethSide2.forEach(item => {
        if (item.checked) {
          item.checked = false
        }
      })
      this.teethSide3.forEach(item => {
        if (item.checked) {
          item.checked = false
        }
      })

    },

    //清空或选择  恒牙上左
    clearPermanentTeeth_top_left (flag) {
      this.permanentTeeth1.forEach(item => {
        if (flag) {
          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', true)
          } else {
            item.checked = !item.checked
          }
        } else {
          if (item.checked) {
            item.checked = false
          }
        }

      })
    },

    // 清空或选择  恒牙上右
    clearPermanentTeeth_top_right (flag) {
      this.permanentTeeth2.forEach(item => {
        if (flag) {
          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', true)
          } else {
            item.checked = !item.checked
          }
        } else {
          if (item.checked) {
            item.checked = false
          }
        }
      })
    },

    //清空或选择  恒牙下左
    clearPermanentTeeth_bottom_left (flag) {
      this.permanentTeeth4.forEach(item => {
        if (flag) {
          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', true)
          } else {
            item.checked = !item.checked
          }
        } else {
          if (item.checked) {
            item.checked = false
          }
        }
      })
    },

    //清空或选择 恒牙下右
    clearPermanentTeeth_bottom_right (flag) {
      this.permanentTeeth3.forEach(item => {
        if (flag) {
          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', true)
          } else {
            item.checked = !item.checked
          }
        } else {
          if (item.checked) {
            item.checked = false
          }
        }
      })
    },

    //清空或选择  乳牙上左
    clearBabyTeeth_top_left (flag) {
      this.babyTeeth5.forEach(item => {
        if (flag) {
          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', true)
          } else {
            item.checked = !item.checked
          }
        } else {
          if (item.checked) {
            item.checked = false
          }
        }
      })
    },

    //清空或选择 乳牙上右
    clearBabyTeeth_top_right (flag) {
      this.babyTeeth6.forEach(item => {
        if (flag) {
          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', true)
          } else {
            item.checked = !item.checked
          }
        } else {
          if (item.checked) {
            item.checked = false
          }
        }
      })
    },

    //清空或选择  乳牙下左
    clearBabyTeeth_bottom_left (flag) {
      this.babyTeeth8.forEach(item => {
        if (flag) {
          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', true)
          } else {
            item.checked = !item.checked
          }
        } else {
          if (item.checked) {
            item.checked = false
          }
        }
      })
    },

    //清空或选择  乳牙下右
    clearBabyTeeth_bottom_right (flag) {
      this.babyTeeth7.forEach(item => {
        if (flag) {
          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', true)
          } else {
            item.checked = !item.checked
          }
        } else {
          if (item.checked) {
            item.checked = false
          }
        }
      })
    },

    //清空牙面 La B f
    clearTeethSide1 () {
      this.teethSide1.forEach(item => {
        if (item.checked) {
          item.checked = false
        }
      })
    },

    //清空牙面 M O/i D
    clearTeethSide2 () {
      this.teethSide2.forEach(item => {
        if (item.checked) {
          item.checked = false
        }
      })
    },

    //清空牙面 L、P
    clearTeethSide3 () {
      this.teethSide3.forEach(item => {
        if (item.checked) {
          item.checked = false
        }
      })
    },
    //清空全部选项选项
    clearChecked() {
      this.checkedTeethArr = []
      this.checkedSideArr = []
      this.clearPermanentTeeth_top_left(false)
      this.clearPermanentTeeth_top_right(false)
      this.clearPermanentTeeth_bottom_left(false)
      this.clearPermanentTeeth_bottom_right(false)

      this.clearBabyTeeth_top_left(false)
      this.clearBabyTeeth_top_right(false)
      this.clearBabyTeeth_bottom_left(false)
      this.clearBabyTeeth_bottom_right(false)

      this.clearTeethSide1()
      this.clearTeethSide2()
      this.clearTeethSide3()
    },

    //乳全口
    checked_babyTeeth_all () {
      this.checked_babyTeeth_top(true)
      this.checked_babyTeeth_bottom(true)
      this.setCheckedArr()
    },

    //乳上半口
    checked_babyTeeth_top () {
      this.clearBabyTeeth_top_left(true)
      this.clearBabyTeeth_top_right(true)
      this.setCheckedArr()
    },

    //乳下半口
    checked_babyTeeth_bottom () {
        this.clearBabyTeeth_bottom_left(true)
        this.clearBabyTeeth_bottom_right(true)
        this.setCheckedArr()
    },

    //恒全口
    checked_permanentTeeth_all () {
      this.checked_permanentTeeth_top()
      this.checked_permanentTeeth_bottom()
      this.setCheckedArr()
    },
    //恒上半口
    checked_permanentTeeth_top () {
      this.clearPermanentTeeth_top_left(true)
      this.clearPermanentTeeth_top_right(true)
      this.setCheckedArr()
    },

    //恒下半口
    checked_permanentTeeth_bottom () {
      this.clearPermanentTeeth_bottom_left(true)
      this.clearPermanentTeeth_bottom_right(true)
      this.setCheckedArr()
    },

    //另存为模板
    saveTemplates () {
      this.modelParent = true
      this.parentForm = this.caseForm
    },

    //新建模板
    submitForm(formName, name) {

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
                this.$message.success("保存为模板成功")
                this.modelParent = false
                this.$refs[formName].resetFields()
              } else {
                this.$message.error(res.data.errorMessage)
              }
            })
          }
        });
      }
    },

    handleChangeParent (value) {
      this.addParentCodeVal = value[value.length-1]
      this.addParentCodeName = this.$refs.addParentCascader.currentLabels
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
    },


    //查看模板目录
    treeNodeClick(data, node, vuecomponent){
      this.templateName = data.name
      this.showEditDetail = true
      if (data.type == 2) {
        //获取病历详情
        this.getTemplateDetail(data.code)
      }
    },

    userTemplate () {
      this.caseTemplate = true
    },

    //选择模板
    chooseTemplate () {
      this.caseTemplate = false
      this.caseForm = this.form
    },

    //获取模板病历详情
    getTemplateDetail (code) {
      this.$http.post('/api/hx/medical/template/get.do',{
        code: code
      }).then(res => {
        if (res.data.result) {
          let data = res.data.returnObject
          this.form = data
        }
      })
    },

  },

  mounted() {
      for(let key in this.CaseDetail){
        this.caseForm[key] = this.CaseDetail[key]
      }

      if(!this.caseForm['doctorNo']) {
        this.caseForm['doctorNo'] = this.newAlreadyInfo['reservationDoctorNo']
      }

      if(!this.caseForm['visitingDate']) {
        this.caseForm['visitingDate'] = this.newAlreadyInfo['reservationDate']
      }
      this.getTopMenu()

      if (this.caseForm.checks) {
        this.caseForm.checks.forEach(item => {
          if (item.remark ==1) {
            this.labelArr1 = item.dentalPosition.split(',')
            this.sideArr1 = JSON.parse(item.dentalSurface)
          } else {
            this.labelArr2 = item.dentalPosition.split(',')
            this.sideArr2 = JSON.parse(item.dentalSurface)
          }
        })
      }
      if (this.caseForm.plans) {
        this.caseForm.plans.forEach(item => {
          if (item.remark ==1) {
            this.labelArr3 = item.dentalPosition.split(',')
            this.sideArr3 = JSON.parse(item.dentalSurface)
          } else {
            this.labelArr4 = item.dentalPosition.split(',')
            this.sideArr4 = JSON.parse(item.dentalSurface)
          }
        })
      }
      if (this.caseForm.dms) {
        this.caseForm.plans.forEach(item => {
            this.labelArr5 = item.dentalPosition.split(',')
            this.sideArr5 = JSON.parse(item.dentalSurface)
        })
      }
      console.log(this.labelArr1)
      // if (this.caseForm.checks) {
      //   this.caseForm.checks.forEach(item => {
      //     if (item.remark ==1) {
      //       this.labelArr1.push(item)
      //     } else {
      //       this.labelArr2.push(item)
      //     }
      //   })
      // }


  }
};
</script>
<style lang="less" scoped>
.fl-l{float: left;}
.fl-r{float: right;position: relative;top: 10px;z-index: 9999;}
.cf{clear: both;overflow: hidden;}
.disabled{cursor: not-allowed!important;}
.cur-pointer{cursor: pointer;}
.flex-box{
  .input-box{width: 65%}
  .labelBox{
    width: 30%;
    flex: 1;
    padding-left: 15px;
    padding-right: 15px;


    .labelBox-area{
      padding:10px;

      .label-area-text{
        position: absolute;
        font-size: 14px;

        .label-area-tm{
            font-size: 12px;
            position: relative;
            top: -10px;
            right: -3px;
        }
      }

      table{
        cursor: pointer;
        user-select: none;
        min-width: 120px;
        min-height: 40px;
        td{
          height: 20px;
        }

        .sides{
          font-size: 12px;
          position: relative;
          top: -4px;
          transform: scale(.9);
          display: inline-block;
        }

        .map-place{
          display: inline-block;
        }

        .quadrant1{
          width: 50%;
          min-width: 50px;
          border-right: 1px solid #00a6c9;
          border-bottom: 1px solid #00a6c9;
          text-align: right;
        }
        .quadrant2{
          width: 50%;
          min-width: 50px;
          border-left: 1px solid #00a6c9;
          border-bottom: 1px solid #00a6c9;
          text-align: left;
        }
        .quadrant3{
          width: 50%;
          min-width: 50px;
          border-left: 1px solid #00a6c9;
          border-top: 1px solid #00a6c9;
          text-align: left;
        }
        .quadrant4{
          width: 50%;
          min-width: 50px;
          border-right: 1px solid #00a6c9;
          border-top: 1px solid #00a6c9;
          text-align: right;
        }
      }
    }
  }
}

  .tooth-dropdown-view{
    position: absolute;
    z-index: 1;
    background-color: #fff;
    border: 1px solid #ebebeb;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
    padding: 10px 10px 30px 10px;
    min-width: 800px;

    .wrapper{
      position: relative;

      .close-btn{
        font-size: 20px;
        color: #bbbbbb;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
      }

      .tooth-dropdown-main{
        position: relative;

        .tooth-row{
          td:nth-child(1){
            padding-right: 4px;
          }
          td:nth-child(3){
            padding-left: 9px;
          }
        }

        .mb-10{
          margin-bottom: 10px;
        }

        .action-btn{
          height: 28px;
          line-height: 28px;
          font-size: 14px;
          color: #575d6a;
          text-align: center;
          background-color: #fff;
          display: inline-block;
          cursor: pointer;
          border: 1px solid #e9edf1;
          box-sizing: border-box;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          padding: 0 6px;
          margin: 0 5px;

          &:hover{
            background-color: #e5f7f7;
          }
          &.checked{
            background-color: #00a6c9;
            color: #fff;
            border: 1px solid #00a6c9;
          }
          &.actived{
            box-shadow: inset 0 0 0 4px rgba(255,255,255,.3), 0 2px 4px rgba(43,56,80,.2);
            border-color: #73c0d9;
          }
        }

        .tooth-row-offet-3{
          padding-left: 120px;
        }

        .tooth-group{
            margin-bottom: 4px;
        }

        .vertical-gap{
          border-right: 1px solid #9397a2;
        }

        .horizontal-gap{
          font-size: 12px;
          color: #a4a5a9;
          text-align: center;
          &:after{
            content: ' ';
            width: 600px;
            display: block;
            position: absolute;
            left: 0;
            border-top: 1px solid #9397a2;
            top: 109px;
          }

          span{
            background-color: #fff;
            display: inline-block;
            z-index: 2;
            position: relative;
            padding: 0 2px;
          }
        }

        .tootn-btn{
          height: 28px;
          line-height: 28px;
          font-size: 14px;
          color: #575d6a;
          text-align: center;
          background-color: #fff;
          display: inline-block;
          cursor: pointer;
          border: 1px solid #e9edf1;
          box-sizing: border-box;
          position: relative;
          user-select: none;
          width: 32px;
          margin-right: 4px;
          &:hover{
            background-color: #e5f7f7;
          }
          &.actived{
            box-shadow: inset 0 0 0 4px rgba(255,255,255,.3), 0 2px 4px rgba(43,56,80,.2);
            border-color: #73c0d9;
          }
          &.checked{
            background-color: #00a6c9;
            color: #fff;
            border: 1px solid #00a6c9;
          }
        }
      }

      .tooth-dropdown-fight{

          .tooth-side-selector{
            border: 1px solid #f1f3f7;
            font-size: 12px;
            text-align: center;
            margin-left: 20px;
            background-color: #f1f3f7;
            margin-top: 40px;

            .header{
              height: 32px;
              position: relative;
              border-bottom: 1px solid #d8d8d8;

              .text-light{
                color: #666a73;
                line-height: 32px;
              }
            }

            .body{
              padding: 10px 6px 0 6px;

               .tooth-side-row{
                margin-bottom: 5px;

                .tooth-side-btn{
                  height: 28px;
                  line-height: 28px;
                  font-size: 14px;
                  color: #575d6a;
                  text-align: center;
                  background-color: #fff;
                  display: inline-block;
                  border: 1px solid #e9edf1;
                  box-sizing: border-box;
                  position: relative;
                  -webkit-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
                  border-color: #fff;
                  background-color: #fff;
                  width: 32px;
                  margin-right: 5px;

                  &:hover{
                    border: 1px solid #e9edf1;
                    background-color: #e5f7f7;
                  }
                  &.checked{
                    background-color: #00a6c9;
                    color: #fff;
                    border: 1px solid #00a6c9;
                  }
                }
              }
            }
          }

      }
    }
  }
  .tree-container{
    width: 28%;
    display: inline-block;
    padding-right: 15px;
  }
  .detail-container{
    width: 69%;
    display: inline-block;
    border-left: 2px solid #f1f1f1;
    vertical-align: top;

    .title{
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      border-bottom: 1px solid #f1f1f1;
      margin-left: 10px;
      padding-bottom: 10px;
    }
  }
</style>
