import React, { useState, useEffect, useContext } from "react";
import { fetchData, pokemonSearchData } from "../api/apiCalls";
import { PokemonContext } from "../components/PokemonContext";

// components
import ArrowUp from "../components/ArrowUp";

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

  const { pokemonSearch, setPokemonSearch } = useContext(PokemonContext);
  const [action, setAction] = useState(null);
  const [clickedPokemon, setClickedPokemon] = useState("");
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

  const onToggleControl = (action) => {
    setPokemonSearch(action.toString());
  };

  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + 20);
  };

  if (error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  if (loading)
    return (
      <div className="fixed top-0 left-0 flex h-dvh w-full items-center justify-center bg-gray-900/30">
        <div className="h-32 w-32 animate-spin rounded-full border-gray-900">
          <img src={pokeBall} alt="" />
        </div>
      </div>
    );

  return (
    <div className="relative mt-32 flex flex-col justify-center md:mt-20">
      {pokemonSearch.trim() !== "" && searchResults !== null ? (
        <div className="rounded-md border border-yellow-400 bg-yellow-100 p-4 shadow-md">
          <h2 className="text-lg font-bold text-yellow-700">
            Search Results for "{pokemonSearch}"
          </h2>

          {searchResults.length > 0 ? (
            <div className="mt-4 flex flex-row items-center justify-center gap-2">
              <button onClick={() => onToggleControl(searchResults[0].id - 1)}>
                {"<<"} Prev
              </button>
              <div
                onClick={() => onToggleModal(searchResults[0].name)}
                className="flex w-1/2 cursor-pointer flex-col items-center rounded-md bg-white p-4 shadow-md duration-200 hover:bg-gray-100"
              >
                <p className="text-sm text-gray-500">
                  ID: {searchResults[0].id}
                </p>
                <h2 className="text-2xl font-bold text-blue-600">
                  {searchResults[0].name.charAt(0).toUpperCase() +
                    searchResults[0].name.slice(1)}
                </h2>
              </div>
              <button onClick={() => onToggleControl(searchResults[0].id + 1)}>
                Next {">>"}
              </button>
            </div>
          ) : (
            <p className="mt-4 text-center text-red-500">
              No Pokémon found. Try another name.
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 p-2 md:grid-cols-3 lg:grid-cols-4">
          {pokemonData.map((pokemon, index) => (
            <div
              key={index}
              onClick={() => onToggleModal(pokemon.name)}
              className="flex cursor-pointer items-center justify-start gap-4 rounded-md bg-gray-100 p-4 duration-200 hover:bg-slate-200"
            >
              <p>{pokemon.id}</p>
              <h2 className="text-sm font-bold md:text-xl">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h2>
            </div>
          ))}
        </div>
      )}

      {hasMore && pokemonSearch.trim() === "" && (
        <button
          onClick={loadMore}
          className="mt-4 rounded-md bg-blue-500 p-2 text-white"
        >
          Load More
        </button>
      )}

      {isModalOpen && clickedPokemon && (
        <ViewDetailModal
          clickedPokemon={clickedPokemon}
          onToggleModal={onToggleModal}
        />
      )}
      <ArrowUp />
    </div>
  );
};

export default PokemonCards;
