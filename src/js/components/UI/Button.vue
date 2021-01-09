<template>
  <button
    :class="buttonClasses"
    v-text="buttonText"
    :disabled="disabledState"
    class="button"
    tabindex="0"
  />
</template>

<script>
  export default {
    props: {
      buttonClasses: {
        type: String
      },
      text: {
        type: String
      },
      isDisabled: {
        type: Boolean
      }
    },
    computed: {
      buttonText() {
        return this.text ? this.text : 'Submit';
      },
      disabledState() {
        return this.isDisabled || this.isLoading;
      }
    }
  }
</script>

<style>

</style>
