import React, { useState, createContext } from 'react';

export const PokemonContext = createContext();

export const PokemonProvider = ( {children} ) => {
  const [pokemonSearch, setPokemonSearch] = useState('');

  return (
     <PokemonContext.Provider value={{ pokemonSearch, setPokemonSearch }}>
      {children}
    </PokemonContext.Provider>
  );
}
