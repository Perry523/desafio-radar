<template>
  <b-card
    body-class="py-0 d-flex flex-sm-column"
    id="product-card"
    class="shadow border-0 d-flex flex-md-column"
  >
    <b-col class="flex-0" sm="12" cols="6">
      <b-card-img
        class="card-img-top"
        style="height: 140px"
        :src="product.image"
      />
    </b-col>
    <b-card-body class="col-6 col-sm-12 px-1 py-2 d-flex flex-column">
      <b-card-title title-tag="h6" class="ellipsis-second-line">
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
          <b-button variant="link"><b-icon :icon="button.icon" /></b-button>
        </b-col>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      actionButtons: [{ icon: "heart" }, { icon: "cart" }],
    };
  },
};
</script>

<style lang="scss">
#product-card {
  @media screen and (min-width: 600px) {
    .card {
      height: 280px;
    }
    .flex-0 {
      flex: 0;
    }
  }
}
</style>
