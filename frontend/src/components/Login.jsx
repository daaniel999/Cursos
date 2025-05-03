import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        usuario,
        contrasena
      });

      if (response.data.autorizado) {
        Swal.fire({
          title: 'Éxito',
          text: 'Bienvenido!',
          icon: 'success',

         
        }).then(() => {
          // Redirigir a otra página o cambiar el estado de autenticación
        });


      } else {
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
        });
      }
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error en la autenticación',
        icon: 'error',
      });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
