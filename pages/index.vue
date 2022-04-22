<template>
  <b-container>
    <b-row class="mb-3">
      <b-col class="h5"> All Products ({{ products.length }}) </b-col>
      <b-col sm="6" md="4" lg="3">
        <search-products-input />
      </b-col>
    </b-row>
    <b-row>
      <b-col
        class="mb-1 mb-sm-3"
        sm="6"
        md="4"
        lg="3"
        v-for="(product, i) in products"
        :key="i"
      >
        <product-card
          :favoriteProductIds="favoriteProductIds"
          :productIdsOnCart="productIdsOnCart"
          :product="product"
        />
      </b-col>
    </b-row>
    <b-overlay :show="loading" no-wrap />
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "IndexPage",
  data() {
    return {
      products: [],
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      getProductsIdsByList: "products/getIdsBySelectedList",
    }),
    // if we get ids inside product card directly, getter will be triggered many times
    // that way we run just one time and pass to child
    favoriteProductIds() {
      return this.getProductsIdsByList("favorites");
    },
    productIdsOnCart() {
      return this.getProductsIdsByList("cart");
    },
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
