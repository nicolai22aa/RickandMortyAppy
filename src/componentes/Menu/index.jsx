import "./style.css"
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <nav className="c-menu">
          <Link to="/">Inicio</Link>
          <Link to="/Personajes">Personajes</Link>
          <Link to="/Locaciones">Locaciones</Link>
          <Link to="/Episodio">Episodio</Link>
          <Link to="/Favoritos">Favoritos</Link>
          <Link to="/Crossovers">Crossovers</Link>
          
        </nav>
    )
  }
 
  export default Menu