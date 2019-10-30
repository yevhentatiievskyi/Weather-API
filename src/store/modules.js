import axios from '../plugins/axios';

import {
    ADD_TO_WEATHER_LIST,
    REMOVE_FROM_WEATHER_LIST,
    GET_WEATHER,
    GET_CITIES,
    GET_WEATHER_BY_CITY,
    ADD_TO_CITY_LIST,
    SET_CITY_LIST,
} from './constants';

const { WEATHER_API_IMG } = process.env;
import Vue from 'vue';

const state = {
    cities: [],
    weather: {}
};

const mutations = {
    [ADD_TO_WEATHER_LIST]: (state, {city, forecast}) => Vue.set(state.weather, city, forecast),
    [REMOVE_FROM_WEATHER_LIST]: (state, city) => Vue.delete(state.weather, city),
    [ADD_TO_CITY_LIST]: (state, city) => state.cities = [...state.cities, city],
    [SET_CITY_LIST]: (state, cities) => state.cities = cities
};

const getters = {
    [GET_WEATHER_BY_CITY]: state => {
        return city => {
            const weather = state.weather[city];
            if (!weather) {
                return null;
            }

            return {
                title: {
                    img: `${WEATHER_API_IMG}/${weather.weather[0].icon}.png`,
                    temp: `${Math.ceil(weather.main.temp - 272.15)} &#8451;`,
                    ...weather.coord
                },
                data: {
                    humidity: `${weather.main.humidity} %`,
                    pressure: `${weather.main.pressure} hpa`,
                    cloudiness: `${weather.weather[0].main}`,
                    wind: `${weather.wind.speed} m/s ${weather.wind.deg ? `(&nearr; ${+weather.wind.deg})` : ''}`
                }
            }
        }
    }
};

const actions = {
    [GET_CITIES]: async ({ commit }) => {
        try {
            const response = await axios.get('cities');
            commit(SET_CITY_LIST, response.data);
        } catch(e) {
            throw e;
        }
    },
    [GET_WEATHER]: async ({ commit }, city) => {
        try {
            const response = await axios.get(`weather/${city}`);
            commit(ADD_TO_WEATHER_LIST, { city, forecast: response.data });
        } catch(e) {
            throw e;
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
