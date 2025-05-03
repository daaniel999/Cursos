import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';
import Home from './components/Home';
import Estudiantes from './components/Estudiantes';
import Grupos from './components/Grupos';
import Cursos from './components/Curso';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="estudiantes" element={<Estudiantes />} />
          <Route path="grupos" element={<Grupos />} />
          <Route path="Cursos" element={<Cursos />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
