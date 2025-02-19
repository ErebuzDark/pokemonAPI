import React from 'react';

const Cards = ({ filteredPokemon, onToggleModal }) => {
  return (
    <div className="grid grid-cols-2 gap-2 p-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredPokemon.map((pokemon, index) => (
        <div key={index} onClick={() => onToggleModal(pokemon.name)} className="card group">
          <div className="absolute top-0 left-0 flex h-7 min-w-11 items-center justify-center rounded-br-md bg-red-600">
            <p className="text-center text-white">{pokemon.id}</p>
          </div>

          <img
            src={pokemon.sprite}
            alt={pokemon.sprite}
            className="size-16 group-hover:scale-125 duration-300"
          />
          <h2 className="text-sm font-bold md:text-xl">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Cards;
