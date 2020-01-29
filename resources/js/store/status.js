const state = {
  apiStatus: null,
}

const mutations = {
  setApiStatus(state, status){
    state.apiStatus = status
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
