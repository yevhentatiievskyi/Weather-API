import axios from 'axios';
import { FAKER_URL } from '../../configs/configs'

export default axios.create({
  baseURL: FAKER_URL
});
