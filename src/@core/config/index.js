import axios from 'axios';

// const baseUrl = 'http://127.0.0.1:7999/api/';
const baseUrl = 'https://d46d-119-152-238-173.in.ngrok.io/api/';
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;