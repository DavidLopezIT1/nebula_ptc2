// Cambio de enrutamiento version 1
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-purple-700">
        Bienvenido a Rick and Morty SPA
      </h1>
      <p className="text-lg text-gray-700">
        Explora los personajes, episodios y ubicaciones del multiverso.
      </p>
      <p className="mt-4">
        Usa el menú o visita directamente:
      </p>
      <ul className="mt-2 space-y-1 text-blue-600">
        <li><a href="/personajes" className="underline">/Personajes</a></li>
        <li><a href="/ubicaciones" className="underline">/Ubicaciones</a></li>
        <li><a href="/episodios" className="underline">/Episodios</a></li>
      </ul>
    </main>
  );
}
