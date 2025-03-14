// api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mydrive-epwm.onrender.com/api/v1', // Replace with your backend server's URL
  timeout: 10000, // Optional timeout
});

export default instance;
