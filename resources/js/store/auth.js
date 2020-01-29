import { OK, CREATED, UNPROCESSABLE_ENTITY } from '../util'

const state = {
  user: null,
  loginErrorMessages: null,
  registerErrorMessages: null,
}

const getters = {
  check: state => !! state.user,
  username: state => state.user ? state.user.name : ''
}

const mutations = {
  setUser(state, user){
    state.user= user
  },
  setLoginErrorMessages(state, messages){
    state.loginErrorMessages = messages
  },
  setRegisterErrorMessages(state, messages){
    state.registerErrorMessages = messages
  }
}

const actions = {

// Register
  async register (context, data) {
    context.commit('status/setApiStatus', null, { root: true })
    const response = await axios.post('/api/register', data)

    if(response.status === CREATED){
      context.commit('status/setApiStatus', true, { root: true })
      context.commit('setUser', response.data)
      return false
    }

    context.commit('status/setApiStatus', false, { root: true })

    if(response.status === UNPROCESSABLE_ENTITY){
      context.commit('setRegisterErrorMessages', response.data.errors)
    } else {
      context.commit('error/setCode', response.status, { root: true })
    }
  },

// Login
  async login (context, data) {
    context.commit('status/setApiStatus', null, { root: true })
    const response = await axios.post('/api/login', data)

    if(response.status === OK){
      context.commit('status/setApiStatus', true, { root: true })
      context.commit('setUser', response.data)
      return false
    }

    context.commit('status/setApiStatus', false, { root: true })

    if(response.status === UNPROCESSABLE_ENTITY){
      context.commit('setLoginErrorMessages', response.data.errors)
    } else {
      context.commit('error/setCode', response.status, { root: true })
    }
  },

// Logout
  async logout (context) {
    context.commit('status/setApiStatus', null, { root: true })
    const response = await axios.post('/api/logout')

    if (response.status === OK) {
      context.commit('status/setApiStatus', true, { root: true })
      context.commit('setUser', null)
      return false
    }

    context.commit('status/setApiStatus', false, { root: true })
    context.commit('error/setCode', response.status, { root: true })

  },

// Check CurrentUser
  async currentUser (context) {
    context.commit('status/setApiStatus', null, { root: true })
    const response = await axios.get('/api/user')
    const user = response.data || null

    if (response.status === OK) {
      context.commit('status/setApiStatus', true, { root: true })
      context.commit('setUser', user)
      return false
    }

    context.commit('status/setApiStatus', false, { root: true })
    context.commit('error/setCode', response.status, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
