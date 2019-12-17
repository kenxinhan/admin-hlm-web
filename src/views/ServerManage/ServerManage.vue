<template>
  <div class="ChargeMoney">
    <div class>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的服务" name="first">
          <div class="searchForm">
            <div class="title">
              <i></i>
              <span>筛选查询</span>
            </div>
            <el-form label-width="120px" class="clearfix">
              <div class="fSearch-2-2">
                <el-form-item size="small" label="服务名称：">
                  <el-input placeholder="请输入服务名称" v-model="serverName"></el-input>
                </el-form-item>
              </div>

              <div class="fSearch-1">
                <el-button size="small" type="primary" @click="cluesList()">查 询</el-button>
              </div>
            </el-form>
          </div>
          <div class="listTitle">
            <i></i>
            <span>数据列表</span>
          </div>
          <el-table :data="list" border style="width: 100%; margin-top: 20px">
            <el-table-column prop="serverName" label="服务名称" width="120"></el-table-column>
            <el-table-column prop="price" label="价格" width="120">
              <template slot-scope="scope">
                <span>{{(scope.row.price)/100}}元</span>
              </template>
            </el-table-column>
            <el-table-column label="服务类型" prop="serverDetails">
                <template slot-scope="scope">
                  <span v-for="item in scope.row.serverDetails" :key="item.userType">
                    <br>
                    <span v-if="item.userType == 1">精准线索<br><br></span>
                    <span v-if="item.userType == 2">精准到店<br><br></span>
                    <span v-if="item.userType == 3">普通线索<br><br></span>
                    <span v-if="item.userType == 4">普通到店<br><br></span>
                  </span>
                </template>
            </el-table-column>
            <el-table-column prop="ss" label="总数">
               <template slot-scope="scope">
                  <span v-for="item in scope.row.serverDetails" :key="item.userType">
                    <br>
                    <span>{{item.serverNum}}<br><br></span>
                  </span>
                </template>
            </el-table-column>
            <el-table-column prop="dd" label="可用次数">
              <template slot-scope="scope">
                  <span v-for="item in scope.row.serverDetails" :key="item.userType">
                    <br>
                    <span>{{item.unuseNum}}<br><br></span>
                  </span>
                </template>
            </el-table-column>
            <el-table-column prop="ee" label="冻结次数">
              <template slot-scope="scope">
                  <span v-for="item in scope.row.serverDetails" :key="item.userType">
                    <br>
                    <span>{{item.freezeNum}}<br><br></span>
                  </span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="amount1">
              <template slot-scope="scope">
                <el-table :data="scope.row.serverDetails">
                  <el-table-column prop="userType" label="服务类型">
                    <template slot-scope="scope">
                      <span v-if="scope.row.userType == 1">精准线索</span>
                      <span v-if="scope.row.userType == 2">精准到店</span>
                      <span v-if="scope.row.userType == 3">普通线索</span>
                      <span v-if="scope.row.userType == 4">普通到店</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="serverNum" label="总数"></el-table-column>
                  <el-table-column prop="unuseNum" label="可用次数"></el-table-column>
                  <el-table-column prop="freezeNum" label="冻结次数"></el-table-column>
                </el-table>
              </template>
            </el-table-column> -->

            <el-table-column prop="createDate" label="购买日期" width="180"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleDetails(scope.$index, scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            background
            layout="total, prev, pager, next"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <div class="scrollKey" style="display:none"></div>
        <el-tab-pane label="服务介绍" name="second">
          <div v-if="step == 1">
            <el-row :gutter="12">
              <el-col
                :xs="24"
                :sm="12"
                :md="12"
                :lg="12"
                :xl="12"
                v-for="(item, index) in systemServerList"
                :key="index"
                style="margin-bottom: 12px;"
              >
                <el-card shadow="hover">
                  <div slot="header" class="clearfix">
                    <span>产品名称：{{item.serverName}}</span>
                  </div>
                  <div class="text item">
                    <div class="serverListBox">
                      <p class="price">价格：{{(item.price)/100}}元</p>
                      <p>产品说明：</p>
                      <p class="proInfo">
                        <span v-html="item.ctx"></span>
                        <br>
                        <br>
                        <br>
                        <span v-for="item in item.serverDetails" :key="item.code">
                          {{item.serverNum}}个
                          <span
                            v-for="subitem in user_type"
                            :key="subitem.userType"
                          >{{ subitem.code === item.userType ? subitem['lableName'] : ''}}</span> {{item.serverDesc ? ':': ''}}
                          {{item.serverDesc}}
                          <br>
                          <br>
                        </span>
                      </p>
                      <p>
                        <el-button size="large" @click="hurryBuy(item)" type="success">立即购买</el-button>
                      </p>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="serviceTotal"
              @current-change="handleServiceCurrentChange"
            ></el-pagination>
          </div>
          <div v-if="step == 2" class="tepBox2" style="margin-top:100px;">
            <el-row :gutter="12">
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <p>
                  <el-radio v-model="form.payType" label="WX">微信扫码支付</el-radio>
                </p>
                <img :src="userInfo.uploadUrl + payaccount.wxPayPic" alt>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <p>
                  <el-radio v-model="form.payType" label="ALI">支付宝扫码支付</el-radio>
                </p>
                <img :src="userInfo.uploadUrl + payaccount.aliPayPic" alt>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <p style="text-align:left">
                  <el-radio v-model="form.payType" label="BANK">银行转账</el-radio>
                </p>
                <p style="text-align:left">开户行：{{payaccount.bankName}}</p>
                <p style="text-align:left">开户账号：{{payaccount.bankAcctNo}}</p>
                <p style="text-align:left">电话：{{payaccount.payPhone}}</p>
              </el-col>
            </el-row>
            <br>
            <br>
            <br>
            <el-row :gutter="12">
              <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <p>扫码支付完成,请点击下一步!</p>
                <br>
                <br>
                <el-button size="large" type="success" @click="step=1">上一步</el-button>
                <el-button size="large" type="success" @click="nextStep()">下一步</el-button>
              </el-col>
            </el-row>
          </div>
          <div v-if="step == 3">
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              label-width="120px"
              label-position="left"
              style
            >
              <el-form-item label="支付方式：" prop="payType">
                <el-radio v-model="form.payType" label="WX">微信</el-radio>
                <el-radio v-model="form.payType" label="ALI">支付宝</el-radio>
                <el-radio v-model="form.payType" label="BANK">银行卡转账</el-radio>
              </el-form-item>
              <el-form-item label="支付流水：">
                <el-input v-model="form.runingWater" placeholder="请输入流水号" style="width:80%;"></el-input>
              </el-form-item>
              <el-form-item label="购买服务：" prop="serverType">
                <el-input v-model="form.serverType" disabled style="width:80%;"></el-input>
              </el-form-item>
              <el-form-item label="支付金额："  prop="payCount">
                <el-input v-model="form.payCount" placeholder="请输入支付金额" style="width:80%;" 
                @input="limitMoney_input"
                @keyup="inpnumup">
                   <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <el-form-item label="支付时间：">
                <el-date-picker
                  v-model="form.payTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="选择日期时间"
                  style="width:80%;"
                  :picker-options="minExecuteTime"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="上传凭证：" prop="sharePic">
                <MoreImgUpload
                  v-model="form.sharePic"
                  :limitNumber="limitNumber"
                  :file-list="fileList"
                />
                <p style="color:red;">最多上传5张凭证</p>
              </el-form-item>

              <div style="margin-top:60px;">
                <el-form-item align="left">
                  <el-button type="success" @click="step = 2">返回</el-button>
                  <el-button type="success" @click="saveSubmit('form')">保存</el-button>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog title="服务详情" :visible.sync="showReceipt" width="30%">
      <span v-if="serverDetail">
        <p>产品名称：{{serverDetail.serverName}}</p>
        <p>价格：{{(serverDetail.price)/100}}</p>
        <span v-html="serverDetail.ctx"></span>
        <br>
        <br>
        <br>
        <span v-for="item in serverDetail.serverDetails" :key="item.code">
          {{item.serverNum}}个
          <span
            v-for="subitem in user_type"
            :key="subitem.userType"
          >{{ subitem.code === item.userType ? subitem['lableName'] : ''}}</span> {{ item.serverDesc ? ':' : ''}}
          {{item.serverDesc}}
          <br>
          <br>
        </span>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showReceipt = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import storage from '@/tools/local_storage.js'
import MoreImgUpload from "@/components/Core/MoreImgUpload";
import { _mmScrollTo } from "@/utils/mm.js";

export default {
  components: {
    MoreImgUpload
  },
  data() {
    let that = this;
    var cheackSharePic = (rule, value, callback) => {
      if( this.fileList.length > 0 ) {
        callback();
      } else {
        callback(new Error('请上传购买凭证'));
      }
    };
    return {
      userInfo: storage.get('userInfo'),
      uploadUrl:  storage.get('userInfo').uploadUrl,
      list: [],
      userType: "",
      daterange: [],
      currentPage: 1,
      total: 0,
      pageSize: 10,
      activeName: "first",
      showReceipt: false,
      serverlist: [],
      serverName: "", //接诊的服务名称
      serverDetail: {}, //服务详情
      systemServerList: [], //系统服务列表
      step: 1,
      payaccount: {}, //支付信息
      serveCode: "",
      serviceCurrentPage: 1,
      serviceTotal: 0,
      servicePageSize: 10,
      //
      form: {
        payType: "WX",
        runingWater: "",
        serverType: "",
        payCount: "",
        payTime: "",
        sharePic: ""
      },
      rules: {
        payType: [
          { required: true, message: "请选择支付方式", trigger: "change" }
        ],
        payCount: [
          { required: true, message: "请输入支付金额", trigger: "blur" }
        ],
        serverType: [
          { required: true, message: "请选择购买服务", trigger: "change" }
        ],
        sharePic: [
          { required: true, validator: cheackSharePic, trigger: "change" }
        ]
      },
      limitNumber: 5,
      fileList: [],
      minExecuteTime: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  computed: {
    ...mapState({
      user_type: state => state["appVuex"]["user_type"]
    })
  },
  mounted() {
    this.cluesList();
    console.log(this.userInfo);
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.cluesList();
    },

    handleServiceCurrentChange(val) {
      this.serviceCurrentPage = val;
      this.acceptedList();
    },

    //获取我的服务列表
    cluesList() {
      let params = {
        start: (this.currentPage - 1) * this.pageSize,
        limit: this.pageSize,
        merchantNo: this.userInfo.memberNoMerchant,
        shopNo: "",
        serverName: this.serverName
      };
      this.$http.post("/api/hx/shopserver/list.do", params).then(res => {
        if (res.data.result == true) {
          let data = res.data.returnObject;
          this.total = parseInt(data.total);
          this.list = data.rows;
        }
      });
    },

    //查看服务详情
    handleDetails(index, row) {
      this.showReceipt = true;
      let params = {
        serverCode: row.serverCode
      };
      this.$http.post("/api/hx/server/detail.do", params).then(res => {
        if (res.data.result == true) {
          this.serverDetail = res.data.returnObject;
          //console.log(this.serverDetail)
        }
      });
    },

    //系统服务列表
    acceptedList() {
      let params = {
        start: (this.serviceCurrentPage - 1) * this.servicePageSize,
        limit: this.servicePageSize
      };
      this.$http.post("/api/hx/server/list.do", params).then(res => {
        if (res.data.result == true) {
          const { rows, total } = res.data.returnObject;
          this.systemServerList = rows;
          this.serviceTotal = parseInt(total);
        }
      });
    },

    //立即购买
    hurryBuy(item) {
      this.form.serverType = item.serverName;
      this.form.payCount = item.price / 100;
      this.serveCode = item.code;
      this.step = 2;

      this.$http.post("/api/hx/server/payaccount.do").then(res => {
        if (res.data.result == true) {
          this.payaccount = res.data.returnObject;
        }
      });
    },
    //下一步  去填写购买凭证
    nextStep() {
      this.step = 3;
    },
    //上传凭证
    saveSubmit(formName) {
      this.$refs[formName].validate(valid => {
        //金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
        if (valid) {
          let params = {
            shopNo: "",
            merchantNo: this.userInfo.memberNoMerchant,
            payType: this.form.payType,
            amount: this.form.payCount * 100,
            serialNum: this.form.runingWater,
            payCert: this.fileList.join(","),
            memberNoGuid: this.userInfo.memberNoGuid,
            serveCode: this.serveCode,
            payTimeStr: this.form.payTime
          };

          this.$http.post("/api/hx/server/buy.do", params).then(res => {
            if (res.data.result == true) {
              this.$message({
                type: "success",
                message: "提交成功，请等待管理员审核",
                duration: 2000
              });
              this.$refs[formName].resetFields();
              this.step = 1;
              this.activeName = "first";

              this.$router.push({
                path: '/OrderManage'
              })
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      
    },

    // 监听红包输入的值
    limitMoney_input () {
      var regStrs = [
        ['[^\\d\\.]+$', ''], // 禁止录入任何非数字和点
        ['\\.(\\d?)\\.+', '.$1'], // 禁止录入两个以上的点
        ['^(\\d+\\.\\d{2}).+', '$1'] // 禁止录入小数点后两位以上
      ]
      for (var i = 0; i < regStrs.length; i++) {
        var reg = new RegExp(regStrs[i][0])
        this.form.payCount = this.form.payCount.replace(reg, regStrs[i][1])
      }
    },
    inpnumup (e) {
      e.target.value = e.target.value.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
      e.target.value = e.target.value.replace(/^\./g, '') // 验证第一个字符是数字而不是
      e.target.value = e.target.value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
      e.target.value = e.target.value
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
    },

    handleClick(tab) {
      if (tab.name == "first") {
        this.cluesList();
      } else {
        this.step = 1;
        this.acceptedList();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.serverListBox {
  .price {
    font-size: 16px;
  }
  p {
    margin-top: 15px;
  }
  .proInfo {
    height: 300px;
    overflow-y: auto;
  }
  span {
    line-height: 1.8;
  }
}
.tepBox2 {
  max-width: 1200px;
  margin-left: 50px;
  text-align: center;
  .tps {
    text-align: left;
  }
  p {
    .el-radio__label {
      font-size: 18px;
    }
    font-size: 18px;
    margin-bottom: 10px;
    button {
      margin-right: 10px;
    }
  }
  img {
    width: 200px;
    height: 200px;
  }
}
.te-cen {
  text-align: center;
  img {
    width: 200px;
    height: 200px;
    text-align: center;
    margin-top: 30px;
  }
}
.footerBtn {
  width: 80%;
  margin: 0 auto;
  margin-top: 300px;
  display: flex;
  justify-content: space-between;

  & > span {
    display: inline-block;
  }
}
</style>
