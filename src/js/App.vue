<template>
  <div
    :app-version="appVersion"
    class="tree-app"
  >
    <Loader v-if="isLoading" />

    <Debug>
      <p 
        v-html="'Debug mode is active'"
        class="debug__into--text"
      />
      <p
        v-if="responseError"
        v-html="responseError"
        class="debug__into--error-response"
      />
      <p
        v-if="error"
        v-html="error"
        class="debug__into--error"
      />
    </Debug>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex';
  import Debug from '@/components/Debug.vue';
  import Loader from '@/components/UI/Loader.vue';

  export default {
    components: {
      Loader,
      Debug,
    },
    computed: {
      ...mapGetters([
        'isLoading',
        'error',
        'responseError',
      ]),
      appVersion() {
        return this.appVersion;
      }
    },
    methods: {
      ...mapActions([
        'resetAppState',
      ]),
    },
    mounted() {
      // When history changes due to navigation
      window.addEventListener('popstate', () => {
        this.resetAppState();
      });
    },
  };
</script>

<style>

</style>
