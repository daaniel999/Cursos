import React, { useEffect, useState } from 'react';
import grupoService from '../services/apiGrupos';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';

const Grupos = () => {
  const [grupos, setGrupos] = useState([]);
  const [modalData, setModalData] = useState({
    id: null,
    nombre: '',
    fecha_inicio: '',
    fecha_fin: '',
  });
  const [modoEditar, setModoEditar] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const cargarGrupos = async () => {
    try {
      const res = await grupoService.getGrupos();
      setGrupos(res.data);
    } catch (error) {
      console.error('Error al cargar grupos:', error);
    }
  };

  useEffect(() => {
    cargarGrupos();
  }, []);

  const abrirModalCrear = () => {
    setModalData({
      id: null,
      nombre: '',
      fecha_inicio: '',
      fecha_fin: '',
    });
    setModoEditar(false);
    setShowModal(true);
  };

  const abrirModalEditar = (grupo) => {
    const grupoConFechasFormateadas = {
      ...grupo,
      fecha_inicio: grupo.fecha_inicio?.substring(0, 10),
      fecha_fin: grupo.fecha_fin?.substring(0, 10),
    };
  
    setModalData(grupoConFechasFormateadas);
    setModoEditar(true);
    setShowModal(true);
  };



  const handleGuardar = async () => {
    try {
      if (modoEditar) {
        await grupoService.updateGrupo(modalData.id, modalData);
        Swal.fire('Actualizado', 'Grupo actualizado correctamente', 'success');
      } else {
        await grupoService.createGrupo(modalData);
        Swal.fire('Creado', 'Grupo creado correctamente', 'success');
      }
      setShowModal(false);
      cargarGrupos();
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
          await grupoService.deleteGrupo(id);
          Swal.fire('Eliminado', 'Grupo eliminado correctamente', 'success');
          cargarGrupos();
        } catch {
          Swal.fire('Error', 'No se pudo eliminar', 'error');
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Grupos</h3>
        <button className="btn btn-primary" onClick={abrirModalCrear}>Agregar Grupo</button>
      </div>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo) => (
            <tr key={grupo.id}>
              <td>{grupo.id}</td>
              <td>{grupo.nombre}</td>
              <td>{new Date(grupo.fecha_inicio).toLocaleDateString('es-PE')}</td>
              <td>{new Date(grupo.fecha_fin).toLocaleDateString('es-PE')}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => abrirModalEditar(grupo)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(grupo.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEditar ? 'Editar Grupo' : 'Nuevo Grupo'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Nombre del grupo"
            value={modalData.nombre}
            onChange={(e) => setModalData({ ...modalData, nombre: e.target.value })}
          />
          <label className="form-label">Fecha Inicio</label>
          <input
            type="date"
            className="form-control mb-2"
            value={modalData.fecha_inicio}
            onChange={(e) => setModalData({ ...modalData, fecha_inicio: e.target.value })}
          />
          <label className="form-label">Fecha Fin</label>
          <input
            type="date"
            className="form-control"
            value={modalData.fecha_fin}
            onChange={(e) => setModalData({ ...modalData, fecha_fin: e.target.value })}
          />
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

export default Grupos;
