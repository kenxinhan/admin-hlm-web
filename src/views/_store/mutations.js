import { _mmPageSize } from '@/utils/mm.js'

export default {
  // 客户类型
  GET_USERTYPE_LIST(state, payload){
      state.user_type = payload
  },
  // 一级患者来源
  GET_USERSOURCE_LIST(state, payload) {
    state.user_source = payload
  },
  // 预约项目
  GET_USERPROJECT_LIST(state, payload){
      state.patient_project = payload
  },
  // 医生
  GET_SHOP_DOCTOR(state, payload){
    state.shop_doctor = payload
  },
  // 咨询师
  GET_SHOP_ADVISORY(state, payload){
    state.shop_advisory = payload
  },
  // 护士
  GET_SHOP_NURSE(state, payload){
    state.shop_nurse = payload
  },
  // 左侧菜单
  GET_MENULIST(state, payload){
    state.menulist = payload
  },
  // 微信消息数量
  GET_IMMSGNUM(state, payload) {
    state.imMsgNum = payload
  },
  GET_RECOMCLIENTNUM(state, payload){
    state.recomClientNum = payload
  }
}
