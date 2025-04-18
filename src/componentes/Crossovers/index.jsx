import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

// Componente para mostrar un crossover
function CrossoverCard({ crossover }) {
  return (
    <div className="crossover-card">
      <h3>{crossover.title}</h3>
      <p><strong>Tipo:</strong> {crossover.type}</p>
      <p><strong>Descripción:</strong> {crossover.description}</p>
    </div>
  );
}

CrossoverCard.propTypes = {
  crossover: PropTypes.shape({
    title: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
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

// Componente principal que maneja la lista de crossovers
function Crossovers() {
  const [crossovers, setCrossovers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Simulando la carga de datos de los crossovers
    const crossoverData = [
      {
        id: 1,
        title: 'The Simpsons',
        type: 'Serie de TV',
        description: 'Rick y Morty aparecen en un canal de televisión interdimensional en un episodio de The Simpsons.'
      },
      {
        id: 2,
        title: 'Futurama',
        type: 'Serie de TV',
        description: 'Rick interactúa con personajes de Futurama, como Fry y Bender, en una de sus aventuras interdimensionales.'
      },
      {
        id: 3,
        title: 'Solar Opposites',
        type: 'Serie de TV',
        description: 'Solar Opposites, creada por Justin Roiland, tiene un crossover con Rick and Morty en un episodio.'
      },
      {
        id: 4,
        title: 'Teen Titans Go!',
        type: 'Serie de TV',
        description: 'Los personajes de Rick and Morty hacen una aparición en Teen Titans Go! como parte de un crossover cómico.'
      },
      {
        id: 5,
        title: 'Family Guy',
        type: 'Serie de TV',
        description: 'Rick and Morty aparecen brevemente en un episodio de Family Guy, en una parodia del multiverso.'
      },
      {
        id: 6,
        title: 'Pokémon',
        type: 'Serie de TV',
        description: 'Rick y Morty se encuentran en un universo similar a Pokémon en el episodio Total Rickall.'
      },
      {
        id: 7,
        title: 'The Walking Dead',
        type: 'Serie de TV',
        description: 'Rick hace referencia a The Walking Dead en un episodio de Rick and Morty, creando una conexión cómica entre los dos universos.'
      },
      {
        id: 8,
        title: 'Minecraft: Story Mode',
        type: 'Videojuego',
        description: 'En Minecraft: Story Mode, los personajes de Rick and Morty aparecen en un episodio como parte de un crossover con el juego.'
      },
      {
        id: 9,
        title: 'Mortal Kombat 11',
        type: 'Videojuego',
        description: 'Rick and Morty son personajes jugables en Mortal Kombat 11 como parte de un DLC temático.'
      },
      {
        id: 10,
        title: 'Fortnite',
        type: 'Videojuego',
        description: 'Fortnite incluye skins y objetos temáticos de Rick and Morty como parte de un crossover en el juego.'
      },
      {
        id: 11,
        title: 'Space Jam: A New Legacy',
        type: 'Película',
        description: 'Rick and Morty hacen un cameo en Space Jam: A New Legacy, como parte de una referencia cómica a los personajes de Warner Bros.'
      }
    ];

    setCrossovers(crossoverData);
    setLoading(false);
  }, []);

  return (
    <div className='bg-dark text-white'>
      <h1 className='text-center display-1 py-4'>Crossovers de Rick and Morty</h1>

      <div className='container'>
        {/* Componente de paginación de página */}
        <Paginacion page={page} setPage={setPage} />

        {/* Muestra el estado de carga, error o la lista de crossovers */}
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
            {crossovers.map((crossover) => (
              <div className='col-md-4 mb-4' key={crossover.id}>
                <CrossoverCard crossover={crossover} />
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

export default Crossovers;
