import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './componentes/Menu';
import Inicio from './componentes/Inicio';
import Personajes from './componentes/Personajes';
import Locaciones from './componentes/Locaciones';
import Episodio from './componentes/Episodio';
import Favoritos from './componentes/Favoritos';
import Crossovers from './componentes/Crossovers';
import Detalles from './componentes/DetallePersonaje'; // Importamos el componente de detalles

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/personajes" element={<Personajes />} />
        <Route path="/locaciones" element={<Locaciones />} />
        <Route path="/episodio" element={<Episodio />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/crossovers" element={<Crossovers />} />
        <Route path="/detalles/:id" element={<Detalles />} /> {/* Nueva ruta de detalles */}
      </Routes>
    </Router>
  );
}

export default App;
