import React, { useState, useEffect } from "react";
import { pokemonClickedData, pokemonLocation } from "../../api/apiCalls";

// assets
import pokeball from "../../assets/pokeball.png";

// icons
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { LuSwords } from "react-icons/lu";

const ViewDetailModal = ({ clickedPokemon, onToggleModal }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [pokemonData, setCPokemonData] = useState([]);
  const [pokemonLocations, setPokemonLocations] = useState([]);

  const [pokemonSprites, setPokemonSprites] = useState(pokeball);

  const fetchClickedPokemon = async (name) => {
    try {
      setLoading(true);
      const data = await pokemonClickedData(name);
      setCPokemonData(data);

      // Fetch location data
      const locations = await pokemonLocation(name);
      setPokemonLocations(
        locations.map((loc) => loc.location_area.name.replace(/-/g, " ")),
      );
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClickedPokemon(clickedPokemon);
  }, [clickedPokemon]);

  useEffect(() => {
    setPokemonSprites(pokemonData.sprites);
  }, [pokemonSprites]);

  if (loading || pokemonData.sprites.front_default === null)
    return (
      <div className="bg-opacity-50 fixed top-0 left-0 flex h-dvh w-full items-center justify-center bg-gray-900/30">
        <div className="h-32 w-32 animate-spin rounded-full border-gray-900">
          <img src={pokeball} alt="" />
        </div>
      </div>
    );
  if (error) return <div>{error}</div>;

  const typeColors = {
    normal: "bg-gray-400 text-white",
    fire: "bg-red-500 text-white",
    water: "bg-blue-500 text-white",
    electric: "bg-yellow-500",
    grass: "bg-green-500 text-white",
    ice: "bg-cyan-500",
    fighting: "bg-orange-500 text-white",
    poison: "bg-purple-500 text-white",
    ground: "bg-brown-500 text-white",
    flying: "bg-indigo-500 text-white",
    psychic: "bg-pink-500 text-white",
    bug: "bg-lime-500 text-white",
    rock: "bg-gray-700 text-white",
    ghost: "bg-indigo-900 text-white",
    dragon: "bg-purple-900 text-white",
    dark: "bg-gray-800 text-white",
    steel: "bg-gray-400 text-white",
    fairy: "bg-pink-300",
  };

  return (
    <div
      onClick={onToggleModal}
      className="bg-opacity-50 fixed top-0 left-0 z-50 flex h-dvh w-full items-center justify-center overflow-y-scroll bg-gray-900/30 p-3"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="m-auto w-[600px] rounded-md bg-white p-5 shadow-xl md:p-8"
      >
        <h1 className="pb-3 text-center text-3xl font-bold md:text-4xl">
          Pokemon Details
        </h1>
        <div className="relative flex h-52 justify-center overflow-hidden rounded-lg border-[0.3px]">
          <img
            className="pokemon-img z-50"
            src={pokemonData.sprites.other["official-artwork"].front_default}
            alt={pokemonData.name || "default"}
          />
          <div className="absolute -top-3 -left-3 flex size-16 items-center justify-center rounded-full bg-red-500 text-white">
            <p className="font-bold">{pokemonData.id}</p>
          </div>
          <div
            className={`absolute top-32 ${typeColors[pokemonData.types?.[0]?.type?.name]} size-[800px] rounded-full`}
          ></div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-semibold md:text-3xl">
              {pokemonData.name?.charAt(0).toUpperCase() +
                pokemonData.name?.slice(1)}
            </p>
            <p className="flex flex-row gap-1">
              {pokemonData.types?.map((type, index) => (
                <span
                  key={index}
                  className={`rounded px-1 ${typeColors[type.type.name] || "bg-gray-500"}`}
                >
                  {type.type.name}
                </span>
              ))}
            </p>
          </div>
          <div className="md:text-md flex flex-row gap-2 text-sm font-thin text-slate-400">
            <p>Height: {pokemonData.height}</p>|
            <p>Weight: {pokemonData.weight}</p>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="flex items-center text-xl font-semibold">
            <IoLocationOutline className="text-slate-500" />
            Locations
          </h1>
          {pokemonLocations.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {pokemonLocations.slice(0, 3).map((location, index) => (
                <li key={index} className="rounded-md bg-green-200 px-2 py-1">
                  {location}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No known wild locations.</p>
          )}
        </div>
        <div className="mt-4">
          <h1 className="flex items-center text-xl font-semibold">
            <AiOutlineThunderbolt className="text-slate-500" />
            Abilities
          </h1>
          <ul className="flex flex-row flex-wrap gap-2">
            {pokemonData.abilities?.map((ability, index) => (
              <li className="w-fit rounded-md bg-amber-200 px-1" key={index}>
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h1 className="flex items-center text-xl font-semibold">
            <LuSwords className="text-slate-500" />
            Moves
          </h1>
          <ul className="flex flex-row flex-wrap gap-2">
            {pokemonData.moves?.slice(0, 10).map((move, index) => (
              <li
                key={index}
                className="mt-1 rounded-md bg-gray-100 p-1 text-sm"
              >
                {move.move.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          {pokemonData.flavor_text_entries?.map((flavor, index) => (
            <p key={index}>{flavor.flavor_text}dawdawd</p>
          ))}
        </div>

        <button
          onClick={onToggleModal}
          className="mt-4 w-full rounded-md bg-red-400 p-2 text-white duration-300 hover:bg-red-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewDetailModal;
