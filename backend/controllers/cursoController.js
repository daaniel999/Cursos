const Curso = require('../models/Curso');

const obtenerCursos = (req, res) => {
  Curso.getAll((err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    res.json(resultados);
  });
};

const crearCurso = (req, res) => {
  Curso.create(req.body, (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: resultado.insertId, ...req.body });
  });
};

const actualizarCurso = (req, res) => {
  const { id } = req.params;
  Curso.update(id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id, ...req.body });
  });
};

const eliminarCurso = (req, res) => {
  const { id } = req.params;
  Curso.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ eliminado: true });
  });
};

module.exports = {
  obtenerCursos,
  crearCurso,
  actualizarCurso,
  eliminarCurso
};
