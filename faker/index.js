const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const configs = require('./configs');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

async function getWeather (request, response) {
 try {
   const params = {
     q: request.params.city,
     APPID: configs.WEATHER_API_KEY
   };
   const weather = await axios.get(configs.WEATHER_API_URL, { params });
   response.status(200).json(weather.data);
 }
 catch (e) {
   response.status(e.response.status).json(e);
 }
}

async function getCities (request, response) {
  const cities = require('./cities');
  return response.status(200).json(cities);
}

app.use('/v1/cities', getCities);
app.use('/v1/weather/:city', getWeather);
console.log(`Server started on port ${configs.PORT}`);
app.listen(configs.PORT);
