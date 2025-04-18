import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

// Componente para mostrar los detalles del episodio
function EpisodioCard({ episodio }) {
  return (
    <div className="text-center p-5">
      <h3>{episodio.name}</h3>
      <p>Código: {episodio.episode}</p>
      <p>Fecha de emisión: {episodio.air_date}</p>
    </div>
  );
}

EpisodioCard.propTypes = {
  episodio: PropTypes.shape({
    name: PropTypes.string,
    episode: PropTypes.string,
    air_date: PropTypes.string,
    id: PropTypes.number
  }).isRequired
};

// Componente para la navegación entre páginas
function NavegacionPagina({ pagina, setPagina }) {
  return (
    <header className='d-flex justify-content-between align-items-center p-3'>
      <p>Página actual: {pagina}</p>
      <div>
        <button
          className='btn btn-primary btn-sm mx-1'
          onClick={() => setPagina(p => Math.max(p - 1, 1))}
          disabled={pagina === 1}
        >
          Anterior
        </button>
        <button
          className='btn btn-primary btn-sm mx-1'
          onClick={() => setPagina(p => p + 1)}
        >
          Siguiente
        </button>
      </div>
    </header>
  );
}

NavegacionPagina.propTypes = {
  pagina: PropTypes.number.isRequired,
  setPagina: PropTypes.func.isRequired
};

// Componente principal que maneja la lista de episodios
function ListaEpisodios() {
  const [episodios, setEpisodios] = useState([]); // Almacena los episodios obtenidos
  const [cargando, setCargando] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Almacena errores
  const [pagina, setPagina] = useState(1); // Página actual de los episodios
  const [nombreFiltro, setNombreFiltro] = useState(''); // Filtro de nombre de episodio

  useEffect(() => {
    async function fetchData() {
      try {
        setCargando(true);
        
        // Se actualiza la URL con el filtro de nombre
        const params = new URLSearchParams({
          page: pagina,
          ...(nombreFiltro && { name: nombreFiltro }) // Si hay un filtro de nombre, se agrega a la consulta
        });

        const response = await fetch(`https://rickandmortyapi.com/api/episode?${params}`);
        if (!response.ok) throw new Error('Error en la respuesta de la API');
        const data = await response.json();
        setEpisodios(data.results);
        setError(null);
      } catch (err) {
        setError(err.message);
        setEpisodios([]);
      } finally {
        setCargando(false);
      }
    }

    fetchData();
  }, [pagina, nombreFiltro]); // Ejecutar cada vez que cambian la página o el filtro

  return (
    <div className='container'>
      {/* Buscador de episodios */}
      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50" // Ajusta el tamaño del buscador
          placeholder="Buscar"
          value={nombreFiltro}
          onChange={(e) => setNombreFiltro(e.target.value)}
        />
      </div>

      {/* Componente de navegación de página */}
      <NavegacionPagina pagina={pagina} setPagina={setPagina} />

      {/* Muestra el estado de carga, error o la lista de episodios */}
      {cargando ? (
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">Error: {error}</div>
      ) : (
        <div className='row'>
          {episodios.map((episodio) => (
            <div className='col-md-4' key={episodio.id}>
              <EpisodioCard episodio={episodio} />
            </div>
          ))}
        </div>
      )}

      {/* Componente de navegación de página */}
      <NavegacionPagina pagina={pagina} setPagina={setPagina} />
    </div>
  );
}

// Componente principal que incluye los episodios
export default function Episodio() {
  return (
    <div className='bg-dark text-white'>
      <h1 className='text-center display-1 py-4'>Episodios</h1>
      <ListaEpisodios />
    </div>
  );
}
