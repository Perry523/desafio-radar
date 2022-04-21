<template>
  <b-container>
    <b-row>
      <b-col class="h5"> All Products ({{ products.length }}) </b-col>
      <b-col sm="6" md="4" lg="3">
        <search-products-input />
      </b-col>
    </b-row>
    <b-row>
      <b-col
        class="mb-3"
        sm="6"
        md="4"
        lg="3"
        v-for="(product, i) in products"
        :key="i"
      >
        <product-card :product="product" />
      </b-col>
    </b-row>
    <b-overlay :show="loading" no-wrap />
  </b-container>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      products: [],
      loading: false,
    };
  },
  async mounted() {
    this.products = await this.getProducts();
  },
  methods: {
    async getProducts() {
      this.loading = true;
      const products = await this.$axios.$get(
        "https://fakestoreapi.com/products"
      );
      this.loading = false;
      return products;
    },
  },
};
</script>
