import initState from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

export default {
    appVuex: {
      namespaced: true,
      state: initState,
      actions: actions,
      mutations: mutations,
      getters: getters
    }
}
