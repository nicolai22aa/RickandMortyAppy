import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Inicio from './componentes/Inicio';
import Episodio from './componentes/Episodio';
import Favoritos from './componentes/Favoritos';
import Locaciones from './componentes/Locaciones';
import Menu from './componentes/Menu';
import Crossovers from './componentes/Crossovers';
import Personajes from './componentes/Personajes';
import Detalle from './componentes/Detalle';

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/episodio" element={<Episodio />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/locaciones" element={<Locaciones />} />
        <Route path="/crossovers" element={<Crossovers />} />
        <Route path="/personajes" element={<Personajes />} />
        <Route path="/detalles/:id" element={<Detalle />} />
      </Routes>
    </Router>
  );
}

export default App;
