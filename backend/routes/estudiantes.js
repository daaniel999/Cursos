const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

// Rutas para estudiantes
router.get('/', estudianteController.getEstudiantes);    
router.get('/:id', estudianteController.getEstudiante);       
router.post('/', estudianteController.createEstudiante);     
router.put('/:id', estudianteController.updateEstudiante);   
router.delete('/:id', estudianteController.deleteEstudiante); 
module.exports = router;
