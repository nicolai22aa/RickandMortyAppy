import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Detalle from './componentes/Detalle';
import Episodio from './componentes/Episodio';
import Favoritos from './componentes/Favoritos';
import Menu from './componentes/Menu';
import Original from './componentes/Original';
import Personajes from './componentes/Personajes';

function App() {
  return (
    <Router>
  
     <Menu/>

      <Routes>
        <Route path="/detalle" element={<Detalle />} />
        <Route path="/episodio" element={<Episodio />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path='/Menu' element={<Menu/> }/>
        <Route path="/original" element={<Original />} />
        <Route path="/personajes" element={<Personajes />} />

      
      </Routes>
    </Router>
  );
}

export default App;
