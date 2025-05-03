const Grupo = require('../models/Grupo');

exports.getGrupos = async (req, res) => {
  try {
    const grupos = await Grupo.getAll();
    res.status(200).json(grupos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los grupos' });
  }
};

exports.getGrupo = async (req, res) => {
  try {
    const grupo = await Grupo.getById(req.params.id);
    if (!grupo) {
      res.status(404).json({ error: 'Grupo no encontrado' });
    } else {
      res.status(200).json(grupo);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el grupo' });
  }
};

exports.createGrupo = async (req, res) => {
  try {
    const grupo = await Grupo.create(req.body);
    res.status(201).json(grupo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el grupo' });
  }
};

exports.updateGrupo = async (req, res) => {
  try {
    const grupo = await Grupo.update(req.params.id, req.body);
    if (!grupo) {
      res.status(404).json({ error: 'Grupo no encontrado' });
    } else {
      res.status(200).json(grupo);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el grupo' });
  }
};

exports.deleteGrupo = async (req, res) => {
  try {
    const deleted = await Grupo.delete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Grupo no encontrado' });
    } else {
      res.status(200).json({ message: 'Grupo eliminado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el grupo' });
  }
};
