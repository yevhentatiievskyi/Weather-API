<template>
    <div v-if="statistics">
      <b-card
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2">
          <b-card-text>
            <div class="d-flex justify-content-between mb-3">
              <div class="text-primary h4">{{city}}</div>
              <div class="font-weight-bold">{{statistics.temp}} &#8451; </div>
            </div>
            <div class="d-flex justify-content-between">
              <div>Humidity</div>
              <div>{{statistics.humidity}}</div>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
              <div>Pressure</div>
              <div>{{statistics.pressure}}</div>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
              <div>Cloudiness</div>
              <div>{{statistics.cloudiness}}</div>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
              <div>Wind</div>
              <div>{{statistics.wind.speed}} (&nearr; {{statistics.wind.degree}})</div>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
              <div>Coordinates</div>
              <div class="text-success">[{{statistics.lat}}, {{statistics.lon}}]</div>
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
import { mapGetters } from 'vuex';
import {
  GET_WEATHER_BY_CITY
} from '../store/constants';

export default {
  name: 'Widget',
  props: {
    city: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapGetters('weather', [
      GET_WEATHER_BY_CITY
    ]),
    statistics () {
      return this[GET_WEATHER_BY_CITY](this.city);
    }
  },
  methods: {
    unsubscribe () {
      this.$emit('unsubscribe', this.city);
    }
  }
}
</script>
