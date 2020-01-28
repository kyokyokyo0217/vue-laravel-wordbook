<template>
  <div>
    <nav class="navbar bg-white border-bottom navbar-light">
      <router-link class="navbar-brand mr-auto" to="/">LaravelWordbook</router-link>
      <div v-if="isLogin">
        <span>Hello, {{username}}</span>
        <button class="btn btn-outline-secondary" @click="logout">Logout</button>
      </div>
      <div v-else>
        <router-link class="navbar-brand" to="/login">Login</router-link>
      </div>
    </nav>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED, NOT_FOUND } from './util'

export default {
  computed: {
    isLogin () {
      return this.$store.getters['auth/check']
    },
    username () {
      return this.$store.getters['auth/username']
    },
    errorCode(){
      return this.$store.state.error.code
    },
    apiStatus(){
      return this.$store.state.status.apiStatus
    }
  },
  watch: {
    errorCode: {
      async handler(val) {
        if (val === INTERNAL_SERVER_ERROR) {
          this.$router.push('/500')
        }else if(val === UNAUTHORIZED){
          await axios.get('/api/refresh-token')
          this.$store.commit('auth/setUser', null)
          this.$router.push('/login')
        }else if(val === NOT_FOUND){
          this.$router.push('/not-found')
        }
      },
      immediate: true
    },
// ???
    $route () {
      this.$store.commit('error/setCode', null)
    }
  },
  methods:{
    async logout () {
      await this.$store.dispatch('auth/logout')

      if(this.apiStatus){
        this.$router.push('/login')
      }
    }
  },
};
</script>
