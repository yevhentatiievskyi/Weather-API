import * as moment from "../main";

const axios = require('axios');

import {
    ADD_TO_WEATHER_LIST,
    REMOVE_FROM_WEATHER_LIST,
    GET_WEATHER,
    GET_WEATHER_BY_CITY,
    ADD_TO_CITY_LIST
} from './constants';

import { FAKER_URL } from '../../configs/configs'
import { Vue } from 'vue';

const state = {
    cities: [
      'New York',
      'Tokyo',
      'London',
      'Paris',
      'Berlin'
    ],
    weather: {}
};

const mutations = {
    [ADD_TO_WEATHER_LIST]: (state, {city, forecast}) => state.weather = {...state.weather, [city]: forecast},
    [REMOVE_FROM_WEATHER_LIST]: (state, city) => delete state.weather[city],
    [ADD_TO_CITY_LIST]: (state, city) => state.cities = [...state.cities, city]
};

const getters = {
    [GET_WEATHER_BY_CITY]: state => {
        return city => {
            const weather = state.weather[city];
            console.log(state.weather, city, weather);
            if (!weather) {
                return null;
            }

            return {
                humidity: `${weather.main.humidity} %`,
                pressure: `${weather.main.pressure} hpa`,
                cloudiness: `${weather.weather[0].description}`,
                wind: {
                    speed: `${weather.wind.speed} m/s`,
                    degree: weather.wind.deg
                },
                temperature: ((weather.main.temp - 32) / 1.8).toFixed(2),
                sunrise: weather.sys.sunrise,/*moment.unix(weather.sys.sunrise).format('HH:mm A'),*/
                sunset: weather.sys.sunset,/*moment.unix(weather.sys.sunset).format('HH:mm A'),*/
                ...weather.coord
            }
        }
    }
};

const actions = {
    GET_WEATHER: async ({ commit }, city) => {
        console.log(city);
        try {
            const response = await axios.get(`${FAKER_URL}/weather/${city}`);
            commit(ADD_TO_WEATHER_LIST, { city, forecast: response.data });
        } catch (e) {
            //handle error
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};
