<template>
  <section class="section">
    <div class="container-fluid">
      <div class="columns">
        <div class="column is-12">
          <h2 class="title has-text-centered" style="margin-top: 1.5em">
            Your Income Tax Calculations!
          </h2>

          <Notification :message="error" v-if="error" />
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Total Income From Salary</th>
                <th>Any Other Income</th>
                <th>Total Income</th>
                <th>Total Tax From Slabs</th>
                <th>Cess</th>
                <th>Total Tax</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tax in taxes" :key="tax._id">
                <td>{{ tax.income.incomeGrossSalary.total }}</td>
                <td>{{ tax.income.incomeOtherSources }}</td>
                <td>{{ tax.income.totalIncome }}</td>
                <td>{{ tax.tax.totalTax - tax.tax.cess }}</td>
                <td>{{ tax.tax.cess }}</td>
                <td>{{ tax.tax.totalTax }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      taxes: null,
      error: null,
    };
  },
  async mounted() {
    try {
      const res = await axios.get(`/tax/getMyTaxes`);
      if (res.status === 200) {
        console.log(res.data);
        this.taxes = res.data.taxes;
        console.log(this.taxes);
      } else {
        this.error = res.data.message;
      }
    } catch (e) {
      this.error = e.response.data.message;
    }
  },
  middleware: "auth",
};
</script>

<style scoped>
table {
  width: 100%;
  overflow-x: auto;
  text-align: center;
  vertical-align: middle;
}
</style>
