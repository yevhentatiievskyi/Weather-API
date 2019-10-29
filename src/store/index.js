import Vuex from 'vuex';
import modules from './modules';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
      weather: modules
    }
});
