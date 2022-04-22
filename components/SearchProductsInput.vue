<template>
  <b-input-group id="search-box">
    <b-form-input class="border-right-0"></b-form-input>
    <b-input-group-append is-text>
      <b-icon-search />
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {};
</script>

<style lang="scss">
#search-box {
  .input-group-text {
    background-color: transparent;
  }
}
</style>
