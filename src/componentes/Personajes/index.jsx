import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Character({ character }) {
  return (
    <div className="text-center p-5">
      <h3>{character.name}</h3>
      <img 
        className="img-fluid rounded-pill" 
        src={character.image} 
        alt={character.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/150';
        }}
      />
      <p>{character.origin.name}</p>
    </div>
  );
}

Character.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    origin: PropTypes.shape({
      name: PropTypes.string
    }),
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

function Personajes() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${page}`
        );
        
        if (!response.ok) throw new Error('Error al cargar personajes');
        
        const data = await response.json();
        setCharacters(data.results);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [page]);

  return (
    <div className='bg-dark text-white'>
      <h1 className='text-center display-1 py-4'>Personajes</h1>
      
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
            {characters.map((character) => (
              <div className='col-md-4' key={character.id}>
                <Character character={character} />
              </div>
            ))}
          </div>
        )}

        <Paginacion page={page} setPage={setPage} />
      </div>
    </div>
  );
}

export default Personajes;