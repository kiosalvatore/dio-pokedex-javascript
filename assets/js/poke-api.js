
const pokeApi = {}


function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
  
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon 
}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then (convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    
  /*  const offset = 0; // offset e limit são consts já dadas na própria url, colocamos aqui apenas pela didática.
    const limit = 100; */
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
                .then((response) => response.json())  
                .then((jsonBody) => jsonBody.results)
                .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
                .then((detailRequests) => Promise.all(detailRequests))
                .then((pokemonsDetails) => pokemonsDetails)
}





/*
Promise.all([
    fetch('https://pokeapi.co/api/v2/pokemon/1/'),
    fetch('https://pokeapi.co/api/v2/pokemon/2/'),
    fetch('https://pokeapi.co/api/v2/pokemon/3/'),
    fetch('https://pokeapi.co/api/v2/pokemon/4/'),
    fetch('https://pokeapi.co/api/v2/pokemon/5/'),
    fetch('https://pokeapi.co/api/v2/pokemon/6/'),
    fetch('https://pokeapi.co/api/v2/pokemon/7/'),
    fetch('https://pokeapi.co/api/v2/pokemon/8/'),
    fetch('https://pokeapi.co/api/v2/pokemon/9/'),
    fetch('https://pokeapi.co/api/v2/pokemon/10/')
]).then((results) => {
    console.log(results)
})

*/