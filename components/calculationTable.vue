<template>
  <div class="has-text-centered">
    <hr>
    <h2 class="title has-text-centered">
        Result!
    </h2>
    <div class="columns">
        <div class="column is-6">
            <h4 class="title has-text-centered">
                Income Table
            </h4>
            <table class="table-responsive table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Breakdown</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Basic Salary</td>
                        <td>{{ data.income.incomeGrossSalary.basic }}</td>
                    </tr>
                    <tr>
                        <td>House Rent Allowance</td>
                        <td>{{ data.income.incomeGrossSalary.hra }}</td>
                    </tr>
                    <tr>
                        <td>Special Allowance</td>
                        <td>{{ data.income.incomeGrossSalary.special }}</td>
                    </tr>
                    <tr>
                        <td>Leave Travel Allowance</td>
                        <td>{{ data.income.incomeGrossSalary.lta }}</td>
                    </tr>
                    <tr>
                        <td>Other Income from different Sources</td>
                        <td>{{ data.income.incomeOtherSources }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total Income</th>
                        <th>{{ data.income.totalIncome }}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="column is-6">
            <h4 class="title has-text-centered">
                Tax Table
            </h4>
            <table class="table-responsive table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Slabs</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0 to 2.5 Lakhs (No Tax)</td>
                        <td>{{ data.tax.taxInSlab['0-2.5L'] }}</td>
                    </tr>
                    <tr>
                        <td>2.5 to 5 Lakhs (5% Tax)</td>
                        <td>{{ data.tax.taxInSlab['2.5-5L'] }}</td>
                    </tr>
                    <tr>
                        <td>5 to 7.5 Lakhs (10% Tax)</td>
                        <td>{{ data.tax.taxInSlab['5-7.5L'] }}</td>
                    </tr>
                    <tr>
                        <td>7.5 to 10 Lakhs (15% Tax)</td>
                        <td>{{ data.tax.taxInSlab['7.5-10L'] }}</td>
                    </tr>
                    <tr>
                        <td>10 to 12.5 Lakhs (20% Tax)</td>
                        <td>{{ data.tax.taxInSlab['10-12.5L'] }}</td>
                    </tr>
                    <tr>
                        <td>12.5 to 15 Lakhs (25% Tax)</td>
                        <td>{{ data.tax.taxInSlab['12.5-15L'] }}</td>
                    </tr>
                    <tr>
                        <td>15+ Lakhs (30% Tax)</td>
                        <td>{{ data.tax.taxInSlab['15L-inf'] }}</td>
                    </tr>
                    <tr>
                        <th>Total Tax from Slabs</th>
                        <th>{{ Object.values(data.tax.taxInSlab).reduce((a,b) =>{ return a + b }) }}</th>
                    </tr>
                    <tr>
                        <td>Cess (4% on Total Tax from Slabs)</td>
                        <td>{{ data.tax.cess }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total Income Tax</th>
                        <th>{{ data.tax.totalTax }}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Calculation',
    props: ['data']
}
</script>

<style scoped>
    table, thead, tbody, tfoot, td, th {
        width: 100%;
        margin: 0 auto;
        text-align: center;
        vertical-align: middle;
        padding: 0.2em;
    }
</style>