const express = require('express');
const router = express.Router();
const cursosController = require('../controllers/cursoController');

router.get('/', cursosController.obtenerCursos);
router.post('/', cursosController.crearCurso);
router.put('/:id', cursosController.actualizarCurso);
router.delete('/:id', cursosController.eliminarCurso);

module.exports = router;
