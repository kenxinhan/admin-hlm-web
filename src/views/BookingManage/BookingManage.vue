<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="预约视图" name="first">
      <div style="float:left">
        <el-form class="clearfix">
          <div class="fSearch-f">
              <div class="grid-content bg-purple">
                  <el-form-item>
                    <el-date-picker
                      v-model="reservationDateStr"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                      :clearable="false"
                      @change="handleItemChange('reservationDateStr',reservationDateStr)"
                    ></el-date-picker>
                  </el-form-item>
              </div>
          </div>
        </el-form>
      </div>
      <div class="indicateBox" style="float:right">
        <span class="indicatorB">
          <span></span>预约
        </span>
        <span class="indicatorC">
          <span></span>治疗中
        </span>
        <span class="indicatorD">
          <span></span>治疗完成
        </span>
      </div>
      <table class="bookingViewBox stickyHeader">
          <tr>
            <td class="timeClass">
              <i class="iconfont icon-user"></i>
            </td>
            <td class="clockClass">
              <i class="iconfont icon-shizhong"></i>
            </td>
            <td
              class="viewCon headerItem"
              v-for="item in this.appVuex.shop_doctor"
              :key="item.merchantName"
              :style="'width:' +  ((100/shop_doctor_length) - 10) + '%'"
            >{{item.memberName}}</td>
         </tr>
      </table>
      <table class="bookingViewBox bookingViewRef">
        <tr>
          <td class="timeClass">
            <i class="iconfont icon-user"></i>
          </td>
          <td class="clockClass">
            <i class="iconfont icon-shizhong"></i>
          </td>
          <td
            class="viewCon headerItem"
            v-for="item in this.appVuex.shop_doctor"
            :key="item.merchantName"
            :style="'width:' +  ((100/shop_doctor_length) - 10) + '%'"
          >{{item.memberName}}</td>
        </tr>
        <tr>
          <td>09</td>
          <td>
            <p>00</p>
            <p>15</p>
            <p>30</p>
            <p>45</p>
          </td>
          <td class="viewCon" v-for="item in this.appVuex.shop_doctor" :key="item.merchantName">
            <div
              v-if="doctorMap[item.memberNo] && timeObj[item.memberNo]"
              style="height: 200px;position: relative;"
            >
              <div v-for="subitem in doctorMap[item.memberNo]" :key="subitem.patientNo">
                <el-popover
                  v-if="subitem.vistitingStatus === 'UNCONFIRMED' && subitem.time === '09'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock1"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_09)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'TREATMENT' && subitem.time === '09'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock2"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_09)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'FINISHED' && subitem.time === '09'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock3"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_09)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>10</td>
          <td>
            <p>00</p>
            <p>15</p>
            <p>30</p>
            <p>45</p>
          </td>
          <td class="viewCon" v-for="item in this.appVuex.shop_doctor" :key="item.merchantName">
            <div v-if="doctorMap[item.memberNo]" style="height: 200px;position: relative;">
              <div v-for="subitem in doctorMap[item.memberNo]" :key="subitem.patientNo">
                <el-popover
                  v-if="subitem.vistitingStatus === 'UNCONFIRMED' && subitem.time === '10'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock1"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_10)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'TREATMENT' && subitem.time === '10'"
                  placement="top-start"
                  :title="subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock2"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_10)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'FINISHED' && subitem.time === '10'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock3"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_10)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>11</td>
          <td>
            <p>00</p>
            <p>15</p>
            <p>30</p>
            <p>45</p>
          </td>
          <td class="viewCon" v-for="item in this.appVuex.shop_doctor" :key="item.merchantName">
            <div v-if="doctorMap[item.memberNo]" style="height: 200px;position: relative;">
              <div v-for="subitem in doctorMap[item.memberNo]" :key="subitem.patientNo">
                <el-popover
                  v-if="subitem.vistitingStatus === 'UNCONFIRMED' && subitem.time === '11'"
                  placement="top-start"
                  :title="subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock1"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_11)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'TREATMENT' && subitem.time === '11'"
                  placement="top-start"
                  :title="+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock2"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_11)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'FINISHED' && subitem.time === '11'"
                  placement="top-start"
                  :title="subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock3"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_11)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>12</td>
          <td>
            <p>00</p>
            <p>15</p>
            <p>30</p>
            <p>45</p>
          </td>
          <td class="viewCon" v-for="item in this.appVuex.shop_doctor" :key="item.merchantName">
            <div v-if="doctorMap[item.memberNo]" style="height: 200px;position: relative;">
              <div v-for="subitem in doctorMap[item.memberNo]" :key="subitem.patientNo">
                <el-popover
                  v-if="subitem.vistitingStatus === 'UNCONFIRMED' && subitem.time === '12'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock1"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_12)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'TREATMENT' && subitem.time === '12'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock2"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_12)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'FINISHED' && subitem.time === '12'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock3"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_12)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>13</td>
          <td>
            <p>00</p>
            <p>15</p>
            <p>30</p>
            <p>45</p>
          </td>
          <td class="viewCon" v-for="item in this.appVuex.shop_doctor" :key="item.merchantName">
            <div v-if="doctorMap[item.memberNo]" style="height: 200px;position: relative;">
              <div v-for="subitem in doctorMap[item.memberNo]" :key="subitem.patientNo">
                <el-popover
                  v-if="subitem.vistitingStatus === 'UNCONFIRMED' && subitem.time === '13'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock1"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_13)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'TREATMENT' && subitem.time === '13'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock2"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_13)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'FINISHED' && subitem.time === '13'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock3"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_13)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>14</td>
          <td>
            <p>00</p>
            <p>15</p>
            <p>30</p>
            <p>45</p>
          </td>
          <td class="viewCon" v-for="item in this.appVuex.shop_doctor" :key="item.merchantName">
            <div v-if="doctorMap[item.memberNo]" style="height: 200px;position: relative;">
              <div v-for="subitem in doctorMap[item.memberNo]" :key="subitem.patientNo">
                <el-popover
                  v-if="subitem.vistitingStatus === 'UNCONFIRMED' && subitem.time === '14'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock1"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_14)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'TREATMENT' && subitem.time === '14'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock2"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_14)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'FINISHED' && subitem.time === '14'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock3"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_14)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>15</td>
          <td>
            <p>00</p>
            <p>15</p>
            <p>30</p>
            <p>45</p>
          </td>
          <td class="viewCon" v-for="item in this.appVuex.shop_doctor" :key="item.merchantName">
            <div v-if="doctorMap[item.memberNo]" style="height: 200px;position: relative;">
              <div v-for="subitem in doctorMap[item.memberNo]" :key="subitem.patientNo">
                <el-popover
                  v-if="subitem.vistitingStatus === 'UNCONFIRMED' && subitem.time === '15'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock1"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_15)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'TREATMENT' && subitem.time === '15'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock2"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_15)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'FINISHED' && subitem.time === '15'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock3"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_15)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>16</td>
          <td>
            <p>00</p>
            <p>15</p>
            <p>30</p>
            <p>45</p>
          </td>
          <td class="viewCon" v-for="item in this.appVuex.shop_doctor" :key="item.merchantName">
            <div v-if="doctorMap[item.memberNo]" style="height: 200px;position: relative;">
              <div v-for="subitem in doctorMap[item.memberNo]" :key="subitem.patientNo">
                <el-popover
                  v-if="subitem.vistitingStatus === 'UNCONFIRMED' && subitem.time === '16'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock1"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_16)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'TREATMENT' && subitem.time === '16'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock2"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_16)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'FINISHED' && subitem.time === '16'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock3"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_16)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>17</td>
          <td>
            <p>00</p>
            <p>15</p>
            <p>30</p>
            <p>45</p>
          </td>
          <td class="viewCon" v-for="item in this.appVuex.shop_doctor" :key="item.merchantName">
            <div v-if="doctorMap[item.memberNo]" style="height: 200px;position: relative;">
              <div v-for="subitem in doctorMap[item.memberNo]" :key="subitem.patientNo">
                <el-popover
                  v-if="subitem.vistitingStatus === 'UNCONFIRMED' && subitem.time === '17'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock1"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_17)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'TREATMENT' && subitem.time === '17'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock2"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_17)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'FINISHED' && subitem.time === '17'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock3"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_17)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>18</td>
          <td>
            <p>00</p>
            <p>15</p>
            <p>30</p>
            <p>45</p>
          </td>
          <td class="viewCon" v-for="item in this.appVuex.shop_doctor" :key="item.merchantName">
            <div v-if="doctorMap[item.memberNo]" style="height: 200px;position: relative;">
              <div v-for="subitem in doctorMap[item.memberNo]" :key="subitem.patientNo">
                <el-popover
                  v-if="subitem.vistitingStatus === 'UNCONFIRMED' && subitem.time === '18'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock1"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_18)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'TREATMENT' && subitem.time === '18'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock2"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_18)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'FINISHED' && subitem.time === '18'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock3"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_18)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>19</td>
          <td>
            <p>00</p>
            <p>15</p>
            <p>30</p>
            <p>45</p>
          </td>
          <td class="viewCon" v-for="item in this.appVuex.shop_doctor" :key="item.merchantName">
            <div v-if="doctorMap[item.memberNo]" style="height: 200px;position: relative;">
              <div v-for="subitem in doctorMap[item.memberNo]" :key="subitem.patientNo">
                <el-popover
                  v-if="subitem.vistitingStatus === 'UNCONFIRMED' && subitem.time === '19'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock1"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_19)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'TREATMENT' && subitem.time === '19'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock2"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_19)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'FINISHED' && subitem.time === '19'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock3"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_19)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>20</td>
          <td>
            <p>00</p>
            <p>15</p>
            <p>30</p>
            <p>45</p>
          </td>
          <td class="viewCon" v-for="item in this.appVuex.shop_doctor" :key="item.merchantName">
            <div v-if="doctorMap[item.memberNo]" style="height: 200px;position: relative;">
              <div v-for="subitem in doctorMap[item.memberNo]" :key="subitem.patientNo">
                <el-popover
                  v-if="subitem.vistitingStatus === 'UNCONFIRMED' && subitem.time === '20'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock1"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_20)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'TREATMENT' && subitem.time === '20'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock2"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_20)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'FINISHED' && subitem.time === '20'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock3"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_20)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>21</td>
          <td>
            <p>00</p>
            <p>15</p>
            <p>30</p>
            <p>45</p>
          </td>
          <td class="viewCon" v-for="item in this.appVuex.shop_doctor" :key="item.merchantName">
            <div v-if="doctorMap[item.memberNo]" style="height: 200px;position: relative;">
              <div v-for="subitem in doctorMap[item.memberNo]" :key="subitem.patientNo">
                <el-popover
                  v-if="subitem.vistitingStatus === 'UNCONFIRMED' && subitem.time === '21'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock1"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_21)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'TREATMENT' && subitem.time === '21'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock2"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_21)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'FINISHED' && subitem.time === '21'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock3"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_21)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>22</td>
          <td>
            <p>00</p>
            <p>15</p>
            <p>30</p>
            <p>45</p>
          </td>
          <td class="viewCon" v-for="item in this.appVuex.shop_doctor" :key="item.merchantName">
            <div v-if="doctorMap[item.memberNo]" style="height: 200px;position: relative;">
              <div v-for="subitem in doctorMap[item.memberNo]" :key="subitem.patientNo">
                <el-popover
                  v-if="subitem.vistitingStatus === 'UNCONFIRMED' && subitem.time === '22'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock1"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_22)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'TREATMENT' && subitem.time === '22'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock2"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_22)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'FINISHED' && subitem.time === '22'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock3"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_22)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>23</td>
          <td>
            <p>00</p>
            <p>15</p>
            <p>30</p>
            <p>45</p>
          </td>
          <td class="viewCon" v-for="item in this.appVuex.shop_doctor" :key="item.merchantName">
            <div v-if="doctorMap[item.memberNo]" style="height: 200px;position: relative;">
              <div v-for="subitem in doctorMap[item.memberNo]" :key="subitem.patientNo">
                <el-popover
                  v-if="subitem.vistitingStatus === 'UNCONFIRMED' && subitem.time === '23'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock1"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_23)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'TREATMENT' && subitem.time === '23'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock2"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_23)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'FINISHED' && subitem.time === '23'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock3"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_23)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>24</td>
          <td>
            <p>00</p>
            <p>15</p>
            <p>30</p>
            <p>45</p>
          </td>
          <td class="viewCon" v-for="item in this.appVuex.shop_doctor" :key="item.merchantName">
            <div v-if="doctorMap[item.memberNo]" style="height: 200px;position: relative;">
              <div v-for="subitem in doctorMap[item.memberNo]" :key="subitem.patientNo">
                <el-popover
                  v-if="subitem.vistitingStatus === 'UNCONFIRMED' && subitem.time === '24'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock1"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_24)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'TREATMENT' && subitem.time === '24'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock2"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_24)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
                <el-popover
                  v-if="subitem.vistitingStatus === 'FINISHED' && subitem.time === '24'"
                  placement="top-start"
                  :title="''+ subitem.patientName"
                  width="200"
                  trigger="hover"
                >
                  <span
                    v-for="(proitem,index) in subitem.serviceChooses"
                    :key="proitem.code"
                  >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                  <br>
                  {{subitem.reservationDate}}
                  <br>
                  {{subitem.reservationDateLen}}分钟
                  <!-- <el-button >hover 激活</el-button> -->
                  <span
                    slot="reference"
                    class="viewBlock3"
                    :style="
                    'height:' + (subitem.reservationDateLen/0.3) + 'px;transform:translateY(' + (subitem.hourse/0.3) +'px);width:' + (100/timeObj[item.memberNo].timeKey_24)+'%'"
                  >
                    <div class="reservedCon">
                      <strong>{{subitem.patientName}}</strong>
                      <br>
                      <span
                        v-for="(proitem,index) in subitem.serviceChooses"
                        :key="proitem.code"
                      >{{proitem.projectPropertyName}}{{index === subitem.serviceChooses.length - 1 ? '' : '/' }}</span>
                      <br>
                      {{subitem.reservationDate}}
                      <br>
                      {{subitem.reservationDateLen}}分钟
                    </div>
                  </span>
                </el-popover>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </el-tab-pane>
    <el-tab-pane label="预约管理" name="second">
      <div>
        <ComModal
          @handleModalConfirm="handleModalConfirm"
          @handleModalCancel="handleModalCancel"
          :patientDetail="patientDetail"
          :BookingDetail="BookingDetail"
          v-if="isLoadModal"
        ></ComModal>
        <Search @searchData="searchData" @resetSearchData="resetSearchData"></Search>
        <Table :tableData="tableData" tabConKeyName="customcues" ref="table">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              v-if="scope.row.vistitingStatus === 'CANCEL' || scope.row.vistitingStatus === 'UNCONFIRMED'"
              @click="handleUpdateBooking(scope.row)"
            >修改</el-button>
            <el-button
              size="mini"
              type="primary"
              v-if="!scope.row.registeredDate && scope.row.vistitingStatus === 'UNCONFIRMED'"
              @click="handleRegisterBooking(scope.row)"
            >挂号</el-button>
            <el-button
              size="mini"
              type="danger"
              v-if="scope.row.vistitingStatus === 'UNCONFIRMED'"
              @click="handleCancelBooking(scope.row)"
            >取消</el-button>
          </template>
        </Table>
        <Pagination
          @handlePageQuery="handlePageQuery"
          :currentPage="currentPage"
          :pageSize="limit"
          :total="total"
        ></Pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import Search from "./components/Search";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import ComModal from "../Components/ComModal/ComModal";
import storage from "@/tools/local_storage.js";

export default {
  components: {
    Search,
    Table,
    Pagination,
    ComModal
  },
  props: {},
  data() {
    return {
      activeName: "first",
      reservationCode: "",
      isLoadComModal: false,
      isLoadModal: false,
      patientDetail: {},
      doctorMap: {},
      BookingDetail: {
        patientType: "ORDINARY",
        visitingType: "NEWDIAGNOSIS"
      },
      timeObj: {},
      reservationDateStr: moment().format("YYYY-MM-DD"),
      isLoadModal: false,
      searchValue: {
        beginDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD")
      },
      tableData: [], // 表格数据
      currentPage: 1, // 当前页码
      limit: 10, // 每页条数
      total: 1 // 总条数
    };
  },
  watch: {},
  computed: {
    ...mapState({
      mutations: state => state["mutations"],
      appVuex: state => state["appVuex"]
    }),
    shop_doctor_length: _this => {
      return _this.appVuex.shop_doctor.length;
    }
  },
  methods: {
    ...mapActions(["ActionToggleModal"]),

    initData(formData) {
      const { memberNoGuid, memberNoMerchant, roleEnnames, shopNo } =
        this.$cfg.userInfo || storage.get("userInfo");
      const { currentPage, limit, searchValue } = this;
      this.$http
        .post("/api/hx/ps/findPatientReservationPage.do", {
          start: (currentPage - 1) * limit,
          limit,
          shopNo,
          merchantNo: memberNoMerchant,
          patientType: "",
          ...formData,
          ...searchValue
        })
        .then(res => {
          const { result, errorMessage } = res.data;
          if (result) {
            const { total, rows } = res.data.returnObject;
            this.total = total;
            this.tableData = rows;
          } else {
            this.$message({
              type: "error",
              message: errorMessage
            });
          }
        });
    },

    // 全选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 处理分页
    handlePageQuery(currentPage) {
      this.currentPage = currentPage;
      this.initData({});
    },
    // 搜索查询
    searchData(data) {
      this.searchValue = data;
      this.currentPage = 1;
      this.initData({ page: 1, ...data });
    },

    // 重置搜索
    resetSearchData() {
      this.currentPage = 1;
      this.searchValue = {
        beginDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD")
      }
      this.initData();
    },

    // 挂号
    handleRegisterBooking(scope) {
      this.getPatientDetail(scope.patientNo, () => {
        this.getBookingDetail(scope.code, () => {
          this.isLoadModal = true;
          this.ActionToggleModal({
            center: false,
            modalTitle: "挂号",
            keyName: "register",
            BookingModalVisible: true
          });
        });
      });
    },

    // 修改预约
    handleUpdateBooking(scope) {
      this.reservationCode = scope.code;
      this.getPatientDetail(scope.patientNo, () => {
        this.getBookingDetail(scope.code, () => {
          this.isLoadModal = true;
          this.ActionToggleModal({
            center: false,
            modalTitle: "修改预约",
            keyName: "CreateAndEditBooking",
            BookingModalVisible: true
          });
        });
      });
    },

    // 取消预约
    handleCancelBooking(scope) {
      let obj = scope.patientName;
      const { memberNoGuid, memberNameGuid } =
        this.$cfg.userInfo || storage.get("userInfo");
      this.$confirm("确认取消患者" + obj + "的服务预约？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$http
            .post("/api/hx/ps/cancelPatientService.do", {
              code: scope.code,
              reservationType: "RESERVATION",
              updateId: memberNoGuid,
              updateName: memberNameGuid
            })
            .then(res => {
              const { result, errorMessage } = res.data;
              if (result) {
                this.$message({
                  type: "success",
                  message: "取消成功!"
                });
                this.initData(this.searchValue);
              } else {
                this.$message({
                  type: "error",
                  message: errorMessage
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },

    // 修改预约
    createBooking(formData, callback) {
      const { memberNoGuid, memberNameGuid, shopNo, shopName } =
        this.$cfg.userInfo || storage.get("userInfo");
      const {
        code,
        name,
        phone,
        caseNo,
        merchantNo,
        merchantName
      } = this.patientDetail;
      formData["reservationDateLen"] = parseInt(formData["reservationDateLen"]);
      formData["serviceChoosesJson"] = JSON.stringify(
        formData["serviceChoosesJson"]
      );
      this.$http
        .post("/api/hx/ps/updatePatientReservation.do", {
          code: this.reservationCode,
          medicalNo: caseNo,
          updateId: memberNoGuid,
          updateName: memberNameGuid,
          ...formData
        })
        .then(res => {
          const { result, errorMessage, returnObject } = res.data;
          if (result) {
            this.ActionToggleModal({
              dialogFormVisible: false,
              BookingModalVisible: false
            });
            this.isLoadModal = false;
            this.$message({
              type: "success",
              message: "修改预约成功!"
            });
            this.BookingDetail = {
              patientType: "ORDINARY",
              visitingType: "NEWDIAGNOSIS"
            };
            this.initData();
            if (callback) callback();
          } else {
            this.$message({
              type: "error",
              message: errorMessage
            });
          }
        });
    },

    // 患者详情
    getPatientDetail(code, callback) {
      this.$http
        .post("/api/hx/patient/details.do", {
          code
        })
        .then(res => {
          const { returnObject, result, errorMessage } = res.data;
          if (result) {
            this.patientDetail = returnObject;
            if (callback) callback();
          } else {
            this.$message({
              type: "error",
              message: errorMessage
            });
          }
        });
    },

    // 预约详情
    getBookingDetail(code, callback) {
      this.$http.post("/api/hx/ps/info.do", { code }).then(res => {
        const { returnObject, result, errorMessage } = res.data;
        if (result) {
          this.BookingDetail = returnObject;
          if (callback) callback();
        } else {
          this.$message({
            type: "error",
            message: errorMessage
          });
        }
      });
    },

    // 预约视图查询
    handleItemChange(key,val) {
      this[key] = val
      this.getBookingView()
    },

    // 预约视图
    getBookingView() {
      const {
        memberNoGuid,
        memberNameGuid,
        memberNoMerchant,
        shopNo,
        shopName
      } = this.$cfg.userInfo || storage.get("userInfo");
      this.$http
        .post("/api/hx/ps/findPatientReservationView.do", {
          shopNo,
          merchantNo: memberNoMerchant,
          reservationDateStr: this.reservationDateStr
        })
        .then(res => {
          const { result, errorMessage, returnObject } = res.data;
          if (result) {
            let obj = {};
            let timeObj = {};
            for (let key in returnObject.doctorMap) {
              let arr = [];
              let obj2 = {};
              returnObject.doctorMap[key].forEach(item => {
                let obj1 = {};
                obj1["patientName"] = item["patientName"];
                obj1["reservationDate"] = item["reservationDate"];
                obj1["time"] = item["reservationDate"].split(":")[0].split(" ")[1];
                obj1["hourse"] = item["reservationDate"].split(":")[1];
                obj1["vistitingStatus"] = item["vistitingStatus"];
                obj1["reservationDateLen"] = item["reservationDateLen"];
                obj1["serviceChooses"] = item["serviceChooses"];
                obj2['timeKey_' + obj1["time"]] =  obj2['timeKey_' + obj1["time"]]? obj2['timeKey_' + obj1["time"]] + 1: 1;
                // if (obj1["time"] === "09") {
                //   obj2["timeKey_09"] = obj2["timeKey_09"]? obj2["timeKey_09"] + 1: 1;
                // }
                arr.push(obj1);
              });
              obj[key] = arr;
              timeObj[key] = obj2;
            }
            this.doctorMap = obj;
            this.timeObj = timeObj;
          } else {
            this.$message({
              type: "error",
              message: errorMessage
            });
          }
        });
    },

    // 点击确定
    handleModalConfirm(formData, callback) {
      const { keyName } = this.mutations;
      if (keyName === "register") {
        this.createBooking(formData, callback);
      }
      if (keyName === "CreateAndEditBooking") {
        this.createBooking(formData, callback);
      }
    },

    // 点击取消
    handleModalCancel() {
      this.ActionToggleModal({
        dialogFormVisible: false,
        BookingModalVisible: false
      });
      this.isLoadModal = false;
      this.BookingDetail = {
        patientType: "ORDINARY",
        visitingType: "NEWDIAGNOSIS"
      };
    },

    // tab切换
    handleClick(tab) {
      if(tab.name === 'first') {
         this.getBookingView()
      } else {
        this.initData({
          beginDate: moment().format("YYYY-MM-DD"),
          endDate: moment().format("YYYY-MM-DD")
        });
      }
    },
  },
  created() {},
  mounted() {
    this.initData({
      beginDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD")
    });
    this.getBookingView();
    $('.el-main').scroll(function(){
        //获取当前滚动条高度
        var topp = $(this).scrollTop();
        if(topp > 190){
          let tabWidth = $('.bookingViewRef').width()
          $('.stickyHeader').fadeIn()
          $('.stickyHeader').css({
             width: tabWidth,
             background: '#ffffff'
          })
        } else {
          $('.stickyHeader').hide()
        }
    })
  }
};
</script>
<style lang="less" scoped>
.stickyHeader{
  width: 100%;
  position: fixed;
  top:70px;
  right: 37px;
  display: none;
  z-index: 10
}
.indicateBox {
  .indicatorB,
  .indicatorC,
  .indicatorD {
    margin-right: 20px;
  }
}
.bookingViewBox {
  width: 100%;
  text-align: center;
  tr td {
    border: 1px solid #eeeeee;
  }
  tr td p {
    height: 50px;
    line-height: 50px;
  }
  .headerItem {
    height: 50px;
    color: #33bbc5;
    font-weight: bold;
    font-size: 18px;
  }
  .timeClass,
  .clockClass {
    width: 5%;
    min-width: 50px;
  }
  .viewBlock1,
  .viewBlock2,
  .viewBlock3 {
    display: block;
    // width:90%;
    // padding: 0 5%;
    color: #ffffff;
    float: left;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.4);
    border-top-left-radius: 30px;
    -moz-border-top-left-radius: 30px;
    -webkit-border-top-left-radius: 30px;
    border-bottom-right-radius: 30px;
    -moz-border-bottom-right-radius: 30px;
    -webkit-border-bottom-right-radius: 30px;
    cursor: pointer;
    position: relative;
    .reservedCon {
      width: 70%;
      text-align: center;
      height: 40px;
      position: absolute;
      top: 50%;
      left: 15%;
      margin-top: -20px;
      isplay: -webkit-box;      //必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
      text-overflow: ellipsis;  //可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .viewBlock1 {
    width: 100%;
    background: #409eff;
    // position: absolute;
    // left: 0;
  }
  .viewBlock2 {
    width: 100%;
    background: #e6a23c;
    // position: absolute;
    // left: 0;
  }
  .viewBlock3 {
    width: 100%;
    background: #67c23a;
    // position: absolute;
    // left: 0;
  }
}
</style>