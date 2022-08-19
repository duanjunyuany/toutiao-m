import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'
Vue.use(Vuex)

const userToken = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 用户的登录状态信息（包含token）
    // user: null
    user: getItem(userToken)
  },
  getters: {
  },
  mutations: {
    // 设置token
    setUserToken (state, user) {
      state.user = user
      setItem(userToken, user)
    }
  },
  actions: {
  },
  modules: {
  }
})
