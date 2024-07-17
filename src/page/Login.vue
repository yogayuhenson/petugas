<template>
  <div class="body-login">
    <NavbarLogin />

    <div>
      <b-container class="login-container">
        <h1 class="text-center">
          Masuk
        </h1>
        <b-row>
          <b-col cols="12">
            <label>Username</label>
            <b-form-input
              class="mb-3"
              v-model="form.username"
              v-on:keyup.enter="usernameEnter()"
              type="text"
              required
              autofocus
            ></b-form-input>
          </b-col>

          <b-col cols="12">
            <label>Password</label>
            <b-form-input
              class="mb-3"
              v-model="form.password"
              v-on:keyup.enter="loginAction()"
              ref="password"
              type="password"
              required
            ></b-form-input>
          </b-col>

          <b-col cols="12">
            <b-button block variant="primary" @click="loginAction()">
              Login
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <FooterLogin />
  </div>
</template>

<script>
import { BContainer } from 'bootstrap-vue'
import NavbarLogin from '@/components/NavbarLogin.vue'
import FooterLogin from '@/components/FooterLogin.vue'
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    }
  },
  name: 'Login',
  components: {
    NavbarLogin,
    FooterLogin,
    BContainer,
  },
  mounted() {
    localStorage.getItem('loggedIn') === 'true'
      ? this.$router.push('/dashboard')
      : ''
  },
  methods: {
    usernameEnter() {
      this.$refs.password.focus()
    },
    loginAction() {
      if (this.form.username === '') {
        alert('Username tidak boleh kosong')
      } else if (this.form.password === '') {
        alert('Password tidak boleh kosong')
      } else {
        axios
          .get('http://localhost:8080/fyp/petugas/login', {
            params: {
              username: this.form.username,
              password: this.form.password,
            },
          })
          .then(() => {
            // Handle successful response
            localStorage.setItem('loggedIn', 'true')
            localStorage.setItem('username', this.form.username)
            this.$router.push('/dashboard')
          })
          .catch(() => {
            // Handle error
            alert('Username atau password salah')
          })
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body-login {
  margin: 3vw auto;
  padding: 0vw 30vw;
}
.login-container {
  border: 2px solid #f2f2f2;
  border-radius: 0;
  padding-top: 2.5vw;
  padding-bottom: 2.5vw;
}
</style>
