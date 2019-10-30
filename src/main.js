import Vue from 'vue';
import App from './App.vue';

import Multiselect from 'vue-multiselect';
import BootstrapVue from 'bootstrap-vue';

import store from './store';
import router from './plugins/router';
import moment from 'moment';

import './plugins/gmaps';

Vue.use(BootstrapVue);
Vue.component('multiselect', Multiselect);

window.moment = moment;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');

import 'assets/scss/index.scss';
