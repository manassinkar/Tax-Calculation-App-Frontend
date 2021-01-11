<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered" style="margin-top: 1.5em;">Change Password!</h2>

          <Notification :message="error" v-if="error" />

          <form method="post" @submit.prevent="changePassword">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  type="email"
                  class="input"
                  name="email"
                  v-model="email"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Current Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="oldPassword"
                  v-model="oldPassword"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">New Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="newPassword"
                  v-model="newPassword"
                  required
                />
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">
                Change Password
              </button>
            </div>
          </form>

          <div class="has-text-centered" style="margin-top: 20px">
            <p>
              Already got an account? <nuxt-link to="/login">Login</nuxt-link>
            </p>
            <p>
              Don't have an account? <nuxt-link to="/register">Register</nuxt-link>
            </p>
            <p>
              Forgot your password? <nuxt-link to="/forgotPassword">Get new password</nuxt-link>
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
      oldPassword: '',
      newPassword: '',
      error: null
    }
  },
  middleware: 'auth',
  methods: {
    async changePassword () {
      try {
        const res = await axios.post(
          '/user/changePassword',
          {
            email: this.email,
            oldPassword: this.oldPassword,
            newPassword: this.newPassword
          }
        )
        if (res.status === 200) {
          this.$router.push('/login')
        } else {
          this.error = res.data.message
        }
        console.log(res)
      } catch (e) {
        this.error = e.response.data.message
        console.log(e.response.data.message)
      }
    }
  }
}
</script>
