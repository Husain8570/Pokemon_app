import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import PokemonCard from './components/PokemonCard';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPokemon = async () => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
      const data = await res.json();
      const pokemonDetails = await Promise.all(
        data.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json()))
      );
      setPokemonList(pokemonDetails);
      setFilteredList(pokemonDetails);
      const uniqueTypes = new Set();
      pokemonDetails.forEach(p => p.types.forEach(t => uniqueTypes.add(t.type.name)));
      setTypes(['All', ...Array.from(uniqueTypes)]);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching Pokémon:', err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    let filtered = pokemonList.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (selectedType !== 'All') {
      filtered = filtered.filter(p =>
        p.types.some(t => t.type.name === selectedType)
      );
    }
    setFilteredList(filtered);
  }, [search, selectedType, pokemonList]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <SearchFilter
          search={search}
          setSearch={setSearch}
          types={types}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        {loading ? (
          <p className="text-center mt-10 text-lg">Loading Pokémon...</p>
        ) : error ? (
          <p className="text-center mt-10 text-red-500 text-lg">Failed to load Pokémon. Try again later.</p>
        ) : filteredList.length === 0 ? (
          <p className="text-center mt-10 text-gray-600">No Pokémon found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
            {filteredList.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
