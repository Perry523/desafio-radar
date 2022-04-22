<template>
  <b-input-group id="search-box">
    <b-form-input v-model="search" class="brder-right-0"></b-form-input>
    <b-input-group-append is-text>
      <b-icon-search />
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  watch: {
    search(value) {
      this.$emit("search", value);
    },
  },
};
</script>

<style lang="scss">
#search-box {
  .input-group-text {
    background-color: transparent;
  }
}
</style>
