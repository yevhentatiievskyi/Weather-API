import axios from 'axios';

export default axios.create({
  baseURL: process.env.FAKER_URL
});
