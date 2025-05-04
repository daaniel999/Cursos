import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

const GruposI = () => {
  const [grupos, setGrupos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/api/grupos')
      .then(response => {
        setGrupos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los grupos:', error);
      });
  }, []);

  const handleClick = (grupoId) => {
    navigate(`/grupos/${grupoId}/cursos`);
  };

  return (
    <div>
      <h2>Grupos</h2>
      <Row>
        {grupos.map(grupo => (
          <Col key={grupo.id} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{grupo.nombre}</Card.Title>
                <Button variant="primary" onClick={() => handleClick(grupo.id)}>
                  Ver Cursos
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default GruposI;
