import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const CursosI = () => {
  const { grupoId } = useParams();
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (grupoId) {
      axios.get(`http://localhost:3000/api/cursos/${grupoId}`)
        .then(response => {
          setCursos(response.data);
        })
        .catch(error => {
          console.error('Error al obtener los cursos:', error);
        });
    }
  }, [grupoId]);

  const handleCursoSelect = (cursoId) => {
    navigate(`/cursos/${cursoId}/inscripciones`);
  };

  return (
    <div>
      <h2>Cursos del Grupo {grupoId}</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre del Curso</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map(curso => (
            <tr key={curso.id} onClick={() => handleCursoSelect(curso.id)}>
              <td>{curso.nombre}</td>
              <td>{curso.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CursosI;
