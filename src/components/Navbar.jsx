import React, { useState, useContext } from "react";
import { PokemonContext } from "../components/PokemonContext";
import { typeIcons } from "../data/types";

// assets
import pokeBall from "../assets/pokeball.png";

// icons
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";

const Navbar = () => {
  const [isSeearh, setIsSearch] = useState("");
  const { pokemonSearch, setPokemonSearch } = useContext(PokemonContext);
  const { selectedType, setSelectedType } = useContext(PokemonContext);

  const handleSearch = (e) => {
    e.preventDefault();
    setPokemonSearch(isSeearh);
  };

  const handleremoveSearch = () => {
    setPokemonSearch("");
    setIsSearch("");
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
              className="flex h-11 w-fit min-w-11 items-center justify-center rounded-full bg-red-500 p-2 text-white duration-300 hover:bg-red-600"
            >
              <CiSearch className="size-6" />
            </button>
          </div>
          <div className="w-full">
            <label className="md:hidden text-[11px] font-semibold text-slate-400">
              Filter by Type
            </label>
            <div className="w-full mb-4 flex items-center gap-2 bg-white rounded-full px-2">
              <select
                className="w-full p-2 px-3text-sm text-black  focus:outline-0"
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
