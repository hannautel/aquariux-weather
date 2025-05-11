import axios from 'axios';

function getApiRootUrl() {
  return import.meta.env.VITE_BASE_API_URL;
}

export const initAxios = () => {
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.baseURL = `${getApiRootUrl()}`;
};
