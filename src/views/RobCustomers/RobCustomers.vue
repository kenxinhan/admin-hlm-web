<template>
  <div class="ChargeMoney">
    <div class>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="客户线索" name="first">
          <div class="searchForm">
            <div class="title">
              <i></i>
              <span>筛选查询</span>
            </div>
            <el-form class="clearfix">
              <div class="fSearch-f">
                <el-row :gutter="10" style="width:100%">
                  <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item size="small" label="预约项目：">
                        <el-input placeholder="预约项目" v-model="project"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item size="small" label="客户状态：">
                        <el-select
                          v-model="status"
                          placeholder="请选择"
                          @change="handleItemChange('status',status)"
                        >
                          <el-option label="全部状态" value></el-option>
                          <el-option label="冻结中" value="FREEZE"></el-option>
                          <el-option label="可抢" value="CANG"></el-option>
                          <el-option label="已被抢" value="HASG"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item size="small" label="地区：">
                        <el-input placeholder="地区" v-model="addr"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item size="small" label="客户类型: ">
                        <el-select
                          v-model="userType"
                          placeholder="请选择"
                          @change="handleItemChange('userType',userType)"
                        >
                          <el-option label="全部类型" value></el-option>
                          <el-option
                            v-for="(item,index) in userTypeData"
                            :key="index"
                            :label="item.lableName"
                            :value="item.code"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="4">
                    <div class="grid-content bg-purple-light">
                      <div class="btnSrarch">
                        <el-button size="small" type="primary" @click="searchForm()">查 询</el-button>
                        <el-button size="small" type="primary" @click="resetForm()">重 置</el-button>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
          <div class="listTitle">
            <i></i>
            <span>数据列表</span>
          </div>
          <el-table :data="cluelist" border class="mb10">
            <el-table-column prop="orderNo" label="客户编号" width></el-table-column>
            <el-table-column prop="name" label="客户姓名" width="100"></el-table-column>
            <el-table-column prop="phone" label="手机号" width></el-table-column>
            <el-table-column label="性别" width="50">
              <template slot-scope="scope">
                <span v-if="scope.row.sex == 'MALE'">男</span>
                <span v-if="scope.row.sex == 'FEMALE'">女</span>
                <span v-if="scope.row.sex == 'UNKNOWN'">未知</span>
              </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="50"></el-table-column>
            <el-table-column prop="project" label="预约项目" min-width></el-table-column>
            <el-table-column prop="addrInfo" label="所在地区" width></el-table-column>
            <el-table-column prop="userTypeName" label="客户类型" width></el-table-column>
            <el-table-column prop="reserveDate" label="预计到店时间" width="180"></el-table-column>
            <el-table-column label="客户状态" width>
              <template slot-scope="scope">
                <span v-if="scope.row.status == 'FREEZE'">冻结中</span>
                <span v-if="scope.row.status == 'CANG'">可抢</span>
                <span v-if="scope.row.status == 'HASG'">已被抢</span>
              </template>
            </el-table-column>
            <el-table-column prop="clinicName" :label="buyShop" width></el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 'CANG'">
                  <el-button size="mini" type="primary" @click="handleReceipt(scope.row)">接诊</el-button>
                </span>
                <!-- <el-button size="mini" type="success" v-if="scope.row.status === 'FREEZE'" @click="toShop(scope.row)">确认到店</el-button> -->
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
        <el-tab-pane label="已接诊客户" name="second">
          <div class="searchForm">
            <div class="title">
              <i></i>
              <span>筛选查询</span>
            </div>
            <el-form class="clearfix">
              <div class="fSearch-f">
                <el-row :gutter="10" style="width:100%">
                  <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item size="small" label="预约项目：">
                        <el-input placeholder="预约项目" v-model="project"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item  size="small" label="客户状态：">
                        <el-select
                          v-model="status"
                          placeholder="请选择"
                          @change="handleItemChange('status',status)"
                        >
                          <el-option label="全部状态" value></el-option>
                          <el-option label="冻结中" value="FREEZE"></el-option>
                          <el-option label="已使用" value="OK"></el-option>
                          <el-option label="已取消" value="CANCEL"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item  size="small" label="接诊类型：">
                        <el-select
                          v-model="type"
                          placeholder="请选择"
                          @change="handleItemChange('type',type)"
                        >
                          <el-option label="全部状态" value></el-option>
                          <el-option label="接诊" value="VISITING"></el-option>
                          <el-option label="派单" value="ORDER"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="4">
                    <div class="grid-content bg-purple-light">
                      <el-form-item size="small" label="地区：">
                        <el-input placeholder="地区" v-model="addr"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="4">
                    <div class="grid-content bg-purple-light">
                     <el-form-item size="small" label="客户类型;">
                        <el-select
                          v-model="userType"
                          placeholder="请选择"
                          @change="handleItemChange('userType',userType)"
                        >
                          <el-option label="全部类型" value></el-option>
                          <el-option
                            v-for="(item,index) in userTypeData"
                            :key="index"
                            :label="item.lableName"
                            :value="item.code"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="4">
                    <div class="grid-content bg-purple-light">
                      <div class="btnSrarch">
                        <el-button size="small" type="primary" @click="searchForm()">查 询</el-button>
                        <el-button size="small" type="primary" @click="resetForm()">重 置</el-button>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
          <!-- <div class="searchForm">
            <div class="title">
              <i></i>
              <span>筛选查询</span>
            </div>
            <el-form label-width="120px" class="clearfix">
              <div class="fSearch-2-2">
                <el-form-item size="small" label="预约项目：">
                  <el-input placeholder="预约项目" v-model="project"></el-input>
                </el-form-item>
              </div>
              <div class="fSearch-2-2">
                <el-form-item label="客户状态：">
                  <el-select
                    size="small"
                    v-model="status"
                    placeholder="请选择"
                    @change="handleItemChange('status',status)"
                  >
                    <el-option label="全部状态" value></el-option>
                    <el-option label="冻结中" value="FREEZE"></el-option>
                    <el-option label="已使用" value="OK"></el-option>
                    <el-option label="已取消" value="CANCEL"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="fSearch-2-2">
                <el-form-item label="接诊类型：">
                  <el-select
                    size="small"
                    v-model="type"
                    placeholder="请选择"
                    @change="handleItemChange('type',type)"
                  >
                    <el-option label="全部状态" value></el-option>
                    <el-option label="接诊" value="VISITING"></el-option>
                    <el-option label="派单" value="ORDER"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="fSearch-2-2">
                <el-form-item size="small" label="地区：">
                  <el-input placeholder="地区" v-model="addr"></el-input>
                </el-form-item>
              </div>
              <div class="fSearch-2-2">
                <el-form-item label="客户类型;">
                  <el-select
                    size="small"
                    v-model="userType"
                    placeholder="请选择"
                    @change="handleItemChange('userType',userType)"
                  >
                    <el-option label="全部类型" value></el-option>
                    <el-option
                      v-for="(item,index) in userTypeData"
                      :key="index"
                      :label="item.lableName"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="fSearch-1">
                <el-button size="small" type="primary" @click="searchForm()">查 询</el-button>
                <el-button size="small" type="primary" @click="resetForm()">重 置</el-button>
              </div>
            </el-form>
          </div> -->
          <div class="listTitle">
            <i></i>
            <span>数据列表</span>
          </div>
          <el-table :data="acceptlist" border class="mb10">
            <el-table-column prop="orderNo" label="客户编号" width></el-table-column>
            <el-table-column prop="name" label="客户姓名" width="100"></el-table-column>
            <el-table-column prop="phone" label="手机号" width></el-table-column>
            <el-table-column label="性别" width="50">
              <template slot-scope="scope">
                <span v-if="scope.row.sex == 'MALE'">男</span>
                <span v-if="scope.row.sex == 'FEMALE'">女</span>
                <span v-if="scope.row.sex == 'UNKNOWN'">未知</span>
              </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="50"></el-table-column>
            <el-table-column prop="project" label="预约项目" min-width></el-table-column>
            <el-table-column prop="addrInfo" label="所在地区" width></el-table-column>
            <el-table-column prop="userTypeName" label="客户类型" width></el-table-column>
            <el-table-column prop="orderType" label="接诊类型" width>
              <template slot-scope="scope">
                <span v-if="scope.row.orderType == 'VISITING'">接诊</span>
                <span v-if="scope.row.orderType == 'ORDER'">派单</span>
              </template>
            </el-table-column>
            <el-table-column prop="reserveDate" label="预计到店时间" width="180"></el-table-column>
            <el-table-column label="客户状态" width>
              <template slot-scope="scope">
                <span v-if="scope.row.status == 'FREEZE'">冻结中</span>
                <span v-if="scope.row.status == 'OK'">已使用</span>
                <span v-if="scope.row.status == 'CANCEL'">已取消</span>
              </template>
            </el-table-column>
            <el-table-column prop="clinicName" :label="buyShop" width></el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <!-- <span v-if="scope.row.status == 'CANG'">
          <el-button size="mini"  type="primary" @click="handleReceipt(scope.row)">接诊</el-button>
                </span>-->
                <el-button
                  size="mini"
                  type="success"
                  v-if="scope.row.status === 'FREEZE'"
                  @click="toShop(scope.row)"
                >确认到店</el-button>
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
      </el-tabs>
    </div>
    <el-dialog title="接诊提示" :visible.sync="showReceipt" width="30%" center>
      <div
        style="text-align:center;width:100%;height: 300px;display: flex;
            justify-content:center;
            align-items:Center;"
      >
        <div>
          <span v-if="!noServer">
            <span style="text-align:center">接诊后将扣除服务次数，同时为您新增患者。</span>
            <p style="margin-top:30px;">
              <span>选择抵扣服务：</span>
              <el-select size="small" v-model="serverName" placeholder="请选择">
                <el-option
                  v-for="item in serverlist"
                  :key="item.code"
                  :label="item.serverName"
                  :value="item.code"
                >
                  <span style="float: left">{{ item.serverName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.unuserNum }}</span>
                </el-option>
              </el-select>
            </p>
          </span>
          <span v-if="noServer">
            <span
              style="text-align:center;margin-bottom:30px;"
            >您没有服务次数可以抵扣，请先在服务介绍中购买服务。联系电话：4008-705-633</span>
          </span>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <span v-if="!noServer">
          <el-button @click="showReceipt = false">取 消</el-button>
          <el-button type="primary" @click="sureVisiting">确 定</el-button>
        </span>
        <span v-if="noServer">
          <el-button @click="showReceipt = false">确 定</el-button>
        </span>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import moment from "moment";
import storage from "@/tools/local_storage.js";
export default {
  data() {
    let that = this;
    return {
      userInfo: this.$cfg.userInfo || storage.get("userInfo"),
      cluelist: [],
      acceptlist: [],
      userType: "",
      daterange: [],
      currentPage: 1,
      total: 0,
      pageSize: 10,
      project: "",
      status: "",
      type: "",
      addr: "",
      userTypeData: [],
      activeName: "first",
      buyShop: "购买门诊",
      showReceipt: false,
      date: "",
      serverlist: [],
      serverName: "", //接诊的服务名称
      noServer: false //是否有服务
    };
  },
  mounted() {
    this.getUserType();
    const { activeName, date, type } = this.$route.query;
    if (activeName) {
      this.activeName = activeName;
      this.date = date;
      this.status = "";
      this.type = type;
      this.buyShop = "下单人";
      this._UpDateRecomClientNum(0);
      this.acceptedList();
    } else {
      this.cluesList();
    }
  },

  methods: {
    ...mapActions("appVuex", ["_UpDateRecomClientNum"]),
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.activeName == "first") {
        this.cluesList();
      } else {
        this.acceptedList();
      }
    },
    cluesList() {
      let params = {
        start: (this.currentPage - 1) * this.pageSize,
        limit: this.pageSize,
        project: this.project,
        status: this.status,
        addr: this.addr,
        userType: this.userType
      };
      this.$http.post("/api/hx/clue/list.do", params).then(res => {
        if (res.data.result == true) {
          const { rows, total } = res.data.returnObject;
          rows.forEach(
            item =>
              (item["reserveDate"] = moment(item["reserveDate"]).format(
                "YYYY-MM-DD"
              ))
          );
          this.cluelist = rows;
          this.total = total;
        }
      });
    },

    //已接诊客户列表
    acceptedList() {
      let params = {
        memberNoMerchant: this.userInfo.memberNoMerchant,
        start: (this.currentPage - 1) * this.pageSize,
        limit: this.pageSize,
        project: this.project,
        status: this.status,
        date: this.date ? this.date : "",
        type: this.type,
        addr: this.addr,
        userType: this.userType
      };
      this.$http.post("/api/hx/clue/acceptlist.do", params).then(res => {
        if (res.data.result == true) {
          let data = res.data.returnObject;
          this.acceptlist = data.rows;
          this.total = data.total;
        }
      });
    },

    //条件查询
    searchForm() {
      this.date = "";
      this.currentPage = 1
      if (this.activeName == "first") {
        this.cluesList();
      } else {
        this.acceptedList();
      }
    },

    resetForm() {
      this.currentPage = 1
      if (this.activeName == "first") {
        this.project = "";
        this.status = "";
        this.addr = "";
        this.userType = "";
        this.cluesList();
      } else {
        this.project = "";
        this.status = "";
        this.type = "";
        this.addr = "";
        this.date = "";
        this.userType = "";
        this.acceptedList();
      }
    },

    // select搜索
    handleItemChange(key, val) {
      this.currentPage = 1
      this[key] = val;
      console.log(key,val)
      if (this.activeName == "first") {
        this.cluesList();
      } else {
        this.acceptedList();
      }
    },

    handleClick(tab) {
      if (tab.name == "first") {
        this.status = "";
        this.buyShop = "购买门诊";
        this.cluesList();
      } else {
        this.status = "";
        this.buyShop = "下单人";
        this.acceptedList();
      }
    },

    handleDetails(index, row) {
      console.log(row);
      this.$cfg.set("clueMemberInfo", row);
      this.$router.push({
        path: `/RobCustomers/${row.code}`
      });
    },
    //获取客户类型
    getUserType() {
      let params = {
        shopNo: this.userInfo.shopNo,
        merchantNo: this.userInfo.memberNoMerchant,
        lableNo: "user_type",
        parentCode: ""
      };
      this.$http.post("/api/hx/configList.do", params).then(res => {
        if (res.data.result == true) {
          this.userTypeData = res.data.returnObject;
        }
      });
    },
    // 接诊
    handleReceipt(scope) {
      this.showReceipt = true;
      this.clueCode = scope.code;
      this.shopserverlist(scope.userType);
    },
    //获取店铺服务列表
    shopserverlist(userType) {
      let params = {
        userType: userType,
        memberNoMerchant: this.userInfo.memberNoMerchant
      };
      this.$http.post("/api/hx/clue/shopserverlist.do", params).then(res => {
        // console.log(res)
        const { result, errorMessage, returnObject } = res.data;
        if (result == true) {
          if (returnObject.length > 0) {
            this.serverlist = returnObject;
            this.noServer = false;
          } else {
            this.noServer = true;
          }
        } else {
          this.$message(errorMessage);
        }
      });
    },
    //确认接诊
    sureVisiting() {
      if (this.serverName == "") {
        this.$message("请选择抵扣服务");
        return false;
      }
      let params = {
        memberNameMerchant: this.userInfo.memberNameMerchant,
        memberNoMerchant: this.userInfo.memberNoMerchant,
        clueCode: this.clueCode,
        serverCode: this.serverName
      };

      this.$http.post("/api/hx/clue/visiting.do", params).then(res => {
        console.log(res);
        if (res.data.result == true && res.data.returnObject == "success") {
          this.$message({
            type: "success",
            message: "接诊成功"
          });
          this.showReceipt = false;
          this.cluesList();
        }
      });
    },

    //确认到店
    toShop(row) {
      let params = {
        memberNoGuid: this.userInfo.memberNoGuid,
        memberNoMerchant: this.userInfo.memberNoMerchant,
        clueCode: row.code
      };

      this.$http.post("/api/hx/clue/toshop.do", params).then(res => {
        //console.log(res)
        if (res.data.result == true && res.data.returnObject == "success") {
          this.$message({
            type: "success",
            message: "到店成功"
          });
          this.acceptedList();
        } else {
          this.$message({
            type: "error",
            message: res.data.errorMessage
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
.btnSrarch {
  padding-top: 2px;
  margin-left: 10px;
}
</style>
