export default {
  pushIntoSelectedList({ state, commit }, { product, list }) {
    commit("pushIntoSelectedList", { list: state[list], product });
  },
  removeFromSelectedList({ state, commit }, { product, list }) {
    state[list].some((selectedProduct, i, selectedList) => {
      if (selectedProduct.id === product.id) {
        commit("removeFromSelectedList", { list: selectedList, i });
        return true;
      } else return false;
    });
  },
};
