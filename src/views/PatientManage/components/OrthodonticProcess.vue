<template lang="html">
  <div>
      <div class="processBox">
        <div class="processTitle">
            <span>全部正畸过程</span>
            <span v-if="!showAddModal"><el-button size="mini" type="primary" @click="triggerAdd()">新增过程</el-button></span>
            <span v-if="showAddModal"><el-button size="mini" type="primary" @click="triggerList()">正畸记录</el-button></span>
        </div>
        <div v-if="!showAddModal">
          <el-timeline>
            <el-timeline-item placement="top" v-for="(item,index) in CaseList" :key="index">
              <el-card>
                <h4>{{item.updateDate}}
                  <span>{{item.createDate}}</span>
                  <div style="float:right">
                    <el-button size="mini" type="text" @click="handleProcessDetail(item)">详情</el-button>
                    <el-button size="mini" type="text" @click="handleProcessEdit(item)">编辑</el-button>
                    <el-button size="mini" type="text" @click="handleProcessDelete(item)">删除</el-button>
                  </div>
                </h4>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16" style="margin:5px 0;border-right:1px solid #eeeeee">
                    <p>处置 : <strong>{{item.mangement[0].explain || ''}}</strong></p>
                    <p>检查 : <strong>{{item.check[0].explain || ''}}</strong></p>
                    <p>医嘱 : <strong>{{item.doctorAdvice[0].explain || ''}}</strong></p>
                  </el-col>
                  <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" style="margin:5px 0;text-align:center">
                      <p>医生 : <strong> {{item.attendingDoctor}}</strong></p>
                      <p>护士 : <strong>{{item.nurse}}</strong></p>
                      <p>诊所 : <strong>{{shopName}}</strong></p>
                  </el-col>
                </el-row>
                <br>
                <div>
                  <span style="float:right">{{item.updateName}} 更新于{{item.updateDate}}</span>
                  <div class="clearfix"></div>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>

        <div v-if="showAddModal">
          <div>
            <el-form :inline="true" ref="addProcessForm" label-width="90px" :model="addProcessForm" :rules="addProcessFormRules" style="width: 100%;margin: 30px 0;" >
              <el-row>
                <el-col :span="5">
                  <el-form-item label="医生:" prop="attendingDoctor">
                    <el-select v-model="addProcessForm.attendingDoctor" :disabled="isCaseInfo">
                      <el-option label="请选择" value=""></el-option>
                      <el-option
                        v-for="item in appVuex.shop_doctor"
                        :key="item.memberNo"
                        :label="item.memberName"
                        :value="item.memberNo"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="护士:" prop="nurse">
                    <el-select v-model="addProcessForm.nurse" :disabled="isCaseInfo">
                      <el-option label="请选择" value=""></el-option>
                      <el-option
                        v-for="item in appVuex.shop_nurse"
                        :key="item.memberNo"
                        :label="item.memberName"
                        :value="item.memberNo"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="就诊时间:" prop="createDate">
                    <el-date-picker
                      :disabled="isCaseInfo"
                      v-model="addProcessForm.createDate"
                      type="datetime"
                      format="yyyy-MM-dd HH:mm:ss"
                      @change="changeCreateDate()"
                      placeholder="选择日期时间">
                    </el-date-picker>

                  </el-form-item>
                </el-col>
              </el-row>
              <div class="fl-r cf" v-if="!isCaseInfo" @click="userTemplate()"><el-button size="medium" type="primary">使用模板</el-button></div>

              <div class="formTitle">
                <span></span>处置
              </div>
              <div style="border: 1px solid #DCDFE6;padding:10px;">
                <span v-if="isCaseInfo">
                  <p v-for="(item, index) in addProcessForm.mangement" :key="index">
                    <span class="listItem">{{item.toothPosition}} <i class="itemTop">{{ item.remark}}</i></span>
                    <span class="listItem">{{item.explain}}</span>
                  </p>
                </span>
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
                      <td class="input-box"><el-input type="textarea" :rows="2" v-model="addProcessForm.dmDisposalRemark" placeholder="请输入处置"></el-input></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="tooth-dropdown-view" v-if="showToothBox && showViewLabel === 5">
                <div class="wrapper">
                  <div class="cf">
                    <div class="tooth-dropdown-main fl-l">
                      <div class="mb-10">
                        <div class="action-btn" style="margin-right: 10px" @click="clearChecked(true)">清空</div>
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
                <span></span>检查
              </div>
              <div style="border: 1px solid #DCDFE6;padding:10px;">
                <span v-if="isCaseInfo">
                  <p v-for="(item, index) in addProcessForm.check" :key="index">
                    <span class="listItem">{{item.toothPosition}} <i class="itemTop">{{ item.remark}}</i></span>
                    <span class="listItem">{{item.explain}}</span>
                  </p>
                </span>
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
                      <td class="input-box"><el-input type="textarea" :rows="3" v-model="addProcessForm.checkAuxiliaryRemark" placeholder="请输入检查"></el-input></td>
                    </tr>
                  </tbody>
                </table>
            </div>
            <div class="tooth-dropdown-view" v-if="showToothBox && showViewLabel === 2">
              <div class="wrapper">
                <div class="cf">
                  <div class="tooth-dropdown-main fl-l">
                    <div class="mb-10">
                      <div class="action-btn" style="margin-right: 10px" @click="clearChecked(true)">清空</div>
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
            <div style="border: 1px solid #DCDFE6;padding:10px;">
              <span v-if="isCaseInfo">
                <p v-for="(item, index) in addProcessForm.doctorAdvice" :key="index">
                  <span class="listItem">{{item.toothPosition}} <i class="itemTop">{{ item.remark}}</i></span>
                  <span class="listItem">{{item.explain}}</span>
                </p>
              </span>
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
                    <td class="input-box"><el-input type="textarea" :rows="2" v-model="addProcessForm.planDiagnosisRemark" placeholder="请输入医嘱"></el-input></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="tooth-dropdown-view" v-if="showToothBox && showViewLabel === 3">
              <div class="wrapper">
                <div class="cf">
                  <div class="tooth-dropdown-main fl-l">
                    <div class="mb-10">
                      <div class="action-btn" style="margin-right: 10px" @click="clearChecked(true)">清空</div>
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

              <br><br><br><br><br><br>
              <div style="text-align: center">
                <el-button @click="showAddModal = false">取消</el-button>
                <span v-if="!isCaseInfo">
                  <el-button type="primary" @click="submitForm('addProcessForm')">保存</el-button>
                  <el-button type="primary" @click="saveAsModal()">另存为模板</el-button>
                </span>
              </div>


            </el-form>
          </div>
        </div>

      </div>


      <el-dialog title="正畸模板保存" :visible.sync="dialog_saveModal" center width="40%">
        <div class="">
          <el-form ref="saveForm" :model="saveForm" :rules="saveFormRules" label-width="100px"style="max-width:700px;min-height:400px;">
            <el-form-item label="模板类别" prop="paramsName">
              <el-cascader
                  ref="addParentCascader"
                  v-model="saveForm.paramsName"
                  :options="cascaderData"
                  :props="{ checkStrictly: true,value: 'code', label: 'name' }"
                  :change-on-select="true"
                  @change="handleChangeParent"
                  expand-trigger="hover"
                  clearable
                  style="width:600px"
                  ></el-cascader>
            </el-form-item>
            <el-form-item label="模板名称" prop="name">
              <el-input v-model="saveForm.name" placeholder="请输入模板名称"></el-input>
            </el-form-item>
            <el-form-item label="处置">
              <el-input type="textarea" v-model="saveForm.dmDisposalRemark"></el-input>
            </el-form-item>
            <el-form-item label="检查">
              <el-input type="textarea" v-model="saveForm.checkRemark"></el-input>
            </el-form-item>
            <el-form-item label="医嘱">
              <el-input type="textarea" v-model="saveForm.dmMedicalRemark"></el-input>
            </el-form-item>

        </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog_saveModal = false">取 消</el-button>
          <el-button type="primary" @click="saveTemplate('saveForm')">保 存</el-button>
        </span>
      </el-dialog>

      <!-- 使用模板 -->
      <el-dialog title="正畸模板" :visible.sync="dialog_useModal" center>
        <div>
          <div class="tree-container">
            <div style="margin-bottom:10px;">
              <el-input size="small" placeholder="目录名称" v-model="filterText"> </el-input>
            </div>
            <el-tree
              ref="userTree"
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
            <div v-if="showModalDetail">
              <el-form ref="form" :model="form" :rules="rules" label-width="100px"style="max-width:700px;">
                <el-form-item label="上级目录" prop="cascader">
                  <el-cascader
                    disabled
                    ref="myCascader"
                    v-model="form.fatherTemplate"
                    :options="cascaderData"
                    :props="{ checkStrictly: true,value: 'code', label: 'name'}"
                    :change-on-select="true"
                     expand-trigger="hover"
                    clearable
                    style="width:400px"
                  >
                  </el-cascader>
                </el-form-item>
                <el-form-item label="名称" prop="templateName">
                  <el-input :disabled='disTemp' v-model="form.templateName" placeholder="请输入模板名称"></el-input>
                </el-form-item>
                <el-form-item label="处置" prop="management">
                  <el-input type="textarea" v-model="form.management"></el-input>
                </el-form-item>
                <el-form-item label="检查" prop="check">
                  <el-input type="textarea" v-model="form.check"></el-input>
                </el-form-item>
                <el-form-item label="医嘱" prop="doctorAdvice">
                  <el-input type="textarea" v-model="form.doctorAdvice"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog_useModal = false">取 消</el-button>
          <el-button type="primary" @click="chooseTemplate">确 定</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
import storage from '@/tools/local_storage.js'
import { mapActions, mapState } from "vuex"
import { parseTime } from '@/utils'

export default {
    data() {
      return {
        shopName: '',
        CaseList: [],
        showAddModal: false,
        isCaseInfo: false,
        addProcessForm: {
          attendingDoctor: '',
          nurse: '',
          createDate: parseTime(new Date().getTime()),
          dmDisposalRemark: '',
          checkAuxiliaryRemark: '',
          planDiagnosisRemark: '',

        },
        addProcessFormRules: {
          attendingDoctor: [
            { required: true, message: '请选择医生', trigger: 'change' }
          ],
          createDate: [
           { required: true, message: '请选择就诊日期', trigger: 'change' }
         ],
       },
       //
       showToothBox: false,  //
       isDisabled: false,    //能否选择牙面
       checkedTeethArr: [],  //选中的牙位
       checkedSideArr: [],  //选择的牙面
       showViewLabel: null,
       labelArr2: [],  //检查 牙位
       labelArr3: [],  //医嘱 牙位
       labelArr5: [],  //处置 牙位
       sideArr2: [],   //
       sideArr3: [],   //
       sideArr5: [],   //
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
       //


        dialog_saveModal: false,
        cascaderData: [],
        templateList: [],
        saveForm:{
          paramsName: [],
          name: '',
          checkRemark: '',
          dmDisposalRemark: '',
          dmMedicalRemark: '',

        },
        saveFormRules: {
          name: [
            { required: true, message: '请填写模板名称', trigger: 'blur' }
          ],
        },
        addParentCodeVal: '',
        addParentCodeName: '',
        dialog_useModal: false,
        filterText: '',

        showModalDetail: false,
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
      }
    },
    computed: {
      ...mapState({
        mutations: state => state["mutations"],
        appVuex: state => state["appVuex"]
      })
    },
    watch: {
        filterText(val) {
          this.$refs.userTree.filter(val);
        }
      },
    mounted() {
      this.getTopMenu()
      this.getProcessList()
      const { shopName } = this.$cfg.userInfo || storage.get('userInfo')
      this.shopName = shopName
    },
    methods: {

      triggerAdd() {
        this.showAddModal = true
      },

      triggerList() {
        this.showAddModal = false
        this.getProcessList()
      },

      submitForm(formName) {
        const { code } = this.$route.params
        const { attendingDoctor, nurse, createDate, checkAuxiliaryRemark, planDiagnosisRemark, dmDisposalRemark } = this.addProcessForm
        if(this.labelArr2.length > 0 && checkAuxiliaryRemark == '') {
          this.$message.error("检查中牙位缺少描述")
          return false
        }
        if(this.labelArr3.length > 0 && planDiagnosisRemark == '') {
          this.$message.error("医嘱牙位缺少描述")
          return false
        }
        if(this.labelArr5.length > 0 && dmDisposalRemark == '') {
          this.$message.error("处置中牙位缺少描述")
          return false
        }

          this.$refs[formName].validate((valid) => {
            if (valid) {
              let list = [
                { //处置
                  type: '1',
                  explain: dmDisposalRemark,
                  toothPosition: this.labelArr5.join(','),  //牙位
                  remark: this.sideArr5.join(',') || '',  //牙面
                },
                { //检查
                  type: '2',
                  explain: checkAuxiliaryRemark,
                  toothPosition: this.labelArr2.join(','),  //牙位
                  remark: this.sideArr2.join(',') || '',  //牙面
                },
                { //医嘱
                  type: '3',
                  explain: planDiagnosisRemark,
                  toothPosition: this.labelArr3.join(','),  //牙位
                  remark: this.sideArr3.join(',') || '',  //牙面
                },
              ]

              let params = {
                attendingDoctor,
                nurse,
                patientNo: code,
                createDate,
                list: JSON.stringify(list),
              }

              let url = ''
              if (this.addProcessForm.recordCode) {   //编辑
                  params.recordCode = this.addProcessForm.recordCode
                  url = '/api/hx/orthodonticsProcess/edit.do'
              } else {  //新增
                  url = '/api/hx/orthodonticsProcess/add.do'
              }
              // console.log(params)

              this.$http.post(url,params).then(res => {
                  if (res.data.result) {
                    this.$message.success("操作成功!")
                    this.showAddModal = false
                    this.getProcessList()
                    this.$refs[formName].resetFields()
                    this.addProcessForm = {
                      dmDisposalRemark: '',
                      checkAuxiliaryRemark: '',
                      planDiagnosisRemark: '',
                    }
                    this.labelArr5 = []
                    this.sideArr5 = []
                    this.labelArr2 = []
                    this.sideArr2 = []
                    this.labelArr3 = []
                    this.sideArr3 = []

                  } else {
                    this.$message.error(res.data.errorMessage)
                  }
                })
            }
          })
      },

      changeCreateDate() {
        //统一时间格式
        this.addProcessForm.createDate = parseTime(this.addProcessForm.createDate.getTime())
      },

      //详情
      handleProcessDetail(item) {
        this.showAddModal = true
        this.isCaseInfo = true
        this.addProcessForm = item
      },

      //编辑
      handleProcessEdit(item) {
        this.showAddModal = true
        this.isCaseInfo = false
        this.addProcessForm = {
          attendingDoctor: item.attendingDoctor,
          nurse: item.nurse,
          createDate: item.createDate,
          dmDisposalRemark: item.mangement[0].explain,
          checkAuxiliaryRemark: item.check[0].explain,
          planDiagnosisRemark: item.doctorAdvice[0].explain,
          recordCode: item.code
        }
        this.labelArr5 = item.mangement[0].toothPosition.split(',')
        this.sideArr5 = item.mangement[0].remark.split(',')
        this.labelArr2 = item.check[0].toothPosition.split(',')
        this.sideArr2 = item.check[0].remark.split(',')
        this.labelArr3 = item.doctorAdvice[0].toothPosition.split(',')
        this.sideArr3 = item.doctorAdvice[0].remark.split(',')
      },

      //删除
      handleProcessDelete(item) {
        this.$http.post('/api/hx/orthodonticsProcess/del.do',{
          code: item.code
        }).then(res => {
            if (res.data.result) {
              this.$message.success("删除成功!")
              this.getProcessList()
            } else {
              this.$message.error(res.data.errorMessage)
            }
          })
      },

      //另存为模板
      saveAsModal() {
          this.dialog_saveModal = true
          this.saveForm.checkRemark = this.addProcessForm.checkAuxiliaryRemark  //检查
          this.saveForm.dmDisposalRemark = this.addProcessForm.dmDisposalRemark  //处置
          this.saveForm.dmMedicalRemark = this.addProcessForm.planDiagnosisRemark  //医嘱
      },

      //保存为模板
      saveTemplate(formName) {
        let params = {
          name: this.saveForm.name,
          parentCode: this.addParentCodeVal,
          type: 2,
          check: this.saveForm.checkRemark,
          management: this.saveForm.dmDisposalRemark,
          doctorAdvice: this.saveForm.dmMedicalRemark,
        }
        //添加  1-模板目录   2- 模板
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$http.post('/api/hx/orthodonticsTemplate/add.do',params).then(res=>{
                if (res.data.result) {
                  this.$message.success("模板保存成功")
                  this.dialog_saveModal = false
                  this.saveForm = {
                    paramsName: [],
                    name: '',
                    checkRemark: '',
                    dmDisposalRemark: '',
                    dmMedicalRemark: '',
                  }
                  this.labelArr5 = []
                  this.sideArr5 = []
                  this.labelArr2 = []
                  this.sideArr2 = []
                  this.labelArr3 = []
                  this.sideArr3 = []
                } else {
                  this.$message.error(res.data.errorMessage)
                }
              })

            }
          })

      },


      //使用模板
      userTemplate () {
        this.dialog_useModal = true
      },

      chooseTemplate() {
        this.dialog_useModal = false
        this.addProcessForm = {
          checkAuxiliaryRemark: this.form.check,
          dmDisposalRemark: this.form.management,
          planDiagnosisRemark: this.form.doctorAdvice,
        }
      },

      filterNode(value, data) {
          if (!value) return true;
          return data.name.indexOf(value) !== -1;
      },

      //查看模板目录
      treeNodeClick(data, node, vuecomponent){
         // console.log('data:',  data,'\n' ,'node:', node, '\n', 'vuecomponent',vuecomponent)
        this.form.fatherTemplate = []
        this.form.templateName = data.name
        this.form.code = data.code
        this.showModalDetail = true
        if (data.levelCode == 1) {
           this.disTemp = true
        } else {
          this.form.fatherTemplate = data.parentCodes.split(',')
          this.disTemp = false
        }

        if (data.type == 2) {
          this.showModalDetail = true
          this.addParentCodeVal = data.parentCode
          //获取病历详情
          this.getTemplateDetail(data.code)
        } else {
          this.showModalDetail = false
        }
      },


      handleChangeParent (value) {
        // console.log(value)
        this.addParentCodeVal = value[value.length-1]
        this.addParentCodeName = this.$refs.addParentCascader.currentLabels
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

    //清空牙面
    clearBabyTeethAll () {
      this.checkedSideArr = []
      if (this.showViewLabel == 1) {
        this.sideArr1 = []
      }
      if (this.showViewLabel == 2) {
        this.sideArr2 = []
      }
      if (this.showViewLabel == 3) {
        this.sideArr3 = []
      }
      if (this.showViewLabel == 4) {
        this.sideArr4 = []
      }
      if (this.showViewLabel == 5) {
        this.sideArr5 = []
      }
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

      showTeethView (num) {
        this.clearChecked(false)
        this.showToothBox = !this.showToothBox
        if (num === 2) {
          this.showViewLabel = 2
          if (this.labelArr2.length) {
            this.labelArr2.map(item => {
              this.reverseShow(item)
            })
          }
          if (this.sideArr2.length) {
            this.sideArr2.map(item => {
              this.reverseShowSide(item)
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
          if (this.sideArr3.length) {
            this.sideArr3.map(item => {
              this.reverseShowSide(item)
            })
          }
        }
        else if (num === 5) {
          this.showViewLabel = 5
          if (this.labelArr5.length) {
            this.labelArr5.map(item => {
              this.reverseShow(item)
            })
          }
          if (this.sideArr5.length) {
            this.sideArr5.map(item => {
              this.reverseShowSide(item)
            })
          }
        }
      },

      //定义统一的反显方法(牙位)
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

      //定义统一的反显方法(牙面)
      reverseShowSide (item) {
        this.teethSide1.map(val => {
          if (item == val.sideName) {
              this.$set(val, 'checked', true)
          }
        })
        this.teethSide2.map(val => {
          if (item == val.sideName) {
              this.$set(val, 'checked', true)
          }
        })
        this.teethSide3.map(val => {
          if (item == val.sideName) {
              this.$set(val, 'checked', true)
          }
        })
      },


      //清空全部选项选项
      clearChecked(flag) {
        if (flag) {
          if (this.showViewLabel == 2) {
            this.labelArr2 = []
          }
          if (this.showViewLabel == 3) {
            this.labelArr3 = []
          }
          if (this.showViewLabel == 5) {
            this.labelArr5 = []
          }
        }

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

      // 获取正畸过程
      getProcessList() {
        const { code } = this.$route.params
        this.$http.post('/api/hx/orthodonticsProcess/get.do',{
          patientNo: code
        }).then(res=>{
            const { result, errorMessage, returnObject } = res.data
            if( result ) {
              this.CaseList = returnObject
            }else {
              this.$message({
                type:'error',
                message: errorMessage
              })
            }
        })
      },

      //获取模板目录
      getTopMenu () {
        this.$http.post('/api/hx/orthodonticsTemplate/list.do',{
          start: 1,
          limit: 9999,
        }).then( res => {
          if (res.data.result) {
            let arr = []
            this.cascaderData = this.addDisabled(res.data.returnObject) //含禁用
            arr = res.data.returnObject
            arr = JSON.parse(JSON.stringify(arr))
            this.templateList = arr //
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


    },
}
</script>

<style lang="less" scoped>
.addBtn{
  float:right;
}
.cf{
  clear: both;
  content: '';
  overflow: hidden;
}
.processBox {

  .processTitle{
    margin-bottom: 20px;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    background-color: #d1d1d1;
  }

  h4 {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 20px;
    background: rgba(64, 158, 255, 0.1);
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64, 158, 255, 0.2);
    padding: 10px;
    span {
      margin-left: 10px;
    }
  }
  p {
    padding: 10px;
  }
}
.fl-l{float: left;}
.fl-r{float: right;position: relative;top: 10px;z-index: 9999;}
.cur-pointer{cursor: pointer;}
.flex-box{
  .input-box{width: 65%}
  .labelBox{
    width: 30%;
    max-width: 300px;
    overflow-wrap: break-word; 
    flex: 1;
    padding-left: 15px;
    padding-right: 15px;
    background: url('/static/img/add.png') no-repeat;
    background-size: 48px 48px;
    background-position: 50% 50%;
    cursor: pointer;

    .labelBox-area{
      padding:10px;

      .label-area-text{
        position: absolute;
        font-size: 14px;
        display: contents;

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

  .listItem{
    width: 48%;
    display: inline-block;

    .itemTop{
      position: relative;
      bottom: 10px;
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
