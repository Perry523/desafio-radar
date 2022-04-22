<template>
  <div>
    <b-row class="mb-3 mx-0">
      <b-col class="h5"> All Products ({{ filteredProducts.length }}) </b-col>
      <b-col sm="6" md="4" lg="3">
        <search-products-input @search="search = $event" />
      </b-col>
    </b-row>
    <b-row>
      <b-col
        class="mb-1 mb-sm-3"
        sm="6"
        md="4"
        lg="3"
        v-for="(product, i) in filteredProducts"
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "IndexPage",
  data() {
    return {
      allProducts: [],
      loading: false,
      search: "",
    };
  },
  async mounted() {
    this.allProducts = await this.getProducts();
  },
  computed: {
    ...mapGetters({
      getProductsIdsByList: "products/getIdsBySelectedList",
    }),
    filteredProducts() {
      return this.allProducts.filter((product) => {
        const productTitle = product.title.toLowerCase();
        const searchText = this.search.toLowerCase();
        return productTitle.includes(searchText);
      });
    },
    // if we get ids inside product card directly, getter will be triggered many times
    // that way we run just one time and pass to child
    favoriteProductIds() {
      return this.getProductsIdsByList("favorites");
    },
    productIdsOnCart() {
      return this.getProductsIdsByList("cart");
    },
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
