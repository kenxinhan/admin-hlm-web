<template lang="html">
  <div>
    <div class="headBox cf">
        <span style="float: left; font-size:16px;">全部正畸检查</span>
        <span style="float: right; padding: 3px 0">
        <span v-if="!showEdit">
          <el-button size="mini" type="primary" @click="showPrint = true">打印</el-button>
          <el-button size="mini" type="primary" @click="editCheck()">编辑</el-button>
        </span>
      </span>

    </div>

      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <span>一般检查</span>
          <span v-if="showEdit">
            <span style="float: right; padding: 3px 0">
              <el-button size="mini" type="primary" @click="submitGeneralCheck('generalCheck')">保存</el-button>
              <el-button size="mini" type="primary" @click="showEdit = false">取消</el-button>
            </span>
          </span>
        </div>
        <div >
          <el-form :inline="true" ref="generalCheck" label-width="90px" :model="generalCheck" :rules="generalCheckRules" style="width: 100%;margin: 30px 0;" class="demo-form-inline">
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">主诉</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="主诉:" >
                    <span v-if="!showEdit">{{generalCheck.chiefComplaint || '--'}}</span>
                    <span v-if="showEdit"><el-input v-model="generalCheck.chiefComplaint"> </el-input></span>
                  </el-form-item>
                </el-col>
            </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">口腔习惯</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="不良习惯:" >
                    <span v-if="!showEdit">{{generalCheck.badHabits || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="generalCheck.badHabits">
                          <el-option label="咬上唇" value="咬上唇"></el-option>
                          <el-option label="咬下唇" value="咬下唇"></el-option>
                          <el-option label="覆盖下唇" value="覆盖下唇"></el-option>
                          <el-option label="吮指" value="吮指"></el-option>
                          <el-option label="咬手指" value="咬手指"></el-option>
                          <el-option label="咬物" value="咬物"></el-option>
                          <el-option label="口呼吸" value="口呼吸"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
              <el-col :span="5">
                <el-form-item label="口腔卫生:" >
                  <span v-if="!showEdit">{{generalCheck.oralHygiene || '--'}}</span>
                  <span v-if="showEdit">
                    <el-select v-model="generalCheck.oralHygiene">
                        <el-option label="好" value="好"></el-option>
                        <el-option label="中" value="中"></el-option>
                        <el-option label="差" value="差"></el-option>
                    </el-select>
                  </span>
                </el-form-item>
              </el-col>
            </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">发育情况</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="颈椎:" >
                    <span v-if="!showEdit">{{generalCheck.cervicalVertebra || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="generalCheck.cervicalVertebra">
                          <el-option label="不详" value="不详"></el-option>
                          <el-option label="S1" value="S1"></el-option>
                          <el-option label="S2" value="S2"></el-option>
                          <el-option label="S3" value="S3"></el-option>
                          <el-option label="S4" value="S4"></el-option>
                          <el-option label="S5" value="S5"></el-option>
                          <el-option label="S6" value="S6"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="手腕骨:" >
                    <span v-if="!showEdit">{{generalCheck.wristBone || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="generalCheck.wristBone">
                        <el-option label="不详" value="不详"></el-option>
                        <el-option label="F期" value="F期"></el-option>
                        <el-option label="FG期" value="FG期"></el-option>
                        <el-option label="G期" value="G期"></el-option>
                        <el-option label="H期" value="H期"></el-option>
                        <el-option label="I期" value="I期"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="月经:" >
                    <span v-if="!showEdit">{{generalCheck.menstruation || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="generalCheck.menstruation">
                          <el-option label="有" value="有"></el-option>
                          <el-option label="无" value="无"></el-option>
                          <el-option label="不详" value="不详"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
              <el-col :span="5">
                <el-form-item label="初潮:" >
                  <span v-if="!showEdit">{{generalCheck.menarche || '--'}}</span>
                  <span v-if="showEdit">
                    <el-input type="text" v-model="generalCheck.menarche"> </el-input>
                  </span>
                </el-form-item>
              </el-col>
            </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">以前治疗情况</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="矫正史:" >
                    <span v-if="!showEdit">{{generalCheck.correctiveHistory || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="generalCheck.correctiveHistory">
                          <el-option label="有" value="有"></el-option>
                          <el-option label="无" value="无"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="经治医生:" >
                    <span v-if="!showEdit">{{generalCheck.attendingDoctor || '--'}}</span>
                    <span v-if="showEdit">
                      <el-input type="text" v-model="generalCheck.attendingDoctor"> </el-input>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="拔牙情况:" >
                    <span v-if="!showEdit">{{generalCheck.toothExtraction || '--'}}</span>
                    <span v-if="showEdit">
                      <el-input type="text" v-model="generalCheck.toothExtraction"> </el-input>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">乳牙情况</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="龋齿:" >
                    <span v-if="!showEdit">{{generalCheck.dentalCaries || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="generalCheck.dentalCaries">
                        <el-option label="有" value="有"></el-option>
                        <el-option label="无" value="无"></el-option>
                        <el-option label="不详" value="不详"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
              <el-col :span="5">
                <el-form-item label="早失:" >
                  <span v-if="!showEdit">{{generalCheck.earlyLoss || '--'}}</span>
                  <span v-if="showEdit">
                    <el-select v-model="generalCheck.earlyLoss">
                      <el-option label="有" value="有"></el-option>
                      <el-option label="无" value="无"></el-option>
                      <el-option label="不详" value="不详"></el-option>
                    </el-select>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="错颌:" >
                  <span v-if="!showEdit">{{generalCheck.malocclusion || '--'}}</span>
                  <span v-if="showEdit">
                    <el-select v-model="generalCheck.malocclusion">
                      <el-option label="无" value="无"></el-option>
                      <el-option label="前牙反颌" value="前牙反颌"></el-option>
                      <el-option label="下颌后缩" value="下颌后缩"></el-option>
                      <el-option label="下颌后斜" value="下颌后斜"></el-option>
                      <el-option label="不详" value="不详"></el-option>
                    </el-select>
                  </span>
                </el-form-item>
              </el-col>
            </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">替牙情况</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="龋齿:" >
                    <span v-if="!showEdit">{{generalCheck.dentalCariesReplace || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="generalCheck.dentalCariesReplace">
                        <el-option label="有" value="有"></el-option>
                        <el-option label="无" value="无"></el-option>
                        <el-option label="不详" value="不详"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
              <el-col :span="5">
                <el-form-item label="早失:" >
                  <span v-if="!showEdit">{{generalCheck.earlyLossReplace || '--'}}</span>
                  <span v-if="showEdit">
                    <el-select v-model="generalCheck.earlyLossReplace">
                      <el-option label="有" value="有"></el-option>
                      <el-option label="无" value="无"></el-option>
                      <el-option label="不详" value="不详"></el-option>
                    </el-select>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="错颌:" >
                  <span v-if="!showEdit">{{generalCheck.malocclusionReplace || '--'}}</span>
                  <span v-if="showEdit">
                    <el-select v-model="generalCheck.malocclusionReplace">
                        <el-option label="无" value="无"></el-option>
                        <el-option label="前牙反颌" value="前牙反颌"></el-option>
                        <el-option label="下颌后缩" value="下颌后缩"></el-option>
                        <el-option label="下颌后斜" value="下颌后斜"></el-option>
                        <el-option label="不详" value="不详"></el-option>
                    </el-select>
                  </span>
                </el-form-item>
              </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">唇腭裂</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="唇裂:" >
                    <span v-if="!showEdit">{{generalCheck.cleftLip || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="generalCheck.cleftLip">
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
                  <el-form-item label="腭裂:" >
                    <span v-if="!showEdit">{{generalCheck.cleftPalate || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="generalCheck.cleftPalate">
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
                <el-col :span="2">
                  <span class="formItem">其他</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="其他:" >
                    <span v-if="!showEdit">{{generalCheck.others || '--'}}</span>
                    <span v-if="showEdit">
                      <el-input type="text" v-model="generalCheck.others"> </el-input>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>

        </div>
      </el-card>

      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <span>面部</span>
          <span v-if="showEdit">
            <span style="float: right; padding: 3px 0">
              <el-button size="mini" type="primary" @click="submitFackCheck('faceCheck')">保存</el-button>
              <el-button size="mini" type="primary" @click="showEdit = false">取消</el-button>
            </span>
          </span>
        </div>
        <div>
          <el-form :inline="true" ref="faceCheck" label-width="90px" :model="faceCheck" :rules="faceCheckRules" style="width: 100%;margin: 30px 0;" class="demo-form-inline">
            <div style="margin-bottom:20px;">
              <el-row>
                <el-col :span="2">
                  <span class="formItem">面部影像上传</span>
                </el-col>
                <el-col :span="3" class="imgItemBox">
                  <span v-if="!showEdit"><img class="imgItem" :src="faceCheck.positive"></span>
                  <span v-if="showEdit">
                    <div>
                        <SingleUploadImage :name="'positive'" v-model="faceCheck.positive"/>
                    </div>
                  </span>
                  <span>正面</span>
                </el-col>
                <el-col :span="3" class="imgItemBox">
                  <span v-if="!showEdit"><img class="imgItem" :src="faceCheck.positiveSmile"></span>
                  <span v-if="showEdit">
                    <div>
                        <SingleUploadImage :name="'positiveSmile'" v-model="faceCheck.positiveSmile"/>
                    </div>
                  </span>
                  <span>正面微笑</span>
                </el-col>
                <el-col :span="3" class="imgItemBox">
                  <span v-if="!showEdit"><img class="imgItem" :src="faceCheck.side"></span>
                  <span v-if="showEdit">
                    <div>
                        <SingleUploadImage :name="'side'" v-model="faceCheck.side"/>
                    </div>
                  </span>
                  <span>侧位像</span>
                </el-col>
                <el-col :span="3" class="imgItemBox">
                  <span v-if="!showEdit"><img class="imgItem" :src="faceCheck.right"></span>
                  <span v-if="showEdit">
                    <div>
                        <SingleUploadImage :name="'right'" v-model="faceCheck.right"/>
                    </div>
                  </span>
                  <span>右侧面45°</span>
                </el-col>
                <el-col :span="3" class="imgItemBox">
                  <span v-if="!showEdit"><img class="imgItem" :src="faceCheck.left"></span>
                  <span v-if="showEdit">
                    <div>
                        <SingleUploadImage :name="'left'" v-model="faceCheck.left"/>
                    </div>
                  </span>
                  <span>左侧面45°</span>
                </el-col>
                <el-col :span="3" class="imgItemBox">
                  <span v-if="!showEdit"><img class="imgItem" :src="faceCheck.other"></span>
                  <span v-if="showEdit">
                    <div>
                        <SingleUploadImage :name="'other'" v-model="faceCheck.other"/>
                    </div>
                  </span>
                  <span>其他</span>
                </el-col>
              </el-row>
            </div>

            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">正貌</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="正面型:" >
                    <span v-if="!showEdit">{{faceCheck.frontalType || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="faceCheck.frontalType">
                          <el-option label="长面" value="长面"></el-option>
                          <el-option label="短面" value="短面"></el-option>
                          <el-option label="均面" value="均面"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="颏餍窝:" >
                    <span v-if="!showEdit">{{faceCheck.chinSocket || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="faceCheck.chinSocket">
                          <el-option label="明显" value="明显"></el-option>
                          <el-option label="正常" value="正常"></el-option>
                          <el-option label="无" value="无"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="唇形:" >
                    <span v-if="!showEdit">{{faceCheck.lipShape || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="faceCheck.lipShape">
                          <el-option label="松弛" value="松弛"></el-option>
                          <el-option label="紧张" value="紧张"></el-option>
                          <el-option label="正常" value="正常"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem"></span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="对称性:" >
                    <span v-if="!showEdit">{{faceCheck.symmetry || '--'}}</span>
                    <span v-if="showEdit"><el-input v-model="faceCheck.symmetry"> </el-input></span>
                  </el-form-item>
                </el-col>
              <el-col :span="5">
                <el-form-item label="微笑唇齿拉:" >
                  <span v-if="!showEdit">{{faceCheck.smilePulling || '--'}}</span>
                  <span v-if="showEdit"><el-input v-model="faceCheck.smilePulling"> </el-input></span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="放松唇齿拉:" >
                  <span v-if="!showEdit">{{faceCheck.relaxPulling || '--'}}</span>
                  <span v-if="showEdit"><el-input v-model="faceCheck.relaxPulling"> </el-input></span>
                </el-form-item>
              </el-col>
            </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">侧貌</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="面型:" >
                    <span v-if="!showEdit">{{faceCheck.faceShape || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="faceCheck.faceShape">
                          <el-option label="凹" value="凹"></el-option>
                          <el-option label="凸" value="凸"></el-option>
                          <el-option label="直" value="直"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="鼻唇角:" >
                    <span v-if="!showEdit">{{faceCheck.nasolabialAngle || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="faceCheck.nasolabialAngle">
                          <el-option label="偏大" value="偏大"></el-option>
                          <el-option label="偏小" value="偏小"></el-option>
                          <el-option label="正常" value="正常"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="颏唇沟:" >
                    <span v-if="!showEdit">{{faceCheck.labialGroove || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="faceCheck.labialGroove">
                          <el-option label="正常" value="正常"></el-option>
                          <el-option label="明显" value="明显"></el-option>
                          <el-option label="无" value="无"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="颏位:" >
                    <span v-if="!showEdit">{{faceCheck.chinPosition || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="faceCheck.chinPosition">
                          <el-option label="偏左" value="偏左"></el-option>
                          <el-option label="偏右" value="偏右"></el-option>
                          <el-option label="正常" value="正常"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                  </el-col>
                </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">其他</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="其他:" >
                    <span v-if="!showEdit">{{faceCheck.others || '--'}}</span>
                    <span v-if="showEdit">
                      <el-input type="text" v-model="faceCheck.others"> </el-input>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </el-card>

      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <span>颌骨及软组织检查</span>
          <span v-if="showEdit">
            <span style="float: right; padding: 3px 0">
              <el-button size="mini" type="primary" @click="submitSoftCheck('softCheck')">保存</el-button>
              <el-button size="mini" type="primary" @click="showEdit = false">取消</el-button>
            </span>
          </span>
        </div>
        <div >
          <el-form :inline="true" ref="softCheck" label-width="90px" :model="softCheck" :rules="softCheckRules" style="width: 100%;margin: 30px 0;" class="demo-form-inline">
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">颌骨</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="上颌骨:" >
                    <span v-if="!showEdit">{{softCheck.maxilla || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="softCheck.maxilla">
                          <el-option label="正常" value="正常"></el-option>
                          <el-option label="稍前突" value="稍前突"></el-option>
                          <el-option label="前突" value="前突"></el-option>
                          <el-option label="稍后缩" value="稍后缩"></el-option>
                          <el-option label="后缩" value="后缩"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
              <el-col :span="5">
                <el-form-item label="下颌骨:" >
                  <span v-if="!showEdit">{{softCheck.mandible || '--'}}</span>
                  <span v-if="showEdit">
                    <el-select v-model="softCheck.mandible">
                      <el-option label="正常" value="正常"></el-option>
                      <el-option label="稍前突" value="稍前突"></el-option>
                      <el-option label="前突" value="前突"></el-option>
                      <el-option label="稍后缩" value="稍后缩"></el-option>
                      <el-option label="后缩" value="后缩"></el-option>
                    </el-select>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="下颌角:" >
                  <span v-if="!showEdit">{{softCheck.mandibularAngle || '--'}}</span>
                  <span v-if="showEdit">
                    <el-select v-model="softCheck.mandibularAngle">
                        <el-option label="偏大" value="偏大"></el-option>
                        <el-option label="偏小" value="偏小"></el-option>
                        <el-option label="相对正常" value="相对正常"></el-option>
                    </el-select>
                  </span>
                </el-form-item>
              </el-col>
            </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">软组织</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="舌体:" >
                    <span v-if="!showEdit">{{softCheck.tongueBody || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="softCheck.tongueBody">
                        <el-option label="偏大" value="偏大"></el-option>
                        <el-option label="偏小" value="偏小"></el-option>
                        <el-option label="相对正常" value="相对正常"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="上唇:" >
                    <span v-if="!showEdit">{{softCheck.upperLip || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="softCheck.upperLip">
                          <el-option label="正常" value="正常"></el-option>
                          <el-option label="过短" value="过短"></el-option>
                          <el-option label="功能过度" value="功能过度"></el-option>
                          <el-option label="功能不足" value="功能不足"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
              <el-col :span="5">
                <el-form-item label="下唇:" >
                  <span v-if="!showEdit">{{softCheck.lowerLip || '--'}}</span>
                  <span v-if="showEdit">
                    <el-select v-model="softCheck.lowerLip">
                        <el-option label="正常" value="正常"></el-option>
                        <!-- <el-option label="过短" value="过短"></el-option> -->
                        <el-option label="功能过度" value="功能过度"></el-option>
                        <el-option label="功能不足" value="功能不足"></el-option>
                    </el-select>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="舌系带:" >
                  <span v-if="!showEdit">{{softCheck.lingualFrenulum || '--'}}</span>
                  <span v-if="showEdit">
                    <el-input type="text" v-model="softCheck.lingualFrenulum"> </el-input>
                  </span>
                </el-form-item>
              </el-col>
            </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem"></span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="唇系带:" >
                    <span v-if="!showEdit">{{softCheck.labialFrenulum || '--'}}</span>
                    <span v-if="showEdit">
                      <el-input type="text" v-model="softCheck.labialFrenulum"> </el-input>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="扁桃体:" >
                    <span v-if="!showEdit">{{softCheck.tonsil || '--'}}</span>
                    <span v-if="showEdit">
                      <el-input type="text" v-model="softCheck.tonsil"> </el-input>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="腺样体:" >
                    <span v-if="!showEdit">{{softCheck.adenoid || '--'}}</span>
                    <span v-if="showEdit">
                      <el-input type="text" v-model="softCheck.adenoid"> </el-input>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="腭盖:" >
                    <span v-if="!showEdit">{{softCheck.palatalLid || '--'}}</span>
                    <span v-if="showEdit">
                      <el-input type="text" v-model="softCheck.palatalLid"> </el-input>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">颞下颌关节</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="疼痛左:" >
                    <span v-if="!showEdit">{{softCheck.painLeft || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="softCheck.painLeft">
                        <el-option label="有" value="有"></el-option>
                        <el-option label="无" value="无"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="疼痛右:" >
                    <span v-if="!showEdit">{{softCheck.painRight || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="softCheck.painRight">
                        <el-option label="有" value="有"></el-option>
                        <el-option label="无" value="无"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="弹响左:" >
                    <span v-if="!showEdit">{{softCheck.bangLeft || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="softCheck.bangLeft">
                        <el-option label="有" value="有"></el-option>
                        <el-option label="无" value="无"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="弹响右:" >
                    <span v-if="!showEdit">{{softCheck.bangRight || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="softCheck.bangRight">
                        <el-option label="有" value="有"></el-option>
                        <el-option label="无" value="无"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
            </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">下颌运动</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="张口:" >
                    <span v-if="!showEdit">{{softCheck.openMouth || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="softCheck.openMouth">
                        <el-option label="正常" value="正常"></el-option>
                        <el-option label="右偏" value="右偏"></el-option>
                        <el-option label="左偏" value="左偏"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
              <el-col :span="5">
                <el-form-item label="闭口:" >
                  <span v-if="!showEdit">{{softCheck.closeMouth || '--'}}</span>
                  <span v-if="showEdit">
                    <el-select v-model="softCheck.closeMouth">
                      <el-option label="正常" value="正常"></el-option>
                      <el-option label="右偏" value="右偏"></el-option>
                      <el-option label="左偏" value="左偏"></el-option>
                    </el-select>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="开口度:" >
                  <span v-if="!showEdit">{{softCheck.aperture || '--'}}</span>
                  <span v-if="showEdit">
                    <el-select v-model="softCheck.aperture">
                      <el-option label="正常" value="正常"></el-option>
                      <el-option label="右偏" value="右偏"></el-option>
                      <el-option label="左偏" value="左偏"></el-option>
                    </el-select>
                  </span>
                </el-form-item>
              </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">呼吸道</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="呼吸道:" >
                    <span v-if="!showEdit">{{softCheck.respiratoryTract || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="softCheck.respiratoryTract">
                        <el-option label="扁桃体肥大" value="扁桃体肥大"></el-option>
                        <el-option label="腺样体肥大" value="腺样体肥大"></el-option>
                        <el-option label="慢性咽喉炎" value="慢性咽喉炎"></el-option>
                        <el-option label="鼻甲肥大" value="鼻甲肥大"></el-option>
                        <el-option label="鼻中隔弯曲" value="鼻中隔弯曲"></el-option>
                        <el-option label="鼻肿瘤" value="鼻肿瘤"></el-option>
                        <el-option label="鼻息肉" value="鼻息肉"></el-option>
                      </el-select>
                      </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="程度:" >
                    <span v-if="!showEdit">{{softCheck.degree || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="softCheck.degree">
                        <el-option label="Ⅰ" value="Ⅰ"></el-option>
                        <el-option label="Ⅱ" value="Ⅱ"></el-option>
                        <el-option label="Ⅲ" value="Ⅲ"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">其他</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="其他:" >
                    <span v-if="!showEdit">{{softCheck.other || '--'}}</span>
                    <span v-if="showEdit">
                      <el-input type="text" v-model="softCheck.other"> </el-input>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>

        </div>
      </el-card>

      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <span>牙列检查</span>
          <span v-if="showEdit">
            <span style="float: right; padding: 3px 0">
              <el-button size="mini" type="primary" @click="submitDentitionCheck('dentitionCheck')">保存</el-button>
              <el-button size="mini" type="primary" @click="showEdit = false">取消</el-button>
            </span>
          </span>
        </div>
        <div>
          <el-form :inline="true" ref="dentitionCheck" label-width="90px" :model="dentitionCheck" :rules="dentitionCheckRules" style="width: 100%;margin: 30px 0;" class="demo-form-inline">
            <div style="margin-bottom:20px;">
              <el-row>
                <el-col :span="2">
                  <span class="formItem">牙列影像上传</span>
                </el-col>
                <el-col :span="3" class="imgItemBox">
                  <span v-if="!showEdit"><img class="imgItem" :src="dentitionCheck.frontUrl"></span>
                  <span v-if="showEdit">
                    <div>
                        <SingleUploadImage :name="'frontUrl'" v-model="dentitionCheck.frontUrl"/>
                    </div>
                  </span>
                  <span>正位像</span>
                </el-col>
                <el-col :span="3" class="imgItemBox">
                  <span v-if="!showEdit"><img class="imgItem" :src="dentitionCheck.upUrl"></span>
                  <span v-if="showEdit">
                    <div>
                        <SingleUploadImage :name="'upUrl'" v-model="dentitionCheck.upUrl"/>
                    </div>
                  </span>
                  <span>上牙列</span>
                </el-col>
                <el-col :span="3" class="imgItemBox">
                  <span v-if="!showEdit"><img class="imgItem" :src="dentitionCheck.leftUrl"></span>
                  <span v-if="showEdit">
                    <div>
                        <SingleUploadImage :name="'leftUrl'" v-model="dentitionCheck.leftUrl"/>
                    </div>
                  </span>
                  <span>左侧咬合</span>
                </el-col>
                <el-col :span="3" class="imgItemBox">
                  <span v-if="!showEdit"><img class="imgItem" :src="dentitionCheck.frontTeethUrl"></span>
                  <span v-if="showEdit">
                    <div>
                        <SingleUploadImage :name="'frontTeethUrl'" v-model="dentitionCheck.frontTeethUrl"/>
                    </div>
                  </span>
                  <span>前牙覆牙合覆盖</span>
                </el-col>
                <el-col :span="3" class="imgItemBox">
                  <span v-if="!showEdit"><img class="imgItem" :src="dentitionCheck.downUrl"></span>
                  <span v-if="showEdit">
                    <div>
                        <SingleUploadImage :name="'downUrl'" v-model="dentitionCheck.downUrl"/>
                    </div>
                  </span>
                  <span>下牙列</span>
                </el-col>
                <el-col :span="3" class="imgItemBox">
                  <span v-if="!showEdit"><img class="imgItem" :src="dentitionCheck.rightUrl"></span>
                  <span v-if="showEdit">
                    <div>
                        <SingleUploadImage :name="'rightUrl'" v-model="dentitionCheck.rightUrl"/>
                    </div>
                  </span>
                  <span>右侧咬合</span>
                </el-col>
                <el-col :span="3" class="imgItemBox">
                  <span v-if="!showEdit"><img class="imgItem" :src="dentitionCheck.otherUrl"></span>
                  <span v-if="showEdit">
                    <div>
                        <SingleUploadImage :name="'otherUrl'" v-model="dentitionCheck.otherUrl"/>
                    </div>
                  </span>
                  <span>其他</span>
                </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">拥挤程度</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="上牙列:" >
                    <span v-if="!showEdit">{{dentitionCheck.upTeeth || '--'}}</span>
                    <span v-if="showEdit"><el-input v-model="dentitionCheck.upTeeth"> </el-input></span>
                  </el-form-item>
                </el-col>
              <el-col :span="5">
                <el-form-item label="下牙列:" >
                  <span v-if="!showEdit">{{dentitionCheck.downTeeth || '--'}}</span>
                  <span v-if="showEdit"><el-input v-model="dentitionCheck.downTeeth"> </el-input></span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="多生牙:" >
                  <span v-if="!showEdit">{{dentitionCheck.moreTeeth || '--'}}</span>
                  <span v-if="showEdit"><el-input v-model="dentitionCheck.moreTeeth"> </el-input></span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="缺失:" >
                  <span v-if="!showEdit">{{dentitionCheck.loss || '--'}}</span>
                  <span v-if="showEdit"><el-input v-model="dentitionCheck.loss"> </el-input></span>
                </el-form-item>
              </el-col>
            </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem"></span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="个别牙错位:" >
                    <span v-if="!showEdit">{{dentitionCheck.dislocation || '--'}}</span>
                    <span v-if="showEdit"><el-input v-model="dentitionCheck.dislocation"> </el-input></span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">Bolton指数</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="前牙比:" >
                    <span v-if="!showEdit">{{dentitionCheck.anteriorRatio || '--'}}</span>
                    <span v-if="showEdit"><el-input v-model="dentitionCheck.anteriorRatio"> </el-input></span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="全牙比:" >
                    <span v-if="!showEdit">{{dentitionCheck.overallRatio || '--'}}</span>
                    <span v-if="showEdit"><el-input v-model="dentitionCheck.overallRatio"> </el-input></span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">牙弓关系</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="左侧磨牙:" >
                    <span v-if="!showEdit">{{dentitionCheck.leftMolar || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="dentitionCheck.leftMolar">
                          <el-option label="中性" value="中性"></el-option>
                          <el-option label="中性偏近中" value="中性偏近中"></el-option>
                          <el-option label="中性偏远中" value="中性偏远中"></el-option>
                          <el-option label="近中尖对尖" value="近中尖对尖"></el-option>
                          <el-option label="远中尖对尖" value="远中尖对尖"></el-option>
                          <el-option label="完全近中" value="完全近中"></el-option>
                          <el-option label="完全远中" value="完全远中"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="左侧尖牙:" >
                    <span v-if="!showEdit">{{dentitionCheck.leftFangs || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="dentitionCheck.leftFangs">
                          <el-option label="中性" value="中性"></el-option>
                          <el-option label="近中" value="近中"></el-option>
                          <el-option label="远中" value="远中"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="前牙覆盖:" >
                    <span v-if="!showEdit">{{dentitionCheck.anteriorTeeth || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="dentitionCheck.anteriorTeeth">
                          <el-option label="Ⅰ" value="Ⅰ"></el-option>
                          <el-option label="Ⅱ" value="Ⅱ"></el-option>
                          <el-option label="Ⅲ" value="Ⅲ"></el-option>
                          <el-option label="正常" value="正常"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="右侧磨牙:" >
                    <span v-if="!showEdit">{{dentitionCheck.rightMolar || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="dentitionCheck.rightMolar">
                          <el-option label="中性" value="中性"></el-option>
                          <el-option label="中性偏近中" value="中性偏近中"></el-option>
                          <el-option label="中性偏远中" value="中性偏远中"></el-option>
                          <el-option label="近中尖对尖" value="近中尖对尖"></el-option>
                          <el-option label="远中尖对尖" value="远中尖对尖"></el-option>
                          <el-option label="完全近中" value="完全近中"></el-option>
                          <el-option label="完全远中" value="完全远中"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem"></span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="右侧尖牙:" >
                    <span v-if="!showEdit">{{dentitionCheck.rightFangs || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="dentitionCheck.rightFangs">
                          <el-option label="中性" value="中性"></el-option>
                          <el-option label="近中" value="近中"></el-option>
                          <el-option label="远中" value="远中"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">横向</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="牙弓形态:" >
                    <span v-if="!showEdit">{{dentitionCheck.archForm || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="dentitionCheck.archForm">
                          <el-option label="狭窄" value="狭窄"></el-option>
                          <el-option label="宽大" value="宽大"></el-option>
                          <el-option label="正常" value="正常"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
              <el-col :span="5">
                <el-form-item label="后牙:" >
                  <span v-if="!showEdit">{{dentitionCheck.posteriorTeeth || '--'}}</span>
                  <span v-if="showEdit">
                    <el-select v-model="dentitionCheck.posteriorTeeth">
                        <el-option label="正锁合" value="正锁合"></el-option>
                        <el-option label="反锁合" value="反锁合"></el-option>
                        <el-option label="正常" value="正常"></el-option>
                    </el-select>
                  </span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="尖牙:" >
                  <span v-if="!showEdit">{{dentitionCheck.canineTeeth || '--'}}</span>
                  <span v-if="showEdit">
                    <el-select v-model="dentitionCheck.canineTeeth">
                        <el-option label="狭窄" value="狭窄"></el-option>
                        <el-option label="正常" value="正常"></el-option>
                    </el-select>
                  </span>
                </el-form-item>
              </el-col>
            </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">垂直向</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="前牙覆颌:" >
                    <span v-if="!showEdit">{{dentitionCheck.maxillaryOverbite || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="dentitionCheck.maxillaryOverbite">
                        <el-option label="Ⅰ" value="Ⅰ"></el-option>
                        <el-option label="Ⅱ" value="Ⅱ"></el-option>
                        <el-option label="Ⅲ" value="Ⅲ"></el-option>
                        <el-option label="正常" value="正常"></el-option>
                        <el-option label="开颌" value="开颌"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">牙弓中线</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="上颌:" >
                    <span v-if="!showEdit">{{dentitionCheck.maxillary || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="dentitionCheck.maxillary">
                        <el-option label="左偏" value="左偏"></el-option>
                        <el-option label="右偏" value="右偏"></el-option>
                        <el-option label="正常" value="正常"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="下颌:" >
                    <span v-if="!showEdit">{{dentitionCheck.mandible || '--'}}</span>
                    <span v-if="showEdit">
                      <el-select v-model="dentitionCheck.mandible">
                        <el-option label="左偏" value="左偏"></el-option>
                        <el-option label="右偏" value="右偏"></el-option>
                        <el-option label="正常" value="正常"></el-option>
                      </el-select>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div >
              <el-row>
                <el-col :span="2">
                  <span class="formItem">其他</span>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="其他:" >
                    <span v-if="!showEdit">{{dentitionCheck.other || '--'}}</span>
                    <span v-if="showEdit">
                      <el-input type="text" v-model="dentitionCheck.other"> </el-input>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </el-card>

      <!-- 打印预览 -->
      <el-dialog title="正畸检查" :visible.sync="showPrint" center width="90%">
        <div ref="print">
            <p class="title">正畸检查</p>
            <div class="printHead">
              <span>患者：{{patientDetail.name}}</span><span style="margin-left: 100px;">病历号：{{patientDetail.code}}</span>
            </div>
            <div class="printBox">
              <div class="printTitle">一般检查</div>
              <el-form :inline="true" ref="generalCheck" label-width="90px" :model="generalCheck" style="width: 100%;margin: 30px 0;" class="demo-form-inline">
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">主诉</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="主诉:" >
                        <span>{{generalCheck.chiefComplaint || '--'}}</span>
                      </el-form-item>
                    </el-col>
                </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">口腔习惯</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="不良习惯:" >
                        <span>{{generalCheck.badHabits || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  <el-col :span="5">
                    <el-form-item label="口腔卫生:" >
                      <span>{{generalCheck.oralHygiene || '--'}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">发育情况</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="颈椎:" >
                        <span>{{generalCheck.cervicalVertebra || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="手腕骨:" >
                        <span>{{generalCheck.wristBone || '--'}}</span>

                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="月经:" >
                        <span>{{generalCheck.menstruation || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  <el-col :span="5">
                    <el-form-item label="初潮:" >
                      <span>{{generalCheck.menarche || '--'}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">以前治疗情况</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="矫正史:" >
                        <span>{{generalCheck.correctiveHistory || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="经治医生:" >
                        <span>{{generalCheck.attendingDoctor || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="拔牙情况:" >
                        <span>{{generalCheck.toothExtraction || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">乳牙情况</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="龋齿:" >
                        <span>{{generalCheck.dentalCaries || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  <el-col :span="5">
                    <el-form-item label="早失:" >
                      <span>{{generalCheck.earlyLoss || '--'}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="错颌:" >
                      <span>{{generalCheck.malocclusion || '--'}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">替牙情况</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="龋齿:" >
                        <span>{{generalCheck.dentalCariesReplace || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  <el-col :span="5">
                    <el-form-item label="早失:" >
                      <span>{{generalCheck.earlyLossReplace || '--'}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="错颌:" >
                      <span>{{generalCheck.malocclusionReplace || '--'}}</span>
                    </el-form-item>
                  </el-col>
                  </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">唇腭裂</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="唇裂:" >
                        <span>{{generalCheck.cleftLip || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="腭裂:" >
                        <span>{{generalCheck.cleftPalate || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">其他</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="其他:" >
                        <span>{{generalCheck.others || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form>

            </div>

            <div class="printBox">
              <div class="printTitle">面部</div>
              <el-form :inline="true" ref="faceCheck" label-width="90px" :model="faceCheck" style="width: 100%;margin: 30px 0;" class="demo-form-inline">
                <div style="margin-bottom:20px;">
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">面部影像</span>
                    </el-col>
                    <el-col :span="3" class="imgItemBox">
                      <span><img class="imgItem" :src="faceCheck.positive"></span>
                      <span>正面</span>
                    </el-col>
                    <el-col :span="3" class="imgItemBox">
                      <span><img class="imgItem" :src="faceCheck.positiveSmile"></span>
                      <span>正面微笑</span>
                    </el-col>
                    <el-col :span="3" class="imgItemBox">
                      <span><img class="imgItem" :src="faceCheck.side"></span>
                      <span>侧位像</span>
                    </el-col>
                    <el-col :span="3" class="imgItemBox">
                      <span><img class="imgItem" :src="faceCheck.right"></span>
                      <span>右侧面45°</span>
                    </el-col>
                    <el-col :span="3" class="imgItemBox">
                      <span><img class="imgItem" :src="faceCheck.left"></span>
                      <span>左侧面45°</span>
                    </el-col>
                    <el-col :span="3" class="imgItemBox">
                      <span><img class="imgItem" :src="faceCheck.other"></span>
                      <span>其他</span>
                    </el-col>
                  </el-row>
                </div>

                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">正貌</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="正面型:" >
                        <span>{{faceCheck.frontalType || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="颏餍窝:" >
                        <span>{{faceCheck.chinSocket || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="唇形:" >
                        <span>{{faceCheck.lipShape || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem"></span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="对称性:" >
                        <span>{{faceCheck.symmetry || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  <el-col :span="5">
                    <el-form-item label="微笑唇齿拉:" >
                      <span>{{faceCheck.smilePulling || '--'}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="放松唇齿拉:" >
                      <span>{{faceCheck.relaxPulling || '--'}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">侧貌</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="面型:" >
                        <span>{{faceCheck.faceShape || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="鼻唇角:" >
                        <span>{{faceCheck.nasolabialAngle || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="颏唇沟:" >
                        <span>{{faceCheck.labialGroove || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="颏位:" >
                        <span>{{faceCheck.chinPosition || '--'}}</span>
                      </el-form-item>
                      </el-col>
                    </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">其他</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="其他:" >
                        <span>{{faceCheck.others || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
            </div>

            <div class="printBox">
              <div class="printTitle">颌骨及软组织检查</div>
              <el-form :inline="true" ref="softCheck" label-width="90px" :model="softCheck" style="width: 100%;margin: 30px 0;" class="demo-form-inline">
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">颌骨</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="上颌骨:" >
                        <span>{{softCheck.maxilla || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  <el-col :span="5">
                    <el-form-item label="下颌骨:" >
                      <span>{{softCheck.mandible || '--'}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="下颌角:" >
                      <span>{{softCheck.mandibularAngle || '--'}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">软组织</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="舌体:" >
                        <span>{{softCheck.tongueBody || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="上唇:" >
                        <span>{{softCheck.upperLip || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  <el-col :span="5">
                    <el-form-item label="下唇:" >
                      <span>{{softCheck.lowerLip || '--'}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="舌系带:" >
                      <span>{{softCheck.lingualFrenulum || '--'}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem"></span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="唇系带:" >
                        <span>{{softCheck.labialFrenulum || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="扁桃体:" >
                        <span>{{softCheck.tonsil || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="腺样体:" >
                        <span>{{softCheck.adenoid || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="腭盖:" >
                        <span>{{softCheck.palatalLid || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">颞下颌关节</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="疼痛左:" >
                        <span>{{softCheck.painLeft || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="疼痛右:" >
                        <span>{{softCheck.painRight || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="弹响左:" >
                        <span>{{softCheck.bangLeft || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="弹响右:" >
                        <span>{{softCheck.bangRight || '--'}}</span>
                      </el-form-item>
                    </el-col>
                </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">下颌运动</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="张口:" >
                        <span>{{softCheck.openMouth || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  <el-col :span="5">
                    <el-form-item label="闭口:" >
                      <span>{{softCheck.closeMouth || '--'}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="开口度:" >
                      <span>{{softCheck.aperture || '--'}}</span>
                    </el-form-item>
                  </el-col>
                  </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">呼吸道</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="呼吸道:" >
                        <span>{{softCheck.respiratoryTract || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="程度:" >
                        <span>{{softCheck.degree || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">其他</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="其他:" >
                        <span>{{softCheck.other || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
            </div>

            <div class="printBox">
              <div class="printTitle">牙列检查</div>
              <el-form :inline="true" ref="dentitionCheck" label-width="90px" :model="dentitionCheck" style="width: 100%;margin: 30px 0;" class="demo-form-inline">
                <div style="margin-bottom:20px;">
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">牙列影像</span>
                    </el-col>
                    <el-col :span="3" class="imgItemBox">
                      <span><img class="imgItem" :src="dentitionCheck.frontUrl"></span>
                      <span>正位像</span>
                    </el-col>
                    <el-col :span="3" class="imgItemBox">
                      <span><img class="imgItem" :src="dentitionCheck.upUrl"></span>
                      <span>上牙列</span>
                    </el-col>
                    <el-col :span="3" class="imgItemBox">
                      <span><img class="imgItem" :src="dentitionCheck.leftUrl"></span>
                      <span>左侧咬合</span>
                    </el-col>
                    <el-col :span="3" class="imgItemBox">
                      <span><img class="imgItem" :src="dentitionCheck.frontTeethUrl"></span>
                      <span>前牙覆牙合覆盖</span>
                    </el-col>
                    <el-col :span="3" class="imgItemBox">
                      <span><img class="imgItem" :src="dentitionCheck.downUrl"></span>
                      <span>下牙列</span>
                    </el-col>
                    <el-col :span="3" class="imgItemBox">
                      <span><img class="imgItem" :src="dentitionCheck.rightUrl"></span>
                      <span>右侧咬合</span>
                    </el-col>
                    <el-col :span="3" class="imgItemBox">
                      <span><img class="imgItem" :src="dentitionCheck.otherUrl"></span>
                      <span>其他</span>
                    </el-col>
                  </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">拥挤程度</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="上牙列:" >
                        <span>{{dentitionCheck.upTeeth || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  <el-col :span="5">
                    <el-form-item label="下牙列:" >
                      <span>{{dentitionCheck.downTeeth || '--'}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="多生牙:" >
                      <span>{{dentitionCheck.moreTeeth || '--'}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="缺失:" >
                      <span>{{dentitionCheck.loss || '--'}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem"></span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="个别牙错位:" >
                        <span>{{dentitionCheck.dislocation || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">Bolton指数</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="前牙比:" >
                        <span>{{dentitionCheck.anteriorRatio || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="全牙比:" >
                        <span>{{dentitionCheck.overallRatio || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">牙弓关系</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="左侧磨牙:" >
                        <span>{{dentitionCheck.leftMolar || '--'}}</span>

                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="左侧尖牙:" >
                        <span>{{dentitionCheck.leftFangs || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="前牙覆盖:" >
                        <span>{{dentitionCheck.anteriorTeeth || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="右侧磨牙:" >
                        <span>{{dentitionCheck.rightMolar || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem"></span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="右侧尖牙:" >
                        <span>{{dentitionCheck.rightFangs || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">横向</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="牙弓形态:" >
                        <span>{{dentitionCheck.archForm || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  <el-col :span="5">
                    <el-form-item label="后牙:" >
                      <span>{{dentitionCheck.posteriorTeeth || '--'}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="尖牙:" >
                      <span>{{dentitionCheck.canineTeeth || '--'}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">垂直向</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="前牙覆颌:" >
                        <span>{{dentitionCheck.maxillaryOverbite || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">牙弓中线</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="上颌:" >
                        <span>{{dentitionCheck.maxillary || '--'}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="下颌:" >
                        <span>{{dentitionCheck.mandible || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div >
                  <el-row>
                    <el-col :span="2">
                      <span class="formItem">其他</span>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="其他:" >
                        <span>{{dentitionCheck.other || '--'}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
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
import Bus from '@/components/Data/bus.js'
import SingleUploadImage from '@/components/Core/SingleUploadImage'


export default {
    components: {
      SingleUploadImage,
    },
    props:{
      patientDetail: {
          type: Object,
          default: {}
      }
    },
    data() {
      return {
        showEdit: false,
        generalCheck: {
          chiefComplaint: '',
          badHabits: '',
          oralHygiene: '',
          cervicalVertebra: '',
          wristBone: '',
          menstruation: '',
          menarche: '',
          correctiveHistory: '',
          attendingDoctor: '',
          toothExtraction: '',
          dentalCaries: '',
          earlyLoss: '',
          malocclusion: '',
          dentalCariesReplace: '',
          earlyLossReplace: '',
          malocclusionReplace: '',
          cleftLip: '',
          cleftPalate: '',
          others: ''
        },
        generalCheckRules: {},
        faceCheck: {
          positive: '',   //正面照
          positiveSmile: '',  //正面微笑
          side: '', //侧位像
          right: '',  //右侧照
          left: '',  //左侧照
          other: '', //其他
          frontalType: '',
          chinSocket: '',
          lipShape: '',
          symmetry: '',
          smilePulling: '',
          relaxPulling: '',
          faceShape: '',
          nasolabialAngle: '',
          labialGroove: '',
          chinPosition: '',
          others: '',
        },
        faceCheckRules: {},
        softCheck: {
          maxilla: '',
          mandible: '',
          mandibularAngle: '',
          tongueBody: '',
          upperLip: '',
          lowerLip: '',
          lingualFrenulum: '',
          labialFrenulum: '',
          tonsil: '',
          adenoid: '',
          palatalLid: '',
          painLeft: '',
          painRight: '',
          bangLeft: '',
          bangRight: '',
          openMouth: '',
          closeMouth: '',
          aperture: '',
          respiratoryTract: '',
          degree: '',
          other: '',
        },
        softCheckRules: {

        },
        dentitionCheck: {
          frontUrl: '',
          upUrl: '',
          leftUrl: '',
          frontTeethUrl: '',
          downUrl: '',
          rightUrl: '',
          otherUrl: '',
          upTeeth: '',
          downTeeth: '',
          moreTeeth: '',
          loss: '',
          dislocation: '',
          anteriorRatio: '',
          overallRatio: '',
          leftMolar: '',
          leftFangs: '',
          anteriorTeeth: '',
          rightMolar: '',
          rightFangs: '',
          archForm: '',
          posteriorTeeth: '',
          canineTeeth: '',
          maxillaryOverbite: '',
          maxillary: '',
          other: '',
          mandible: '',

        },
        dentitionCheckRules: {},
        showPrint: false,


      }
    },
    mounted() {
      this.getGeneralCheck()
      this.getFaceCheck()
      this.getSoftCheck()
      this.getDentitionCheck()
      console.log(this.patientDetail);

      Bus.$on('singleUpload', (e) => {
        if (e.name == 'positive') {
          this.faceCheck.positive = e.url
        }
        if (e.name == 'positiveSmile') {
          this.faceCheck.positiveSmile = e.url
        }
        if (e.name == 'side') {
          this.faceCheck.side = e.url
        }
        if (e.name == 'right') {
          this.faceCheck.right = e.url
        }
        if (e.name == 'left') {
          this.faceCheck.left = e.url
        }
        if (e.name == 'other') {
          this.faceCheck.other = e.url
        }

        if (e.name == 'frontUrl') {
          this.dentitionCheck.frontUrl = e.url
        }
        if (e.name == 'upUrl') {
          this.dentitionCheck.upUrl = e.url
        }
        if (e.name == 'leftUrl') {
          this.dentitionCheck.leftUrl = e.url
        }
        if (e.name == 'frontTeethUrl') {
          this.dentitionCheck.frontTeethUrl = e.url
        }
        if (e.name == 'downUrl') {
          this.dentitionCheck.downUrl = e.url
        }
        if (e.name == 'rightUrl') {
          this.dentitionCheck.rightUrl = e.url
        }
        if (e.name == 'otherUrl') {
          this.dentitionCheck.otherUrl = e.url
        }
      })
    },
    methods: {

      //一般检查提交
      submitGeneralCheck(formName) {
        let params = this.generalCheck
        params.patientNo = this.patientDetail.code

        if (this.generalCheck.code) {
          params.code = this.generalCheck.code

          this.$http.post("/api/hx/generalCheck/edit.do",params).then(res => {
            if (res.data.result) {
              this.$message.success('操作成功！')
              this.showEdit = false
              this.getGeneralCheck()
            } else {
              this.$message.error(res.data.errorMessage)
            }
          })
        } else {
          this.$http.post("/api/hx/generalCheck/add.do",params).then(res => {
            if (res.data.result) {
              this.$message.success('操作成功！')
              this.showEdit = false
              this.getGeneralCheck()
            } else {
              this.$message.error(res.data.errorMessage)
            }
          })
        }

      },

      //提交面部检查
      submitFackCheck() {
        let params = this.faceCheck
        params.patientNo = this.patientDetail.code
        console.log(params)

        if (this.faceCheck.code) {
          params.code = this.faceCheck.code

          this.$http.post("/api/hx/faceCheck/edit.do",params).then(res => {
            if (res.data.result) {
              this.$message.success('操作成功！')
              this.showEdit = false
              this.getFaceCheck()
            } else {
              this.$message.error(res.data.errorMessage)
            }
          })
        } else {
          this.$http.post("/api/hx/faceCheck/add.do",params).then(res => {
            if (res.data.result) {
              this.$message.success('操作成功！')
              this.showEdit = false
              this.getFaceCheck()
            } else {
              this.$message.error(res.data.errorMessage)
            }
          })
        }
      },

      //提交软组织检查检查
      submitSoftCheck() {
        let params = this.softCheck
        params.patientNo = this.patientDetail.code
        console.log(params)

        if (this.softCheck.code) {
          params.code = this.softCheck.code

          this.$http.post("/api/hx/softCheck/edit.do",params).then(res => {
            if (res.data.result) {
              this.$message.success('操作成功！')
              this.showEdit = false
              this.getSoftCheck()
            } else {
              this.$message.error(res.data.errorMessage)
            }
          })
        } else {
          this.$http.post("/api/hx/softCheck/add.do",params).then(res => {
            if (res.data.result) {
              this.$message.success('操作成功！')
              this.showEdit = false
              this.getSoftCheck()
            } else {
              this.$message.error(res.data.errorMessage)
            }
          })
        }
      },

      //提交牙列检查
      submitDentitionCheck() {
        let params = this.dentitionCheck
        params.patientNo = this.patientDetail.code
        console.log(params)

        if (this.dentitionCheck.code) {
          params.code = this.dentitionCheck.code

          this.$http.post("/api/hx/dentitionCheck/edit.do",params).then(res => {
            if (res.data.result) {
              this.$message.success('操作成功！')
              this.showEdit = false
              this.getDentitionCheck()
            } else {
              this.$message.error(res.data.errorMessage)
            }
          })
        } else {
          this.$http.post("/api/hx/dentitionCheck/add.do",params).then(res => {
            if (res.data.result) {
              this.$message.success('操作成功！')
              this.showEdit = false
              this.getDentitionCheck()
            } else {
              this.$message.error(res.data.errorMessage)
            }
          })
        }
      },

      //一般检查详情
      getGeneralCheck() {
        this.$http.post("/api/hx/generalCheck/get.do",{
          patientNo: this.patientDetail.code
        }).then(res => {
          if (res.data.result) {
              this.generalCheck = res.data.returnObject || {}
          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
      },

      //面部检查详情
      getFaceCheck() {
        this.$http.post("/api/hx/faceCheck/get.do",{
          patientNo: this.patientDetail.code
        }).then(res => {
          if (res.data.result) {
              this.faceCheck = res.data.returnObject || {}
          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
      },

      //软组织检查详情
      getSoftCheck() {
        this.$http.post("/api/hx/softCheck/get.do",{
          patientNo: this.patientDetail.code
        }).then(res => {
          if (res.data.result) {
              this.softCheck = res.data.returnObject || {}
          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
      },

      //牙列检查详情
      getDentitionCheck() {
        this.$http.post("/api/hx/dentitionCheck/get.do",{
          patientNo: this.patientDetail.code
        }).then(res => {
          if (res.data.result) {
              this.dentitionCheck = res.data.returnObject || {}
          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
      },

      editCheck() {
        this.showEdit = true
      },

      //打印
      print() {
        this.$print(this.$refs.print)
      },

    },
}
</script>

<style lang="less" scoped>
  .headBox{
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin: 10px 0;
    padding: 0 20px;
    box-sizing: border-box;
    background-color: #d1d1d1;
  }
  .cf{
    clear: both;
    overflow: hidden;
    content: '';
  }
  .formItem{
    width: 90px;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-weight: 550
  }
  .imgItemBox{
    text-align: center;
  }
  .imgItem{
    width: 120px;
    max-height: 120px;
  }
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
    margin: 30px 0 30px 0;
  }

  .printBox{
    border-bottom: 1px solid #d1d1d1;
  }
</style>
