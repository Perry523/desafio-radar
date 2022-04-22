export default {
  setState(state, payload) {
    console.log("payload", payload);
    state.isActive = payload;
    console.log(state.isActive);
  },
  setData(state, payload) {
    state.data = payload;
  },
};
