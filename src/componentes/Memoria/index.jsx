import { useEffect, useState } from 'react';
import './style.css';

function Memoria() {
  const [cartas, setCartas] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [bloquear, setBloquear] = useState(false);
  const [parejasEncontradas, setParejasEncontradas] = useState([]);
  const [intentos, setIntentos] = useState(0);

  useEffect(() => {
    obtenerPersonajes();
  }, []);

  const obtenerPersonajes = async () => {
    const total = 826;
    const indicesAleatorios = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * total) + 1
    );

    try {
      const respuesta = await fetch(`https://rickandmortyapi.com/api/character/${indicesAleatorios.join(',')}`);
      const data = await respuesta.json();
      const personajes = Array.isArray(data) ? data : [data];

      const cartasDuplicadas = personajes
        .flatMap((personaje) => [
          { ...personaje, idUnico: personaje.id + '-a' },
          { ...personaje, idUnico: personaje.id + '-b' },
        ]);

      const cartasMezcladas = cartasDuplicadas.sort(() => Math.random() - 0.5);
      setCartas(cartasMezcladas);
      setParejasEncontradas([]);
      setIntentos(0);
    } catch (error) {
      console.error("Error al obtener personajes:", error);
    }
  };

  const manejarSeleccion = (carta) => {
    if (bloquear || seleccionadas.some(sel => sel.idUnico === carta.idUnico) || parejasEncontradas.includes(carta.id)) {
      return;
    }

    const nuevasSeleccionadas = [...seleccionadas, carta];
    setSeleccionadas(nuevasSeleccionadas);

    if (nuevasSeleccionadas.length === 2) {
      setIntentos(intentos + 1);
      setBloquear(true);
      setTimeout(() => {
        const [c1, c2] = nuevasSeleccionadas;
        if (c1.id === c2.id) {
          setParejasEncontradas([...parejasEncontradas, c1.id]);
        }
        setSeleccionadas([]);
        setBloquear(false);
      }, 1000);
    }
  };

  return (
    <div className="memoria-contenedor">
      <h2>Juego de Memoria - Rick and Morty</h2>
      <div className="contador">Intentos: {intentos} | Parejas encontradas: {parejasEncontradas.length}/6</div>
      
      <div className="grid-cartas">
        {cartas.map((carta) => {
          const volteada = seleccionadas.some(sel => sel.idUnico === carta.idUnico) || parejasEncontradas.includes(carta.id);
          const encontrada = parejasEncontradas.includes(carta.id);
          
          return (
            <div
              key={carta.idUnico}
              className={`carta ${volteada ? 'volteada' : ''} ${encontrada ? 'encontrada' : ''}`}
              onClick={() => manejarSeleccion(carta)}
            >
              <div className="carta-inner">
                <div className="carta-front">
                  <img src={carta.image} alt={carta.name} />
                  <p>{carta.name}</p>
                </div>
                <div className="carta-back"></div>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className="boton-reiniciar" onClick={obtenerPersonajes}>
        Reiniciar Juego
      </button>
    </div>
  );
}

export default Memoria;