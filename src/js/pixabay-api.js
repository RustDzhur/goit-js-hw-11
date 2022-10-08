import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const axios = require('axios').default;

import { refs } from '../index';
import { onRenderGallery } from '../index';
import {onClearHTMLmarkup} from '../index'
export {onAxiosGetValue};
export {onSearchResult};

let PAGE = 1;
let DATA = '';

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  function onSearchResult(e) {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.searchQuery.value;
    DATA = searchQuery;
    PAGE = 1;
    onAxiosGetValue();
    onClearHTMLmarkup();
    refs.loadMore.classList.remove('active');
  }

async function onAxiosGetValue() {
    const options = {
      API_KEY: 'key=30083397-78010dc0c03f4e3cc974487c6',
      per_page: 40,
      orientation: 'orientation=horizontal',
      image_type: 'image_type=photo',
      safesearch: 'safesearch=true',
    };
  
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?${options.API_KEY}&q=${DATA}&${options.orientation}&${options.image_type}&${options.safesearch}&page=${PAGE}&per_page=${options.per_page}`
      );
  
      if (response.data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        refs.loadMore.classList.remove('active');
      } 
      if (response.data.hits.length !== 0) {
        Notiflix.Notify.info(
          `Hooray! We found ${response.data.totalHits} images.`
        );
        onRenderGallery(response.data.hits)
        PAGE += 1;
        refs.loadMore.classList.add('active');
        lightbox.refresh();
      }
      if (response.data.hits.length < options.per_page) {
        Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
          refs.loadMore.classList.remove('active');
      }
      
    } catch (error) {
      if (error.response.status === 400) {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        refs.loadMore.classList.remove('active');
      }
    }
  }


