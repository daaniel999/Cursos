import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';
import Home from './components/Home';
import Estudiantes from './components/Estudiantes';
import Grupos from './components/Grupos';
import Cursos from './components/Curso';
import GruposI from './components/GruposI';
import CursosI from './components/CursosI';
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
          <Route path="grupos/:grupoId" element={<GruposI />} />
          <Route path="grupos/:grupoId/cursos" element={<CursosI />} />
          <Route path="cursos/:cursoId/inscripciones" element={<InscripcionI />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
