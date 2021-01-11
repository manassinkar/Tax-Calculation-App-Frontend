<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-6 is-offset-3">
          <h2 class="title has-text-centered" style="margin-top: 1.5em;">Welcome back!</h2>

          <Notification :message="error" v-if="error"/>
          <div class="has-text-centered" style="margin-top: 20px">
            <div class="control">
              <a href="https://www.facebook.com/v4.0/dialog/oauth?auth_type=rerequest&client_id=394634245130264&display=popup&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&response_type=code&scope=email%2Cuser_friends"><button type="submit" class="button fb is-fullwidth">Log In with Facebook &nbsp; <i class="fa fa-facebook"></i></button></a>
            </div>
            <br><h3>OR</h3>
          </div>
          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  name="email"
                  v-model="email"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="password"
                />
              </div>
            </div>
            <div class="control">
              <button type="submit" class="btn btn-success" style="width: 100%">Log In</button>
            </div>
          </form>
          <div class="has-text-centered" style="margin-top: 20px">
            <p>
              Don't have an account? <nuxt-link to="/register">Register</nuxt-link>
            </p>
            <p>
              Forgot your password? <nuxt-link to="/forgotPassword">Get new password</nuxt-link>
            </p>
            <p>
              Want to change your password? <nuxt-link to="/changePassword">Change password</nuxt-link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import Notification from '../../components/notification'

export default {
  components: {
    Notification
  },

  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  middleware: 'auth',
  methods: {
    async login () {
      try {
        const res = await axios.post('/user/login',
          {
            email: this.email,
            password: this.password
          })

        if (res.status === 200) {
          this.$cookies.set('token', res.data.token)
          this.$cookies.set('guest', false)
          this.$cookies.set('user', JSON.stringify(res.data.user))
          this.$nuxt.$emit('login')
          this.$router.push('/dashboard')
        } else {
          this.error = res.data.message
        }
      } catch (e) {
        this.error = e.response.data.message
        console.log(e.response.data.message)
      }
    }
  }
}
</script>

<style scoped>
  .fb {
    background-color: #3B5998;
    color: white;
  }
</style>
