<template>
  <div>
    <p v-if="isAuotLogon">自动登录中...</p>
    <div class="loginBox" v-if="!isAuotLogon">
      <div class="middleConBox">
        <div class="conWidthBox">
            <div class="lfCon pull-left"><img src="../../assets/img/logo.png" /></div>
            <div class="rgCon pull-right">
              <div class="formBox">
                <h2>账号登录</h2>
                <label class="loginname">
                    <input type="text" v-model="loginName" placeholder="请输入账号" @keyup.enter="handleLogin">
                </label>
                <label class="password">
                    <input type="password" v-model="pwd" placeholder="请输入密码" @keyup.enter="handleLogin">
                </label>
                <label class="code">
                    <input type="text" v-model="captcha" placeholder="请输入验证码" @keyup.enter="handleLogin"><img :src="imgCode" @click="updateImgCode"/>
                </label>
                <label class="remberPwd" @click="handleRemberPwd">
                    <img :src="!isRemberPwd ? require('../../assets/img/remberPwdCheck.png') : require('../../assets/img/remberPwdChecked.png') " />记住密码
                </label>
                <img src="../../assets/img/loginBtn.png" class="loginBtn" @click="handleLogin"/>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import md5 from 'md5'
import local_storage from '@/tools/local_storage.js'
import { setInterval } from 'timers';
export default {
  components:{},
  props:{},
  data(){
    return {
      isAuotLogon: false,
      imgCode: '/api/servlet/validateCodeServlet?' + new Date(),
      loginName:  local_storage.get('remberAccont')? local_storage.get('remberAccont').loginName: '',
      pwd:  local_storage.get('remberAccont')? local_storage.get('remberAccont').pwd: '',
      captcha: '',
      isRemberPwd: false
    }
  },
  watch:{},
  computed:{},
  methods:{
    ...mapActions('appVuex',['_GetRolesList','_GetConfigList','_GetRoleMenuList','_GetImMsgNum','_GetRecomClientNum']),

    // 自动登录
    autoLogin() {
        var token = this.$route.query.token || local_storage.get("accessToken")
        this.$cfg.set('token',token)
        this.$http.post('/api/hx/tokenLogin.do',{
          token
        }).then(res=>{
           if(res.data.result){
             this.loginSuccessOper(res,token)
             this.$message({
               type:'success',
               message: '自动登录成功！'
             })
           } else {
             this.$message({
               type:'error',
               message: res.data.errorMessage
             })
           }
        })
    },

    // 手动登录
    handleLogin() {
       const {loginName,pwd,captcha} = this
       if( loginName === ''){
           this.$message.error('请输入账号');
           return
       }
       if( pwd === ''){
           this.$message.error('请输入密码');
           return
       }
       if( captcha === ''){
           this.$message.error('请输入验证码');
           return
       }

       this.$http.post('/api/hx/login.do',{
         loginName,
         pwd: md5(pwd),
         captcha
       }).then(res=>{
         const { result, errorMessage, returnObject} = res.data
         this.updateImgCode()
         if(result){
            this.loginSuccessOper(res)
            if( this.isRemberPwd ) {
              local_storage.put('remberAccont',{
                loginName,
                pwd
              })
            } else {
              local_storage.del('remberAccont')
            }
            this.$message({
               type:'success',
               message: '登录成功！'
             })
         } else {
           this.$message.error(errorMessage);
         }
       })
    },

    // 记住密码
    handleRemberPwd() {
       if( this.isRemberPwd ){
         this.isRemberPwd = false
       } else {
         this.isRemberPwd = true
       }
    },

    // 更新图片验证码
    updateImgCode() {
      this.imgCode = '/api/servlet/validateCodeServlet?' + new Date()
    },

    // 登录成功的操作
    loginSuccessOper(res,token) {
        const { shopNo, memberNoMerchant, memberNoGuid } = res.data.returnObject
        this.$cfg.set('userInfo',res.data.returnObject)
        local_storage.put('accessToken', token)
        local_storage.put('userInfo', res.data.returnObject)
        this.$router.push({ path: '/'})
        // this.getRolesList(shopNo, memberNoMerchant)
        // this.getConfigList(shopNo, memberNoMerchant)
        // this._GetRoleMenuList({memberNoGuid})
        // this.getImMsgNum(memberNoMerchant, memberNoGuid)
    },

    // getRolesList(shopNo,merchantNo) {
    //   this._GetRolesList({
    //     shopNo,
    //     merchantNo,
    //     roleEnname: 'SYS_SHOP_DOCTOR'
    //   })
    //   this._GetRolesList({
    //     shopNo,
    //     merchantNo,
    //     roleEnname: 'SYS_SHOP_ADVISORY'
    //   })
    //   this._GetRolesList({
    //     shopNo,
    //     merchantNo,
    //     roleEnname: 'SYS_SHOP_NURSE'
    //   })
    // },

    // getConfigList(shopNo,merchantNo) {
    //   this._GetConfigList({
    //     shopNo,
    //     merchantNo,
    //     lableNo: 'user_type'
    //   })
    //   this._GetConfigList({
    //     shopNo,
    //     merchantNo,
    //     lableNo: 'user_source'
    //   })
    //   this._GetConfigList({
    //     shopNo,
    //     merchantNo,
    //     lableNo: 'patient_project'
    //   })
    // },
    // getImMsgNum(memberNoMerchant, memberNoGuid) {
    //     this._GetImMsgNum({
    //       merchantNo: memberNoMerchant,
    //       memberNoGuid: memberNoGuid
    //     })
    //     this._GetRecomClientNum({
    //       memberNoMerchant
    //     })
    //     setInterval(()=>{
    //        this._GetImMsgNum({
    //          merchantNo: memberNoMerchant,
    //          memberNoGuid: memberNoGuid
    //        })
    //     },10000)
    // }
  },
  created(){},
  mounted(){
      const token = this.$route.query.token
      if ( token ) {
        this.isAuotLogon = true
        this.autoLogin()
      } else {
        this.isAuotLogon = false
      }

  }
}
</script>
<style lang="less" scoped>
.loginBox{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #33bbc5;
  .middleConBox{
    position: absolute;
    left: 0;
    top:50%;
    width: 100%;
    height: 491px;
    margin-top: -245.5px;
    background: url('../../assets/img/middleBg.jpg') no-repeat center center;
    .conWidthBox{
      width: 1300px;
      margin: 0 auto;
      .lfCon{
        width: 365px;
        height: 491px;
        position: relative;
        img{
          position: absolute;
          top: 50%;
          left: 0;
          margin-top: -46.5px;
        }
      }
      .rgCon{
        width: 935px;
        .formBox{
           width: 600px;
           margin: 0 auto;
           padding-top: 40px;
           h2{
             font-size: 30px;
             color: #ffffff;
             text-align: center;
           }
          ::-webkit-input-placeholder { /* WebKit, Blink, Edge */    color:    #aad5da; }

          :-moz-placeholder { /* Mozilla Firefox 4 to 18 */   color:    #aad5da; }

          ::-moz-placeholder { /* Mozilla Firefox 19+ */   color:    #aad5da; }

          :-ms-input-placeholder { /* Internet Explorer 10-11 */   color:    #aad5da; }

          .loginname{
            display: block;
            width: 583px;
            height: 55px;
            margin-top: 20px;
            background: url('../../assets/img/username.png') no-repeat center center;
            input{
              width:490px;
              height: 55px;
              background: none;
              border: none;
              padding-left:  80px;
              color: #ffffff;
              font-size: 16px
            }
          }
          .password{
            display: block;
            width: 583px;
            height: 55px;
            background: url('../../assets/img/password.png') no-repeat center center;
            margin-top: 20px;
            input{
              width:490px;
              height: 55px;
              background: none;
              border: none;
              padding-left:  80px;
              color: #ffffff;
              font-size: 16px
            }
          }
          .code{
            display: block;
            width: 599px;
            height: 53px;
            background: url('../../assets/img/code.png') no-repeat left center;
            margin-top: 20px;
            input{
              width: 434px;
              height: 53px;
              background: none;
              float: left;
              border: none;
              color: #ffffff;
              padding: 0 10px;
              font-size: 16px
            }
            img{
              float: left;
              width: 125px;
              height: 53px;
              cursor: pointer;
            }
          }
          .remberPwd{
            font-size: 14px;
            display: block;
            color: #ffffff;
            margin:  20px 0;
            font-size: 18px;
            img{
              margin-right: 8px;
            }
          }

          .loginBtn{
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
