// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from 'vue-i18n'
import Validator from 'vue-validator'
import axios from 'axios'
import Loading from './components/Loading'
import stores from './store/store'
import params from './tools/params'
import filters from './filters'
import $ from 'jquery'
import enLocale from './lang/en'
import zhLocale from './lang/zh'
import twLocale from './lang/tw'
import Cookies from 'js-cookie'
import qrcode from 'qrcode'
import VueClipboard from 'vue-clipboard2'
import storage from '@/tools/local_storage.js'
import tools from './tools/tools'
import { isEmpty } from '@/utils/index'
import Enum from './api/Enum.js'  // 引用定义枚举
import cfg from './cfg'
import Print from '@/plugs/print'
Vue.use(Print) // 注册

// import BabelCli from './babel-cli'//ES6转ES5

import md5 from 'js-md5'

// 数学计算
import math from 'mathjs'

import Blob from './excel/Blob.js'  //导入导出excel
import Export2Excel from './excel/Export2Excel.js'
//加载公共样式
import './assets/css/common.less'

//引入mock数据
import './mock'

// import './directives' //dialog窗口拖拽  全局

window.$ = window.jQuery = $


Vue.prototype.$isEmpty = isEmpty  // 判断是否为空
Vue.prototype.cfg = Vue.prototype.$cfg = cfg

//路由过滤
let menus = []
let parentIndex = 0
let childIndex = 0
router.beforeEach((to, from, next)=>{

  // if(to.path == 'login'){
  //   let userInfo = this.$cfg.userInfo
  //   if(userInfo)router.push({path:'/'})
  // }
  if(to.path != '/login'){
    let userInfo = storage.get("userInfo")
    if(!userInfo)router.push({path:'/login'})
  } else {
    let userInfo = storage.get("userInfo")
    if(userInfo)router.go(-1)
  }

  if(to.name===null){
      router.replace({ name: 'NotFound' });
  }
  next()
})

//加载过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
Vue.use(Validator)//验证器
Vue.use(VueI18n);//语言国际化
Vue.use(ElementUI);//ui框架
Vue.use(Loading);
Vue.use(qrcode);  //生成二维码
Vue.use(VueClipboard);//复制到粘贴板

//用户信息本地存储
Vue.prototype.getUserInfo = function(){
  if(storage.has('userInfo')){
    return storage.get('userInfo')
  }else{
    return null
  }
}
Vue.prototype.setUserInfo = function(userInfo){
  storage.put('userInfo',userInfo)
  Vue.prototype.updateUserInfo()
}
Vue.prototype.delUserInfo = function(){
  storage.del('userInfo')
  Vue.prototype.updateUserInfo()
}
Vue.prototype.updateUserInfo = function(){
  stores.dispatch('updateUserInfo', Vue.prototype.getUserInfo())
}

let axiosInstance = axios.create({
  baseURL: '/',
  headers: {
    'locale': 'zh',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

let get = axiosInstance.get
axiosInstance.get = function (url, data = {}, config = {}) {
  if (typeof data === 'string') {
    return get(url + '?' + data, config)
  } else {
    let query = params(data)
    if (query) {
      return get(url + '?' + query, config)
    } else {
      return get(url, config)
    }
  }
}

// axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
axiosInstance.interceptors.request.use(function (config) { // 配置发送请求的信息
   let userInfo = storage.get("userInfo")
   let token =  config.token
    if (token) {
      config.headers['access-token'] = token
    }

    let url = "/api/upload/uploadHeadImage.do"    //上传接口
    let url1 = '/api/hx/im/unreadCount.do'
    let url2 = '/api/hx/clue/clientnum.do'
    let url3 = '/api/upload/uploadMedicalImage.do'  //上传接口

    if ( config.url !== url1 && config.url !== url2 ) {
      stores.dispatch('showLoading')
    }
    if(config.url == url || config.url == url3){
      //  上传接口不走签名加密
    }else{
      let paramObj  = {};

      Object.assign(paramObj, config.params || {}, config.data || {} );
      let paramJson = JSON.stringify(paramObj);

      //信息加密
      let timestamp  = new Date().getTime() //时间撮
      let salt = "013cXuH9vf584W0x"   //盐值
      let signature = md5(md5(paramJson) + timestamp + salt);//签名

       config.data = {}
       config.params = {}
      if(config.method=='post'){
              config.data = {
                ...config.data,
                token: token,
                signature: signature,
                timestamp: timestamp,
                paramJson: paramJson,
              }
          //  在请求之前将data进行序列化，序列化的函数使用jQuery ajax 的param()方法
          //  或使用qs.stringify()方法
          config.data = $.param(config.data);

        }else if(config.method=='get'){
          config.params = {
            ...config.params,
            token: token,
            signature: signature,
            timestamp: timestamp,
            paramJson: paramJson,
          }
        }
    }


    //clearInnerHeader(config)
    return config
  }, function (error) {
    return Promise.reject(error)
  })


  axiosInstance.interceptors.response.use(function (response) { // 配置请求回来的信息
    stores.dispatch('hideLoading')
    return response
  }, function (error) {
    stores.dispatch('hideLoading')

    if (error.response && error.response.data.code === 401) {
      Vue.prototype.delUserInfo()
      Utils.Logback()
      // 禁止多浏览器同时登录
      // router.push({path:'/Login'})
      // 未登录路由重定向
      stores.dispatch('no_login', true)

    }

    return Promise.reject(error)
  })

  /*axios.defaults.baseURL = (process.env.NODE_ENV !=='production' ? config.dev.httpUrl:config.build.httpUrl);
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; */
  // axios.defaults.baseURL='http://localhost:8082/';
  Vue.prototype.$http = axiosInstance // 其他页面在使用axios的时候直接  this.$http就可以了


//设置页面索引
Vue.prototype.setPageIndex = function(data){
  storage.put('pageindex', data)
}
Vue.prototype.getPageIndex = function(data){
  if(storage.has('pageindex')){
    return storage.get('pageindex')
  }else{
    return null
  }
}
let PageIndexInfo = Vue.prototype.getPageIndex()
if(PageIndexInfo){
  parentIndex = PageIndexInfo.parentIndex
  childIndex = PageIndexInfo.childIndex
}

Vue.prototype.tools = tools
Vue.prototype.Enum = Vue.prototype.$Enum = Enum; //在模板中使用定义枚举
//Vue.config.productionTip = false



Vue.prototype.addMath = (a,b) =>  {
  if( a !== undefined && b !== undefined) return math.format(math.chain(math.bignumber(Number(a))).add(math.bignumber(Number(b))).done());
 }

 Vue.prototype.subtractMath = (a,b) =>  {
  if( a !== undefined && b !== undefined) return math.format(math.chain(math.bignumber(Number(a))).subtract(math.bignumber(Number(b))).done());
 }

 Vue.prototype.multiplyMath = (a,b) =>  {
  if( a !== undefined && b !== undefined) return math.format(math.chain(math.bignumber(Number(a))).multiply(math.bignumber(Number(b))).done());
 }

 Vue.prototype.divideMath = (a,b) =>  {
  if( a !== undefined && b !== undefined) return math.format(math.chain(math.bignumber(Number(a))).divide(math.bignumber(Number(b))).done());
 }


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:stores,
  render: h => h(App)
})
