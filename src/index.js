import { onAxiosGetValue } from './js/pixabay-api';
import { onSearchResult } from './js/pixabay-api';

export {onRenderGallery};
export {onClearHTMLmarkup};
export {refs};


const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSearchResult);
refs.gallery.addEventListener('click', onGetLargeImage);
refs.loadMore.addEventListener('click', onLoadMore);



function onLoadMore() {
  onAxiosGetValue();
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


//===============================RESET MARKUP=======================
function onClearHTMLmarkup() {
  refs.gallery.innerHTML = '';
}
//===============================SLIDER=============================

function onGetLargeImage(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
}
