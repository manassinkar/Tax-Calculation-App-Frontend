<template>
  <section class="section">
    <div class="container">
      <h2 class="title" style="margin-top: 1.5em;">My Profile</h2>
      <div class="content">
        <p>
          <strong>Name:</strong>
          {{ firstName }} {{ lastName }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ email }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
      return this.$cookies.get('user')
  },
  middleware: 'auth'
}
</script>
