import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import { GOOGLE_API_KEY } from '../../configs/configs'

Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_API_KEY,
    language: 'en',
  },
});