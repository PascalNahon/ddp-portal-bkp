import Vue from 'vue'
import Vuex from 'vuex'

import login from '@/components/login/module/login'
import me from '@/store/me'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    login,
    me
  }
})
