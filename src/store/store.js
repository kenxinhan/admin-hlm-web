import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import appVuex from '../views/_store'

Vue.use(Vuex);


export default new Vuex.Store({
	modules:{
		mutations,
		...appVuex
	},
	actions
});

