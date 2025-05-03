import axios from 'axios';

const API_URL = 'http://localhost:3000/api/grupos';

const getGrupos = () => axios.get(API_URL);
const getGrupo = (id) => axios.get(`${API_URL}/${id}`);
const createGrupo = (data) => axios.post(API_URL, data);
const updateGrupo = (id, data) => axios.put(`${API_URL}/${id}`, data);
const deleteGrupo = (id) => axios.delete(`${API_URL}/${id}`);

export default {
  getGrupos,
  getGrupo,
  createGrupo,
  updateGrupo,
  deleteGrupo
};
