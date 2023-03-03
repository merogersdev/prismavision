import axios from 'axios';

const url = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    Accept: 'application/json',
  },
});

export default axiosInstance;
