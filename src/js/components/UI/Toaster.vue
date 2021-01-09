<template>
  <transition name="slide-down">
    <div
      v-show="showToast"
      @click="hideToast"
      ref="toaster"
      class="toaster"
    >
      <h5
        v-html="showToastContent"
        class="hdg hdg--5"
      />
      <button class="button button--link button--small">Dismiss this message</button>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    displayCondition: {
      type: Boolean
    },
    closeClickHandler: {
      type: Function
    }
  },
  data() {
    return {
      hideTimeOut: null,
    }
  },
  computed: {
    ...mapGetters([
      'showToast',
      'showToastContent',
    ]),
  },
  methods: {
    ...mapMutations([
      'setShowToast'
    ]),
    hideToast() {
      this.setShowToast({display: false, content: null});
    },
  },
  watch: {
    showToast(value) {
      if (value === true) {
        this.$nextTick(() => {
          this.hideTimeOut = setTimeout(() => {
            this.setShowToast({display: false, content: null});
          }, 8000);
        });
      } else {
        clearTimeout(this.hideTimeOut);
      }
    }
  }
}
</script>

<style>

</style>
