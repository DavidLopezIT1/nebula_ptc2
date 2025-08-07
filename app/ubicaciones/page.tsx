// Principal para mostrar las ubicaciones
'use client';
import '../globals.css';
import { useEffect, useState } from 'react';

interface Ubicaciones {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; 
}

export default function Pagina_ubicaciones() {
  const [ubicaciones, setUbicaciones] = useState<Ubicaciones[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const consultar_Ubicaciones = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`);
        const data = await res.json();

        const ubicacionesConResidentes = await Promise.all(
          data.results.map(async (ubicacion: any) => {
            const residentUrls = ubicacion.residents.slice(0, 5); // solo primeros 5
            const residentIds = residentUrls.map((url: string) => url.split('/').pop());

            let nombres: string[] = [];

            if (residentIds.length > 0) {
              const resPersonajes = await fetch(
                `https://rickandmortyapi.com/api/character/${residentIds.join(',')}`
              );
              const personajes = await resPersonajes.json();

              if (Array.isArray(personajes)) {
                nombres = personajes.map((p) => p.name);
              } else {
                nombres = [personajes.name];
              }
            }

            return {
              id: ubicacion.id,
              name: ubicacion.name,
              type: ubicacion.type,
              dimension: ubicacion.dimension,
              residents: nombres,
            };
          })
        );

        setUbicaciones(ubicacionesConResidentes);
        setTotalPages(data.info.pages);
      } catch (err) {
        setError('No pude cargar las ubicaciones.');
      } finally {
        setLoading(false);
      }
    };

    consultar_Ubicaciones();
  }, [page]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-lg text-gray-300">Cargando ubicaciones...</p>
        </div>
      </div>
    );
  }



  return (
    <div className="p-6">

        <div className = "border-[0px] border-[none] rounded-xl shadow-md p-4 bg-white dark:bg-zinc-900">
                      <h1 className="text-3xl font-bold mb-6 text-center">UBICACIONES</h1>
        </div>


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



      {loading ? (
        <p className="text-center text-gray-500">Cargando ubicaciones...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-3 gap-8 text-center ">
          {ubicaciones.map((ubic) => (
            <div
              key={ubic.id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
            >
              <h2 className="text-xl text-black font-semibold">Nombre Ubicación : {ubic.name}</h2>
              <p className="text-sm text-black">Tipo: {ubic.type}</p>
              <p className="text-sm text-black mb-2">Dimensión: {ubic.dimension}</p>

              <p className="font-medium text-black">Residentes: (max 5). </p>
              {ubic.residents.length === 0 ? (
                <p className="text-sm text-black">No hay residentes</p>
              ) : (
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {ubic.residents.map((residente, idx) => (
                    <li key={idx}>{residente}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

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
    </div>
  );
}
