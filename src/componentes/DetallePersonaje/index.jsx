import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DetallePersonaje() {
  const { id } = useParams();
  const [personaje, setPersonaje] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonaje = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        setPersonaje(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los detalles del personaje:', error);
        setLoading(false);
      }
    };

    fetchPersonaje();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!personaje) {
    return <h2>No se encontraron detalles para este personaje</h2>;
  }

  return (
    <div className="container">
      <h1 className="text-center my-4">{personaje.name}</h1>
      <div className="row">
        <div className="col-md-4">
          <img src={personaje.image} alt={personaje.name} className="img-fluid" />
        </div>
        <div className="col-md-8">
          <h5>Especie: {personaje.species}</h5>
          <h5>Estado: {personaje.status}</h5>
          <h5>Género: {personaje.gender}</h5>
          <h5>Ubicación: {personaje.location.name}</h5>
          <h5>Origen: {personaje.origin.name}</h5>
          <p>{personaje.description || 'Sin descripción disponible'}</p>
        </div>
      </div>
    </div>
  );
}

export default DetallePersonaje;
