import axios from 'axios';

const API_URL = 'http://localhost:3000/api/cursos';
const API_GRUPOS_URL = 'http://localhost:3000/api/grupos';

export const obtenerCursos = () => axios.get(API_URL);
export const crearCurso = (curso) => axios.post(API_URL, curso);
export const actualizarCurso = (id, curso) => axios.put(`${API_URL}/${id}`, curso);
export const eliminarCurso = (id) => axios.delete(`${API_URL}/${id}`);
export const obtenerGrupos = () => axios.get(API_GRUPOS_URL);