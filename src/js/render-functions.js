import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[character];
  });
}

export function createGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-item">
          <a class="gallery-link" href="${escapeHtml(largeImageURL)}">
            <img
              class="gallery-image"
              src="${escapeHtml(webformatURL)}"
              alt="${escapeHtml(tags)}"
              loading="lazy"
            >
          </a>
          <ul class="info">
            <li class="info-item"><span>Likes</span><span>${likes}</span></li>
            <li class="info-item"><span>Views</span><span>${views}</span></li>
            <li class="info-item"><span>Comments</span><span>${comments}</span></li>
            <li class="info-item"><span>Downloads</span><span>${downloads}</span></li>
          </ul>
        </li>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}
