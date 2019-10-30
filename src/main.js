import Vue from 'vue';
import App from './App.vue';

import Multiselect from 'vue-multiselect';
import BootstrapVue from 'bootstrap-vue';

import store from './store';
import router from './plugins/router';
import moment from 'moment';

Vue.use(BootstrapVue);
Vue.component('multiselect', Multiselect);

window.moment = moment;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
