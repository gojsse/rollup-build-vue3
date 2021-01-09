<template>
  <div class="loading">
    <div v-if="isAuthorized && loadingScreenText">
      <h2
        v-html="loadingScreenText"
        class="hdg"
      />
    </div>

    <div v-if="!isAuthorized">
      <h2
        v-html="'Connecting you to rewards...'"
        class="hdg"
      />
    </div>

    <div class="loading__ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'isAuthorized',
        'loadingScreenText',
      ]),
    },
  }
</script>

<style>

</style>
