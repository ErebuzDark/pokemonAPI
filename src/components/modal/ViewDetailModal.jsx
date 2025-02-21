import React, { useState, useEffect } from "react";
import {
  pokemonClickedData,
  pokemonLocation,
  pokemonStorydata,
} from "../../api/apiCalls";

import { typeIcons, typeColors } from "../../data/types";

// assets
import pokeball from "../../assets/pokeball.png";

// icons
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { LuSwords } from "react-icons/lu";
import { TbMessageCancel } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

const ViewDetailModal = ({ clickedPokemon, onToggleModal }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // for data
  const [pokemonData, setCPokemonData] = useState([]);
  const [pokemonLocations, setPokemonLocations] = useState([]);
  const [pokemonStory, setPokemonStory] = useState(null);

  // for favorite
  const [isFav, setIsFav] = useState(false);

  const [pokemonSprites, setPokemonSprites] = useState(pokeball);

  const fetchClickedPokemon = async (name) => {
    try {
      setLoading(true);
      const data = await pokemonClickedData(name);
      setCPokemonData(data);
      const story = await pokemonStorydata(name);
      setPokemonStory(story.replace(/\f/g, " "));
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

  useEffect(() => {
    const checkIsFav = JSON.parse(localStorage.getItem("favPokemon"));
    if (checkIsFav !== null) {
      const checking = checkIsFav.includes(pokemonData.name);
      setIsFav(checking);
    }
  });

  const handleActionFav = () => {
    let favs = JSON.parse(localStorage.getItem("favPokemon")) || [];

    if (favs.includes(pokemonData.name)) {
      favs = favs.filter((name) => name !== pokemonData.name);
    } else {
      favs.push(pokemonData.name);
    }

    localStorage.setItem("favPokemon", JSON.stringify(favs));
    setIsFav(!isFav);
  };

  if (loading || pokemonData.sprites.front_default === null)
    return (
      <div className="bg-opacity-50 fixed top-0 left-0 flex h-dvh w-full items-center justify-center bg-gray-900/30">
        <div className="h-32 w-32 animate-spin rounded-full border-gray-900">
          <img src={pokeball} alt="" />
        </div>
      </div>
    );

  if (error) return <div>{error}</div>;

  return (
    <div
      onClick={onToggleModal}
      className="bg-opacity-50 fixed top-0 left-0 z-50 flex h-dvh w-full items-center justify-center overflow-y-scroll bg-gray-900/30 p-3 text-xs sm:text-lg"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative m-auto w-[600px] rounded-md bg-white p-5 shadow-xl md:p-8 overflow-hidden"
      >
        {/* para sa pokemon Background */}
        <img
          className="absolute -bottom-10 sm:-bottom-40 -right-16 w-[300px] sm:w-auto opacity-20 z-0"
          src={pokemonData.sprites.other["official-artwork"].front_default}
          alt={pokemonData.name || "default"}
        />

        <div className="relative">
          <h1 className="absolute -top-3 sm:-top-3 md:-top-4 left-1/2 transform -translate-x-1/2 flex px-2 bg-white pb-3 text-center text-[1rem] font-bold md:text-2xl z-48">
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
            <div className="animate-bg-spin absolute -top-1 left-1/2 transform -translate-x-1/2 z-49">
              <img
                className="min-w-[400px] "
                src={
                  typeIcons.find(
                    (t) => t.type === pokemonData.types[0].type.name,
                  ).bg || ""
                }
                alt={pokemonData.types.name}
              />
              {/* <img className="z-50" src={typeIcons[0].bg} alt="" /> */}
            </div>
            <div
              className={`absolute top-32 ${typeColors[pokemonData.types?.[0]?.type?.name]} size-[800px] rounded-full`}
            ></div>
          </div>
          <div className="absolute -bottom-3 right-2 flex flex-row gap-1 z-50">
            {pokemonData.types?.map((type, index) => (
              <div
                key={index}
                className={`${typeColors[type.type.name] || "bg-gray-500"} flex items-center rounded-full pr-3 pl-1 border-[0.5px] border-amber-900 `}
              >
                <div>
                  <img
                    src={
                      typeIcons.find((t) => t.type === type.type.name)?.icon ||
                      ""
                    }
                    alt={type.type.name}
                    className="size-6"
                  />
                </div>
                <p className="">
                  <span key={index} className={``}>
                    {type.type.name.charAt(0).toUpperCase() +
                      type.type.name.slice(1)}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-start md:items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <p className="text-2xl font-semibold md:text-3xl">
              {pokemonData.name?.charAt(0).toUpperCase() +
                pokemonData.name?.slice(1)}
            </p>
            <button onClick={handleActionFav}>
              {isFav ? (
                <FaStar className="text-yellow-400 text-3xl" />
              ) : (
                <CiStar className="text-3xl" />
              )}
            </button>
          </div>
          <div className="md:text-md flex flex-row gap-2 text-sm font-thin text-slate-400">
            <p>Height: {pokemonData.height}</p>|
            <p>Weight: {pokemonData.weight}</p>
          </div>
        </div>
        <div className="p-2 border rounded-lg my-2 text-xs tracking-tight">
          {pokemonStory ? (
            pokemonStory
          ) : (
            <p className="flex items-center gap-2 text-slate-400">
              <TbMessageCancel /> No description available
            </p>
          )}
        </div>
        <div className="mt-4">
          <h1 className="flex items-center text-xl font-semibold">
            <IoLocationOutline className="text-slate-500" />
            Locations
          </h1>
          {pokemonLocations.length > 0 ? (
            <ul className="flex flex-wrap gap-2 ml-5">
              {pokemonLocations.slice(0, 3).map((location, index) => (
                <li
                  key={index}
                  className="rounded-md bg-green-200 text-sm px-1"
                >
                  {location}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 ml-5">No known wild locations.</p>
          )}
        </div>
        <div className="mt-4">
          <h1 className="flex items-center text-xl font-semibold">
            <AiOutlineThunderbolt className="text-slate-500" />
            Abilities
          </h1>
          <ul className="flex flex-row flex-wrap gap-2 ml-5">
            {pokemonData.abilities?.map((ability, index) => (
              <li
                className="w-fit rounded-md bg-amber-200 text-sm px-1"
                key={index}
              >
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 z-50">
          <h1 className="flex items-center text-xl font-semibold">
            <LuSwords className="text-slate-500" />
            Moves
          </h1>
          <ul className="flex flex-row flex-wrap gap-2 ml-5">
            {pokemonData.moves?.slice(0, 10).map((move, index) => (
              <li
                key={index}
                className="mt-1 rounded-md bg-gray-100 px-1 text-sm"
              >
                {move.move.name}
              </li>
            ))}
          </ul>
        </div>
        {/* <div>
          {pokemonData.flavor_text_entries?.map((flavor, index) => (
            <p key={index}>{flavor.flavor_text}dawdawd</p>
          ))}
        </div> */}

        <button
          onClick={onToggleModal}
          className="sticky mt-4 w-full rounded-md bg-red-400 p-2 text-white duration-300 hover:bg-red-500 z-20"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewDetailModal;
