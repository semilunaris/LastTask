export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchArticles() {
        console.log(this);
        console.log(this.page);
        const options = {
            headers: {
                Authorization: '0e2378da343642ba9a3764cae23e36b4'
            }
        };
        const url = `https://newsapi.org/v2/everything?q=${this.searchQuery}&pageSize=5&page=${this.page}`;

        return fetch(url, options).then(r => r.json()).then(data => {
            this.page += 1;
            return data.articles;
        });
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}