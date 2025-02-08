import React, { useState, useEffect, useContext } from "react";
import { fetchData, pokemonSearchData } from "../api/apiCalls";
import { PokemonContext } from "../components/PokemonContext";

// components
import ArrowUp from '../components/ArrowUp';

// assets
import pokeBall from "../assets/pokeball.png";
import ViewDetailModal from "../components/modal/ViewDetailModal";

const PokemonCards = () => {
  const [pokemonData, setPokemonData] = useState([]); 
  const [searchResults, setSearchResults] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { pokemonSearch } = useContext(PokemonContext);
  const [clickedPokemon, setClickedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onToggleModal = (name) => {
    setClickedPokemon(name);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (pokemonSearch.trim() === "") {
      setLoading(true);
      const fetchPokemonData = async () => {
        try {
          const data = await fetchData(offset);
          setPokemonData((prevData) => [...prevData, ...data.results]);
          setHasMore(data.next !== null);
        } catch (error) {
          setError(error);
        }
        setLoading(false);
      };
      fetchPokemonData();
    }
  }, [offset, pokemonSearch]);

  useEffect(() => {
    if (!pokemonSearch.trim()) {
      setSearchResults(null); 
      return;
    }

    const fetchSearchedPokemon = async () => {
      setLoading(true);
      try {
        const data = await pokemonSearchData(pokemonSearch.toLowerCase());

        if (data && data.name) {
          setSearchResults([{ name: data.name, id: data.id }]);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        setSearchResults([]);
      }
      setLoading(false);
    };

    fetchSearchedPokemon();
  }, [pokemonSearch]);

  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + 20);
  };

  if (error) return <div className="text-red-500 text-center">Error: {error.message}</div>;

  if (loading && pokemonData.length === 0)
    return (
      <div className="fixed top-0 left-0 w-full h-dvh bg-gray-900/30 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-gray-900">
          <img src={pokeBall} alt="" />
        </div>
      </div>
    );

  return (
    <div className="relative flex flex-col justify-center mt-32 md:mt-20">
      {pokemonSearch.trim() !== "" && searchResults !== null ? (
        <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-md shadow-md">
          <h2 className="text-lg font-bold text-yellow-700">
            Search Results for "{pokemonSearch}"
          </h2>

          {searchResults.length > 0 ? (
            <div className="mt-4 flex flex-col items-center">
              <div
                onClick={() => onToggleModal(searchResults[0].name)}
                className="flex flex-col items-center bg-white hover:bg-gray-100 duration-200 p-4 rounded-md cursor-pointer shadow-md w-1/2"
              >
                <p className="text-gray-500 text-sm">ID: {searchResults[0].id}</p>
                <h2 className="text-2xl font-bold text-blue-600">
                  {searchResults[0].name.charAt(0).toUpperCase() + searchResults[0].name.slice(1)}
                </h2>
              </div>
            </div>
          ) : (
            <p className="text-center text-red-500 mt-4">No Pokémon found. Try another name.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2">
          {pokemonData.map((pokemon, index) => (
            <div
              key={index}
              onClick={() => onToggleModal(pokemon.name)}
              className="flex justify-start items-center gap-4 bg-gray-100 hover:bg-slate-200 duration-200 p-4 rounded-md cursor-pointer"
            >
              <p>{index + 1}</p>
              <h2 className="text-sm md:text-xl font-bold">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h2>
            </div>
          ))}
        </div>
      )}

      {hasMore && pokemonSearch.trim() === "" && (
        <button onClick={loadMore} className="mt-4 p-2 bg-blue-500 text-white rounded-md">
          Load More
        </button>
      )}

      {isModalOpen && clickedPokemon && (
        <ViewDetailModal clickedPokemon={clickedPokemon} onToggleModal={onToggleModal} />
      )}
      <ArrowUp />
    </div>
  );
};

export default PokemonCards;
