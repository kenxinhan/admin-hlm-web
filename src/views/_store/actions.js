import Vue from 'vue'
import { ApiGetConfigList , ApiGetRolesList, ApiGetRoleMenuList,ApiGetImMsgNum, ApiGetRecomClientnum} from './service'

export default {

  // 公共选项列表(客户类型,患者来源,预约项目)
  async _GetConfigList({state,commit}, payload){
      const { lableNo, sourceKey } = payload 
      const res = await ApiGetConfigList(payload)
      const { result, errorMessage,returnObject } = res.data
      if(result){
          switch(lableNo) {
            case 'user_type': 
              commit('GET_USERTYPE_LIST',returnObject)
              break;
            case 'user_source':
              commit('GET_USERSOURCE_LIST',returnObject)
              break;
            case 'patient_project':
              commit('GET_USERPROJECT_LIST',returnObject)
              break;
          }
      }else{
        Vue.prototype.$message({
          type: 'error',
          message: errorMessage
        })
      }
  },
  
  // 获取公共角色
  async _GetRolesList({state,commit}, payload) {
      const { roleEnname } = payload
      const res = await ApiGetRolesList(payload)
      const { result, errorMessage, returnObject } = res.data
      if(result){
          switch(roleEnname) {
            case 'SYS_SHOP_DOCTOR': 
              commit('GET_SHOP_DOCTOR',returnObject)
              break;
            case 'SYS_SHOP_ADVISORY':
              commit('GET_SHOP_ADVISORY',returnObject)
              break;
            case 'SYS_SHOP_NURSE':
              commit('GET_SHOP_NURSE',returnObject)
              break;
          }
      }else{
        Vue.prototype.$message({
          type: 'error',
          message: errorMessage
        })
      }
  },

  // 通过角色获取菜单
  async _GetRoleMenuList({state,commit}, payload){
    const res = await ApiGetRoleMenuList(payload)
    const { result, errorMessage, returnObject } = res.data
    if(result){
      commit('GET_MENULIST',returnObject)
    }else{
      Vue.prototype.$message({
        type: 'error',
        message: errorMessage
      })
    }
  },

  // 获取IM未读消息数量
  async _GetImMsgNum({state,commit}, payload){
    const res = await ApiGetImMsgNum(payload)
    const { result, errorMessage, returnObject } = res.data
    if(result){
      commit('GET_IMMSGNUM',returnObject)
    }else{
      Vue.prototype.$message({
        type: 'error',
        message: errorMessage
      })
    }
  },

  // 获取推荐客户数量
  async _GetRecomClientNum({state,commit}, payload){
    const res = await ApiGetRecomClientnum(payload)
    const { result, errorMessage, returnObject } = res.data
    if(result){
      commit('GET_RECOMCLIENTNUM',returnObject)
    }else{
      Vue.prototype.$message({
        type: 'error',
        message: errorMessage
      })
    }
  },

  _UpDateRecomClientNum({state,commit}, payload){
    commit('GET_RECOMCLIENTNUM',payload)
  }
}
