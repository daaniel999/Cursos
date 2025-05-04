import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="bg-light vh-100 p-3" style={{ width: '220px' }}>
      <h4>Gestión Cursos</h4>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/estudiantes">Estudiantes</Nav.Link>
        <Nav.Link as={Link} to="/grupos">Grupos</Nav.Link>
        <Nav.Link as={Link} to="/cursos">Cursos</Nav.Link>
        <Nav.Link as={Link} to="/grupos/:grupoId">Inscripciones</Nav.Link>
        <Nav.Link as={Link} to="/">Cerrar sesión</Nav.Link>
      </Nav>
    </div>
  );
}
