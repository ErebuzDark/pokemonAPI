import React, { useState, useEffect } from 'react';
import { pokemonClickedData, pokemonLocation, pokemonStorydata } from '../../api/apiCalls';

// assets
import pokeball from '../../assets/pokeball.png';

// custom type icons
import bugIcon from '../../assets/type-icons/Bug_icon.png';
import darkIcon from '../../assets/type-icons/Dark_icon.png';
import dragonIcon from '../../assets/type-icons/Dragon_icon.png';
import electricIcon from '../../assets/type-icons/Electric_icon.png';
import fairyIcon from '../../assets/type-icons/Fairy_icon.png';
import fightingIcon from '../../assets/type-icons/Fighting_icon.png';
import fireIcon from '../../assets/type-icons/Fire_icon.png';
import flyingIcon from '../../assets/type-icons/Flying_icon.png';
import ghostIcon from '../../assets/type-icons/Ghost_icon.png';
import grassIcon from '../../assets/type-icons/Grass_icon.png';
import groundIcon from '../../assets/type-icons/Ground_icon.png';
import iceIcon from '../../assets/type-icons/Ice_icon.png';
import noneTypeIcon from '../../assets/type-icons/none-type.png';
import normalIcon from '../../assets/type-icons/Normal_icon.png';
import poisonIcon from '../../assets/type-icons/Poison_icon.png';
import psychicIcon from '../../assets/type-icons/Psychic_icon.png';
import rockIcon from '../../assets/type-icons/Rock_icon.png';
import steelIcon from '../../assets/type-icons/Steel_icon.png';
import stellarIcon from '../../assets/type-icons/Stellar_icon.png';
import waterIcon from '../../assets/type-icons/Water_icon.png';

// icons
import { IoLocationOutline } from 'react-icons/io5';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { LuSwords } from 'react-icons/lu';
import { TbMessageCancel } from 'react-icons/tb';

const ViewDetailModal = ({ clickedPokemon, onToggleModal }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [pokemonData, setCPokemonData] = useState([]);
  const [pokemonLocations, setPokemonLocations] = useState([]);
  const [pokemonStory, setPokemonStory] = useState(null);

  const [pokemonSprites, setPokemonSprites] = useState(pokeball);

  const fetchClickedPokemon = async (name) => {
    try {
      setLoading(true);
      const data = await pokemonClickedData(name);
      setCPokemonData(data);
      const story = await pokemonStorydata(name);
      setPokemonStory(story);
      const locations = await pokemonLocation(name);
      setPokemonLocations(locations.map((loc) => loc.location_area.name.replace(/-/g, ' ')));
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

  const typeIcons = {
    bug: bugIcon,
    dark: darkIcon,
    dragon: dragonIcon,
    electric: electricIcon,
    fairy: fairyIcon,
    fighting: fightingIcon,
    fire: fireIcon,
    flying: flyingIcon,
    ghost: ghostIcon,
    grass: grassIcon,
    ground: groundIcon,
    ice: iceIcon,
    'none-type': noneTypeIcon,
    normal: normalIcon,
    poison: poisonIcon,
    psychic: psychicIcon,
    rock: rockIcon,
    steel: steelIcon,
    stellar: stellarIcon,
    water: waterIcon,
  };

  const typeColors = {
    normal: 'bg-gray-400 text-white',
    fire: 'bg-red-500 text-white',
    water: 'bg-blue-500 text-white',
    electric: 'bg-yellow-500',
    grass: 'bg-green-500 text-white',
    ice: 'bg-cyan-500',
    fighting: 'bg-orange-500 text-white',
    poison: 'bg-purple-500 text-white',
    ground: 'bg-orange-300 text-white',
    flying: 'bg-indigo-500 text-white',
    psychic: 'bg-pink-500 text-white',
    bug: 'bg-green-700 text-white',
    rock: 'bg-gray-700 text-white',
    ghost: 'bg-indigo-900 text-white',
    dragon: 'bg-purple-900 text-white',
    dark: 'bg-gray-800 text-white',
    steel: 'bg-gray-400 text-white',
    fairy: 'bg-pink-300',
  };

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
          src={pokemonData.sprites.other['official-artwork'].front_default}
          alt={pokemonData.name || 'default'}
        />

        <div className="relative">
          <h1 className="absolute -top-3 sm:-top-3 md:-top-4 left-1/2 transform -translate-x-1/2 flex px-2 bg-white pb-3 text-center text-[1rem] font-bold md:text-2xl z-50">
            Pokemon Details
          </h1>
          <div className="relative flex h-52 justify-center overflow-hidden rounded-lg border-[0.3px]">
            <img
              className="pokemon-img z-50"
              src={pokemonData.sprites.other['official-artwork'].front_default}
              alt={pokemonData.name || 'default'}
            />
            <div className="absolute -top-3 -left-3 flex size-16 items-center justify-center rounded-full bg-red-500 text-white">
              <p className="font-bold">{pokemonData.id}</p>
            </div>
            <div
              className={`absolute top-32 ${typeColors[pokemonData.types?.[0]?.type?.name]} size-[800px] rounded-full`}
            ></div>
          </div>
          <div className="absolute -bottom-3 right-2 flex flex-row gap-1 z-50">
            {pokemonData.types?.map((type, index) => (
              <div
                className={`${typeColors[type.type.name] || 'bg-gray-500'} flex items-center rounded-full pr-3 pl-1 border-[0.5px] border-amber-900 `}
              >
                <div>
                  <img
                    src={typeIcons[type.type.name]}
                    alt={typeIcons[type.type.name]}
                    className="size-6"
                  />
                </div>
                <p className="">
                  <span key={index} className={``}>
                    {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-start md:items-center justify-between gap-2">
          <div>
            <p className="text-2xl font-semibold md:text-3xl">
              {pokemonData.name?.charAt(0).toUpperCase() + pokemonData.name?.slice(1)}
            </p>
          </div>
          <div className="md:text-md flex flex-row gap-2 text-sm font-thin text-slate-400">
            <p>Height: {pokemonData.height}</p>|<p>Weight: {pokemonData.weight}</p>
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
                <li key={index} className="rounded-md bg-green-200 text-sm px-1">
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
              <li className="w-fit rounded-md bg-amber-200 text-sm px-1" key={index}>
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
              <li key={index} className="mt-1 rounded-md bg-gray-100 px-1 text-sm">
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
          className="sticky mt-4 w-full rounded-md bg-red-400 p-2 text-white duration-300 hover:bg-red-500 z-20"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewDetailModal;
