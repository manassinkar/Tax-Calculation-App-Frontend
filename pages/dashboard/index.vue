<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-6 is-offset-3">
          <h2 class="title has-text-centered" style="margin-top: 1.5em;">Calculate Your Income Tax!</h2>

          <Notification :message="error" v-if="error" />

          <form method="post" @submit.prevent="calculateTax">
            <div class="field">
              <label class="label">Basic Salary</label>
              <div class="control">
                <input
                  type="number"
                  class="input"
                  name="basic"
                  v-model="basic"
                  min="10"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">House Rent Allowance</label>
              <div class="control">
                <input
                  type="number"
                  class="input"
                  name="hra"
                  v-model="hra"
                  min="10"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Special Allowance</label>
              <div class="control">
                <input
                  type="number"
                  class="input"
                  name="special"
                  v-model="special"
                  min="10"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Leave Travel Allowance</label>
              <div class="control">
                <input
                  type="number"
                  class="input"
                  name="lta"
                  v-model="lta"
                  min="10"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Any Other Income</label>
              <div class="control">
                <input
                  type="number"
                  class="input"
                  name="incomeOtherSources"
                  v-model="incomeOtherSources"
                  min="10"
                  required
                />
              </div>
            </div>
            <div class="control">
              <button type="submit" class="btn btn-primary" style="width: 100%">
                Calculate Tax
              </button>
            </div>
          </form>
        </div>
      </div>
      <calculation-table :data="calculatedResult" v-if="calculatedResult"/>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import calculationTable from '~/components/calculationTable.vue'

export default {
  components: { calculationTable },
  data () {
    return {
      basic: 1200000,
      hra: 600000,
      special: 252000,
      lta: 20000,
      incomeOtherSources: 20000,
      calculatedResult: null,
      error: null
    }
  },
  async mounted () {
    if(typeof this.$route.query.code === "string")
    {
      const code = this.$route.query.code
      // console.log(code)
      try {
        const res = await axios.get(`/user/getFacebookUserData?code=${code}`)
        if (res.status === 200) {
          console.log(res.data)
          this.$cookies.set('token', res.data.token)
          this.$cookies.set('guest', false)
          this.$cookies.set('user', JSON.stringify(res.data.user))
          this.$nuxt.$emit('login')
          this.$router.push('/dashboard')
        } else {
          console.log(res)
        }
      } catch (e) {
        console.log(e.response.data.message)
        console.log(e.response.data.error)
      }
    }
  },
  middleware: 'auth',
  methods: {
    async calculateTax () {
      try {
        var body = {
          basic: parseInt(this.basic),
          hra: parseInt(this.hra),
          special: parseInt(this.special),
          lta: parseInt(this.lta),
          incomeOtherSources: parseInt(this.incomeOtherSources),
        }
        console.log(body);
        const res = await axios.post(`/tax/calculateTax`,body)
        if (res.status === 200) {
          console.log(res.data)
          this.calculatedResult = res.data.result;
          this.$router.push('/dashboard')
        } else {
          console.log(res)
        }
      } catch (e) {
        console.log(e.response.data.message)
        console.log(e.response.data.error)
      }
    }
  }
}
</script>
