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
        <!-- loginErrors -->
        <div v-if="loginErrorMessages" class="text-danger">
          <ul v-if="loginErrorMessages.email">
            <li v-for="msg in loginErrorMessages.email" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="loginErrorMessages.password">
            <li v-for="msg in loginErrorMessages.password" :key="msg">{{ msg }}</li>
          </ul>
        </div>
        <!-- loginForm -->
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
      </div>
      <!-- register -->
      <div v-show="tab === 2">
        <!-- registerErrors -->
        <div v-if="registerErrorMessages" class="text-danger">
          <ul v-if="registerErrorMessages.email">
            <li v-for="msg in registerErrorMessages.name" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="registerErrorMessages.name">
            <li v-for="msg in registerErrorMessages.email" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="registerErrorMessages.password">
            <li v-for="msg in registerErrorMessages.password" :key="msg">{{ msg }}</li>
          </ul>
          <ul v-if="registerErrorMessages.password_confirmation">
            <li v-for="msg in registerErrorMessages.password_confirmation" :key="msg">{{ msg }}</li>
          </ul>
        </div>
        <!-- registerForm -->
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
  computed:{
    apiStatus(){
      return this.$store.state.auth.apiStatus
    },
    loginErrorMessages(){
      return this.$store.state.auth.loginErrorMessages
    },
    registerErrorMessages(){
      return this.$store.state.auth.registerErrorMessages
    }
  },
  methods:{
    async register(){
      await this.$store.dispatch('auth/register', this.registerForm)

      if(this.apiStatus){
        this.$router.push('/')
      }
    },
    async login () {
      await this.$store.dispatch('auth/login', this.loginForm)

      if(this.apiStatus){
        this.$router.push('/')
      }
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
