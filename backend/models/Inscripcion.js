const db = require('../config/db');

const Inscripcion = {
  getAllByCurso: (cursoId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM inscripciones WHERE curso_id = ?', [cursoId], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  create: (data) => {
    const { estudiante_id, curso_id, fecha_inicio, fecha_fin } = data;
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO inscripciones (estudiante_id, curso_id, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)',
        [estudiante_id, curso_id, fecha_inicio, fecha_fin], (err, result) => {
          if (err) reject(err);
          else resolve({ id: result.insertId, ...data });
        });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM inscripciones WHERE id = ?', [id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows > 0);
      });
    });
  }
};

module.exports = Inscripcion;
