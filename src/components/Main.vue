<template>
<el-container class="main">
  <el-header style="height:auto;">
    <Navbar/>
  </el-header>
  <el-container>
    <el-aside width="202px">
      <Aside/>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import storage from '@/tools/local_storage.js'
  import Navbar from "./Common/Navbar"
  import Aside from "./Common/Aside"
  export default {
    components:{
      Navbar,
      Aside
    },
    methods:{
    ...mapActions('appVuex',['_GetRolesList','_GetConfigList','_GetRoleMenuList','_GetImMsgNum','_GetRecomClientNum']),
    getRolesList(shopNo,merchantNo) {
      this._GetRolesList({
        shopNo,
        merchantNo,
        roleEnname: 'SYS_SHOP_DOCTOR'
      })
      this._GetRolesList({
        shopNo,
        merchantNo,
        roleEnname: 'SYS_SHOP_ADVISORY'
      })
      this._GetRolesList({
        shopNo,
        merchantNo,
        roleEnname: 'SYS_SHOP_NURSE'
      })
    },

    getConfigList(shopNo,merchantNo) {
      this._GetConfigList({
        shopNo,
        merchantNo,
        lableNo: 'user_type'
      })
      this._GetConfigList({
        shopNo,
        merchantNo,
        lableNo: 'user_source'
      })
      this._GetConfigList({
        shopNo,
        merchantNo,
        lableNo: 'patient_project'
      })
    },
    getImMsgNum(memberNoMerchant, memberNoGuid) {
        this._GetImMsgNum({
          merchantNo: memberNoMerchant,
          memberNoGuid: memberNoGuid
        })
        this._GetRecomClientNum({
          memberNoMerchant
        })
        // setInterval(()=>{
        //    this._GetImMsgNum({
        //      merchantNo: memberNoMerchant,
        //      memberNoGuid: memberNoGuid
        //    })
        // },60000)
    }
  },
    created(){
    },
    mounted(){
      const userInfo = storage.get('userInfo')
      const token = this.$route.query.token
      if( userInfo && !token) {
        const { shopNo, memberNoMerchant , memberNoGuid } = userInfo
        this.getRolesList(shopNo, memberNoMerchant)
        this.getConfigList(shopNo, memberNoMerchant)
        this._GetRoleMenuList({memberNoGuid})
        this.getImMsgNum(memberNoMerchant, memberNoGuid)
      }
    }
  }
</script>

<style lang="less" scoped>
.el-header{padding:0;}
aside{
  background: rgb(84, 92, 100);
  border-top:1px solid #d1d1d1;
  }
</style>
