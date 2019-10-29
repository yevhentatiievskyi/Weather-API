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
            if (!weather) {
                return null;
            }

            console.log(moment.unix(weather.sys.sunrise));

            return {
                humidity: `${weather.main.humidity} %`,
                pressure: `${weather.main.pressure} hpa`,
                cloudiness: `${weather.weather[0].description}`,
                wind: {
                    speed: `${weather.wind.speed} m/s`,
                    degree: weather.wind.deg
                },
                temp: Math.ceil(weather.main.temp - 272.15),
                /*sunrise: moment.unix(weather.sys.sunrise).format('hh:mm A'),
                sunset: moment.unix(weather.sys.sunset).format('hh:mm A'),*/
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
