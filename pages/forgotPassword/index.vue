<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered" style="margin-top: 1.5em;">Forgot Password</h2>

          <Notification :message="error" v-if="error"/>

          <form method="post" @submit.prevent="forgotPassword">
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
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Email me a new Password</button>
            </div>
          </form>
          <div class="has-text-centered" style="margin-top: 20px">
            <p>
              Don't have an account? <nuxt-link to="/register">Register</nuxt-link>
            </p>
            <p>
              Remember your password? <nuxt-link to="/login">Login</nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '../../components/notification'
import axios from 'axios'
export default {
  components: {
    Notification
  },

  data () {
    return {
      email: '',
      error: null
    }
  },
  middleware: 'auth',
  methods: {
    async forgotPassword () {
      try {
        const res = await axios.post('/user/forgotPassword',
          {
            email: this.email
          })

        if (res.status === 200) {
          this.$router.push('/login')
          alert(res.data.message)
        } else {
          this.error = res.data.message
        }
      } catch (e) {
        this.error = e.response.data.message
        console.log(e.response.data)
      }
    }
  }
}
</script>
