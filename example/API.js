const BASE = 'https://pokeapi.co/api/v2'


function fetchPokemon(query) {
    const url = `${BASE}/pokemon/${query}`;
    return fetch(url)
        .then(response => {
            console.log(response)
            
            return response.json();
        });
}

export default {fetchPokemon}
