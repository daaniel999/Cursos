import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Table } from 'react-bootstrap';

const CursosI = ({ grupoId, show, onClose, onCursoSelect }) => {
  const [cursos, setCursos] = useState([]);
  
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

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cursos del Grupo {grupoId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre del Curso</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map(curso => (
              <tr key={curso.id} onClick={() => onCursoSelect(curso.id)}>
                <td>{curso.nombre}</td>
                <td>{curso.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CursosI;
