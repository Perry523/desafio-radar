const formatToCurrency = (number) => {
  return new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(number);
};
export default {
  getAllBySelectedList: (state) => (list) => {
    return state[list];
  },
  getIdsBySelectedList: (state) => (list) => {
    return state[list].map((product) => product.id);
  },
  getTotalPrice(state) {
    const TAX = 5;
    const rawProductsPrice = state.cart
      .map((product) => product.price)
      .reduce((a = 0, b = 0) => a + b, 0);
    const productsPrice = formatToCurrency(rawProductsPrice);
    const rawTaxCost = (rawProductsPrice / 100) * TAX;
    const taxCost = formatToCurrency(rawTaxCost);
    const rawTotalPrice = rawProductsPrice + rawTaxCost;
    const totalPrice = formatToCurrency(rawTotalPrice);

    return { total: totalPrice, tax: taxCost, products: productsPrice };
  },
};
