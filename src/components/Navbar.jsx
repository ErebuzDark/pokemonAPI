import React, { useState, useContext } from "react";
import { PokemonContext } from "../components/PokemonContext";

// assets
import pokeBall from "../assets/pokeball.png";

// icons
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const [isSeearh, setIsSearch] = useState("");
  const { pokemonSearch, setPokemonSearch } = useContext(PokemonContext);

  const handleSearch = (e) => {
    e.preventDefault();
    setPokemonSearch(isSeearh);
  };

  const handleremoveSearch = () => {
    setPokemonSearch("");
    setIsSearch("");
  };

  return (
    <nav>
      <div className="fixed top-0 z-30 flex w-full flex-col items-center justify-between bg-gray-800 p-4 text-white md:flex-row">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Pokemon API</h1>
          <img src={pokeBall} alt="pokemon-logo" className="size-11" />
        </div>

        <form onSubmit={handleSearch} className="flex items-center gap-1">
          <div className="relative w-full">
            <input
              onChange={(e) => setIsSearch(e.target.value)}
              value={isSeearh}
              type="text"
              placeholder="Search Pokemon or ID"
              className="w-full min-w-52 rounded-lg border border-gray-400 p-2"
            />
            <IoMdClose
              className="absolute top-[50%] right-[3%] translate-y-[-50%] transform cursor-pointer hover:scale-125"
              onClick={handleremoveSearch}
            />
          </div>

          <button
            type="submit"
            className="flex h-11 w-fit min-w-11 items-center justify-center rounded-lg bg-red-500 p-2 text-white duration-300 hover:bg-red-600"
          >
            <p className="hidden px-3 md:block">Search</p>
            <CiSearch className="md:hidden" />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
