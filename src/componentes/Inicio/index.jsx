import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Necesitamos Link para redirigir
import './style.css';

function Inicio() {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    const fetchPersonajes = async () => {
      try {
        // Traemos a los personajes de la familia Smith (Rick, Morty, Beth, Jerry, Summer)
        const response = await fetch('https://rickandmortyapi.com/api/character/1,2,3,4,5'); // IDs de los personajes
        const data = await response.json();
        setPersonajes(data);
      } catch (error) {
        console.error('Error al cargar personajes:', error);
      }
    };

    fetchPersonajes();
  }, []);

  return (
    <div className="inicio-container text-white text-center d-flex flex-column justify-content-center align-items-center">
      <h1 className="display-2 mb-4">Bienvenido al Multiverso de Rick and Morty</h1>
      <p className="lead mb-4 w-75">
        Conoce a la familia Smith, los personajes principales de esta divertida y alocada serie. ¡Haz clic en su imagen para saber más!
      </p>
      
      <div className="d-flex justify-content-center mb-4">
        {personajes.length > 0 ? (
          personajes.map((personaje) => (
            <div key={personaje.id} className="personaje-card mx-3">
              {/* Envolvemos la imagen en un Link para que redirija al detalle */}
              <Link to={`/detalles/${personaje.id}`}>
                <img
                  src={personaje.image}
                  alt={personaje.name}
                  className="img-fluid rounded-circle shadow-lg mb-2"
                  style={{ maxWidth: '150px' }}
                />
                <h5>{personaje.name}</h5>
              </Link>
            </div>
          ))
        ) : (
          <p>Cargando personajes...</p>
        )}
      </div>
    </div>
  );
}

export default Inicio;
