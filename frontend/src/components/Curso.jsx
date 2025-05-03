import { useEffect, useState } from 'react';
import { Modal, Button, Table, Form } from 'react-bootstrap';
import {
  obtenerCursos,
  crearCurso,
  actualizarCurso,
  eliminarCurso,
  obtenerGrupos
} from '../services/apiCursos';
import Swal from 'sweetalert2';

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [modalData, setModalData] = useState({ 
    nombre: '', 
    descripcion: '', 
    grupo_id: '' 
  });
  const [showModal, setShowModal] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);

  const cargarDatos = async () => {
    try {
      const [resCursos, resGrupos] = await Promise.all([
        obtenerCursos(),
        obtenerGrupos()
      ]);
      setCursos(resCursos.data);
      setGrupos(resGrupos.data);
    } catch (error) {
      console.error("Error cargando datos:", error);
      Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const abrirModalCrear = () => {
    setModalData({ nombre: '', descripcion: '', grupo_id: '' });
    setModoEditar(false);
    setShowModal(true);
  };

  const abrirModalEditar = (curso) => {
    setModalData({
      ...curso,
      grupo_id: curso.grupo_id || ''
    });
    setModoEditar(true);
    setShowModal(true);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modoEditar) {
        await actualizarCurso(modalData.id, modalData);
        Swal.fire('Éxito', 'Curso actualizado correctamente', 'success');
      } else {
        await crearCurso(modalData);
        Swal.fire('Éxito', 'Curso creado correctamente', 'success');
      }
      setShowModal(false);
      cargarDatos();
    } catch (error) {
      console.error("Error guardando curso:", error);
      Swal.fire('Error', 'No se pudo guardar el curso', 'error');
    }
  };

  const manejarEliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: '¿Eliminar curso?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
      try {
        await eliminarCurso(id);
        Swal.fire('Eliminado', 'El curso ha sido eliminado', 'success');
        cargarDatos();
      } catch (error) {
        console.error("Error eliminando curso:", error);
        Swal.fire('Error', 'No se pudo eliminar el curso', 'error');
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Cursos</h2>
        <Button variant="primary" onClick={abrirModalCrear}>
          Nuevo Curso
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Grupo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id}>
              <td>{curso.nombre}</td>
              <td>{curso.descripcion}</td>
              <td>{curso.nombre_grupo || 'Sin grupo'}</td>
              <td>
                <Button 
                  variant="warning" 
                  size="sm" 
                  className="me-2"
                  onClick={() => abrirModalEditar(curso)}
                >
                  Editar
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => manejarEliminar(curso.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEditar ? 'Editar Curso' : 'Nuevo Curso'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={manejarSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={modalData.nombre}
                onChange={manejarCambio}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={modalData.descripcion}
                onChange={manejarCambio}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Grupo</Form.Label>
              <Form.Select
                name="grupo_id"
                value={modalData.grupo_id}
                onChange={manejarCambio}
                required
              >
                <option value="">Seleccione un grupo</option>
                {grupos.map((grupo) => (
                  <option key={grupo.id} value={grupo.id}>
                    {grupo.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Cursos;