// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { assign } from 'lodash'
import VueJWT from 'vuejs-jwt'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = '/api'

Vue.axios.interceptors.request.use((config) => {
  // Do something before request is sent
  if (store.state.login.user && store.state.login.token && !config.headers.Authorization) {
    const bearer = `Bearer ${store.state.login.token}`
    assign(config.headers, { 'Authorization': bearer })
  }
  return config
}, error => Promise.reject(error))

Vue.use(Vuetify, { theme: {
  primary: '#ee44aa',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.use(VueJWT, {
  signKey: 'monsupersecretvraimentsupersecret',
  issuer: 'digital-data-platform',
  subject: 'digital-data-platform',
  audience: 'digital-data-platform'
})

Vue.config.productionTip = false

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
