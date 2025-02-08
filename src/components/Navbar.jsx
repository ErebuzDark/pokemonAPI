import React, { useState, useContext } from 'react';
import { PokemonContext } from "../components/PokemonContext";

// assets
import pokeBall from '../assets/pokeball.png';

// icons
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const [isSeearh, setIsSearch] = useState("");
  const { pokemonSearch, setPokemonSearch } = useContext(PokemonContext); 

  const handleSearch = (e) => {
    e.preventDefault();
    setPokemonSearch(isSeearh);
  }

  const handleremoveSearch = () => {
    setPokemonSearch("");
    setIsSearch("");
  }

  return (
    <nav>
      <div className="fixed top-0 z-30 w-full flex flex-col md:flex-row justify-between  items-center p-4 bg-gray-800 text-white">
        <div className='flex items-center'>
          <h1 className="text-2xl font-bold">Pokemon API</h1>
          <img src={pokeBall} alt="pokemon-logo" className='size-11'/>
        </div>
        
        <form onSubmit={handleSearch} className='flex items-center gap-1'>
          <div className='relative w-full'>
            <input
              onChange={(e) => setIsSearch(e.target.value)}
              value={isSeearh} type="text" placeholder="Search Pokemon or ID"
              className="w-full min-w-52 p-2 rounded-lg border border-gray-400"
            />
            <IoMdClose
              className='absolute top-[50%] right-[3%] transform translate-y-[-50%] cursor-pointer hover:scale-125'
              onClick={handleremoveSearch}
            />
          </div>
          
          <button type='submit' className="flex justify-center items-center p-2 bg-red-500 hover:bg-red-600 duration-300 text-white rounded-lg w-fit min-w-11 h-11">
            <p className='hidden md:block px-3'>Search</p>
            <CiSearch className='md:hidden'/>
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
