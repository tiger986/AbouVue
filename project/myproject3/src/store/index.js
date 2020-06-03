import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    headerTitle: ''
  },
  mutations: {
    changeHeaderTitle(state, payload){
      state.headerTitle = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
