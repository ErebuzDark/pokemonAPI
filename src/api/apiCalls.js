import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchData = async (offset) => {
  try {
    const response = await API.get("/pokemon/?offset=" + offset + "&limit=50");
    const pokemonList = response.data.results;

    const detailedPokemonList = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const pokemonResponse = await API.get(pokemon.url);
        return {
          name: pokemonResponse.data.name,
          sprite: pokemonResponse.data.sprites.front_default,
          id: pokemonResponse.data.id,
          types: pokemonResponse.data.types.map((type) => type.type.name)
        };
      })
    );

    return detailedPokemonList;
  } catch (error) {
    throw error;
  }
};


export const pokemonSearchData = async (pokemonSearch) => {
  try {
    const response = await API.get("/pokemon/"+pokemonSearch);
    return response.data;
  } catch (error) {
    console.log("No Name Found");
  }
}

export const pokemonClickedData = async (name) => {
  try {
    const response = await API.get("/pokemon/"+name);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const pokemonTitle = async (name) => {
  try {
    const response = await API.get("")
  } catch (error) {
    throw error;
  }
}

export const pokemonStorydata = async (name) => {
  try {
    const response = await API.get(`pokemon-species/${name}/`)
    const data = await response.data;

    const flavorTextEntry = data.flavor_text_entries.find(entry => entry.language.name === "en");

    if (flavorTextEntry) {
      return flavorTextEntry.flavor_text;
    } else {
        return "No description available.";
    }
  } catch (error) {
    console.error("Error fetching Pokémon story:", error);
    return "No description available for this Pokemon right now.";
  }
}

export const pokemonLocation = async (name) => {
  try {
    const response = await API.get(`pokemon/${name}/encounters`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
