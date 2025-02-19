import { useState } from 'react';
import { PokemonProvider } from './components/PokemonContext';

// components
import PokemonCards from './screens/pokemonCards';
import Navbar from './components/Navbar';

function App() {
  return (
    <PokemonProvider>
      <Navbar />
      <PokemonCards />
    </PokemonProvider>
  );
}

export default App;
