import "./style.css"
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <nav className="c-menu">
          <Link to="/Detalle">Detalle</Link>
          <Link to="/Episodio">Episodio</Link>
          <Link to="/Favoritos">Favoritos</Link>
          <Link to="/Original">Original</Link>
          <Link to="/Personajes">Personajes</Link>
        </nav>
    )
  }
 
  export default Menu