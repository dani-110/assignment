import axios from 'axios';

const baseUrl = 'https://ovsccserver.kozow.com:8002/api/client';
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;