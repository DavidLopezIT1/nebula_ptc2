'use client';
import '../globals.css';
import { useEffect, useState } from 'react';

interface Episodios {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

const usarFavoritos = () => {
  const [favoritos, setFavoritos] = useState<number[]>([]);

  useEffect(() => {
    const favoritosGuardados = localStorage.getItem('rickandmorty-episodios-favorites');
    if (favoritosGuardados) {
      setFavoritos(JSON.parse(favoritosGuardados));
    }
  }, []);

  const alternarFavorito = (idEpisodio: number) => {
    const nuevosFavoritos = favoritos.includes(idEpisodio)
      ? favoritos.filter(id => id !== idEpisodio)
      : [...favoritos, idEpisodio];

    setFavoritos(nuevosFavoritos);
    localStorage.setItem('rickandmorty-episodios-favorites', JSON.stringify(nuevosFavoritos));
  };

  const esFavorito = (idEpisodio: number) => favoritos.includes(idEpisodio);

  return { favoritos, alternarFavorito, esFavorito };
};

export default function PaginaEpisodios() {
  const [episodios, setEpisodios] = useState<Episodios[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [verFavoritos, setVerFavoritos] = useState(false);
  const { favoritos, alternarFavorito, esFavorito } = usarFavoritos();

  useEffect(() => {
    const consultar_episodios = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
        const data = await res.json();

        const personajesEpisodio = await Promise.all(
          data.results.map(async (episodio: any) => {
            const characterstUrls = episodio.characters.slice(0, 5); // solo primeros 5
            const charactersIds = characterstUrls.map((url: string) => url.split('/').pop());

            let nombres: string[] = [];

            if (charactersIds.length > 0) {
              const resPersonajes = await fetch(
                `https://rickandmortyapi.com/api/character/${charactersIds.join(',')}`
              );
              const personajes = await resPersonajes.json();

              if (Array.isArray(personajes)) {
                nombres = personajes.map((p) => p.name);
              } else {
                nombres = [personajes.name];
              }
            }

            return {
              id: episodio.id,
              name: episodio.name,
              air_date: episodio.air_date,
              episode: episodio.episode,
              characters: nombres,
            };
          })
        );

        setEpisodios(personajesEpisodio);
        setTotalPages(data.info.pages);
      } catch (err) {
        setError('No pude cargar los episodios.');
      } finally {
        setLoading(false);
      }
    };

    if (!verFavoritos) {
      consultar_episodios();
    }
  }, [page, verFavoritos]);

  const obtenerEpisodiosFavoritos = async () => {
    if (favoritos.length === 0) return [];

    setLoading(true);
    try {
      const episodiosFavoritos = await Promise.all(
        favoritos.map(async (id) => {
          const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
          const episodio = await res.json();

          const characterstUrls = episodio.characters.slice(0, 5);
          const charactersIds = characterstUrls.map((url: string) => url.split('/').pop());

          let nombres: string[] = [];

          if (charactersIds.length > 0) {
            const resPersonajes = await fetch(
              `https://rickandmortyapi.com/api/character/${charactersIds.join(',')}`
            );
            const personajes = await resPersonajes.json();

            if (Array.isArray(personajes)) {
              nombres = personajes.map((p) => p.name);
            } else {
              nombres = [personajes.name];
            }
          }

          return {
            id: episodio.id,
            name: episodio.name,
            air_date: episodio.air_date,
            episode: episodio.episode,
            characters: nombres,
          };
        })
      );
      return episodiosFavoritos;
    } catch (err) {
      setError('Error al cargar favoritos');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const manejarVerFavoritos = async () => {
    setVerFavoritos(true);
    const episodiosFavoritos = await obtenerEpisodiosFavoritos();
    setEpisodios(episodiosFavoritos);
  };

  const manejarVerTodos = () => {
    setVerFavoritos(false);
    setPage(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-lg text-gray-300">Cargando episodios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="border-[0px] border-[none] rounded-xl shadow-md p-4 bg-white dark:bg-zinc-900">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {verFavoritos ? 'EPISODIOS FAVORITOS' : 'EPISODIOS'}
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
            Todos los Episodios
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
        <div className="flex justify-center items-center gap-4 mt-8 mb-8">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="back_btn px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-gray-700">Página {page} de {totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="back_btn px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}

      {loading && <p className="text-center">Cargando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {verFavoritos && favoritos.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-xl text-gray-500 mb-4">No tienes episodios favoritos aún</p>
          <button
            onClick={manejarVerTodos}
            className="back_btn bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Explora episodios para agregar favoritos
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Cargando episodios...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center ">
          {episodios.map((eps) => (
            <div
              key={eps.id}
              className="relative bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out"
            >
              <button
                onClick={() => alternarFavorito(eps.id)}
                className={`back_btn absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  esFavorito(eps.id)
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                title={esFavorito(eps.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                {esFavorito(eps.id) ? '❤️' : '🤍'}
              </button>

              <h2 className="text-xl text-black font-semibold">Nombre Episodio : {eps.name}</h2>
              <p className="text-sm text-black">Fecha de Emisión : {eps.air_date}</p>
              <p className="text-sm text-black mb-2">Numero Episodio: {eps.episode}</p>

              <p className="font-medium text-black">Personajes: (max 5). </p>
              {eps.characters.length === 0 ? (
                <p className="text-sm text-black">No hay personajes</p>
              ) : (
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {eps.characters.map((character, idx) => (
                    <li key={idx}>{character}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {!verFavoritos && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="back_btn px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-gray-700">Página {page} de {totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="back_btn px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
