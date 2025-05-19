import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
  const [favoritos, setFavoritos] = useState(favoritosGuardados);

  const [data, setData] = useState([]);
  const [filtroSeleccionado, setFiltroSeleccionado] = useState('All');

  const vistosGuardados = JSON.parse(localStorage.getItem("vistos")) || [];
  const [personajesVistos, setPersonajesVistos] = useState(vistosGuardados);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        let url = `https://rickandmortyapi.com/api/character`;

        if (filtroSeleccionado !== 'All') {
          // Puedes cambiar "species" por "status" u otro filtro que desees usar
          url += `?species=${filtroSeleccionado}`;
        }

        const res = await fetch(url);
        const json = await res.json();
        setData(json.results || []);
      } catch (error) {
        console.error("Error al obtener personajes:", error);
      }
    };

    obtenerDatos();
  }, [filtroSeleccionado]);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    localStorage.setItem("vistos", JSON.stringify(personajesVistos));
  }, [personajesVistos]);

  return (
    <AppContext.Provider
      value={{
        favoritos,
        setFavoritos,
        data,
        setData,
        filtroSeleccionado,
        setFiltroSeleccionado,
        personajesVistos,
        setPersonajesVistos
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
