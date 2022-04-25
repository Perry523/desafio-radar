<template>
  <b-sidebar
    @change="updateState"
    v-model="drawerLocalState"
    :title="drawerData.name"
    right
    shadow
    class="d-flex flex-column"
  >
    <div class="px-2 py-2">
      <div
        class="d-flex px-0 col"
        v-for="(product, i) in drawerData.list"
        :key="i"
      >
        <b-checkbox
          :checked="!drawerGlobalState"
          @change="toggleProductIntoSelected({ checked: $event, product, i })"
          v-if="drawerData.name === 'Favorites'"
          :disabled="productIdsOnCart.includes(product.id)"
        />
        <product-card
          :product="product"
          isCartCard
          :productIdsOnCart="productIdsOnCart"
          class="mb-1 col"
          @remove-product="
            removeProduct({
              productIndex: i,
              list: drawerData.listName,
              selectedList: drawerData.list,
            })
          "
        />
      </div>
    </div>
    <div
      v-if="drawerData.name === 'Cart'"
      class="h6 justify-content-around flex-wrap mx-3"
    >
      <template v-if="!emptyState">
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
      </template>
      <div class="text-center" v-else>No products</div>
    </div>
    <div v-else>
      <b-button
        v-if="!emptyState"
        @click="addItemsIntoCart"
        class="mt-3"
        block
        pill
        variant="warning text-white"
        >Add into cart</b-button
      >
    </div>
  </b-sidebar>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import productIds from "@/mixins/products";
export default {
  data() {
    return {
      drawerLocalState: false,
      selectedProducts: [],
    };
  },
  computed: {
    ...mapGetters({
      drawerGlobalState: "drawer/getState",
      drawerData: "drawer/getData",
      allPrices: "products/getTotalPrice",
    }),
    emptyState() {
      return !this.drawerData.list.length;
    },
    prices() {
      return [
        { text: "Products Price", value: this.allPrices.products },
        { text: "Tax 5%", value: this.allPrices.tax },
        { text: "Total", value: this.allPrices.total },
      ];
    },
  },
  mixins: [productIds],
  watch: {
    drawerGlobalState(value) {
      this.drawerLocalState = value;
      this.selectedProducts = [];
    },
  },
  methods: {
    ...mapMutations({
      setDrawerGlobalState: "drawer/setState",
      setDrawerData: "drawer/setData",
      removeFromSelectedList: "products/removeFromSelectedList",
      clearCart: "products/clearCart",
    }),
    ...mapActions({
      pushIntoSelectedList: "products/pushIntoSelectedList",
    }),
    toggleProductIntoSelected({ checked, product, i }) {
      if (checked) {
        this.selectedProducts.push(product);
      } else this.selectedProducts.splice(i, 1);
    },
    addItemsIntoCart() {
      this.selectedProducts.forEach((product) => {
        this.pushIntoSelectedList({
          product,
          list: "cart",
        });
      });
      this.drawerLocalState = false;
      this.selectedProducts = [];
    },
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
