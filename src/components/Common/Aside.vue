<template>
  <el-menu
    router
    :default-active="this.handleDefaultActive()"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/" v-if="this.appVuex.menulist.find( item=> item.permission === 'WorkToday')">
      <i class="el-icon-date"></i><span>今日工作</span>
    </el-menu-item>
    <el-menu-item index="/PatientManage" v-if="this.appVuex.menulist.find( item=> item.permission === 'Patient')">
       <i class="el-icon-first-aid-kit"></i><span>患者管理</span></el-menu-item>
    <el-submenu index="/Content/ArticleAdd">
      <template slot="title">
        <i class="el-icon-time"></i><span>预约排班</span>
      </template>
      <el-menu-item index="/BookingManage" v-if="this.appVuex.menulist.find( item=> item.permission === 'ReservationAndSchedule')">预约管理</el-menu-item>
      <el-menu-item index="/ClassManage">排班管理</el-menu-item>
    </el-submenu>
    <el-badge :value="this.appVuex.imMsgNum > 0 ? this.appVuex.imMsgNum : ''" class="item" v-if="this.appVuex.menulist.find( item=> item.permission === 'ImList')">
      <el-menu-item @click="handleRedirectIm">
       <i class="el-icon-chat-dot-round"></i><span>IM</span>
      </el-menu-item>
    </el-badge>
    <el-menu-item index="/RobCustomers" v-if="this.appVuex.menulist.find( item=> item.permission === 'Clue')">
      <i class="el-icon-user"></i><span>抢客户</span>
    </el-menu-item>
    <el-menu-item index="/ServerManage" v-if="this.appVuex.menulist.find( item=> item.permission === 'ShopServer')">
      <i class="el-icon-service"></i><span>服务管理</span>
      </el-menu-item>
    <el-menu-item index="/OrderManage" v-if="this.appVuex.menulist.find( item=> item.permission === 'ShopOrder')">
       <i class="el-icon-tickets"></i><span>订单管理</span>
    </el-menu-item>
    <el-submenu index="/Financial/Statement">
      <template slot="title">
        <i class="el-icon-time"></i><span>财务报表</span>
      </template>
      <el-menu-item index="/ChargeReport" v-if="this.appVuex.menulist.find( item=> item.permission === 'BillSt')">收费报表</el-menu-item>
    </el-submenu>
    <el-submenu index="/HlmSysConfig">
      <template slot="title">
        <i class="el-icon-time"></i><span>系统配置</span>
      </template>
      <el-menu-item index="/SystemSetting" v-if="this.appVuex.menulist.find( item=> item.permission === 'BillSt')">收费配置</el-menu-item>
      <el-menu-item index="/MedicalSetting" v-if="this.appVuex.menulist.find( item=> item.permission === 'Medical')">病例配置</el-menu-item>
      <el-menu-item index="/OrtRecordsSetting" v-if="this.appVuex.menulist.find( item=> item.permission === 'Orthodontics')">正畸配置</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
import { mapState, mapActions } from "vuex";
import storage from '@/tools/local_storage.js'

export default {
  data() {
    return {
      navList:[
        {name:'/',navItem:'发现项目1',
          second:[
            {name:'/',navItem:'社区动态1'},
            {name:'/BookingManage',navItem:'社区动态2'},
            {name:'/',navItem:'社区动态3'},
            {name:'/RobCustomers',navItem:'社区动态4'},
          ]
        },
        {name:'/ServerManage',navItem:'发现项目2',
          second:[
            {name:'/ServerManage',navItem:'社区动态1'},
            {name:'/ServerManage',navItem:'社区动态2'},

          ]
        },
        {name:'/OrderManage',navItem:'发现项目3'},
        {name:'/OrderManage',navItem:'发现项目4'},
     ]

    }
  },
  computed:{
    ...mapState({
      appVuex: state => state["appVuex"],
    })
  },
  mounted() {
  },
  methods: {
    handleRedirectIm(){
      const { memberNoGuid } = storage.get("userInfo")
      this.$http.post('/api/hx/oms/login.do',{
        memberNoGuid,
        url: this.appVuex.menulist.find( item=> item.permission === 'ImList')['href']
      }).then(res=>{
        const { result , errorMessage, returnObject } = res.data
        if( result ){
          const tempPage = window.open('', '_blank')
          tempPage.location = returnObject
        } else {
          this.$message({
              type:'error',
              message: errorMessage
          })
        }
      })
    },

    handleDefaultActive() {
       const pathChildren = [
         {
           name: '/PatientDetail',
           parName: '/PatientManage'
         }
       ]

       const pathObj = pathChildren.find(item=> item.name === this.$route.name)

       if(pathObj) {
        return pathObj.parName
       } else {
        return this.$route.path
       }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
