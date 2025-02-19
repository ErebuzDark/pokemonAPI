import React, { useState, createContext } from 'react';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemonSearch, setPokemonSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');

  return (
    <PokemonContext.Provider
      value={{ pokemonSearch, setPokemonSearch, selectedType, setSelectedType }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
