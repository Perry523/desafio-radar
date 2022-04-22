<template>
  <b-card
    body-class="py-0 px-2 d-flex flex-sm-column"
    id="custom-card"
    class="shadow border-0 d-flex flex-md-column"
  >
    <b-col class="flex-0" sm="12" cols="6">
      <b-card-img
        class="card-img-top px-sm-4 p-3"
        style="height: 150px"
        :src="product.image"
      />
    </b-col>
    <b-card-body
      class="col-6 col-sm-12 px-1 pb-0 pt-2 py-sm-0 d-flex flex-column"
    >
      <b-card-title title-tag="h6">
        {{ product.title }}
      </b-card-title>
      <b-card-text class="mt-2 mb-0">
        <b-row class="justify-content-between">
          <b-col class="font-weight-bold"> ${{ product.price }} </b-col>
          <b-col
            v-b-tooltip.hover
            :title="`Reviewed by ${product.rating.count} people`"
            id="tooltip"
            class="d-flex align-items-center"
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
      <div class="justify-content-between d-flex mt-auto">
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
import { mapActions } from "vuex";
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
  },
  computed: {
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

<style lang="scss">
@media screen and (min-width: 600px) {
  .card {
    height: 280px;
  }
  .flex-0 {
    flex: 0;
  }
  .card-title {
    -webkit-line-clamp: 2 !important;
  }
}
.card-title {
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin-bottom: 0;
}
</style>
