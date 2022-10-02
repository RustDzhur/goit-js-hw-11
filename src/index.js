import Notiflix from 'notiflix';
const axios = require('axios').default;
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSearchResult);

function onSearchResult(e) {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.searchQuery.value;
  onAxiosGetValue(searchQuery);
}

function onAxiosGetValue(data) {

  axios
    .get(
      `https://pixabay.com/api/?key=30083397-78010dc0c03f4e3cc974487c6&q=${data}&orientation=horizontal&image_type=photo&safesearch=true`
    )
    .then(searchResult => {
      if (searchResult.data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        onClearHTMLmarkup();
        onRenderGallery(searchResult.data.hits);
      }
    })
    .catch(() => {
      onClearHTMLmarkup();
      console.log(error)
    });
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
  refs.gallery.insertAdjacentHTML('afterbegin', markupGallery);
}

function onClearHTMLmarkup() {
  refs.gallery.innerHTML = '';
}

//*=============================================================================
//! ТУТ НЕ ПОЛУЧАЕТСЯ СДЕЛАТЬ УВЕЛИЧЕНИЕ КАРТИНОК

refs.gallery.addEventListener('click', onGetLargeImage);

function onGetLargeImage(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
lightbox.refresh();
