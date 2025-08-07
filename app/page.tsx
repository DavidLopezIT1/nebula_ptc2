// Rick & Morty SPA - Página de inicio
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">

      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white">R&M</span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
              Rick & Morty
              <span className="block text-3xl sm:text-4xl text-purple-600 font-semibold mt-2">
                Explorador del Multiverso
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Descubre todos los personajes, episodios y ubicaciones del universo de Rick y Morty
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">

            <a 
              href="/personajes" 
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-purple-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                  Personajes
                </h3>
                <p className="text-sm text-gray-600">
                  Conoce a todos los personajes del multiverso
                </p>
              </div>
            </a>


            <a 
              href="/ubicaciones" 
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-green-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                  Ubicaciones
                </h3>
                <p className="text-sm text-gray-600">
                  Explora los mundos y dimensiones
                </p>
              </div>
            </a>


            <a 
              href="/episodios" 
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-blue-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Episodios
                </h3>
                <p className="text-sm text-gray-600">
                  Revisa todos los episodios de la serie
                </p>
              </div>
            </a>
          </div>


          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mt-12 border border-white/20">
            <div className="grid grid-cols-3 divide-x divide-gray-200">
              <div className="text-center px-4">
                <div className="text-2xl font-bold text-gray-900">826</div>
                <div className="text-sm text-gray-600">Personajes</div>
              </div>
              <div className="text-center px-4">
                <div className="text-2xl font-bold text-gray-900">126</div>
                <div className="text-sm text-gray-600">Ubicaciones</div>
              </div>
              <div className="text-center px-4">
                <div className="text-2xl font-bold text-gray-900">51</div>
                <div className="text-sm text-gray-600">Episodios</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
