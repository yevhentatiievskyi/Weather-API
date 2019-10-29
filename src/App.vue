<template>
  <div id="app" class="container">
    <h1 class="text-center mt-4 mb-4 text-primary">Weather API</h1>
    <multiselect
            v-model="list"
            :multiple="true"
            :options="cities"
            :taggable="true"
            placeholder="Please, choose the city to pin a widget"
            @tag="addCity"
            @select="select"
            @remove="remove" />
    <div class="row justify-content-around pt-2 pb-2">
      <b-spinner
          class="position-absolute"
          variant="primary"
          type="grow"
          v-if="processing" />
    </div>
    <div class="row justify-content-around mt-4">
      <div v-if="list.length">
        <widget v-for="city in list"
            @unsubscribe="remove"
            :key="city"
            :city="city"/>
      </div>
      <div v-else class="text-muted">
        The list of subscriptions is empty
      </div>
    </div>
  </div>
</template>

<script>
import Widget from './components/Widget'
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('weather');

import {
  ADD_TO_WEATHER_LIST,
  ADD_TO_CITY_LIST,
  REMOVE_FROM_WEATHER_LIST,
  GET_WEATHER
} from './store/constants';

export default {
  name: 'app',
  data () {
    return {
      list: [],
      processing: false
    }
  },
  components: {
      Widget
  },
  computed: {
    ...mapState([
      'cities'
    ])
  },
  methods: {
    ...mapMutations([
      ADD_TO_WEATHER_LIST,
      ADD_TO_CITY_LIST,
      REMOVE_FROM_WEATHER_LIST
    ]),
    ...mapActions([
      GET_WEATHER
    ]),
    async select (city) {
      try {
        this.processing = true;
        await this[GET_WEATHER](city);
      } catch (e) {
        this.list = this.list.filter(item => item !== city);
        this.$bvToast.toast(e.response.statusText, {
          title: `Error ${e.response.status}`,
          variant: 'danger',
          solid: true
        })
      } finally {
        this.processing = false;
      }
    },
    addCity(city) {
      this.list.push(city);
      this[ADD_TO_CITY_LIST](city);
      this.select(city);
    },
    remove (city) {
      this.list = this.list.filter(item => item !== city);
      this[REMOVE_FROM_WEATHER_LIST](city);
    }
  }
}
</script>
