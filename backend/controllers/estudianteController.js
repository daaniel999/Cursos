const Estudiante = require('../models/Estudiante');

exports.createEstudiante = async (req, res) => {
  try {
    const data = req.body;
    const estudiante = await Estudiante.create(data);
    res.status(201).json(estudiante);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el estudiante' });
  }
};

exports.getEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.getAll();
    res.status(200).json(estudiantes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los estudiantes' });
  }
};

exports.getEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.getById(req.params.id);
    if (!estudiante) {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    } else {
      res.status(200).json(estudiante);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el estudiante' });
  }
};

exports.updateEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.update(req.params.id, req.body);
    if (!estudiante) {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    } else {
      res.status(200).json(estudiante);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el estudiante' });
  }
};

exports.deleteEstudiante = async (req, res) => {
  try {
    const deleted = await Estudiante.delete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Estudiante no encontrado' });
    } else {
      res.status(200).json({ message: 'Estudiante eliminado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el estudiante' });
  }
};
