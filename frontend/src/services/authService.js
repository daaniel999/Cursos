import axios from 'axios';

const login = async (usuario, contrasena) => {
  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      usuario,
      contrasena,
    });
    return response.data;
  } catch {
    throw new Error('Ocurrió un error en la autenticación');
  }
};

export default {
  login,
};
