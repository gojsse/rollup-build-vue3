<template>
  <div
    :class="pieClass"
    :style="style"
    class="pie"
  />
</template>

<script>
export default {
  props: {
    percentage: {
      type: Number,
    },
    colors: {
      type: Object,
      default: () => {
        return {
          empty: '',
          filled: '',
        }
      }
    },
  },
  computed: {
    deg() {
      return (this.percentage / 100) * 360;
    },
    pieClass() {
      return this.deg === 360 ? 'pie--complete' : null;
    },
    style() {
      return this.deg !== 0 && this.deg !== 360
        ? `background: conic-gradient(black 0deg ${this.deg}deg, transparent ${this.deg}deg);`
        : null;
    },
  },
}
</script>

<style>

</style>
