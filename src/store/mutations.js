import {
	HIDE_LOADING,
	SHOW_LOADING,
	UPDATE_USER_INFO,
	CLUE_MEMBER_INFO,
	LOGIN_URL,
	TOGGLE_MODAL
} from './type'

const state={
	loading:false,
	userInfo:{},
	clueMemberInfo:{},
	loginUrl:'Index',
	modalTitle: "", // 弹框标题
	keyName: "", // 弹框内容标记
	center: false, // 弹框内容是否居中
	dialogFormVisible: false, // 弹窗切换
	BookingModalVisible: false // 预约模块公共弹窗切换
};

const mutations={
	/*loading*/
	[HIDE_LOADING](state){
		state.loading=false;
	},
	[SHOW_LOADING](state){
		state.loading=true;
	},
	[UPDATE_USER_INFO](state, data){
		state.userInfo = data;
	},
	[CLUE_MEMBER_INFO](state, data){
		state.clueMemberInfo = data;
	},
	[LOGIN_URL](state, data){
		state.loginUrl = data;
	},
	[TOGGLE_MODAL](state, payload){
		state.modalTitle = payload.modalTitle;
		state.keyName = payload.keyName ;
		state.center = payload.center;
		state.dialogFormVisible = payload.dialogFormVisible;
		state.BookingModalVisible = payload.BookingModalVisible;
		state.type = payload.type
	}
};

const getters={
	loading(state){
		return state.loading;
	},
	userInfo(state){
		return state.userInfo;
	},
	clueMemberInfo(state){
		return state.clueMemberInfo;
	},
	loginUrl(state){
		return state.loginUrl;
	},
};

export default{
	state,
	mutations,
	getters
}
