import Notiflix from 'notiflix';
const axios = require('axios').default;
import SimpleLightbox from "simplelightbox";


const refs = {
  form : document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
}

refs.form.addEventListener('submit', onSearchResult);

function onSearchResult (e) {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.searchQuery.value;
  onAxiosGetValue (searchQuery)
}

function onAxiosGetValue (data) {
  axios.get(`https://pixabay.com/api/?key=30083397-78010dc0c03f4e3cc974487c6&q=${data}&orientation=horizontal&image_type=photo&safesearch=true`).then(searchResult => onRenderGallery(searchResult.data.hits))
}

function onRenderGallery (searchResult) {
  const markupGallery = searchResult.map((search) => {
    return `<div class="photo-card">
        <img class='photo-card__img'src="${search.webformatURL}" alt="${search.tags}" loading="lazy" />
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
  </div>`
  }).join('')
  refs.gallery.insertAdjacentHTML('afterbegin', markupGallery);
}

