import React, { useState, useContext, useEffect } from "react";
import { PokemonContext } from "../components/PokemonContext";
import { typeIcons } from "../data/types";
import axios from "axios";
import stringSimilarity from "string-similarity";

// assets
import pokeBall from "../assets/pokeball.png";
import searchIcon from "../assets/search-icon.svg";

// icons
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";

const Navbar = () => {
  const [isSearch, setIsSearch] = useState("");
  const { pokemonSearch, setPokemonSearch } = useContext(PokemonContext);
  const { selectedType, setSelectedType } = useContext(PokemonContext);
  const [pokemonList, setPokemonList] = useState([]);
  const { suggestedName, setSuggestedName } = useContext(PokemonContext);

  // this one ay para sa pokemon name suggestion pag walang match sa user's input.
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=10000",
        );
        const names = response.data.results.map((pokemon) => pokemon.name);
        setPokemonList(names);
      } catch (error) {
        console.error("Error fetching Pokémon list", error);
      }
    };

    fetchPokemonList();
  }, []);

  const getClosestMatch = (input) => {
    const matches = stringSimilarity.findBestMatch(input, pokemonList);
    return matches.bestMatch.rating > 0.5 ? matches.bestMatch.target : null;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setPokemonSearch(isSearch);
    // if (!isSearch) return;

    try {
      // Try searching for the Pokémon
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${isSearch.toLowerCase()}`,
      );
      setPokemonSearch(isSearch);
      setSuggestedName(""); // Clear suggestions if found
    } catch (error) {
      // If Pokémon not found, find a close suggestion
      const suggestion = getClosestMatch(isSearch.toLowerCase());
      setSuggestedName(suggestion ? `${suggestion}` : "Try another name");
    }
  };

  // Clear search
  const handleRemoveSearch = () => {
    setPokemonSearch("");
    setIsSearch("");
    setSuggestedName("");
  };

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  return (
    <nav className="">
      <div className="fixed top-0 z-30 flex w-full flex-col items-center justify-between bg-gray-800 p-4 md:px-28 sm:px-16 text-white md:flex-row">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Pokemon API</h1>
          <img
            src={pokeBall}
            alt="pokemon-logo"
            className="icon-animation size-11"
          />
        </div>

        <form
          onSubmit={handleSearch}
          className="flex flex-col items-start md:flex-row gap-1"
        >
          <div className="flex items-center gap-1">
            <div className="relative w-full">
              <input
                onChange={(e) => setIsSearch(e.target.value)}
                value={isSearch}
                type="text"
                placeholder="Search Pokemon or ID"
                className="w-full min-w-52  rounded-full border border-gray-400 p-2"
              />
              <IoMdClose
                className="absolute top-[50%] right-[3%] translate-y-[-50%] transform cursor-pointer hover:scale-125"
                onClick={handleRemoveSearch}
              />
            </div>

            <button
              type="submit"
              className="flex h-11 w-fit min-w-11 items-center justify-center rounded-full p-1 text-white duration-300 hover:bg-slate-200/30"
            >
              <img className="size-7" src={searchIcon} alt="search-icon" />
            </button>
          </div>
          <div className="relative w-full mt-3 md:mt-0">
            <label className="absolute left-1/8 md:left-1/2  transform md:-translate-x-1/2 -top-2 px-2 text-slate-400 text-[9px] bg-gray-800">
              Filter by
            </label>
            <div className="w-full mb-4 flex items-center border-slate-400">
              <select
                className="w-full p-2 px-3text-sm text-slate-400 bg-transparent border-[0.3px] rounded-full focus:outline-[0.3px] focus:outline-slate-300"
                value={selectedType}
                onChange={(e) => handleSelectType(e.target.value)}
              >
                {" "}
                <option value="">All Types</option>
                {typeIcons.map((type, index) => (
                  <option key={index} value={type.type}>
                    {type.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
