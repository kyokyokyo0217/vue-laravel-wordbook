<template>
  <div class="card m-5">
    <div class="card-header">
      <span
        @click="tab = 1"
        class="pointer"
        :class="{active: tab === 1}"
        >Login</span>  /
      <span
        @click="tab = 2"
        class="pointer"
        :class="{active: tab === 2}"
        >Register</span>
    </div>
    <div class="card-body">
      <!-- login -->
      <div v-show="tab === 1">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="login-email">Email</label>
            <input type="text" class="form-control" id="login-email" v-model="loginForm.email">
          </div>
          <div class="form-group">
            <label for="login-password">Password</label>
            <input type="password" class="form-control" id="login-password" v-model="loginForm.password">
          </div>
          <div class="text-left">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
        Forgot Password?
      </div>
      <!-- register -->
      <div v-show="tab === 2">
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="register-email">Email</label>
            <input type="text" class="form-control" id="register-email" v-model="registerForm.email">
          </div>
          <div class="form-group">
            <label for="register-name">User Name</label>
            <input type="text" class="form-control" id="register-name" v-model="registerForm.name">
          </div>
          <div class="form-group">
            <label for="register-password">Password</label>
            <input type="password" class="form-control" id="register-password" v-model="registerForm.password">
          </div>
          <div class="form-group">
            <label for="register-password-confirm">Password(confirm)</label>
            <input type="password" class="form-control" id="register-password-confirm" v-model="registerForm.password_confirmation">
          </div>
          <div class="text-left">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 1,
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
    }
  },
  methods:{
    async register(){
      // authストアのresigterアクションを呼び出す
      await this.$store.dispatch('auth/register', this.registerForm)

      // トップページに移動する
      this.$router.push('/')
    },
    async login () {
      // authストアのloginアクションを呼び出す
      await this.$store.dispatch('auth/login', this.loginForm)

      // トップページに移動する
      this.$router.push('/')
    },
  }
}
</script>
<style scoped>
.pointer{
    cursor : pointer;
}
.active{
  text-decoration: underline solid blue;
  color: blue;
}
</style>
