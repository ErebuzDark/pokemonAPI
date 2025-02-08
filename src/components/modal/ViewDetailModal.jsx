import React,{ useState, useEffect } from 'react';
import { pokemonClickedData, pokemonLocation } from '../../api/apiCalls';

// assets
import pokeball from '../../assets/pokeball.png';

// icons
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { LuSwords } from "react-icons/lu";

const ViewDetailModal = ( {clickedPokemon, onToggleModal} ) => {

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
      setPokemonLocations(locations.map(loc => loc.location_area.name.replace(/-/g, " "))); 
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

  if (loading || pokemonData.sprites.front_default === null) return <div className='fixed top-0 left-0 w-full h-dvh bg-gray-900/30 bg-opacity-50 flex justify-center items-center'>
    <div className='animate-spin rounded-full h-32 w-32 border-gray-900'><img src={pokeball} alt="" /></div>
  </div>;
  if (error) return <div>{error}</div>;

  const typeColors = {
    normal: 'bg-gray-400 text-white',
    fire: 'bg-red-500 text-white',
    water: 'bg-blue-500 text-white',
    electric: 'bg-yellow-500',
    grass: 'bg-green-500 text-white',
    ice: 'bg-cyan-500',
    fighting: 'bg-orange-500 text-white',
    poison: 'bg-purple-500 text-white',
    ground: 'bg-brown-500 text-white',
    flying: 'bg-indigo-500 text-white',
    psychic: 'bg-pink-500 text-white',
    bug: 'bg-lime-500 text-white',
    rock: 'bg-gray-700 text-white',
    ghost: 'bg-indigo-900 text-white',
    dragon: 'bg-purple-900 text-white',
    dark: 'bg-gray-800 text-white',
    steel: 'bg-gray-400 text-white',
    fairy: 'bg-pink-300',
  };

  return (
    <div onClick={onToggleModal} className='fixed z-50 top-0 left-0 w-full h-dvh overflow-y-scroll bg-gray-900/30 bg-opacity-50 p-3 flex justify-center items-center'>
      <div onClick={(e) => e.stopPropagation()} className='w-[600px] m-auto bg-white p-5 md:p-8 rounded-md shadow-xl'>
        <h1 className='text-3xl md:text-4xl pb-3 text-center font-bold'>Pokemon Details</h1>
        <div className='relative flex justify-center h-52 border-[0.3px] rounded-lg overflow-hidden'>
          <img className='z-50' src={pokemonData.sprites.front_default} alt={pokemonData.name || 'default'} />
          <div className='absolute -left-3 -top-3 size-16 bg-red-500 text-white rounded-full flex justify-center items-center'>
            <p className='font-bold'>{pokemonData.id}</p>
          </div>
          <div className={`absolute top-32 ${typeColors[pokemonData.types?.[0]?.type?.name]} rounded-full size-[800px]`}></div>
        </div>
        <div className='flex justify-between items-center gap-4 mt-4'>
          <div>
            <p className='text-2xl md:text-3xl font-semibold'>{pokemonData.name?.charAt(0).toUpperCase() + pokemonData.name?.slice(1)}</p>
            <p className='flex flex-row gap-1'>
              {pokemonData.types?.map((type, index) => (
              <span key={index} className={`px-1 rounded ${typeColors[type.type.name] || 'bg-gray-500'}`}>
                {type.type.name}
              </span>
              ))}
            </p>
          </div>
          <div className='flex flex-row gap-2 text-sm md:text-md text-slate-400 font-thin'>
            <p>Height: {pokemonData.height}</p>|
            <p>Weight: {pokemonData.weight}</p>
          </div>
        </div>
        <div className='mt-4'>
          <h1 className='flex items-center text-xl font-semibold'><IoLocationOutline className='text-slate-500' />Locations</h1>
          {pokemonLocations.length > 0 ? (
            <ul className='flex flex-wrap gap-2'>
              {pokemonLocations.slice(0, 3).map((location, index) => (
                <li key={index} className='bg-green-200 px-2 py-1 rounded-md'>{location}</li>
              ))}
            </ul>
          ) : (
            <p className='text-gray-500'>No known wild locations.</p>
          )}
        </div>
        <div className='mt-4'>
          <h1 className='flex items-center text-xl font-semibold'><AiOutlineThunderbolt className='text-slate-500' />Abilities</h1>
          <ul className='flex flex-row gap-2 flex-wrap'>
            {pokemonData.abilities?.map((ability, index) => (
              <li className='w-fit bg-amber-200 rounded-md px-1' key={index}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
        <div className='mt-4'>
        <h1 className='flex items-center text-xl font-semibold'><LuSwords className='text-slate-500' />Moves</h1>
          <ul className='flex flex-row gap-2 flex-wrap'>
            {pokemonData.moves?.slice(0, 10).map((move, index) =>  (
              <li key={index} className='bg-gray-100 text-sm rounded-md p-1 mt-1'>{move.move.name}</li>
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
          className='mt-4 p-2 bg-red-400 text-white rounded-md w-full hover:bg-red-500 duration-300'
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ViewDetailModal;
