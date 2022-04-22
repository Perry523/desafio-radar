export default {
  getAllBySelectedList: (state) => (list) => {
    return state[list];
  },
  getIdsBySelectedList: (state) => (list) => {
    return state[list].map((product) => product.id);
  },
};
