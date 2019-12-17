// import Qs from 'qs'
// import { MessageBox, Message } from 'element-ui'
// import { isEmpty } from '@/utils/index'
// import stores from '@/store/store'

// window.baseUrl = ''

// // 引用axios
// var axios = require('axios')
// // 自定义判断元素类型JS
// function toType (obj) {
//   return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
// }
// // 参数过滤函数
// function filterNull (o) {
//   for (var key in o) {
//     if (o[key] === null) {
//       delete o[key]
//     }
//     if (toType(o[key]) === 'string') {
//       o[key] = o[key].trim()
//     } else if (toType(o[key]) === 'object') {
//       o[key] = filterNull(o[key])
//     } else if (toType(o[key]) === 'array') {
//       o[key] = filterNull(o[key])
//     }
//   }
//   return o
// }
// function filterUndefined (o) {
//   for (var key in o) {
//     if (isEmpty(o[key])) {
//       delete o[key]
//     }
//   }
//   return o
// }

// /*
//   接口处理函数
//   这里出错就是简单的alert
// */

// function apiAxios (method, url, params, success, failure) {
//   if (params) {
//     params = filterNull(params)
//   }
//   let that = this
//   let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
//   let accessToken = isEmpty(userInfo) ? null : userInfo.accessToken
//   axios({
//     method: method,
//     url: url,
//     data: method === 'POST' || method === 'PUT' ? JSON.stringify(params) : null,
//     params: method === 'GET' || method === 'DELETE' ? filterUndefined(params) : null,
//     // baseURL: '/api',
//     headers: {
//       'Content-Type': 'application/json',
//       'locale': 'zh-CN',
//       'access-token': accessToken
//     },
//     transformRequest: [function (data) {
//       stores.dispatch('showLoading')
//       return data
//     }],
//     transformResponse: [function (data) {
//       stores.dispatch('hideLoading')
//       const list = JSON.parse(data)
//       if (list.code == 401) {
//         window.sessionStorage.removeItem('userInfo')
//         window.location.href = '/Login'
//       }
//       return list;
//     }]
//   })
//   .then(function (res) {
//     if (res.data.code == 1) {
//       if (success) {
//         success(res.data)
//       }
//     } else {
//       if (failure) {
//         failure(res.data)
//       } else {
//         success(res.data)
//         Message.error('error: ' + res.data.message)
//       }
//     }
//   })
//   .catch(function (err) {
//     console.log(err, 'err')
//     if (err) {
//       Message.error('api error, HTTP CODE: ' + err.message)
//     } else {
//       Message.error('请求超时')
//     }
//   })
// }

// // 返回在vue模板中的调用接口
// export default {
//   get: function (url, params, success, failure) {
//     return apiAxios('GET', url, params, success, failure)
//   },
//   post: function (url, params, success, failure) {
//     return apiAxios('POST', url, params, success, failure)
//   },
//   put: function (url, params, success, failure) {
//     return apiAxios('PUT', url, params, success, failure)
//   },
//   delete: function (url, params, success, failure) {
//     return apiAxios('DELETE', url, params, success, failure)
//   }
// }



