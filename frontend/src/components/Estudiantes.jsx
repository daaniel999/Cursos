import React, { useEffect, useState } from 'react';
import {
  obtenerEstudiantes,
  crearEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
} from '../services/apiEstudiantes';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [sexos, setSexos] = useState([]);
  const [modalData, setModalData] = useState({
    id: null,
    nombre: '',
    email: '',
    edad: '',
    sexo_id: '',
  });
  const [modoEditar, setModoEditar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const cargarEstudiantes = async () => {
    const res = await obtenerEstudiantes();
    setEstudiantes(res.data);
  };

  const cargarSexos = async () => {
    const res = await axios.get('http://localhost:3000/api/sexos');
    setSexos(res.data);
  };

  useEffect(() => {
    cargarEstudiantes();
    cargarSexos();
  }, []);

  const abrirModalCrear = () => {
    setModalData({
      id: null,
      nombre: '',
      email: '',
      edad: '',
      sexo_id: '',
    });
    setModoEditar(false);
    setShowModal(true);
  };

  const abrirModalEditar = (estudiante) => {
    setModalData(estudiante);
    setModoEditar(true);
    setShowModal(true);
  };

  const handleGuardar = async () => {
    try {
      if (modoEditar) {
        await actualizarEstudiante(modalData.id, modalData);
        Swal.fire('Actualizado', 'Estudiante actualizado correctamente', 'success');
      } else {
        await crearEstudiante(modalData);
        Swal.fire('Creado', 'Estudiante registrado correctamente', 'success');
      }
      setShowModal(false);
      cargarEstudiantes();
    } catch {
      Swal.fire('Error', 'Ocurrió un error al guardar', 'error');
    }
  };

  const handleEliminar = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarEstudiante(id);
          Swal.fire('Eliminado', 'Estudiante eliminado correctamente', 'success');
          cargarEstudiantes();
        } catch {
          Swal.fire('Error', 'No se pudo eliminar', 'error');
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Estudiantes</h3>
        <button className="btn btn-primary" onClick={abrirModalCrear}>Agregar Estudiante</button>
      </div>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Sexo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((est) => (
            <tr key={est.id}>
              <td>{est.id}</td>
              <td>{est.nombre}</td>
              <td>{est.email}</td>
              <td>{est.edad}</td>
              <td>{est.sexo}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => abrirModalEditar(est)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(est.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEditar ? 'Editar' : 'Nuevo'} Estudiante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Nombre"
            value={modalData.nombre}
            onChange={(e) => setModalData({ ...modalData, nombre: e.target.value })}
          />
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={modalData.email}
            onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Edad"
            value={modalData.edad}
            onChange={(e) => setModalData({ ...modalData, edad: e.target.value })}
          />
          <select
            className="form-control"
            value={modalData.sexo_id}
            onChange={(e) => setModalData({ ...modalData, sexo_id: e.target.value })}
          >
            <option value="">Seleccione sexo</option>
            {sexos.map((sexo) => (
              <option key={sexo.id} value={sexo.id}>{sexo.descripcion}</option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardar}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Estudiantes;