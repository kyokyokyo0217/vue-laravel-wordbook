import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import category from './category'
import word from './word'
import status from './status'
import error from './error'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    category,
    word,
    status,
    error
  }
})

export default store
