<template>
  <audio
    v-if="settings.playSounds"
    :src="source"
    ref="audio"
    controls="none"
    preload="auto"
    style="display: none"
  />
</template>

<script>
import { mapGetters } from 'vuex';
const rootUrl = 'http://js.local:8888/tree/dist/audio/';

export default {
  props: {
    file: {
      type: String
    },
    playSound: {
      type: Boolean
    },
  },
  computed: {
    ...mapGetters([
      'settings',
    ]),
    source() {
      return rootUrl + this.file;
    },
  },
  methods: {
    play() {
      this.$refs.audio.play();
    },
    stop() {
      this.$refs.audio.stop();
    },
  },
  watch: {
    playSound(value) {
      value === true ? this.play() : null;//this.stop(); 
    },
  },
}
</script>

<style>

</style>