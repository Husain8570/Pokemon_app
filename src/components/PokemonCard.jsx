const PokemonCard = ({ pokemon }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto"
        />
        <h2 className="text-lg font-bold text-center capitalize mt-2">{pokemon.name}</h2>
        <p className="text-center text-sm text-gray-500">ID: #{pokemon.id}</p>
        <div className="flex justify-center gap-2 mt-2">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className="px-2 py-1 text-xs bg-gray-200 rounded-full capitalize"
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    );
  };
  
  export default PokemonCard;
  