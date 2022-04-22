export default {
  pushIntoSelectedList({ state, commit }, { product, list }) {
    commit("pushIntoSelectedList", {
      selectedList: state[list],
      list,
      product,
    });
  },
  removeFromSelectedList({ state, commit }, { product, list }) {
    state[list].some((savedProduct, productIndex, selectedList) => {
      if (savedProduct.id === product.id) {
        commit("removeFromSelectedList", {
          selectedList,
          list,
          productIndex,
        });
        return true;
      } else return false;
    });
  },
};
