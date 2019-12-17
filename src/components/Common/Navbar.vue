<template>
  <div class="nav">
    <div class="logo">
      <img src="../../assets/img/logo.png">
      <!-- <h2>好乐美</h2> -->
      <div class="vueBox">
        <div class="marquee">
            <div class="marquee_box">
                <ul class="marquee_list" :style="{ top: -num + 'px'}" :class="{marquee_top:num}">
                    <li v-for="(item, index) in marqueeList" :key="index" >
                        <span>{{item.userTypeName}}客户{{item.name}}已被{{item.clinicName}}接诊</span>
                    </li>
                </ul>
            </div>
        </div>
   </div>
    </div>
    <ul class="nav_right">
      <li>
        <el-button size="mini" icon="el-icon-plus" type="primary" @click="handleAddPatient">新增患者</el-button>
      </li>
      <li>
        <el-badge :value="this.appVuex.imMsgNum > 0 ? this.appVuex.imMsgNum : ''" class="item">
          <el-button size="mini" type="success" @click="handleRedirectIm">
            <i class="iconfont icon-chat"></i>微信
          </el-button>
        </el-badge>
      </li>
      <li>
        <el-badge class="item" :value="this.appVuex.recomClientNum > 0 ? this.appVuex.recomClientNum : ''">
          <el-button size="mini" type="warning" @click="handleRedirectRecomClient">
            <i class="iconfont icon-kehu"></i>推荐客户
          </el-button>
        </el-badge>
      </li>
       <li>
          <el-button size="mini" @click="handleRedirectOms">
            进入后台
          </el-button>
      </li>
      <li>
        <el-dropdown>
          <span class="el-dropdown-link">
            <span class="avatar">
              <img :src="userInfo.headAddress" />
            </span>
            {{ userInfo.memberNameGuid }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
             <el-dropdown-item @click.native="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>
<script>
import moment from 'moment'
import storage from '@/tools/local_storage.js'
import { mapState,mapGetters } from "vuex";

export default {
  data(){
    return {
      userInfo: {},
      num:0,
      marqueeList: []
    }
  },
  mounted() {
    this.updateUserInfo();
  },
  created(){
  },
  computed: {
   ...mapState({
      appVuex: state => state["appVuex"],
    })
  },
  methods: {
    handleAddPatient() {
      this.$router.push({
        path: "/AddPatient"
      });
    },
    handleRedirectOms() {
       const { memberNoGuid } = storage.get("userInfo")
       this.$http.post('/api/hx/oms/login.do',{
          memberNoGuid,
          url: ''
       }).then(res=>{
         const { result , errorMessage, returnObject} = res.data
         if( result ) {
            window.location.href = returnObject
         } else {
           this.$message.error(errorMessage)
         }
       })
    },
    showMarquee:function (num) {
      this.marqueeList.push(this.marqueeList[0]);
      var max = this.marqueeList.length;
      var that = this;
      var marqueetimer =  setInterval(function(){
          num++;
          if(num>=max ){
              num=0;
          }
          that.num=num*30;
      }, 2000);
    },
    handleRedirectIm(){
      const { memberNoGuid } = storage.get("userInfo")
      this.$http.post('/api/hx/oms/login.do',{
        memberNoGuid,
        url: this.appVuex.menulist.find( item=> item.permission === 'ImList')['href']
      }).then(res=>{
        const { result , errorMessage, returnObject } = res.data
        if( result ){
          window.open(returnObject)
        } else {
          this.$message({
              type:'error',
              message: errorMessage
          })
        }
      })
    },
    handleRedirectRecomClient() {
       this.$router.push({
         path: '/RobCustomers',
         query: {
           activeName: 'second',
           type: 'ORDER',
           date: moment().format('YYYY-MM-DD')
         }
       })
    },
    handleLogout() {
      const token = this.$route.query.token || storage.get("accessToken")
      this.$http.post('/api/logout.do',{
        token
      }).then(res=>{
         storage.del("accessToken")
         storage.del('userInfo')
         this.$router.push({
           path: '/login'
         })
      })
    }
  },
  mounted() {
    this.userInfo = this.$cfg.userInfo || storage.get("userInfo")
    this.$http.post('/api/hx/clue/broadcast.do').then(res=>{
         const { result , errorMessage, returnObject } = res.data
        if(result){
           this.marqueeList = returnObject
           this.showMarquee(this.num)
        } else {
          this.$message({
              type:'error',
              message: errorMessage
          })
        }
    })
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/css/base";
.nav {
  height: 70px;
  background: rgb(84, 92, 100);
}
.logo {
  float: left;
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 25px;
  height: 70px;
}
.logo img {
  width: 150px;
  // height: 33px;
  margin-right: 12px;
}
.logo h2 {
  font-size: 18px;
  color: #fff;
  font-weight: bold;
}
.nav_right {
  float: right;
  padding-right: 10px;
}
.nav_right li {
  display: flex;
  float: left;
  padding: 0 10px;
  align-items: center;
  height: 70px;
  .iconfont {
    font-size: 12px;
  }
}
.user_info {
  display: flex;
  align-items: center;
  color: #fff;
}
.user_info img {
  width: 25px;
  height: 25px;
  margin-right: 6px;
}
.el-dropdown-link{
  color: #ffffff;
  line-height: 30px;
  display: inline-block;
  cursor: pointer;
  .avatar{
  width:30px;
  height:30px;
  display: inline-block;
  border-radius: 100px;
  overflow: hidden;
  background: #ffffff;
  float: left;
  margin: 0 10px 0 20px;
  img{
    width:100%;
  }
}
}

.marquee{
    width: 300px;
    height: 70px;
    align-items: center;
    display: flex;
    box-sizing: border-box;
    margin-left: 100px;
}
.marquee_title{
    padding: 0 20px;
    height: 30px;/*关键样式*/
    font-size: 14px;
    align-items: center;
}

.marquee_box{
    display: block;
    position: relative;
    width: 100%;
    height: 30px;/*关键样式*/
    overflow: hidden;
}
.marquee_list{
    width: 100%;
    display: block;
    position: absolute;
    top:0;
    left: 0;
}
.marquee_top{transition: top 0.5s ;}/*关键样式*/
.marquee_list li{
    height: 30px;/*关键样式*/
    line-height: 30px;/*关键样式*/
    font-size: 14px;
    padding-left: 20px;
    color: #ffffff;
}
.marquee_list li span{
    padding:0 2px;
}

</style>
