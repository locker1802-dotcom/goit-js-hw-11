import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY?.trim();

export function getImagesByQuery(query) {
  if (!API_KEY) {
    return Promise.reject(
      Object.assign(new Error('Pixabay API key is not configured.'), {
        code: 'PIXABAY_API_KEY_MISSING',
      })
    );
  }

  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios
    .get(BASE_URL, { params })
    .then(response => response.data);
}