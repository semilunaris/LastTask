import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

// Установка заголовка API-ключа по умолчанию (если требуется)
axios.defaults.headers.common['x-api-key'] = '44711295-058ab59da61cfd57c5d7d8942';
let userData = '';
const key = '44711295-058ab59da61cfd57c5d7d8942';
const container = document.querySelector('.gallery');
const searchEl = document.querySelector('.search-form');
const input = searchEl.querySelector('input[name="searchQuery"]');
let page = 1;

// Настройка прокси
const proxy = {
  host: '127.0.0.1',
  port: 8080
};

// Настройка Axios для работы с прокси-сервером
const instance = axios.create({
  proxy: proxy
});

// Инициализация SimpleLightbox
let lightbox;

function initializeLightbox() {
  if (lightbox) {
    lightbox.destroy(); // Уничтожаем предыдущую инициализацию, если она есть
  }
  lightbox = new SimpleLightbox('.gallery a', {
    // Опции по необходимости
  });
}

// Функция для отправки запроса через прокси
async function fetchImg() {
  const apiUrl = `https://pixabay.com/api/?key=${key}&q=${userData}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;
  try {
    const responce = await instance.get('http://localhost:8080', {
      headers: {
        'x-target-url': apiUrl,
        'Cache-Control': 'no-cache' 
      }
    });
    return responce.data.hits;
  } catch (error) {
    console.error('Error fetching images:', error.message);
    throw error;
  }
}

async function getInformation() {
  try {
    const images = await fetchImg();
    console.log(images);
    if (images.length === 0) {
      alert('No images found');
      return;
    }
    images.forEach(image => {
      renderArticles(image);
    });
    page += 1; // Увеличиваем номер страницы только после успешного рендеринга
    initializeLightbox(); // Инициализируем или обновляем SimpleLightbox после добавления новых изображений
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Обработчик формы поиска
searchEl.addEventListener('submit', onSearch);
function onSearch(e) {
  e.preventDefault();
  page = 1;
  userData = input.value.trim();

  if (userData === '') {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    return;
  }

  container.innerHTML = ''; // Очистить контейнер перед новым поиском
  getInformation();
}

// Обработчик кнопки "Load More"


let loading = false

async function onClickLoadMore(e) {
  e.preventDefault();
  if (loading) return;
  loading = true;
  page += 1;
  await getInformation();
  loading = false;

}

// Функция для рендеринга карточек изображений
function renderArticles(image) {
  const markup = `
    <div class="photo-card">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>: ${image.likes}
        </p>
        <p class="info-item">
          <b>Views</b>: ${image.views}
        </p>
        <p class="info-item">
          <b>Comments</b>: ${image.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>: ${image.downloads}
        </p>
      </div>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', markup);
}

window.addEventListener('scroll', onScroll);

const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});

function onScroll(e) {
  if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
    onClickLoadMore(e);
    console.log('done')
  }
}

document.addEventListener('DOMContentLoaded', function () {
  initializeLightbox(); // Инициализируем SimpleLightbox при загрузке страницы
});

