import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';
import Home from './components/Home';
import Estudiantes from './components/Estudiantes';
import Grupos from './components/Grupos';
import Cursos from './components/Curso';
import CursosI from './components/CursosI';
import GruposI from './components/GruposI';
import InscripcionI from './components/InscripcionI';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="estudiantes" element={<Estudiantes />} />
          <Route path="grupos" element={<Grupos />} />
          <Route path="cursos" element={<Cursos />} />
          <Route path="inscripciones" element={<InscripcionI />} />
          <Route path="gruposi" element={<GruposI />} />
          <Route path="cursosi" element={<CursosI />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

