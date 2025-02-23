import React, { useState, useEffect, useContext, useRef } from "react";
import { fetchData, pokemonSearchData } from "../api/apiCalls";
import { PokemonContext } from "../components/PokemonContext";

// components
import Cards from "../components/Cards";

// icons
import ArrowUp from "../components/ArrowUp";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

// assets
import pokeBall from "../assets/pokeball.png";
import ViewDetailModal from "../components/modal/ViewDetailModal";
import lonelyPokeball from "../assets/lone-pokeball.png";

const PokemonCards = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMoreLoading, SerLoadMoreLoading] = useState(false);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { pokemonSearch, setPokemonSearch } = useContext(PokemonContext);

  const [clickedPokemon, setClickedPokemon] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // pang filtering ng pokemon
  const { selectedType, setSelectedType } = useContext(PokemonContext);
  const { suggestedName, setSuggestedName } = useContext(PokemonContext);
  // const [selectedType, setSelectedType] = useState('');

  const onToggleModal = (name) => {
    setClickedPokemon(name);
    setIsModalOpen(!isModalOpen);
  };

  // para sa auto load more pag na reach na yung bottom part ng page
  const bottomRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, []);

  // pag fetch ng initial list ng pokemon
  useEffect(() => {
    if (pokemonSearch.trim() === "") {
      SerLoadMoreLoading(true);
      const fetchPokemonData = async () => {
        try {
          const data = await fetchData(offset);
          if (offset === 0) {
            setPokemonData(data);
          } else {
            setPokemonData((prevData) => [...prevData, ...data]);
          }
          setHasMore(data.length > 0);
        } catch (error) {
          setError(error);
        }
        SerLoadMoreLoading(false);
      };
      fetchPokemonData();
    }
  }, [offset]);

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
          setSearchResults([
            {
              name: data.name,
              id: data.id,
              sprite: data.sprites.other["official-artwork"].front_default,
              types: data.types.map((type) => type.type.name),
            },
          ]);
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
    setOffset((prevOffset) => prevOffset + 50);
  };

  const filteredPokemon = selectedType
    ? pokemonData.filter((pokemon) => pokemon.types.includes(selectedType))
    : pokemonData;

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
    <div className="relative mt-52 flex flex-col justify-center md:mt-20 md:mx-28 sm:mx-16 mx-3">
      {pokemonSearch.trim() !== "" && searchResults !== null ? (
        <div className="h-auto mt-11 rounded-md border border-yellow-400 bg-yellow-100 p-4 shadow-md">
          {searchResults.length > 0 ? (
            <div className="mt-4 flex flex-row items-center justify-center gap-2">
              <button
                className="rounded-md bg-red-500 p-3 text-white hover:bg-red-400"
                onClick={() => onToggleControl(searchResults[0].id - 1)}
              >
                <IoIosArrowBack />
              </button>
              <div
                onClick={() => onToggleModal(searchResults[0].name)}
                className="relative flex w-1/2 max-w-[300px] cursor-pointer flex-col items-center overflow-hidden rounded-md bg-white p-4 shadow-md duration-200 hover:bg-gray-100"
              >
                <div className="absolute top-0 left-0 flex h-7 min-w-11 items-center justify-center rounded-br-md bg-red-600">
                  <p className="text-center text-white">
                    {searchResults[0].id}
                  </p>
                </div>
                <img
                  src={searchResults[0].sprite}
                  alt={searchResults[0].sprite}
                  className="size-16 hover:scale-125 duration-300"
                />
                <h2 className="text-sm font-bold md:text-xl">
                  {searchResults[0].name.charAt(0).toUpperCase() +
                    searchResults[0].name.slice(1)}
                </h2>
              </div>
              <button
                className="rounded-md bg-red-500 p-3 text-white hover:bg-red-400"
                onClick={() => onToggleControl(searchResults[0].id + 1)}
              >
                <IoIosArrowForward />
              </button>
            </div>
          ) : (
            <div>
              <p className="mt-4 text-center text-yellow-700 font-semibold">
                No Pokémon found.
                {suggestedName === "none" ? (
                  <span> Try another name.</span>
                ) : (
                  <>
                    {" "}
                    Did you mean{" "}
                    <span
                      onClick={() => setPokemonSearch(suggestedName)}
                      className="font-bold cursor-pointer underline hover:text-yellow-500"
                    >
                      {suggestedName}
                    </span>
                    ?
                  </>
                )}
              </p>
              <img
                className="w-36 m-auto"
                src={lonelyPokeball}
                alt="lonele-pokeball"
              />
            </div>
          )}
        </div>
      ) : (
        <Cards
          filteredPokemon={filteredPokemon}
          onToggleModal={onToggleModal}
        />
      )}
      {!loadMoreLoading && hasMore && pokemonSearch.trim() === "" && (
        <button
          onClick={loadMore}
          className="w-40 mt-4 m-3 rounded-md flex items-center justify-center self-center bg-red-500 px-2 py-1 text-white"
        >
          <p>Load More</p>
          <IoIosArrowDown className="size-6" />
        </button>
      )}
      <div ref={bottomRef}></div>
      {loadMoreLoading && (
        <div className="flex items-center justify-center">
          <img
            src={pokeBall}
            alt={pokeBall}
            className="animate-spin size-[40px]"
          />
        </div>
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
