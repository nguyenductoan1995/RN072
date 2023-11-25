import axios from 'axios';
// import CONFIG from 'react-native-config';

const instance = axios.create({
  baseURL: 'http://', // CONFIG.API_URL,
  // TIME_OUT: 5000, // parseInt(CONFIG.TIME_OUT),
});

export function setDefaultHeaders(headers: any) {
  Object.keys(headers).forEach(key => {
    instance.defaults.headers.common[key] = headers[key];
  });
}

export default instance;
