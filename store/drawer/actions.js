export default {
  toggleState({ state, commit }) {
    commit("setState", !state.isActive);
  },
};
