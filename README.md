# Rick and Morty - SPA (Next.js + React)

Aplicación web desarrollada con **ReactJS y Next.js** que consume la [API pública de Rick and Morty](https://rickandmortyapi.com/), permitiendo explorar personajes, ubicaciones y sus relaciones. Es una Single Page Application (SPA) totalmente responsive, diseñada con **TailwindCSS**

---

## Tecnologías

- [Next.js 14 (App Router)](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- Fetch API (nativo)
- HTML semántico y buenas prácticas accesibles
- Estilo limpio y organizado con componentes reutilizables (Headers)

---

## Estructura del Proyecto

/app
├── layout.tsx # Layout global de la app
├── globals.css # Estilos base con Tailwind
├── page.tsx # Página de inicio (puedes personalizarla)
├── personajes/ # Vista principal y detalle de personajes
│ ├── page.tsx # Listado de personajes con paginación
│ └── [id]/page.tsx # Página de detalle individual
└── ubicaciones/
└── page.tsx # Página que muestra ubicaciones + residentes

---

## Instalación y uso en ambiente de desarrollo

1. **Se debe clonar este repositorio**
# bash :
    git clone https://github.com/TU_USUARIO/rick-and-morty-app.git
    cd rick-and-morty/

2. **Instalar dependencias**
# bash :
    npm install

3. Luego se debe levantar el servidor de desarrollo
# bash :
    npm run dev
# NOTA: En esta aplicación NO se necesita despliegue para visualizar, la desplegué en una maquina EC2 de AWS, la pueden consultar a partir del Viernes 8 de Agosto sobre las 8:00 am - en el siguiente link:
  
	 -----> http://3.140.2.26:3000/ <-----



--- Cómo usar la aplicación ---

# Página de inicio

Se muestra una´página de inicio en donde se podrá visualizar la interfáz de bienvenida, luego de esto, 
podrá usar los menú de la GUI para interacturar con los diferentes módulos (personajes, ubicaciones, episodios)

Puede navegar con los controles del header o con los controles de la GUI

   -----> http://3.140.2.26:3000/ <-----


# Página de Personajes /personajes
Se muestra una lista paginada de personajes.

   -----> http://3.140.2.26:3000/personajes <-----

Al hacer clic sobre el nombre de cualquiera, se navega a su detalle (/personajes/[id]).

# Cada personaje incluye:
  
    Imagen
    Nombre
    Estado
    Especie
    Origen
    Ubicación actual
    Episodios

Al hacer click en el corazón que queda en la parte superior derecha de cada tarjeta, se puede añadir a favoritos

    Para ver los favoritos solo debe seleccionar el botón llamado favoritos y podrá ver filtrado su selección.

# Página de Ubicaciones /ubicaciones
Lista las ubicaciones disponibles con:

Nombre, tipo y dimensión

Primeros 5 residentes (nombres)

Botones para navegar entre páginas.

  -----> http://3.140.2.26:3000/ubicaciones <-----


Al hacer click en el corazón que queda en la parte superior derecha de cada tarjeta, se puede añadir a favoritos

    Para ver los favoritos solo debe seleccionar el botón llamado favoritos y podrá ver filtrado su selección.



# Página de Episodios /episodios
Lista las ubicaciones disponibles con:

Nombre del episodio, Fecha de Emisión, Numero Episodio.

Primeros 5 personajes de cada episodio (nombres)

Botones para navegar entre páginas.

  -----> http://3.140.2.26:3000/episodios <-----


Al hacer click en el corazón que queda en la parte superior derecha de cada tarjeta, se puede añadir a favoritos

    Para ver los favoritos solo debe seleccionar el botón llamado favoritos y podrá ver filtrado su selección.












