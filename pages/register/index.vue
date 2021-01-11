<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-6 is-offset-3">
          <h2 class="title has-text-centered" style="margin-top: 1.5em;">Register!</h2>

          <Notification :message="error" v-if="error" />

          <form method="post" @submit.prevent="register">
            <div class="field">
              <label class="label">First Name</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="firstName"
                  v-model="firstName"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Last Name</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="lastName"
                  v-model="lastName"
                  required
                />
              </div>
            </div>
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
              <label class="label">Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="password"
                  required
                />
              </div>
            </div>
            <div class="control">
              <button type="submit" class="btn btn-success" style="width: 100%">
                Register
              </button>
            </div>
          </form>

          <div class="has-text-centered" style="margin-top: 20px">
            Already got an account? <nuxt-link to="/login">Login</nuxt-link>
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: null
    }
  },
  middleware: 'auth',
  methods: {
    async register () {
      try {
        const res = await axios.post(
          '/user/register',
          {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
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
