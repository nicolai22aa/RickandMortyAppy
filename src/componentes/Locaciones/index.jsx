import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

// Componente para mostrar los detalles de una locación
function LocationCard({ location }) {
  return (
    <div className="location-card">
      <h3>{location.name}</h3>
      <p>Tipo: {location.type}</p>
      <p>Dimensión: {location.dimension}</p>
      <p>Residentes: {location.residents?.length || 0}</p>
    </div>
  );
}

LocationCard.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    dimension: PropTypes.string,
    residents: PropTypes.array,
    id: PropTypes.number
  }).isRequired
};

// Componente de paginación
function Paginacion({ page, setPage }) {
  return (
    <header className='pagination-container'>
      <p>Página: {page}</p>
      <div>
        <button
          className='btn btn-primary btn-sm mx-1'
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        <button
          className='btn btn-primary btn-sm mx-1'
          onClick={() => setPage(p => p + 1)}
        >
          Siguiente
        </button>
      </div>
    </header>
  );
}

Paginacion.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired
};

// Componente de filtro de nombre de locación
function FiltrosLocaciones({ filtroNombre, setFiltroNombre }) {
  return (
    <div className="mb-4 d-flex justify-content-center">
      <input
        type="text"
        className="form-control w-50" // Ajusta el tamaño del buscador
        placeholder="Buscar"
        value={filtroNombre}
        onChange={(e) => setFiltroNombre(e.target.value)}
      />
    </div>
  );
}

FiltrosLocaciones.propTypes = {
  filtroNombre: PropTypes.string.isRequired,
  setFiltroNombre: PropTypes.func.isRequired
};

// Componente principal que maneja la lista de locaciones
function Locaciones() {
  const [locations, setLocations] = useState([]); // Almacena las locaciones obtenidas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Almacena errores
  const [page, setPage] = useState(1); // Página actual de las locaciones
  const [filtroNombre, setFiltroNombre] = useState(''); // Filtro de nombre de locación

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page,
          ...(filtroNombre && { name: filtroNombre }) // Si hay un filtro de nombre, se agrega a la consulta
        });

        const response = await fetch(
          `https://rickandmortyapi.com/api/location?${params}`
        );

        if (!response.ok) throw new Error('Error al cargar locaciones');

        const data = await response.json();
        setLocations(data.results);
        setError(null);
      } catch (err) {
        setError(err.message);
        setLocations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [page, filtroNombre]); // Ejecutar cada vez que cambian la página o el filtro

  return (
    <div className='bg-dark text-white'>
      <h1 className='text-center display-1 py-4'>Locaciones</h1>

      <div className='container'>
        {/* Buscador de locaciones */}
        <FiltrosLocaciones
          filtroNombre={filtroNombre}
          setFiltroNombre={setFiltroNombre}
        />

        {/* Componente de paginación de página */}
        <Paginacion page={page} setPage={setPage} />

        {/* Muestra el estado de carga, error o la lista de locaciones */}
        {loading ? (
          <div className="text-center text-white">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <h1>Cargando...</h1>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className='row'>
            {locations.map((location) => (
              <div className='col-md-4 mb-4' key={location.id}>
                <LocationCard location={location} />
              </div>
            ))}
          </div>
        )}

        {/* Componente de paginación de página */}
        <Paginacion page={page} setPage={setPage} />
      </div>
    </div>
  );
}

export default Locaciones;
