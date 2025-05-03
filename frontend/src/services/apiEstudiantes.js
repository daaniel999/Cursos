import axios from 'axios';

const API_URL = 'http://localhost:3000/api/estudiantes';

export const obtenerEstudiantes = () => axios.get(API_URL);
export const crearEstudiante = (data) => axios.post(API_URL, data);
export const actualizarEstudiante = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const eliminarEstudiante = (id) => axios.delete(`${API_URL}/${id}`);