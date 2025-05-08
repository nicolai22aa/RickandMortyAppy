import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Personajes() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [busqueda, setBusqueda] = useState('');
  const [especie, setEspecie] = useState('');
  const [estado, setEstado] = useState('');

  useEffect(() => {
    const fetchPersonajes = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          page,
          ...(busqueda && { name: busqueda }),
          ...(especie && { species: especie }),
          ...(estado && { status: estado }),
        });

        const response = await fetch(`https://rickandmortyapi.com/api/character?${params}`);
        const data = await response.json();
        setPersonajes(data.results || []);
      } catch (error) {
        console.error('Error al cargar personajes:', error);
        setPersonajes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonajes();
  }, [page, busqueda, especie, estado]);

  return (
    <div className="text-center text-white container">
      <h1 className="my-4">Personajes</h1>

      {/* Filtros */}
      <div className="mb-4 d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
        <input
          type="text"
          placeholder="Buscar"
          className="form-control w-50"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          className="form-select w-auto"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
        >
          <option value="">Todas las especies</option>
          <option value="Human">Humano</option>
          <option value="Alien">Alien</option>
          <option value="Robot">Robot</option>
          <option value="Mythological Creature">Criatura mítica</option>
        </select>

        <select
          className="form-select w-auto"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="Alive">Vivo</option>
          <option value="Dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>

      {/* Lista de personajes */}
      {loading ? (
        <div className="text-white">Cargando personajes...</div>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {personajes.map((personaje) => (
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
      )}

      {/* Paginación */}
      <div className="my-4">
        <button
          className="btn btn-primary me-2"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </button>
        <button className="btn btn-primary" onClick={() => setPage(page + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Personajes;
