import axios from 'axios';

const baseURL = typeof window === 'undefined'
  ? process.env.API_URL
  : process.env.NEXT_PUBLIC_API_URL;

const client = axios.create({
  baseURL: `${String(baseURL)}/api/`,
});

export default client;
