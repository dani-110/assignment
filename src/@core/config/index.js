import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3/movie';
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});
export default instance;