<template>
  <b-navbar>
    {{ cart.length }}
    {{ favorites.length }}
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getProductsByList: "products/getAllBySelectedList",
    }),
    cart() {
      return this.getProductsByList("cart");
    },
    favorites() {
      return this.getProductsByList("favorites");
    },
  },
};
</script>
