import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(guardados);
  }, []);

  if (favoritos.length === 0) {
    return <div className="text-white text-center mt-4">No hay personajes favoritos aún.</div>;
  }

  return (
    <div className="text-white text-center container">
      <h1 className="my-4">Personajes Favoritos</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {favoritos.map(personaje => (
          <div key={personaje.id} className="personaje-card m-3 text-center">
            <Link to={`/detalles/${personaje.id}`}>
              <img
                src={personaje.image}
                alt={personaje.name}
                className="img-fluid rounded-circle shadow-lg mb-2"
                style={{ maxWidth: '150px' }}
              />
              <h5 className="text-white">{personaje.name}</h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favoritos;
