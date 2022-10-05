import Notiflix from 'notiflix';
const axios = require('axios').default;
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSearchResult);
refs.gallery.addEventListener('click', onGetLargeImage);
refs.loadMore.addEventListener('click', onLoadMore);

let PAGE = 1;
let DATA = '';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function onLoadMore() {
  onAxiosGetValue();
}

function onSearchResult(e) {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.searchQuery.value;
  DATA = searchQuery;
  PAGE = 1;
  onAxiosGetValue();
  onClearHTMLmarkup();
}
const options = {
  API_KEY: 'key=30083397-78010dc0c03f4e3cc974487c6',
  per_page: 40,
  orientation: 'orientation=horizontal',
  image_type: 'image_type=photo',
  safesearch: 'safesearch=true',
};
async function onAxiosGetValue() {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?${options.API_KEY}&q=${DATA}&${options.orientation}&${options.image_type}&${options.safesearch}&page=${PAGE}&per_page=${options.per_page}`
    );
    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.loadMore.classList.remove('active');
      onClearHTMLmarkup();
    } else {
      onRenderGallery(response.data.hits);
      PAGE += 1;
      refs.loadMore.classList.add('active');
      lightbox.refresh();
      Notiflix.Notify.info(
        `Hooray! We found ${response.data.totalHits} images.`
      );
    }

    if (response.status === 400) {
      throw new Error(response.status);
    }
  } catch {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    refs.loadMore.classList.remove('active');
  }
}

function onRenderGallery(searchResult) {
  const markupGallery = searchResult
    .map(search => {
      return `<div class="photo-card">
        <a href="${search.largeImageURL}"><img class='photo-card__img' src="${search.webformatURL}" alt="${search.tags}" loading="lazy"/></a>
        <div class="info">
            <p class="info-item">
              <b>Likes:</b><br>${search.likes}
            </p>
            <p class="info-item">
              <b>Views:</b><br>${search.views}
            </p>
            <p class="info-item">
              <b>Comments:</b><br>${search.comments}
            </p>
            <p class="info-item">
              <b>Downloads:</b><br>${search.downloads}
            </p>
        </div>
  </div>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markupGallery);
}
//===============================RESET MARKUP=======================================
function onClearHTMLmarkup() {
  refs.gallery.innerHTML = '';
}
//===============================SLIDER==============================================

function onGetLargeImage(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
}
