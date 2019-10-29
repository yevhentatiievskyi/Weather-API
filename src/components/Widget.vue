<template>
    <div v-if="statistics">
      <b-card
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2 bg-muted">
          <b-card-text>
            <div class="d-flex justify-content-between mb-3">
                <div class="bg-primary"><img :src="statistics.img"></div>
              <div class="text-primary h4">{{city}}</div>
              <div class="h4">{{statistics.temp}} &#8451;</div>
            </div>
            <hr>
            <div class="d-flex justify-content-between mb-3"
                 v-for="(item, key) in statistics"
                :key="key">
              <div>{{ key | uppercased }}</div>
              <div v-html="item"></div>
            </div>
          </b-card-text>

          <div class="text-right mt-4">
            <b-button variant="danger" @click="unsubscribe">
              Unsubscribe
            </b-button>
          </div>
      </b-card>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import {
  GET_CITIES,
  GET_WEATHER_BY_CITY
} from '../store/constants';

const { mapGetters, mapActions } = createNamespacedHelpers('weather');

export default {
  name: 'Widget',
  props: {
    city: {
      required: true,
      type: String
    }
  },
  filters: {
    uppercased () {

    }
  },
  computed: {
    ...mapGetters([
      GET_WEATHER_BY_CITY
    ]),
    statistics () {
      return this[GET_WEATHER_BY_CITY](this.city);
    }
  },
  created () {
    this[GET_CITIES]();
  },
  methods: {
    unsubscribe () {
      this.$emit('unsubscribe', this.city);
    }
  }
}
</script>
