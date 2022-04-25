<template>
  <b-card
    :body-class="[
      'py-0',
      'px-1',
      'd-flex',
      isCartCard ? ' py-2' : 'flex-sm-column',
    ]"
    id="custom-card"
    class="shadow border-0 position-relative"
    :class="isCartCard ? '' : 'card-height'"
  >
    <b-col
      :class="isCartCard ? '' : 'flex-0'"
      :sm="isCartCard ? '5' : '12'"
      :cols="isCartCard ? '5' : '6'"
    >
      <b-card-img
        :class="isCartCard ? '' : 'px-sm-4 p-3'"
        :style="{ height: isCartCard ? '90px' : '150px' }"
        :src="product.image"
      />
    </b-col>
    <b-card-body
      class="col-6 col-sm-12 px-1 pb-0 pt-2 py-sm-0 d-flex flex-column"
    >
      <b-card-title
        class="ellipsis title-min-height"
        :class="isCartCard ? 'pr-2' : 'ellipsis-third-line'"
        title-tag="h6"
      >
        {{ product.title }}
      </b-card-title>
      <b-card-text class="mt-2 mb-0">
        <b-row class="justify-content-between">
          <b-col cols="auto" class="font-weight-bold">
            ${{ product.price }}
          </b-col>
          <b-col
            v-b-tooltip.hover
            :title="`Reviewed by ${product.rating.count} people`"
            id="tooltip"
            class="d-flex align-items-center"
            :class="isCartCard ? 'px-0' : ''"
            cols="auto"
          >
            <b-icon
              class="mr-1 mb-1"
              icon="star-fill"
              variant="warning"
            ></b-icon>
            <span>{{ product.rating.rate }}</span>
          </b-col>
        </b-row>
      </b-card-text>
      <div v-if="isCartCard">
        <b-button
          size="sm"
          class="remove-product-button"
          variant="link"
          @click="$emit('remove-product', product)"
          ><b-icon variant="danger" icon="trash"></b-icon
        ></b-button>
        <div class="text-danger" v-if="addedIntoCart && favoriteDrawerSelected">
          Already on cart
        </div>
      </div>
      <div v-else class="justify-content-between d-flex mt-auto">
        <b-col v-for="(button, i) in actionButtons" :key="i" cols="auto">
          <b-button
            @click="
              toggleProductInList({
                isAdded: button.isActive,
                list: button.list,
              })
            "
            variant="link"
            ><b-icon
              :icon="`${button.icon}${button.isActive ? '-fill' : ''}`"
              :variant="button.variant"
          /></b-button>
        </b-col>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    productIdsOnCart: {
      type: Array,
      default: () => [],
    },
    favoriteProductIds: {
      type: Array,
      default: () => [],
    },
    isCartCard: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      drawerData: "drawer/getData",
    }),
    actionButtons() {
      return [
        {
          icon: "heart",
          list: "favorites",
          isActive: this.favoriteProductIds.includes(this.product.id),
          variant: "danger",
        },
        {
          icon: "cart",
          list: "cart",
          isActive: this.productIdsOnCart.includes(this.product.id),
          variant: "info",
        },
      ];
    },
    favoriteDrawerSelected() {
      return this.drawerData.name === "Favorites";
    },
    addedIntoCart() {
      return this.productIdsOnCart.includes(this.product.id);
    },
  },
  methods: {
    ...mapActions({
      pushIntoSelectedList: "products/pushIntoSelectedList",
      removeFromSelectedList: "products/removeFromSelectedList",
    }),
    toggleProductInList({ isAdded, list }) {
      if (isAdded)
        this.removeFromSelectedList({
          list,
          product: this.product,
        });
      else
        this.pushIntoSelectedList({
          product: this.product,
          list,
        });
    },
  },
};
</script>
