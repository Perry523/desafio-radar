export default {
  pushIntoSelectedList(state, { product, list }) {
    console.log(list);
    list.push(product);
    this.$toast.success("Produto adicionado");
  },
  removeFromSelectedList(state, { list, i }) {
    list.splice(i, 1);
    this.$toast.success("Produto removido");
  },
};
