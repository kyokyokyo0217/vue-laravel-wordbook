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
export default {
  methods:{
    async logout () {
      await this.$store.dispatch('auth/logout')

      this.$router.push('/login')
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters['auth/check']
    },
    username () {
      return this.$store.getters['auth/username']
    }
  }
};
</script>
