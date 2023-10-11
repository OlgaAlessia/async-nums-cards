const POKEMON_API_URL = "https://pokeapi.co/api/v2";
const POKEMON_IMG_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

const arena = document.getElementById("arena");

async function part1() {
    let data = await $.getJSON(`${POKEMON_API_URL}/pokemon/?limit=100&offset=0`);
    console.log(data);
}

async function catchThem() {
    const pockemonData = await $.get(`${POKEMON_API_URL}/pokemon?limit=100&offset=0`);
    
    console.log(pockemonData);
    const dict_pokemons = {}
    for(let i = 0; i < pockemonData.results.length; i++) {
        let pokemon = {"name": pockemonData.results[i].name, "url": pockemonData.results[i].url }
        dict_pokemons[i] = pokemon;
    }
    console.log(dict_pokemons);

}

$(document).on("click", "#btnPokemon", catchPokemons);

function catchPokemons() {

    arena.innerHTML="";

    for(let i = 0; i < 3; i++) {
        getPokemonsSpecies();
    }

}

async function getPokemonsSpecies() {
    let value = Math.floor(Math.random() * 1000 - 1);
    let desc = "";
    let namePokemon = "";

    const response = await $.get(`${POKEMON_API_URL}/pokemon-species/${value}`)
    namePokemon = response.name;
    for(let i = 0; i < response.flavor_text_entries.length; i++) {
        if(response.flavor_text_entries[i].language.name == "en" ){
            desc = response.flavor_text_entries[i].flavor_text;
            break;
        }
    }
    //console.log(`${response.name} : ${desc}`);

    url = `${POKEMON_IMG_URL}/${value}.png`
    createPokemonCard(namePokemon, url, desc)
}


function createPokemonCard(namePokemon, url, description){

    const divCard = document.createElement("div");
    divCard.className = 'card'

    const h3Name = document.createElement("h3");
    h3Name.innerHTML = namePokemon;

    const image = document.createElement("img");
    image.setAttribute("src", url);
    image.setAttribute("alt", namePokemon);

    const pDesc = document.createElement("p");
    pDesc.innerHTML = description;

    divCard.appendChild(h3Name);
    divCard.appendChild(image);
    divCard.appendChild(pDesc);
    arena.appendChild(divCard);
}