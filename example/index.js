import CatApiService from './cat-api';

const refs = {
    select: document.querySelector('.breed-select'),
    conteiner: document.querySelector('.cat-info')
};

const catApiService = new CatApiService();
 
catApiService.fetchBreeds()
    .then(data => {
        createOptions(data);
    })
    .catch(error => {
        catApiService.showError()
        console.error("Произошла ошибка:", error);
    });

function createOptions(data) {
    data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        refs.select.appendChild(option);
    });
}

refs.select.addEventListener('change', onSelect);

        function onSelect(e) {
            clearContainer()
            catApiService.breedIdSearch = e.currentTarget.value;
            catApiService.fetchCatByBreed().then(r => {
                catApiService.hideLoader()  
            renderArticles(r.data);
            }).catch(error => {
               catApiService.showError()
                console.error('Ошибка при получении изображения:', error);
            });
           
    
        }

        function renderArticles(data) {
            const markup = data.map(cat => `
                <div class="article">
                    <h2>${cat.breeds[0].name}</h2>
                    <p>${cat.breeds[0].description}</p>
                    <p>${cat.breeds[0].temperament}</p>
                    <img src="${cat.url}" alt="${cat.breeds[0].name}">
                </div>
            `).join('');
            refs.conteiner.insertAdjacentHTML('beforeend', markup);
        }

        function clearContainer() {
            refs.conteiner.innerHTML = '';
          }  

        catApiService.loader = document.querySelector('.loading-container');
        catApiService.error = document.querySelector('.error');

        // Функция для отображения лоадера
       
        
       catApiService.hideLoader()    
      