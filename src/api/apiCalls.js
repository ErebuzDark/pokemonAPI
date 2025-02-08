import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchData = async (offset) => {
  try {
    const response = await API.get("/pokemon/?offset=" + offset + "&limit=20");
    return response.data;
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

export const pokemonLocation = async (name) => {
  try {
    const response = await API.get(`pokemon/${name}/encounters`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
