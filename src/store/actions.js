//import 数据 from ''	这里面可以获取数据
import * as types from './type'

export default{
	/*loading*/
	hideLoading:({commit})=>{
		commit(types.HIDE_LOADING)
	},
	showLoading:({commit})=>{
		commit(types.SHOW_LOADING)
	},
	updateUserInfo:({commit}, data)=>{
		commit(types.UPDATE_USER_INFO, data)
	},
	loginUrl:({commit}, data)=>{
		commit(types.LOGIN_URL, data)
	},
    ActionToggleModal: ({commit}, payload) => {
		commit(types.TOGGLE_MODAL, payload)
	},
	clueMemberInfo:({commit}, data)=>{
		commit(types.CLUE_MEMBER_INFO, data)
	},

}
