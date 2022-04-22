export default {
  pushIntoSelectedList(state, { product, selectedList, list }) {
    selectedList.push(product);
    this.$toast.success(`Product added into ${list}`);
  },
  removeFromSelectedList(state, { selectedList, list, productIndex }) {
    selectedList.splice(productIndex, 1);
    this.$toast.success(`Product removed from ${list}`);
  },
  clearCart(state) {
    state.cart = [];
  },
};
