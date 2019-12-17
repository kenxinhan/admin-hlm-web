import storage from './tools/local_storage'

// 配置文件
export default {
  //用户信息
  userInfo: null,

  //抢客户详情
  clueMemberInfo:null,

  // 用户token
  token: storage.get('accessToken') || '',

  set (key, val) {
    this[key] = val
  },

  get (key) {
    return this[key]
  }
}
