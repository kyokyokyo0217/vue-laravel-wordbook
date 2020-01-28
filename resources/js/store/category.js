import { OK, CREATED, NO_CONTENT, UNPROCESSABLE_ENTITY } from '../util'

const state = {
  categoryErrorMessages: null,
}

const mutations = {
  setCategoryErrorMessages(state, messages){
    state.categoryErrorMessages = messages
  }
}

const actions = {
  async addCategory(context, data){
    context.commit('status/setApiStatus', null, { root: true })
    const response = await axios.post('/api/categories', {category_name: data})

    if(response.status === CREATED){
      context.commit('status/setApiStatus', true, { root: true })
      return false
    }

    context.commit('status/setApiStatus', false, { root: true })

    if(response.status === UNPROCESSABLE_ENTITY){
      context.commit('setCategoryErrorMessages', response.data.errors)
    } else {
      context.commit('error/setCode', response.status, { root: true })
    }
  },

  async updateCategory(context, data){
    context.commit('status/setApiStatus', null, { root: true })
    const response = await axios.patch(`/api/categories/${data.id}`, data);

    if(response.status === NO_CONTENT){
      context.commit('status/setApiStatus', true, { root: true })
      return false
    }

    context.commit('status/setApiStatus', false, { root: true })

    if(response.status === UNPROCESSABLE_ENTITY){
      context.commit('setCategoryErrorMessages', response.data.errors)
    } else {
      context.commit('error/setCode', response.status, { root: true })
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
