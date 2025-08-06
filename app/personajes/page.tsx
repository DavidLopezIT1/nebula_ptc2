// Principal para mostrar los personajes
'use client';

import { useEffect, useState } from 'react';

// Aquí Mapeo el json que retorna la api publica

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export default function Pagina_personajs() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const consultar_personajes = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = await res.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (err) {
        setError('No pude cargar los perrrrrsonajessssss.');
      } finally {
        setLoading(false);
      }
    };
    consultar_personajes();
  }, [page]);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">---- Personajes ---- </h1>

      {loading && <p className="text-center">Cargando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {characters.map((char) => (
          <div key={char.id} className="bg-white rounded shadow p-2 text-center">
            <img src={char.image} alt={char.name} className="mx-auto rounded" />
            <h2 className="text-lg font-semibold mt-2">{char.name}</h2>
            <p className="text-sm text-gray-500">{char.status} - {char.species}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="self-center">Página {page} de {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </main>
  );
}
