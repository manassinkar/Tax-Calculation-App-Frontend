<template>
  <nav class="navbar is-light sticky">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">Tax Calculator</nuxt-link>
        <button class="button navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <template>
            <nuxt-link class="navbar-item" v-if="!loggedIn" to="/register">Register</nuxt-link>
            <nuxt-link class="navbar-item" v-if="!loggedIn" to="/login">Log In</nuxt-link>
            <nuxt-link class="navbar-item" v-if="loggedIn" to="/dashboard">Dashboard</nuxt-link>
            <nuxt-link class="navbar-item" v-if="loggedIn" to="/dashboard/profile">My Profile</nuxt-link>
            <nuxt-link class="navbar-item" v-if="loggedIn" to="/dashboard/myCalculations">My Tax Calculations</nuxt-link>
            <button class="navbar-item btn btn-danger" v-on:click="logout" v-if="loggedIn">
              Log Out
            </button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      loggedIn: false
    }
  },
  mounted() {
    this.loggedIn = !this.$cookies.get("guest")
    this.$nuxt.$on("login", () => {
      this.loggedIn = true
    })
    this.$nuxt.$on("logout", async () => {
      this.loggedIn = false
      const res = await axios.get("/getGuestToken")
      this.$cookies.set("token", res.data.token)
      this.$cookies.remove("user")
      this.$cookies.set("guest", true)
      this.$router.push("/login")
    })
  },
  methods: {
    logout() {
      this.$nuxt.$emit("logout")
    }
  }
}
</script>

<style scoped>
  .sticky {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
  }
</style>
