const express = require('express');
const router = express.Router();
const inscripcionController = require('../controllers/inscripcionController');

// Obtener cursos por grupo
router.get('/cursos/:grupo_id', inscripcionController.obtenerCursosPorGrupo);

// Obtener estudiantes por curso
router.get('/estudiantes/:curso_id', inscripcionController.obtenerEstudiantesPorCurso);

// Registrar estudiante en un curso
router.post('/registrar', inscripcionController.registrarEstudiante);

module.exports = router;
