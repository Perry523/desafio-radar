<template>
  <b-sidebar
    @change="updateState"
    v-model="drawerLocalState"
    :title="drawerData.name"
    right
    shadow
    class="d-flex flex-column"
  >
    <div class="px-3 py-2">
      <product-card
        :product="product"
        isCartCard
        v-for="(product, i) in drawerData.list"
        :key="i"
        class="mb-1"
        @remove-product="
          removeProduct({
            productIndex: i,
            list: drawerData.listName,
            selectedList: drawerData.list,
          })
        "
      />
    </div>
    <div
      v-if="drawerData.name === 'Cart' && allPrices.products"
      class="h6 justify-content-around flex-wrap mx-3"
    >
      <b-row class="mb-2" v-for="(price, i) in prices" :key="i">
        <b-col>{{ price.text }}</b-col>
        <b-col class="text-right font-weight-bold">{{ price.value }}</b-col>
      </b-row>
      <b-button
        @click="finishOrder"
        class="mt-3"
        block
        pill
        variant="warning text-white"
        >Finish order</b-button
      >
    </div>
  </b-sidebar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      drawerLocalState: false,
    };
  },
  computed: {
    ...mapGetters({
      drawerGlobalState: "drawer/getState",
      drawerData: "drawer/getData",
      allPrices: "products/getTotalPrice",
    }),
    prices() {
      return [
        { text: "Products Price", value: this.allPrices.products },
        { text: "Tax 5%", value: this.allPrices.tax },
        { text: "Total", value: this.allPrices.total },
      ];
    },
  },
  watch: {
    drawerGlobalState(value) {
      this.drawerLocalState = value;
    },
  },
  methods: {
    ...mapMutations({
      setDrawerGlobalState: "drawer/setState",
      setDrawerData: "drawer/setData",
      removeFromSelectedList: "products/removeFromSelectedList",
      clearCart: "products/clearCart",
    }),
    updateState(value) {
      this.setDrawerGlobalState(value);
    },
    removeProduct({ productIndex, list, selectedList }) {
      this.removeFromSelectedList({
        productIndex,
        list,
        selectedList,
      });
    },
    finishOrder() {
      this.setDrawerGlobalState(false);
      this.clearCart();
      this.$toast.success("Finished");
    },
  },
};
</script>

<style></style>
