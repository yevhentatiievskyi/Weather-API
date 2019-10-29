const express = require("express");
const axios = require('axios');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const WEATHER_API_KEY = '839cf81f09a2b478e1d82492e77953de';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

async function getWeather (request, response) {
    try {
      const params = {
        q: request.params.city,
        APPID: WEATHER_API_KEY
      };
      const weather = await axios.get(WEATHER_API_URL, { params });
      return response.json(weather.data);
    }
    catch (e) {
      console.log(e.message);
    }
}

app.use('/v1/weather/:city', getWeather);

app.listen(3006);
