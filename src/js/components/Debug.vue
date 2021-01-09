<template>
  <div
    v-if="true"
    class="row row--centered"
  >
    <div class="debug column column--1-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      debugOn() {
        console.log('this.$data', this);
        return this.debug;
      },
    },
  }
</script>

<style>

</style>
