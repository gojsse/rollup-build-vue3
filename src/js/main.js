// import Vue from 'vue';
import { createApp, h } from "vue";
import store from './store/index';
import App from './App.vue';

// Output svg icons
// const svgIcons = window.svgIcons;
// const appElement = document.getElementById('tree');
// appElement.insertAdjacentHTML('beforebegin', svgIcons);

// TODO SVG?
// TODO data vue instance
// TODO debug

const data = {
  'appVersion': '0.0.1',
  'debug': true,
}

const app = createApp({
  data() {
    return data;
  },
  render: () => h(App),
});
app.use(store);
app.mount('#app');
