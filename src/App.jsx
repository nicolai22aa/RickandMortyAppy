import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';

import { supabase } from './supabase';
import { AuthProvider } from './contexto/AuthContext';
import { AppProvider } from './contexto/contexto';

import Menu from './componentes/Menu';
import Inicio from './componentes/Inicio';
import Episodio from './componentes/Episodio';
import Favoritos from './componentes/Favoritos';
import Locaciones from './componentes/Locaciones';
import Crossovers from './componentes/Crossovers';
import Personajes from './componentes/Personajes';
import Detalle from './componentes/Detalle';
import Usuario from './componentes/Usuario'
import Memortia from './componentes/Memoria';
import Login from './componentes/Login';
import Registro from './componentes/Registro';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function verificarSesion() {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user || null);
      setCargando(false);
    }

    verificarSesion();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user || null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  if (cargando) return <p>Cargando...</p>;

  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          {usuario && <Menu />}
          <Routes>
            <Route path="/" element={usuario ? <Inicio /> : <Navigate to="/login" />} />
            <Route path="/episodio" element={usuario ? <Episodio /> : <Navigate to="/login" />} />
            <Route path="/favoritos" element={usuario ? <Favoritos /> : <Navigate to="/login" />} />
            <Route path="/locaciones" element={usuario ? <Locaciones /> : <Navigate to="/login" />} />
            <Route path="/crossovers" element={usuario ? <Crossovers /> : <Navigate to="/login" />} />
            <Route path="/personajes" element={usuario ? <Personajes /> : <Navigate to="/login" />} />
            <Route path="/detalles/:id" element={usuario ? <Detalle /> : <Navigate to="/login" />} />
            <Route path="/usuario" element={usuario ? <Usuario/> : <Navigate to="/login"/> }/>
            <Route path="/memoria" element={usuario ? <Memortia/> : <Navigate to="/login"/> }/>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
