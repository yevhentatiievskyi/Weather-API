const express = require("express");
const axios = require('axios');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const WEATHER_API_KEY = '839cf81f09a2b478e1d82492e77953de';
const PORT = '3006';

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
      response.status(200).json(weather.data);
    }
    catch (e) {
      response.status(e.response.status).json(e);
    }
}

app.use('/v1/weather/:city', getWeather);
console.log(`Server started on port ${PORT}`);
app.listen(PORT);
