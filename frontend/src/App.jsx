import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Agrega más rutas aquí para otros componentes */}
      </Routes>
    </Router>
  );
}

export default App;

