<template>
  <b-navbar variant="light" class="mx-2 py-0 mb-2">
    <b-navbar-brand class="mr-auto">
      <b-img src="favicon.ico" height="70px"> </b-img>
    </b-navbar-brand>
    <b-row>
      <template v-for="(button, i) in actionButtons">
        <b-button
          @click="updateDrawerState(button)"
          v-b-toggle.sidebar
          :key="i"
          variant="link"
        >
          <b-icon :icon="button.icon" />
        </b-button>
        <b-badge
          :key="button.icon"
          pill
          class="h6 mb-4 cart-badge"
          variant="danger"
          >{{ button.list.length }}</b-badge
        >
      </template>
    </b-row>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
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
    actionButtons() {
      return [
        {
          icon: "heart-fill",
          list: this.favorites,
          variant: "danger",
          name: "Favorites",
          listName: "favorites",
        },
        {
          icon: "cart",
          list: this.cart,
          variant: "info",
          name: "Cart",
          listName: "cart",
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      toggleDrawerState: "drawer/toggleState",
    }),
    ...mapMutations({
      setDrawerData: "drawer/setData",
    }),
    updateDrawerState(data) {
      this.toggleDrawerState();
      this.setDrawerData(data);
    },
  },
};
</script>
<style>
.cart-badge {
  margin-left: -13px;
}
</style>
