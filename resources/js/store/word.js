import { OK, CREATED, NO_CONTENT, UNPROCESSABLE_ENTITY } from '../util'

const state = {
  wordErrorMessages: null,
}

const mutations = {
  setWordErrorMessages(state, messages){
    state.wordErrorMessages = messages
  }
}

const actions = {
  async getWords(context, id){
    context.commit('status/setApiStatus', null, { root: true })
    const response = await axios.get(`/api/categories/${id}/words`)

    if(response.status ===OK){
      context.commit('status/setApiStatus', true, { root: true })
      return response
    }else{
      context.commit('status/setApiStatus', false, { root: true })
      context.commit('error/setCode', response.status, { root: true })
    }
  },

  async addWord(context, data){
    context.commit('status/setApiStatus', null, { root: true })
    const response = await axios.post(`/api/categories/${data.categoryId}/words`, data.word)

    if(response.status === CREATED){
      context.commit('status/setApiStatus', true, { root: true })
      return false
    }

    context.commit('status/setApiStatus', false, { root: true })

    if(response.status === UNPROCESSABLE_ENTITY){
      context.commit('setWordErrorMessages', response.data.errors)
    } else {
      context.commit('error/setCode', response.status, { root: true })
    }

  },

  async updateWord(context, data){
    context.commit('status/setApiStatus', null, { root: true })
    const response = await axios.patch(`/api/categories/${data.categoryId}/words/${data.wordId}`, data.word)

    if(response.status === NO_CONTENT){
      context.commit('status/setApiStatus', true, { root: true })
      return false
    }

    context.commit('status/setApiStatus', false, { root: true })

    if(response.status === UNPROCESSABLE_ENTITY){
      context.commit('setWordErrorMessages', response.data.errors)
    } else {
      context.commit('error/setCode', response.status, { root: true })
    }
  },

  async deleteWord(context, data){
    context.commit('status/setApiStatus', null, { root: true })
    const response = await axios.delete(`/api/categories/${data.categoryId}/words/${data.wordId}`, { data: { word_id: data.wordId } })

    if(response.status === NO_CONTENT){
      context.commit('status/setApiStatus', true, { root: true })
      return false
    }else{
      context.commit('status/setApiStatus', false, { root: true })
      context.commit('error/setCode', response.status, { root: true })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
