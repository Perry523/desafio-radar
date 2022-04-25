import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getProductsIdsByList: "products/getIdsBySelectedList",
    }),
    favoriteProductIds() {
      return this.getProductsIdsByList("favorites");
    },
    productIdsOnCart() {
      return this.getProductsIdsByList("cart");
    },
  },
};
