import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function LocationCard({ location }) {
  return (
    <div className="text-center p-5">
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

function Paginacion({ page, setPage }) {
  return (
    <header className='d-flex justify-content-between align-items-center p-3'>
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

function Locaciones() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://rickandmortyapi.com/api/location?page=${page}`
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
  }, [page]);

  return (
    <div className='bg-dark text-white'>
      <h1 className='text-center display-1 py-4'>Locaciones</h1>
      
      <div className='container bg-danger'>
        <Paginacion page={page} setPage={setPage} />

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
              <div className='col-md-4' key={location.id}>
                <LocationCard location={location} />
              </div>
            ))}
          </div>
        )}

        <Paginacion page={page} setPage={setPage} />
      </div>
    </div>
  );
}

export default Locaciones;