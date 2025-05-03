import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Table, Form } from 'react-bootstrap';

const InscripcionI = ({ cursoId, show, onClose }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [formData, setFormData] = useState({ estudiante_id: '', fecha_inicio: '', fecha_fin: '' });

  useEffect(() => {
    if (cursoId) {
      // Obtener estudiantes inscritos
      axios.get(`http://localhost:3000/api/inscripcion/${cursoId}`)
        .then(response => {
          setEstudiantes(response.data);
        })
        .catch(error => {
          console.error('Error al obtener los estudiantes:', error);
        });
    }
  }, [cursoId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/inscripcion', formData)
      .then(response => {
        console.log('Inscripción exitosa:', response.data);
      })
      .catch(error => {
        console.error('Error al registrar inscripción:', error);
      });
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Inscripción al Curso {cursoId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Estudiantes Inscritos</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map(estudiante => (
              <tr key={estudiante.id}>
                <td>{estudiante.nombre}</td>
                <td>{estudiante.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        <h5>Registrar Nuevo Estudiante</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="estudiante_id">
            <Form.Label>Estudiante</Form.Label>
            <Form.Control
              type="text"
              placeholder="ID Estudiante"
              value={formData.estudiante_id}
              onChange={(e) => setFormData({ ...formData, estudiante_id: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="fecha_inicio">
            <Form.Label>Fecha Inicio</Form.Label>
            <Form.Control
              type="date"
              value={formData.fecha_inicio}
              onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="fecha_fin">
            <Form.Label>Fecha Fin</Form.Label>
            <Form.Control
              type="date"
              value={formData.fecha_fin}
              onChange={(e) => setFormData({ ...formData, fecha_fin: e.target.value })}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Registrar Estudiante
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default InscripcionI;
