<template>
  <transition name="fade">
    <div
      v-if="displayCondition"
      @keydown.esc="closeClickHandler"
      class="modal"
      tabindex="0"
    >
      <div class="modal__close">
        <button
          @click="closeClickHandler"
          class="button button--link"
        >
          Close
        </button>
      </div>
      <div class="modal__body">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      displayCondition: {
        type: Boolean
      },
      closeClickHandler: {
        type: Function
      }
    }
  }
</script>

<style>

</style>
