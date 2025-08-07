'use client';
import '../globals.css';
import { useEffect, useState } from 'react';
import ArbolPersonajes from '@/components/ArbolPersonajes';
import Link from 'next/link';

interface Personaje {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  originName: string;
  locationName: string;
}

const usarFavoritos = () => {
  const [favoritos, setFavoritos] = useState<number[]>([]);

  useEffect(() => {
    const favoritosGuardados = localStorage.getItem('rickandmorty-favorites');
    if (favoritosGuardados) {
      setFavoritos(JSON.parse(favoritosGuardados));
    }
  }, []);

  const alternarFavorito = (idPersonaje: number) => {
    const nuevosFavoritos = favoritos.includes(idPersonaje)
      ? favoritos.filter(id => id !== idPersonaje)
      : [...favoritos, idPersonaje];
    
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('rickandmorty-favorites', JSON.stringify(nuevosFavoritos));
  };

  const esFavorito = (idPersonaje: number) => favoritos.includes(idPersonaje);

  return { favoritos, alternarFavorito, esFavorito };
};

export default function PaginaPersonajes() {
  const [personajes, setPersonajes] = useState<Personaje[]>([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [verFavoritos, setVerFavoritos] = useState(false);
  const { favoritos, alternarFavorito, esFavorito } = usarFavoritos();

  useEffect(() => {
    const obtenerPersonajes = async () => {
      setCargando(true);
      setError('');
      try {
        const respuesta = await fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`);
        const datos = await respuesta.json();
        setPersonajes(datos.results);
        setTotalPaginas(datos.info.pages);
      } catch (err) {
        setError('No pude cargar los perrrrrsonajessssss.');
      } finally {
        setCargando(false);
      }
    };
    
    if (!verFavoritos) {
      obtenerPersonajes();
    }
  }, [pagina, verFavoritos]);

  const obtenerPersonajesFavoritos = async () => {
    if (favoritos.length === 0) return [];
    
    setCargando(true);
    try {
      const personajesFavoritos = await Promise.all(
        favoritos.map(async (id) => {
          const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
          return await res.json();
        })
      );
      return personajesFavoritos;
    } catch (err) {
      setError('Error al cargar favoritos');
      return [];
    } finally {
      setCargando(false);
    }
  };

  const manejarVerFavoritos = async () => {
    setVerFavoritos(true);
    const charsFavoritos = await obtenerPersonajesFavoritos();
    setPersonajes(charsFavoritos);
  };

  const manejarVerTodos = () => {
    setVerFavoritos(false);
    setPagina(1);
  };

  if (cargando) {
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
      <div className="border-[0px] border-[none] rounded-xl shadow-md p-4 bg-white dark:bg-zinc-900">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {verFavoritos ? 'FAVORITOS' : 'PERSONAJES'}
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={manejarVerTodos}
            className={` px-6 py-2 rounded-lg transition-colors ${
              !verFavoritos 
                ? 'back_btn text-black' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todos los Personajes
          </button>
          <button
            onClick={manejarVerFavoritos}
            className={` px-6 py-2 rounded-lg transition-colors ${
              verFavoritos 
                ? 'back_btn text-black' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Favoritos ({favoritos.length})
          </button>
        </div>
      </div>

      {!verFavoritos && (
        <div className="flex justify-center gap-4 mt-8 bottombrd">
          <button
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
            className="back_btn hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="self-center">Página {pagina} de {totalPaginas}</span>
          <button
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas}
            className="back_btn bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}

      {cargando && <p className="text-center">Cargando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {verFavoritos && favoritos.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-xl text-gray-500 mb-4">No tienes personajes favoritos aún</p>
          <button
            onClick={manejarVerTodos}
            className="back_btn bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Explora personajes para agregar favoritos
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">
        {personajes.map((personaje) => (
          <div key={personaje.id} className="relative hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out bg-white rounded shadow p-2 text-center">
            <button
              onClick={() => alternarFavorito(personaje.id)}
              className={`back_btn absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                esFavorito(personaje.id)
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              title={esFavorito(personaje.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              {esFavorito(personaje.id) ? '❤️' : '🤍'}
            </button>
            
            <img src={personaje.image} alt={personaje.name} className="mx-auto rounded" />
            <h2 className="text-black font-semibold mt-2">
              Nombre : <Link href={`/personajes/${personaje.id}`}>{personaje.name}</Link>
            </h2>
            <p className="text-black">Estado : {personaje.status}</p>
            <p className="text-black">Especie : {personaje.species}</p>
          </div>
        ))}
      </div>

      {!verFavoritos && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
            className="back_btn bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="self-center">Página {pagina} de {totalPaginas}</span>
          <button
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas}
            className="back_btn bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </main>
  );
}
