import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const searchInput = form.elements['search-text'];

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (!Array.isArray(data.hits)) {
        throw new Error('Pixabay returned an invalid response.');
      }

      if (data.hits.length === 0) {
        iziToast.info({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      createGallery(data.hits);
    })
    .catch(error => {
      if (error.code === 'PIXABAY_API_KEY_MISSING') {
        iziToast.error({
          message:
            'Add your Pixabay key as VITE_PIXABAY_API_KEY in the .env.local file, then restart Vite.',
          position: 'topRight',
          timeout: 7000,
        });
        return;
      }

      iziToast.error({
        message: 'Could not load images. Check your connection and try again.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });
});
