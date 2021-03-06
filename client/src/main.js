import Vue from 'vue';
import vueHeadful from 'vue-headful';
import VueLazyload from 'vue-lazyload';
import { Base64 } from 'js-base64';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './services/socket';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';


import ErrorView from './components/ErrorView.vue';
import LoadingView from './components/LoadingView.vue';

Vue.config.productionTip = false;

Vue.prototype.$Base64 = Base64;

Vue.use(VueLazyload, {
  error: store.state.defaultAlbumArtURL,
  loading: store.state.defaultAlbumArtURL,
});
Vue.component('vue-headful', vueHeadful);
Vue.component('ErrorView', ErrorView);
Vue.component('LoadingView', LoadingView);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    // initialize settings data
    this.$store.dispatch('loadSettings');
    if (!navigator.onLine) {
      store.commit('SET_HAS_ERROR', true);
      store.commit('SET_ERROR_MESSAGE', 'It looks like you are not connected to a local network.');
    }
  },
}).$mount('#app');
