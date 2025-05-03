const db = require('../config/db');

const Grupo = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM grupos ORDER BY id', (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM grupos WHERE id = ?', [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  },

  create: (data) => {
    const { nombre, fecha_inicio, fecha_fin } = data;
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO grupos (nombre, fecha_inicio, fecha_fin) VALUES (?, ?, ?)',
        [nombre, fecha_inicio, fecha_fin], (err, result) => {
          if (err) reject(err);
          else resolve({ id: result.insertId, ...data });
        });
    });
  },

  update: (id, data) => {
    const { nombre, fecha_inicio, fecha_fin } = data;
    return new Promise((resolve, reject) => {
      db.query('UPDATE grupos SET nombre = ?, fecha_inicio = ?, fecha_fin = ? WHERE id = ?',
        [nombre, fecha_inicio, fecha_fin, id], (err, result) => {
          if (err) reject(err);
          else resolve(result.affectedRows > 0 ? { id, ...data } : null);
        });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM grupos WHERE id = ?', [id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows > 0);
      });
    });
  }
};

module.exports = Grupo;
