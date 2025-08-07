// Principal para mostrar los personajes
'use client';
import '../globals.css';
import { useEffect, useState } from 'react';
import ArbolPersonajes from '@/components/ArbolPersonajes';
import Link from 'next/link';

// Aquí Mapeo el json que retorna la api publica

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  originName: string;
  locationName: string;
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


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-lg text-gray-300">Cargando personajes...</p>
        </div>
      </div>
    );
  }



  return (

    <main className="p-6 max-w-6xl mx-auto">

        <div className = "border-[0px] border-[none] rounded-xl shadow-md p-4 bg-white dark:bg-zinc-900">
		      <h1 className="text-3xl font-bold mb-6 text-center">PERSONAJES</h1>
	</div>

      <div className="flex justify-center gap-4 mt-8 bottombrd">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="back_btn hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="self-center">Página {page} de {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="back_btn bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>


      {loading && <p className="text-center">Cargando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
   

    <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">
        {characters.map((char) => (
          <div key={char.id} className="hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out bg-white rounded shadow p-2 text-center">
            <img src={char.image} alt={char.name} className="mx-auto rounded" />
            <h2 className="text-black font-semibold mt-2">Nombre : <Link href={`/personajes/${char.id}`}>{char.name}</Link></h2>
	    <p className=" text-black">Estado : {char.status}  </p>
            <p className=" text-black">Especie : {char.species} </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="back_btn bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="self-center">Página {page} de {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="back_btn bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </main>
  );
}
