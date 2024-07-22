import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_gZiGE0IbZR2L7ntZFqCKDzvoG2uGr9O5q8RcQrcVop4oIi3NPMAX550V3JuwMzwh";

export default class CatApiService {
    fetchBreeds() {
        console.log(this);
        return axios.get("https://api.thecatapi.com/v1/breeds")
            .then(response => {
                return response.data;
            });
    }

    fetchCatByBreed(){
        this.showLoader()
        return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${this.breedIdSearch}`)

    }
    showLoader() {
        this.loaderForFunction.style.display = 'flex';
      }

    hideLoader() {
          this.loaderForFunction.style.display = 'none';
        }
     
    showError() {
        this.errorForFunction.style.display = 'block';
          }
    hideError() {
        this.errorForFunction.style.display = 'none';
          }      

    get breedId() {
        return this.breedIdSearch;
    }

    set breedId(newBredID) {
        this.breedIdSearch = newBredID;
    }

    set loader(newLoader) {
        this.loaderForFunction = newLoader;
    }

    set error(newError) {
        this.errorForFunction = newError;
    }
    
}