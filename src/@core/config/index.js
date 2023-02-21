import axios from 'axios';

const baseUrl = 'http://127.0.0.1:7999/api/client';
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;