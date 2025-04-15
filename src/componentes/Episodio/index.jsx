import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

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

function ListaEpisodios() {
  const [episodios, setEpisodios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        setCargando(true);
        const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${pagina}`);
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
  }, [pagina]);

  return (
    <div className='container bg-danger'>
      <NavegacionPagina pagina={pagina} setPagina={setPagina} />

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

      <NavegacionPagina pagina={pagina} setPagina={setPagina} />
    </div>
  );
}

export default function Episodio() {
  return (
    <div className='bg-dark text-white'>
      <h1 className='text-center display-1 py-4'>Episodios</h1>
      <ListaEpisodios />
    </div>
  );
}