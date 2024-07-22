const pokemonId = 2; // Замените на номер покемона, который хотите получить
const container = document.querySelector('#container');
const searchForm = document.querySelector('.js-search-form');
searchForm.addEventListener('submit', onSearch);
import API from './API'
import newsApi from './news-api'




function onSearch(e) {
    e.preventDefault()
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value;

    API.fetchPokemon(searchQuery).then(data => {
        console.log(data);
        const name = data.name;
        const imageUrl = data.sprites.front_default;

        renderCard(name, imageUrl);
    })
    .catch(onFetchError)
    .finally(() => form.reset())
  
}
function onFetchError(error){

    alert('sorry but you pokemo is not found')
}



function renderCard(name, imageUrl) {
    const card = `
        <div class="card">
            <h2>${name}</h2>
            <img src="${imageUrl}" alt="${name}">
        </div>
    `;
    container.innerHTML = card;
}



fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=200.').then(r=>r.json).then(console.log)



import NewsApiService from './news-api';

const refs = {
    searchForm: document.querySelector('.js-search-form1'),
    articleContainer: document.querySelector('.js-articles-container'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
   
};

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearchForm(e) {
    e.preventDefault();
    
    clearArticleConteiner()
    newsApiService.query = e.currentTarget.elements.query.value;
    newsApiService.resetPage();
    newsApiService.fetchArticles().then(articles => {
        clearArticleConteiner()
        renderArticles(articles);
    });
}

function onLoadMore() {
    newsApiService.fetchArticles().then(articles => {
        renderArticles(articles);
    });
    toggleLoading()
}

function renderArticles(articles) {
    const markup = articles.map(article => `
        <div class="article">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <img src="${article.urlToImage}"><img/>
        </div>
    `).join('');
    refs.articleContainer.insertAdjacentHTML('beforeend', markup);
}

 function clearArticleConteiner(){
    refs.articleContainer.innerHTML = ''
 }
 
 const button1 = document.querySelector('.button1');
 console.log(button1)
 button1.addEventListener('click', onClick);

 function onClick(e) {
     button1.classList.toggle('loading');
     // Здесь можно добавить логику для начала/окончания загрузки
     setTimeout(() => button1.classList.toggle('loading'), 3000); // Пример завершения загрузки через 3 секунды
 }