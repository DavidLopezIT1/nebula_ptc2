'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function ArbolPersonajesPage() {
  const params = useParams();
  const personajeId = params?.id as string;

  type Episodio = {
    id: number;
    name: string;
    episode: string;
  };

  type Ubicacion = {
    name: string;
    dimension: string;
  };

  type Personaje = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
    origin: { url: string };
    location: { url: string };
    episode: string[];
    created: string;
  };

  const [personaje, setPersonaje] = useState<Personaje | null>(null);
  const [episodios, setEpisodios] = useState<Episodio[]>([]);
  const [ubicacion, setUbicacion] = useState<Ubicacion | null>(null);
  const [ubicacionactual, setUbicacionactual] = useState<Ubicacion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!personajeId) return;

    async function fetchData() {
      try {
        setLoading(true);
        
        const ch = await fetch(`https://rickandmortyapi.com/api/character/${personajeId}`).then((r) =>
          r.json()
        );
        setPersonaje(ch);

        if (ch.episode && Array.isArray(ch.episode) && ch.episode.length > 0) {
          const ids = ch.episode.map((url: string) => url.split('/').pop()).join(',');
          const ep = await fetch(`https://rickandmortyapi.com/api/episode/${ids}`).then((r) =>
            r.json()
          );
          setEpisodios(Array.isArray(ep) ? ep : [ep]);
        }

        if (ch.origin?.url) {
          const o = await fetch(ch.origin.url).then((r) => r.json());
          setUbicacion(o);
        }

        if (ch.location?.url) {
          const l = await fetch(ch.location.url).then((r) => r.json());
          setUbicacionactual(l);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [personajeId]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive': return 'text-green-600 bg-green-100';
      case 'dead': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-lg text-gray-300">Cargando personaje...</p>
        </div>
      </div>
    );
  }

  if (!personaje) {
    return (
      <div className="text-center text-lg text-red-400 mt-10">
        No se pudo cargar el personaje
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver atrás
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
              <h1 className="text-3xl font-bold text-white mb-4">{personaje.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(personaje.status)}`}>
                  {personaje.status}
                </span>
                <span className="text-gray-400">#{personaje.id}</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Información General</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-400">Especie</span>
                  <p className="text-white">{personaje.species}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-400">Género</span>
                  <p className="text-white">{personaje.gender}</p>
                </div>
                {personaje.type && (
                  <div className="col-span-2">
                    <span className="text-sm font-medium text-gray-400">Tipo</span>
                    <p className="text-white">{personaje.type}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Origen</h3>
              {ubicacion ? (
                <div>
                  <p className="text-white font-medium">{ubicacion.name}</p>
                  <p className="text-gray-400 text-sm">Dimensión: {ubicacion.dimension}</p>
                </div>
              ) : (
                <p className="text-gray-400 italic">Desconocido</p>
              )}
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Ubicación Actual</h3>
              {ubicacionactual ? (
                <div>
                  <p className="text-white font-medium">{ubicacionactual.name}</p>
                  <p className="text-gray-400 text-sm">Dimensión: {ubicacionactual.dimension}</p>
                </div>
              ) : (
                <p className="text-gray-400 italic">Desconocida</p>
              )}
            </div>
          </div>

          <div className="flex justify-center lg:justify-start h-fit">
            <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700 w-full max-w-lg">
              <div className="relative mb-6">
                <img
                  src={personaje.image}
                  alt={personaje.name}
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                />
                <div className="absolute top-4 right-4">
                  <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                    personaje.status.toLowerCase() === 'alive' ? 'bg-green-500' :
                    personaje.status.toLowerCase() === 'dead' ? 'bg-red-500' : 'bg-gray-500'
                  }`}></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="text-center border-t border-gray-700 pt-4">
                  <p className="text-sm text-gray-400">
                    Creado: {new Date(personaje.created).toLocaleDateString('es-ES')}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-400">Estado</p>
                    <p className="text-white font-medium">{personaje.status}</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-400">ID</p>
                    <p className="text-white font-medium">#{personaje.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Episodios
            </h3>
            <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
              {episodios.length} total{episodios.length !== 1 ? 'es' : ''}
            </span>
          </div>
          
          {episodios.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {episodios.slice(0, 5).map((ep) => (
                  <div key={ep.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:shadow-md hover:bg-gray-600 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded">
                        {ep.episode}
                      </span>
                    </div>
                    <h4 className="font-medium text-white text-sm leading-tight">
                      {ep.name}
                    </h4>
                  </div>
                ))}
              </div>
              {episodios.length > 5 && (
                <div className="mt-4 text-center">
                  <p className="text-gray-400 text-sm">
                    Mostrando los primeros 5 episodios de {episodios.length}
                  </p>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-400 italic">No hay episodios disponibles</p>
          )}
        </div>
      </div>
    </main>
  );
}
