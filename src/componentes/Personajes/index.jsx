import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Personajes() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Para la paginación

  useEffect(() => {
    const fetchPersonajes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = await response.json();
        setPersonajes(data.results);
      } catch (error) {
        console.error('Error al cargar personajes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonajes();
  }, [page]); // Refresca los personajes cada vez que cambie la página

  if (loading) return <div className="text-center text-white">Cargando personajes...</div>;

  return (
    <div className="text-center text-white">
      <h1>Personajes</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {personajes.map((personaje) => (
          <div key={personaje.id} className="personaje-card m-3">
            {/* Enlazamos la imagen con el detalle del personaje */}
            <Link to={`/detalles/${personaje.id}`}>
              <img
                src={personaje.image}
                alt={personaje.name}
                className="img-fluid rounded-circle shadow-lg"
                style={{ maxWidth: '150px' }}
              />
              <h5>{personaje.name}</h5>
            </Link>
          </div>
        ))}
      </div>
      {/* Paginación */}
      <div>
        <button
          className="btn btn-primary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setPage(page + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Personajes;
