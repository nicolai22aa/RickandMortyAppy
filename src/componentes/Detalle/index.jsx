import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

function Detalle() {
  const { id } = useParams();
  const [personaje, setPersonaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        setPersonaje(data);
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        setEsFavorito(favoritos.some(p => p.id === data.id));
      } catch (error) {
        console.error('Error al cargar detalle:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalle();
  }, [id]);

  const toggleFavorito = () => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    let actualizados;
    if (esFavorito) {
      actualizados = favoritos.filter(p => p.id !== personaje.id);
    } else {
      actualizados = [...favoritos, personaje];
    }
    localStorage.setItem('favoritos', JSON.stringify(actualizados));
    setEsFavorito(!esFavorito);
  };

  if (loading) return <div className="text-white text-center">Cargando detalle...</div>;
  if (!personaje) return <div className="text-white text-center">No se encontró el personaje</div>;

  return (
    <div className="text-white text-center">
      <h2>{personaje.name}</h2>
      <img
        src={personaje.image}
        alt={personaje.name}
        className="img-fluid rounded shadow"
        style={{ maxWidth: '200px' }}
      />
      <div style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={toggleFavorito}>
        {esFavorito ? '❤️' : '🤍'}
      </div>
      <p><strong>Status:</strong> {personaje.status}</p>
      <p><strong>Especie:</strong> {personaje.species}</p>
      <p><strong>Género:</strong> {personaje.gender}</p>
      <p><strong>Origen:</strong> {personaje.origin.name}</p>
      <p><strong>Ubicación actual:</strong> {personaje.location.name}</p>
    </div>
  );
}

export default Detalle;
