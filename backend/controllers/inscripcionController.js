const { Op } = require('sequelize');
const Curso = require('../models/Curso');
const Estudiante = require('../models/Estudiante');
const Inscripcion = require('../models/Inscripcion');

// Obtener cursos por grupo
const obtenerCursosPorGrupo = async (req, res) => {
  const { grupo_id } = req.params;
  try {
    const cursos = await Curso.findAll({
      where: { grupo_id },
    });
    res.json(cursos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los cursos' });
  }
};

// Obtener estudiantes por curso
const obtenerEstudiantesPorCurso = async (req, res) => {
  const { curso_id } = req.params;
  try {
    const estudiantes = await Estudiante.findAll({
      include: {
        model: Inscripcion,
        where: { curso_id },
        attributes: [],
      },
    });
    res.json(estudiantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los estudiantes del curso' });
  }
};

// Registrar estudiante en un curso
const registrarEstudiante = async (req, res) => {
  const { estudiante_id, curso_id, fecha_inicio } = req.body;
  try {
    // Verificar si ya está inscrito
    const inscripcionExistente = await Inscripcion.findOne({
      where: {
        estudiante_id,
        curso_id,
        fecha_inicio,
      },
    });

    if (inscripcionExistente) {
      return res.status(400).json({ message: 'El estudiante ya está inscrito en este curso' });
    }

    // Crear inscripción
    const nuevaInscripcion = await Inscripcion.create({
      estudiante_id,
      curso_id,
      fecha_inicio,
    });

    res.status(201).json(nuevaInscripcion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el estudiante en el curso' });
  }
};

module.exports = {
  obtenerCursosPorGrupo,
  obtenerEstudiantesPorCurso,
  registrarEstudiante,
};
