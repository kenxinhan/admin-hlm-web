<template>
  <div class="">
    <div>
      <el-radio-group v-model="type" @change="handleRadioChange('type',type)">
        <el-radio-button label="today">今日检查</el-radio-button>
        <el-radio-button label="history">历史检查</el-radio-button>
      </el-radio-group>
    </div>
    <br>
    <div v-if="!showToday" style="margin-bottom: 20px;">
      检查时间：
      <!-- <el-date-picker
        v-model="checkDate"
        type="date"
        @change="getTodayList(false)"
        placeholder="选择日期">
      </el-date-picker> -->
      <el-select v-model="checkDate" placeholder="请选择" @change="getTodayList(false)">
        <el-option label="全部" value="" ></el-option>
        <el-option
          size="mini"
          v-for="(item, index) in selectTimeList"
          :key="index"
          :label="seliceTime(item.createDate)"
          :value="item.createDate"
        ></el-option>
      </el-select>
    </div>
    <div class="ares-main-content">
      <div style="display:flex;" class="cf">
        <div class="perio-arch-title fl-l">
          <div class="perio-title side-title" style="top:33px;left:-50px;">舌侧(L)</div>
          <div class="perio-input side-title" style="top:0px;">龈缘(GM)</div>
          <div class="perio-input side-title red" style="top:20px;">探诊深度(PD)</div>
          <div class="perio-input side-title" style="top:40px;">探诊出血(Bleeding)</div>
          <div class="perio-input side-title red" style="top:60px;">菌斑(Plaque)</div>
        </div>
        <div class="perio-arch-content fl-l">
          <div class="" v-for="(item, index) in area1L" :key="index">
            <div class="perio-chart-tooth-input-container" style="width:60px">
                <!-- <input class="perio-tooth-code"  readonly="true" :value="18-index"> -->
                <div class="perio-input-container">
                  <input class="perio-small-input" :disabled="showToday==false" type="text" style="width:19px" v-model="item.gmL" @focus="gmFocus($event,item,index,'GM','舌侧(L)','远中(D)','1L')" maxlength="1" @input="setInput(item,'GM','远中(D)','1L')">
                  <input class="perio-small-input perio-small-input-center" :disabled="showToday==false" v-model="item.gmM" @focus="gmFocus($event,item,index,'GM','舌侧(L)','正中(C)','1L')" type="text" style="width:19px" maxlength="1" @input="setInput(item,'GM','正中(C)','1L')">
                  <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.gmS" @focus="gmFocus($event,item,index,'GM','舌侧(L)','近中(M)','1L')" maxlength="1" @input="setInput(item,'GM','近中(M)','1L')">
                </div>
                <div class="perio-input-container">
                  <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.pdL" @focus="gmFocus($event,item,index,'PD','舌侧(L)','远中(D)','1L')" maxlength="1" @input="setInput(item,'PD','远中(D)','1L')">
                  <input class="perio-small-input perio-small-input-center" :disabled="showToday==false" v-model="item.pdM" @focus="gmFocus($event,item,index,'PD','舌侧(L)','正中(C)','1L')" type="text" style="width:19px" maxlength="1" @input="setInput(item,'PD','正中(C)','1L')">
                  <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.pdS" @focus="gmFocus($event,item,index,'PD','舌侧(L)','近中(M)','1L')" maxlength="1" @input="setInput(item,'PD','近中(M)','1L')">
                </div>
                <div class="perio-input-container">
                  <div class="perio-small-square" :class="{activedRed:item.bleedingL == 1}" @click="checkBleeding(item,index,'bL','1L')" style="width:16px"></div>
                  <div class="perio-small-square" :class="{activedRed:item.bleedingM == 1}" @click="checkBleeding(item,index,'bM','1L')" style="width:16px"></div>
                  <div class="perio-small-square" :class="{activedRed:item.bleedingS == 1}" @click="checkBleeding(item,index,'bS','1L')" style="width:16px"></div>
                </div>
                <div class="perio-input-container">
                  <div class="perio-small-square" :class="{activedYellow:item.plaqueL == 1}" @click="checkPlaque(item,index,'plaqueL','1L')" style="width:16px"></div>
                  <div class="perio-small-square" :class="{activedYellow:item.plaqueM == 1}" @click="checkPlaque(item,index,'plaqueM','1L')" style="width:16px"></div>
                  <div class="perio-small-square" :class="{activedYellow:item.plaqueS == 1}" @click="checkPlaque(item,index,'plaqueS','1L')" style="width:16px"></div>
                </div>
            </div>
          </div>
          <div class="perio-chart-tooth-input-container verticalBorder fl-l"></div>
          <div class="" v-for="(item, index) in area2L" >
            <div class="perio-chart-tooth-input-container" style="width:60px">
              <!-- <input class="perio-tooth-code"  readonly="true" :value="index+21"> -->
              <div class="perio-input-container">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.gmS" @focus="gmFocus($event,item,index,'GM','舌侧(L)','近中(M)','2L')" maxlength="1" @input="setInput(item,'GM','近中(M)','2L')">
                <input class="perio-small-input perio-small-input-center" :disabled="showToday==false" v-model="item.gmM" @focus="gmFocus($event,item,index,'GM','舌侧(L)','正中(C)','2L')" type="text" style="width:19px" maxlength="1" @input="setInput(item,'GM','正中(C)','2L')">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.gmL" @focus="gmFocus($event,item,index,'GM','舌侧(L)','远中(D)','2L')" maxlength="1" @input="setInput(item,'GM','远中(D)','2L')">
              </div>
              <div class="perio-input-container">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.pdS" @focus="gmFocus($event,item,index,'PD','舌侧(L)','近中(M)','2L')" maxlength="1" @input="setInput(item,'PD','近中(M)','2L')">
                <input class="perio-small-input perio-small-input-center" :disabled="showToday==false" v-model="item.pdM" @focus="gmFocus($event,item,index,'PD','舌侧(L)','正中(C)','2L')" type="text" style="width:19px" maxlength="1" @input="setInput(item,'PD','正中(C)','2L')">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.pdL" @focus="gmFocus($event,item,index,'PD','舌侧(L)','远中(D)','2L')" maxlength="1" @input="setInput(item,'PD','远中(D)','2L')">
              </div>
              <div class="perio-input-container">
                <div class="perio-small-square" :class="{activedRed:item.bleedingS == 1}" @click="checkBleeding(item,index,'bS','2L')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedRed:item.bleedingM == 1}" @click="checkBleeding(item,index,'bM','2L')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedRed:item.bleedingL == 1}" @click="checkBleeding(item,index,'bL','2L')" style="width:16px"></div>
              </div>
              <div class="perio-input-container">
                <div class="perio-small-square" :class="{activedYellow:item.plaqueS == 1}" @click="checkPlaque(item,index,'plaqueS','2L')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedYellow:item.plaqueM == 1}" @click="checkPlaque(item,index,'plaqueM','2L')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedYellow:item.plaqueL == 1}" @click="checkPlaque(item,index,'plaqueL','2L')" style="width:16px"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="display:flex;margin-bottom:30px;" class="cf">
        <div class="perio-arch-title fl-l">
          <div class="perio-title side-title" style="top:114px;left:-50px;">颊侧(B)</div>
          <div class="perio-input side-title" style="top:160px;">龈缘(GM)</div>
          <div class="perio-input side-title red" style="top:140px;">探诊深度(PD)</div>
          <div class="perio-input side-title" style="top:120px;">探诊出血(Bleeding)</div>
          <div class="perio-input side-title red" style="top:100px;">菌斑(Plaque)</div>
        </div>
        <div class="perio-arch-content fl-l">
          <div class="" v-for="(item, index) in area1B" :key="index">
            <div class="perio-chart-tooth-input-container" style="width:60px">
              <input class="perio-tooth-code"  readonly="true" :value="18-index">
              <div class="perio-input-container">
                <div class="perio-small-square" :class="{activedYellow:item.plaqueL == 1}" @click="checkPlaque(item,index,'plaqueL','1B')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedYellow:item.plaqueM == 1}" @click="checkPlaque(item,index,'plaqueM','1B')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedYellow:item.plaqueS == 1}" @click="checkPlaque(item,index,'plaqueS','1B')" style="width:16px"></div>
              </div>
              <div class="perio-input-container">
                <div class="perio-small-square" :class="{activedRed:item.bleedingL == 1}" @click="checkBleeding(item,index,'bL','1B')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedRed:item.bleedingM == 1}" @click="checkBleeding(item,index,'bM','1B')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedRed:item.bleedingS == 1}" @click="checkBleeding(item,index,'bS','1B')" style="width:16px"></div>
              </div>
              <div class="perio-input-container">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.pdL" @focus="gmFocus($event,item,index,'PD','颊侧(B)','远中(D)','1B')" maxlength="1" @input="setInput(item,'PD','远中(D)','1B')">
                <input class="perio-small-input perio-small-input-center" :disabled="showToday==false" v-model="item.pdM" @focus="gmFocus($event,item,index,'PD','颊侧(B)','正中(C)','1B')" type="text" style="width:19px" maxlength="1" @input="setInput(item,'PD','正中(C)','1B')">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.pdS" @focus="gmFocus($event,item,index,'PD','颊侧(B)','近中(M)','1B')" maxlength="1" @input="setInput(item,'PD','近中(M)','1B')">
              </div>
              <div class="perio-input-container">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.gmL" @focus="gmFocus($event,item,index,'GM','颊侧(B)','远中(D)','1B')" maxlength="1" @input="setInput(item,'GM','远中(D)','1B')">
                <input class="perio-small-input perio-small-input-center" :disabled="showToday==false" v-model="item.gmM" @focus="gmFocus($event,item,index,'GM','颊侧(B)','正中(C)','1B')" type="text" style="width:19px" maxlength="1" @input="setInput(item,'GM','正中(C)','1B')">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.gmS" @focus="gmFocus($event,item,index,'GM','颊侧(B)','近中(M)','1B')" maxlength="1" @input="setInput(item,'GM','近中(M)','1B')">
              </div>
            </div>
          </div>
          <div class="perio-chart-tooth-input-container verticalBorder fl-l"></div>
          <div class="" v-for="(item, index) in area2B" >
            <div class="perio-chart-tooth-input-container" style="width:60px">
              <input class="perio-tooth-code"  readonly="true" :value="index+21">
              <div class="perio-input-container">
                <div class="perio-small-square" :class="{activedYellow:item.plaqueS == 1}" @click="checkPlaque(item,index,'plaqueS','2B')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedYellow:item.plaqueM == 1}" @click="checkPlaque(item,index,'plaqueM','2B')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedYellow:item.plaqueL == 1}" @click="checkPlaque(item,index,'plaqueL','2B')" style="width:16px"></div>
              </div>
              <div class="perio-input-container">
                <div class="perio-small-square" :class="{activedRed:item.bleedingS == 1}" @click="checkBleeding(item,index,'bS','2B')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedRed:item.bleedingM == 1}" @click="checkBleeding(item,index,'bM','2B')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedRed:item.bleedingL == 1}" @click="checkBleeding(item,index,'bL','2B')" style="width:16px"></div>
              </div>
              <div class="perio-input-container">
                <input class="perio-small-input" type="text" style="width:19px" v-model="item.pdS" :disabled="showToday==false" @focus="gmFocus($event,item,index,'PD','颊侧(B)','近中(M)','2B')" maxlength="1" @input="setInput(item,'PD','近中(M)','2B')">
                <input class="perio-small-input perio-small-input-center" :disabled="showToday==false" v-model="item.pdM" @focus="gmFocus($event,item,index,'PD','颊侧(B)','正中(C)','2B')" type="text" style="width:19px" maxlength="1" @input="setInput(item,'PD','正中(C)','2B')">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.pdL" @focus="gmFocus($event,item,index,'PD','颊侧(B)','远中(D)','2B')" maxlength="1" @input="setInput(item,'PD','远中(D)','2B')">
              </div>
              <div class="perio-input-container">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.gmS" @focus="gmFocus($event,item,index,'GM','颊侧(B)','近中(M)','2B')" maxlength="1" @input="setInput(item,'GM','近中(M)','2B')">
                <input class="perio-small-input perio-small-input-center" :disabled="showToday==false" v-model="item.gmM" @focus="gmFocus($event,item,index,'GM','颊侧(B)','正中(C)','2B')" type="text" style="width:19px" maxlength="1" @input="setInput(item,'GM','正中(C)','2B')">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.gmL" @focus="gmFocus($event,item,index,'GM','颊侧(B)','远中(D)','2B')" maxlength="1" @input="setInput(item,'GM','远中(D)','2B')">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="horizontalBorder">
        <span class="textRight">右</span><span class="textLeft">左</span>
      </div>

      <div style="display:flex;" class="cf">
        <div class="perio-arch-title fl-l">
          <div class="perio-title side-title" style="bottom:125px;left:-50px;">颊侧(B)</div>
          <div class="perio-input side-title" style="bottom:167px;">龈缘(GM)</div>
          <div class="perio-input side-title red" style="bottom:147px;">探诊深度(PD)</div>
          <div class="perio-input side-title" style="bottom:127px;">探诊出血(Bleeding)</div>
          <div class="perio-input side-title red" style="bottom:107px;">菌斑(Plaque)</div>
        </div>
        <div class="perio-arch-content fl-l">
          <div class="" v-for="(item, index) in area4B" :key="index">
            <div class="perio-chart-tooth-input-container" style="width:60px">
              <!-- <input class="perio-tooth-code"  readonly="true" :value="48-index"> -->
              <div class="perio-input-container">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.gmL" @focus="gmFocus($event,item,index,'GM','颊侧(B)','远中(D)','4B')" maxlength="1" @input="setInput(item,'GM','远中(D)','4B')">
                <input class="perio-small-input perio-small-input-center" :disabled="showToday==false" v-model="item.gmM" @focus="gmFocus($event,item,index,'GM','颊侧(B)','正中(C)','4B')" type="text" style="width:19px" maxlength="1" @input="setInput(item,'GM','正中(C)','4B')">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.gmS" @focus="gmFocus($event,item,index,'GM','颊侧(B)','近中(M)','4B')" maxlength="1" @input="setInput(item,'GM','近中(M)','4B')">
              </div>
              <div class="perio-input-container">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.pdL" @focus="gmFocus($event,item,index,'PD','颊侧(B)','远中(D)','4B')" maxlength="1" @input="setInput(item,'PD','远中(D)','4B')">
                <input class="perio-small-input perio-small-input-center" :disabled="showToday==false" v-model="item.pdM" @focus="gmFocus($event,item,index,'PD','颊侧(B)','正中(C)','4B')" type="text" style="width:19px" maxlength="1" @input="setInput(item,'PD','正中(C)','4B')">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.pdS" @focus="gmFocus($event,item,index,'PD','颊侧(B)','近中(M)','4B')" maxlength="1" @input="setInput(item,'PD','近中(M)','4B')">
              </div>
              <div class="perio-input-container">
                <div class="perio-small-square" :class="{activedRed:item.bleedingL == 1}" @click="checkBleeding(item,index,'bL','4B')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedRed:item.bleedingM == 1}" @click="checkBleeding(item,index,'bM','4B')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedRed:item.bleedingS == 1}" @click="checkBleeding(item,index,'bS','4B')" style="width:16px"></div>
              </div>
              <div class="perio-input-container">
                <div class="perio-small-square" :class="{activedYellow:item.plaqueL == 1}" @click="checkPlaque(item,index,'plaqueL','4B')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedYellow:item.plaqueM == 1}" @click="checkPlaque(item,index,'plaqueM','4B')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedYellow:item.plaqueS == 1}" @click="checkPlaque(item,index,'plaqueS','4B')" style="width:16px"></div>
              </div>
            </div>
          </div>
          <div class="perio-chart-tooth-input-container verticalBorder fl-l"></div>
          <div class="" v-for="(item, index) in area3B" >
            <div class="perio-chart-tooth-input-container" style="width:60px">
              <!-- <input class="perio-tooth-code"  readonly="true" :value="index+31"> -->
              <div class="perio-input-container">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.gmS" @focus="gmFocus($event,item,index,'GM','颊侧(B)','近中(M)','3B')" maxlength="1" @input="setInput(item,'GM','近中(M)','3B')">
                <input class="perio-small-input perio-small-input-center" :disabled="showToday==false" v-model="item.gmM" @focus="gmFocus($event,item,index,'GM','颊侧(B)','正中(C)','3B')" type="text" style="width:19px" maxlength="1" @input="setInput(item,'GM','正中(C)','3B')">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.gmL" @focus="gmFocus($event,item,index,'GM','颊侧(B)','远中(D)','3B')" maxlength="1" @input="setInput(item,'GM','远中(D)','3B')">
              </div>
              <div class="perio-input-container">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.pdS" @focus="gmFocus($event,item,index,'PD','颊侧(B)','近中(M)','3B')" maxlength="1" @input="setInput(item,'PD','近中(M)','3B')">
                <input class="perio-small-input perio-small-input-center" :disabled="showToday==false" v-model="item.pdM" @focus="gmFocus($event,item,index,'PD','颊侧(B)','正中(C)','3B')" type="text" style="width:19px" maxlength="1" @input="setInput(item,'PD','正中(C)','3B')">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.pdL" @focus="gmFocus($event,item,index,'PD','颊侧(B)','远中(D)','3B')" maxlength="1" @input="setInput(item,'PD','远中(D)','3B')">
              </div>
              <div class="perio-input-container">
                <div class="perio-small-square" :class="{activedRed:item.bleedingS == 1}" @click="checkBleeding(item,index,'bS','3B')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedRed:item.bleedingM == 1}" @click="checkBleeding(item,index,'bM','3B')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedRed:item.bleedingL == 1}" @click="checkBleeding(item,index,'bL','3B')" style="width:16px"></div>
              </div>
              <div class="perio-input-container">
                <div class="perio-small-square" :class="{activedYellow:item.plaqueS == 1}" @click="checkPlaque(item,index,'plaqueS','3B')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedYellow:item.plaqueM == 1}" @click="checkPlaque(item,index,'plaqueM','3B')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedYellow:item.plaqueL == 1}" @click="checkPlaque(item,index,'plaqueL','3B')" style="width:16px"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="display:flex;margin-bottom:30px" class="cf">
        <div class="perio-arch-title fl-l">
          <div class="perio-title side-title" style="bottom:47px;left:-50px;">舌侧(L)</div>
          <div class="perio-input side-title" style="bottom:7px;">龈缘(GM)</div>
          <div class="perio-input side-title red" style="bottom:27px;">探诊深度(PD)</div>
          <div class="perio-input side-title" style="bottom:47px;">探诊出血(Bleeding)</div>
          <div class="perio-input side-title red" style="bottom:67px;">菌斑(Plaque)</div>
        </div>
        <div class="perio-arch-content fl-l">
          <div class="" v-for="(item, index) in area4L" :key="index">
            <div class="perio-chart-tooth-input-container" style="width:60px">
              <input class="perio-tooth-code"  readonly="true" :value="48-index">
              <div class="perio-input-container">
                <div class="perio-small-square" :class="{activedYellow:item.plaqueL == 1}" @click="checkPlaque(item,index,'plaqueL','4L')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedYellow:item.plaqueM == 1}" @click="checkPlaque(item,index,'plaqueM','4L')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedYellow:item.plaqueS == 1}" @click="checkPlaque(item,index,'plaqueS','4L')" style="width:16px"></div>
              </div>
              <div class="perio-input-container">
                <div class="perio-small-square" :class="{activedRed:item.bleedingL == 1}" @click="checkBleeding(item,index,'bL','4L')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedRed:item.bleedingM == 1}" @click="checkBleeding(item,index,'bM','4L')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedRed:item.bleedingS == 1}" @click="checkBleeding(item,index,'bS','4L')" style="width:16px"></div>
              </div>
              <div class="perio-input-container">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.pdL" @focus="gmFocus($event,item,index,'PD','舌侧(L)','远中(D)','4L')" maxlength="1" @input="setInput(item,'PD','远中(D)','4L')">
                <input class="perio-small-input perio-small-input-center" :disabled="showToday==false" v-model="item.pdM" @focus="gmFocus($event,item,index,'PD','舌侧(L)','正中(C)','4L')" type="text" style="width:19px" maxlength="1" @input="setInput(item,'PD','正中(C)','4L')">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.pdS" @focus="gmFocus($event,item,index,'PD','舌侧(L)','近中(M)','4L')" maxlength="1" @input="setInput(item,'PD','近中(M)','4L')">
              </div>
              <div class="perio-input-container">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.gmL" @focus="gmFocus($event,item,index,'GM','舌侧(L)','远中(D)','4L')" maxlength="1" @input="setInput(item,'GM','远中(D)','4L')">
                <input class="perio-small-input perio-small-input-center" :disabled="showToday==false" v-model="item.gmM" @focus="gmFocus($event,item,index,'GM','舌侧(L)','正中(C)','4L')" type="text" style="width:19px" maxlength="1" @input="setInput(item,'GM','正中(C)','4L')">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.gmS" @focus="gmFocus($event,item,index,'GM','舌侧(L)','近中(M)','4L')" maxlength="1" @input="setInput(item,'GM','近中(M)','4L')">
              </div>
            </div>
          </div>
          <div class="perio-chart-tooth-input-container verticalBorder fl-l"></div>
          <div class="" v-for="(item, index) in area3L" >
            <div class="perio-chart-tooth-input-container" style="width:60px">
              <input class="perio-tooth-code"  readonly="true" :value="index+31">
              <div class="perio-input-container">
                <div class="perio-small-square" :class="{activedYellow:item.plaqueS == 1}" @click="checkPlaque(item,index,'plaqueS','3L')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedYellow:item.plaqueM == 1}" @click="checkPlaque(item,index,'plaqueM','3L')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedYellow:item.plaqueL == 1}" @click="checkPlaque(item,index,'plaqueL','3L')" style="width:16px"></div>
              </div>
              <div class="perio-input-container">
                <div class="perio-small-square" :class="{activedRed:item.bleedingS == 1}" @click="checkBleeding(item,index,'bS','3L')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedRed:item.bleedingM == 1}" @click="checkBleeding(item,index,'bM','3L')" style="width:16px"></div>
                <div class="perio-small-square" :class="{activedRed:item.bleedingL == 1}" @click="checkBleeding(item,index,'bL','3L')" style="width:16px"></div>
              </div>
              <div class="perio-input-container">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.pdS" @focus="gmFocus($event,item,index,'PD','舌侧(L)','近中(M)','3L')" maxlength="1" @input="setInput(item,'PD','近中(M)','3L')">
                <input class="perio-small-input perio-small-input-center" :disabled="showToday==false" v-model="item.pdM" @focus="gmFocus($event,item,index,'PD','舌侧(L)','正中(C)','3L')" type="text" style="width:19px" maxlength="1" @input="setInput(item,'PD','正中(C)','3L')">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.pdL" @focus="gmFocus($event,item,index,'PD','舌侧(L)','远中(D)','3L')" maxlength="1" @input="setInput(item,'PD','远中(D)','3L')">
              </div>
              <div class="perio-input-container">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.gmS" @focus="gmFocus($event,item,index,'GM','舌侧(L)','近中(M)','3L')" maxlength="1" @input="setInput(item,'GM','近中(M)','3L')">
                <input class="perio-small-input perio-small-input-center" :disabled="showToday==false" v-model="item.gmM" @focus="gmFocus($event,item,index,'GM','舌侧(L)','正中(C)','3L')" type="text" style="width:19px" maxlength="1" @input="setInput(item,'GM','正中(C)','3L')">
                <input class="perio-small-input" type="text" style="width:19px" :disabled="showToday==false" v-model="item.gmL" @focus="gmFocus($event,item,index,'GM','舌侧(L)','远中(D)','3L')" maxlength="1" @input="setInput(item,'GM','远中(D)','3L')">
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="PeriodontalCheckBox">
      <el-dialog
        :title="popTitle"
        :visible.sync="showDialog"
        top="26%"
        :modal='false'
        center
        :show-close="false"
        v-dialogDrag>
        <div class="listBox">
          <span v-for="(item, index) in numberList">
            <span @click="site(item)" class="list_item">{{item.value}}</span>
          </span>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="PeriodontalCheckBox = false">关 闭</el-button>
        </span> -->
      </el-dialog>
    </div>


  </div>
</template>

<script>
//dialog窗口拖拽
import '../../../directives'
import { parseTime } from '@/utils/index'

export default {

  data() {
    return {
      selectParams:"",
      setName: '',
      setProject: '',
      setItem: {},
      type:"today",
      showToday: true,
      patientNo: this.$route.params.code,
      arrLeft:[
        {position: '8'}, {position: '7'},{position: '6'},{position: '5'},{position: '4'},{position: '3'},{position: '2'},{position: '1'}
      ],
      arrRight:[
        {position: '1'}, {position: '2'},{position: '3'},{position: '4'},{position: '5'},{position: '6'},{position: '7'},{position: '8'}
      ],
      area1L:[],
      area1B:[],
      area2L:[],
      area2B:[],
      area3L:[],
      area3B:[],
      area4L:[],
      area4B:[],
      location: '',
      popTitle: '',
      showDialog: false,
      popRowName: '', //
      popPosition: '',
      popClassName: '',
      popBlockName: '',
      numberList:[
        {value: '1'},{value: '2'},{value: '3'},{value: '4'},{value: '5'},
        {value: '6'},{value: '7'},{value: '8'},{value: '9'},{value: '10'},{value: '0'}
      ],
      checkDate: '',
      selectTimeList: [],



    }
  },
  mounted() {
     this.getTodayList(true)
  },
  methods:{
    //获取牙周检查列表
    getTodayList (flag) {
      let nowTime = parseTime(new Date().getTime())
      let params = {
        patientNo: this.patientNo,
      }
      if (flag) {   //今日检查
        params.createDate = nowTime
      } else {    //历史检查
        if (this.checkDate) {
          params.createDate = this.checkDate
        }
      }
      this.$http.post("/api/hx/gumCheck/list.do",params).then( res=> {
        if (res.data.result) {
          let data = res.data.returnObject
          if (data && data.length) {
            data.forEach(item => {
              if (item.location == '1L') {
                if (item.list) {
                  let arr1 =[{position: '8'}, {position: '7'},{position: '6'},{position: '5'},{position: '4'},{position: '3'},{position: '2'},{position: '1'}]
                  item.list.forEach(val => {
                      arr1.forEach((op,index) => {
                      if (op.position == val.position) {
                        arr1.splice(index,1)        //从定义好的数组删除相同position
                        arr1.splice(index, 0, val)  //再把获取到的相同position的对象插入原位置 ，即替换
                      }
                    })
                  })
                  this.area1L = arr1
                } else {
                  this.area1L =this.arrLeft
                }
              }

              else if (item.location == '1B') {
                if (item.list) {
                let arr1 =[{position: '8'}, {position: '7'},{position: '6'},{position: '5'},{position: '4'},{position: '3'},{position: '2'},{position: '1'}]
                  item.list.forEach(val => {
                    arr1.forEach((op,index) => {
                      if (op.position == val.position) {
                        arr1.splice(index,1)
                        arr1.splice(index, 0, val)
                      }
                    })
                  })
                  this.area1B = arr1
                } else {
                  this.area1B = this.arrLeft
                }
              }

              else  if (item.location == '2L') {
                if (item.list) {
                  let arr1 = [{position: '1'}, {position: '2'},{position: '3'},{position: '4'},{position: '5'},{position: '6'},{position: '7'},{position: '8'}]
                  item.list.forEach(val => {
                    arr1.forEach((op,index) => {
                      if (op.position == val.position) {
                        arr1.splice(index,1)
                        arr1.splice(index, 0, val)
                      }
                    })
                  })
                  this.area2L = arr1
                } else {
                  this.area2L = this.arrRight
                }
              }

              else if (item.location == '2B') {
                if (item.list) {
                  let arr1 = [{position: '1'}, {position: '2'},{position: '3'},{position: '4'},{position: '5'},{position: '6'},{position: '7'},{position: '8'}]
                  item.list.forEach(val => {
                    arr1.forEach((op,index) => {
                      if (op.position == val.position) {
                        arr1.splice(index,1)
                        arr1.splice(index, 0, val)
                      }
                    })
                  })
                  this.area2B = arr1
                } else {
                  this.area2B = this.arrRight
                }
              }

              else if (item.location == '3L') {
                if (item.list) {
                  let arr1 = [{position: '1'}, {position: '2'},{position: '3'},{position: '4'},{position: '5'},{position: '6'},{position: '7'},{position: '8'}]
                  item.list.forEach(val => {
                    arr1.forEach((op,index) => {
                      if (op.position == val.position) {
                        arr1.splice(index,1)
                        arr1.splice(index, 0, val)
                      }
                    })
                  })
                  this.area3L = arr1
                } else {
                  this.area3L = this.arrRight
                }
              }

              else if (item.location == '3B') {
                if (item.list) {
                  let arr1 = [{position: '1'}, {position: '2'},{position: '3'},{position: '4'},{position: '5'},{position: '6'},{position: '7'},{position: '8'}]
                  item.list.forEach(val => {
                    arr1.forEach((op,index) => {
                      if (op.position == val.position) {
                        arr1.splice(index,1)
                        arr1.splice(index, 0, val)
                      }
                    })
                  })
                  this.area3B = arr1
                } else {
                  this.area3B = this.arrRight
                }

              }

              else if (item.location == '4L') {
                if (item.list) {
                  let arr1 =[{position: '8'}, {position: '7'},{position: '6'},{position: '5'},{position: '4'},{position: '3'},{position: '2'},{position: '1'}]
                  item.list.forEach(val => {
                    arr1.forEach((op,index) => {
                      if (op.position == val.position) {
                        arr1.splice(index,1)
                        arr1.splice(index, 0, val)
                      }
                    })
                  })
                  this.area4L = arr1
                } else {
                  this.area4L = this.arrLeft
                }

              }

              else if (item.location == '4B') {
                if (item.list) {
                  let arr1 =[{position: '8'}, {position: '7'},{position: '6'},{position: '5'},{position: '4'},{position: '3'},{position: '2'},{position: '1'}]
                  item.list.forEach(val => {
                    arr1.forEach((op,index) => {
                      if (op.position == val.position) {
                        arr1.splice(index,1)
                        arr1.splice(index, 0, val)
                      }
                    })
                  })
                  this.area4B = arr1
                } else {
                  this.area4B =this.arrLeft
                }
              }

            })
          }
        } else {
          this.$message.error(res.data.errorMessage)
        }
      })
    },

    setInput (item, rowName, blockName, remark) {
        this.setName = blockName
        this.setProject = rowName //项目
        this.setPosition = item.position

        //有code即编辑
        if (item.code) {
           this.editTodayList(item,rowName)
        } else {
          this.addTodayList(item, rowName, remark, item.position)
        }
    },

    //焦点事件
    gmFocus (event, item, index, rowName, className, blockName, remark) {
      this.selectParams =index + "-/-" + remark
      this.setName = blockName  //位置
      this.setProject = rowName //项目
      this.setPosition = item.position
      //选中值
      event.currentTarget.select();
      this.showDialog = true
      let po = 10 + Number(item.position)
      this.popTitle = rowName + '：#' + po +'  '+ className +'  '+ blockName
    },

    site (item) {
      let index = this.selectParams.split("-/-")[0]
      let setRemark = this.selectParams.split("-/-")[1]
      let arr = []
      if (setRemark == '1L') {
        arr = JSON.parse(JSON.stringify(this.area1L))
        // this.area1L = arr
      }
      if (setRemark == '1B') {
        arr = JSON.parse(JSON.stringify(this.area1B))
      }
      if (setRemark == '2L') {
        arr = JSON.parse(JSON.stringify(this.area2L))
      }
      if (setRemark == '2B') {
        arr = JSON.parse(JSON.stringify(this.area2B))
      }
      if (setRemark == '3L') {
        arr = JSON.parse(JSON.stringify(this.area3L))
      }
      if (setRemark == '3B') {
        arr = JSON.parse(JSON.stringify(this.area3B))
      }
      if (setRemark == '4L') {
        arr = JSON.parse(JSON.stringify(this.area4L))
      }
      if (setRemark == '4B') {
        arr = JSON.parse(JSON.stringify(this.area4B))
      }
      arr.map((value,i)=>{
        if(i == index) {
          if (this.setProject == 'GM') {
            if (this.setName == '远中(D)') {
              value.gmL = item.value
            }
            if (this.setName == '正中(C)') {
              value.gmM = item.value
            }
            if (this.setName == '近中(M)') {
              value.gmS = item.value
            }
          }

          if (this.setProject == 'PD') {
            if (this.setName == '远中(D)') {
              value.pdL = item.value
            }
            if (this.setName == '正中(C)') {
              value.pdM = item.value
            }
            if (this.setName == '近中(M)') {
              value.pdS = item.value
            }
          }
          this.setItem = value
          return value;
        }
      })

      //有code即编辑 无  新增
      if (this.setItem.code) {
         this.editTodayList(this.setItem,this.setProject)
      } else {
        this.addTodayList(this.setItem, this.setProject, setRemark, this.setPosition)
      }
    },

    //点击探诊出血
    checkBleeding (item, index, name, remark) {
      if (this.showToday) {
        //历史检查禁止编辑
        if (name == 'bL') {
          item.bleedingL == 1 || undefined  ? item.bleedingL = 0 : item.bleedingL = 1
        }
        else if (name == 'bM') {
          item.bleedingM == 1 || undefined  ? item.bleedingM = 0 : item.bleedingM = 1
        }
        else if (name == 'bS') {
          item.bleedingS == 1 || undefined  ? item.bleedingS = 0 : item.bleedingS = 1
        }
        //编辑
        if (item.code) {
          this.editTodayList(item,name)
        } else {
          //新增
          let posi = ''
          if (remark == '1L' || remark == '1B' || remark == '4L' || remark == '4B') {
            posi = (8 - index)
          }
          if (remark == '2L' || remark == '2B' || remark == '3L' || remark == '3B') {
            posi = (index + 1)
          }
          this.addTodayList(item, name, remark, posi)
        }

      }
    },

    //点击菌斑
    checkPlaque (item, index, name, remark) {
      if (this.showToday) {
        //历史检查禁止编辑
        if (name == 'plaqueL') {
          item.plaqueL == 1 || undefined ? item.plaqueL = 0 : item.plaqueL = 1
        }
        else if (name == 'plaqueM') {
          item.plaqueM == 1 || undefined ? item.plaqueM = 0 : item.plaqueM = 1
        }
        else if (name == 'plaqueS') {
          item.plaqueS == 1 || undefined ? item.plaqueS = 0 : item.plaqueS = 1
        }
        //编辑
        if (item.code) {
          this.editTodayList(item, name)
        } else {
          let posi = ''
          if (remark == '1L' || remark == '1B' || remark == '4L' || remark == '4B') {
            posi = (8 - index)
          }
          if (remark == '2L' || remark == '2B' || remark == '3L' || remark == '3B') {
            posi = (index + 1)
          }
          this.addTodayList(item, name, remark, posi)
        }

      }
    },

    //编辑牙周列表
    editTodayList (item,name) {
        let params = {
          code: item.code
        }
        //龈缘 GM
        if (name == 'GM') {
          if (this.setName == '远中(D)') {
            params.gmL = item.gmL
          }
          if (this.setName == '正中(C)') {
            params.gmM = item.gmM
          }
          if (this.setName == '近中(M)') {
            params.gmS = item.gmS
          }
        }
        //探诊深度PD
        if (name == 'PD') {
          if (this.setName == '远中(D)') {
            params.pdL = item.pdL
          }
          if (this.setName == '正中(C)') {
            params.pdM = item.pdM
          }
          if (this.setName == '近中(M)') {
            params.pdS = item.pdS
          }
        }
        //探诊出血 bleeding
        if (name == 'bL') {
          params.bleedingL = item.bleedingL
        }
        if (name == 'bM') {
          params.bleedingM = item.bleedingM
        }
        if (name == 'bS') {
          params.bleedingS = item.bleedingS
        }
        //菌斑 plaque
        if (name == 'plaqueL') {
          params.plaqueL = item.plaqueL
        }
        if (name == 'plaqueM') {
          params.plaqueM = item.plaqueM
        }
        if (name == 'plaqueS') {
          params.plaqueS = item.plaqueS
        }
        console.log(params);

        this.$http.post('/api/hx/gumCheck/edit.do',params).then(res=> {
          if (res.data.result) {
            // console.log("编辑成功");
            this.getTodayList(true)
          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
    },

    //新增牙周列表
    addTodayList (item,name,remark,position) {
      let params = {
        patientNo: this.patientNo,
        remark: remark,
        position: position
      }
      //龈缘 GM
      if (name == 'GM') {
        if (this.setName == '远中(D)') {
          params.gmL = item.gmL
        }
        if (this.setName == '正中(C)') {
          params.gmM = item.gmM
        }
        if (this.setName == '近中(M)') {
          params.gmS = item.gmS
        }
      }
      //探诊深度PD
      if (name == 'PD') {
        if (this.setName == '远中(D)') {
          params.pdL = item.pdL
        }
        if (this.setName == '正中(C)') {
          params.pdM = item.pdM
        }
        if (this.setName == '近中(M)') {
          params.pdS = item.pdS
        }
      }
      //探诊出血 bleeding
      if (name == 'bL') {
        params.bleedingL = item.bleedingL
      }
      if (name == 'bM') {
        params.bleedingL = item.bleedingM
      }
      if (name == 'bS') {
        params.bleedingS = item.bleedingS
      }
      //菌斑 plaque
      if (name == 'plaqueL') {
        params.plaqueL = item.plaqueL
      }
      if (name == 'plaqueM') {
        params.plaqueM = item.plaqueM
      }
      if (name == 'plaqueS') {
        params.plaqueS = item.plaqueS
      }

      console.log(params)

      this.$http.post('/api/hx/gumCheck/add.do',params).then(res=> {
        if (res.data.result) {
          // console.log("新增成功");
          this.getTodayList(true)
        } else {
          this.$message.error(res.data.errorMessage)
        }
      })
    },


    handleRadioChange(key, val) {
       if (val === 'today') {
        this.showToday = true
         this.getTodayList(true)
       } else {
         this.showToday = false
         this.getTodayList(false)
         if (!this.selectTimeList.length) {
           this.getTimeList()
         }
       }
    },

    getTimeList () {
      this.$http.post("/api/hx/toochCkeck/timeList.do",{
        patientNo: this.patientNo
      }).then(res => {
        if (res.data.result) {
          this.selectTimeList = res.data.returnObject
          if (this.selectTimeList && this.selectTimeList.length) {
            this.checkDate = this.selectTimeList[0].createDate
          }
        } else {
          this.$message.error(res.data.errorMessage)
        }
      })
    },

    seliceTime (date) {
      if (date) {
        return date.slice(0,10)
      }
    },

  },

};
</script>

<style lang="less" scoped>
  .fl-l{
    float: left;
  }

  .cf{
    clear: both;
    content: '',
  }

  .red{
    color: red;
  }

  .activedRed{
      background-color: red!important;
  }

  .activedYellow{
    background-color: yellow!important;
  }

  .verticalBorder{
    margin: 0 5px;
    height: 100px;
    border-right: 2px solid #828282!important;
  }

  .horizontalBorder{
    width: 1007px;
    height: 1px;
    border-bottom: 2px solid #828282!important;
    margin: 0px 0 10px 209px;
    position: relative;

    .textRight{
      position: absolute;
      left: 230px;
      top: -8px;
      background: #fff;
    }
    .textLeft{
      position: absolute;
      right: 250px;
      top: -8px;
      background: #fff;
    }
  }
  .side-title{
    width: 120px;
  }

  .ares-main-content{
    width: 100%;
    overflow: hidden;
    position: relative;

    .perio-arch-title{
      width: 130px;
      // height: 500px;
      margin-left: 70px;

      &>div{
        position: absolute;
        text-align: right;
      }
      .perio-title{
        font-size: 20px;
        font-weight: bold;
      }

      .perio-input{
        font-size: 14px;
      }

    }

    .perio-arch-content{
      width: 1050px;
      height: 78px;
      // height: 95px;
      // margin: 0 0 4px 5px;

      .perio-chart-tooth-input-container{
        float: left;
        border: 1px solid #d3d3d3;

        input{
          width: 100%;
          height: 18px;
          margin: 0;
          text-align: center;
          padding: 0;
          border: 0;
        }

        .perio-input-container{
          height: 18px;
          width: 100%;
          border-top: 1px solid #d3d3d3;

          .perio-small-input{
            width: 30%;
            float: left;
            padding: 0!important;
            border: 0!important;
            margin: 0!important;
          }

          .perio-small-input-center{
            border-right: 1px solid #d3d3d3!important;
            border-left: 1px solid #d3d3d3!important;
          }

          .perio-small-square{
            height: 14px;
            float: left;
            padding: 0!important;
            border: 0!important;
            margin: 2px!important;
            border: 0!important;
            background-color: #d3d3d3;
            cursor: pointer;
          }
        }
      }
    }
  }

.listBox{

  .list_item{
    width: 35px;
    height: 20px;
    line-height: 20px;
    margin: 2px;
    padding: 2px;
    font-size: 18px;
    font-weight: bolder;
    border-radius: 7px;
    border: 1px solid #adadad;
    background-color: #f5f5f5;
    text-align: center;
    display: inline-block;
    margin-right: 7px;

    &:hover{
      background-color: #e6e6e6;
      cursor: pointer;
    }
  }
}

</style>
