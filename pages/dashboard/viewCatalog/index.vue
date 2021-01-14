<template>
  <section class="section">
    <div class="container-fluid">
      <div class="columns" style="margin-top: 1.2em;">
        <div class="column is-12">

          <Notification :message="getError" v-if="getError" />
          <Notification :message="searchError" v-if="searchError" />
          <div v-if="data">
            <p class="has-text-centered">
              <input v-model="searchText" list="suggests" @input="searchCatalog()" style="width: 100%;" placeholder="Search..." type="search">
              <datalist id="suggests" v-if="suggestData">
                <option v-for="s in suggestData" :key="s.text" :value="s.text">{{s.field}}</option>
              </datalist>
            </p>
            <p>{{length}} results found..</p>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th @click="sort('product_id')">Product ID</th>
                  <th @click="sort('product_name')">Product Name</th>
                  <th @click="sort('manufacturer')">Manufacturer</th>
                  <th @click="sort('base_price')">Base Price</th>
                  <th @click="sort('discount_percentage')">Discount Percentage</th>
                  <th @click="sort('discount_amount')">Discount Amount</th>
                  <th @click="sort('price')">Final Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="d in sortedData" :key="d.product_id">
                  <td>{{d.product_id}}</td>
                  <td>{{d.product_name}}</td>
                  <td>{{d.manufacturer}}</td>
                  <td>$ {{d.base_price}}</td>
                  <td>{{d.discount_percentage}} %</td>
                  <td>$ {{d.discount_amount}}</td>
                  <td>$ {{d.price}}</td>
                </tr>
              </tbody>
            </table>
            <p class="has-text-centered">
              <button @click="prevPage" v-if="currentPage>1">Previous</button> 
              <button @click="nextPage" v-if="currentPage*pageSize < length">Next</button>
            </p>
          </div>
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
      data: null,
      suggestData: null,
      length: 0,
      currentSort:'name',
      currentSortDir:'asc',
      pageSize:10,
      currentPage:1,
      searchText: '',
      getError: null,
      searchError: null,
    };
  },
  async mounted() {
    try {
      const res = await axios.get(`/ecommerce/getCatalog`);
      if (res.status === 200) {
        this.data = res.data.data;
        this.length = this.data.length;
        this.getError = null;
      } else {
        this.getError = res.data.message;
      }
    } catch (e) {
      this.getError = e.response.data.message;
    }
  },
  middleware: "auth",
  methods: {
    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.data.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    },
    searchCatalog:async function() {
      let url = '';
      if(this.searchText.length<2)
      {
        url = `/ecommerce/getCatalog`;
      }
      else
      {
        url = `/ecommerce/searchCatalog?searchText=${encodeURIComponent(this.searchText)}`
      }
      try {
        const res = await axios.get(url);
        if (res.status === 200) {
          // console.log(res.data);
          this.data = res.data.data;
          this.suggestData = res.data.suggest;
          this.length = this.data.length;
          if(this.searchText.length<2)
          {
            this.getError = null;
          }
          else
          {
            this.searchError = null;
          }
        } else {
          if(this.searchText.length<2)
          {
            this.getError = res.data.message;
          }
          else
          {
            this.searchError = res.data.message;
          }
        }
      } catch (e) {
        if(this.searchText.length<2)
        {
          this.getError = e.response.data.message;
        }
        else
        {
          this.searchError = e.response.data.message;
        }
      }
    }
  },
  computed:{
    sortedData:function() {
      return this.data.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
    }
  }
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
