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
    name: string;
    origin: { url: string };
    location: { url: string };
    episode: string[];
  };

  const [personaje, setPersonaje] = useState<Personaje | null>(null);
  const [episodios, setEpisodios] = useState<Episodio[]>([]);
  const [ubicacion, setUbicacion] = useState<Ubicacion | null>(null);
  const [ubicacionactual, setUbicacionactual] = useState<Ubicacion | null>(null);

  useEffect(() => {
    if (!personajeId) return;

    async function fetchData() {
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
    }

    fetchData();
  }, [personajeId]);

  if (!personaje) return <div className="text-center text-lg">Cargando...</div>;

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">{personaje.name}</h2>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="font-semibold">Origen:</h3>
        {ubicacion ? (
          <p>Origen: {ubicacion.name}, Dimensión - {ubicacion.dimension}</p>
        ) : (
          <p>Desconocida</p>
        )}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="font-semibold">Ubicación:</h3>
        {ubicacionactual ? (
          <p>Ubicación: {ubicacionactual.name}, Dimensión - {ubicacionactual.dimension}</p>
        ) : (
          <p>Desconocida</p>
        )}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="font-semibold">Episodios:</h3>
        <ul className="list-disc list-inside space-y-1">
          {episodios.map((ep) => (
            <li key={ep.id}>
              {ep.episode} – {ep.name}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
