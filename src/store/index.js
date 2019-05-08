import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

import Merchants from './merchants'
import Account from './account'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    Merchants,
    Account
  },
  getters
})

export default store
