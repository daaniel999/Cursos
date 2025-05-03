const db = require('../config/db');

const Curso = {
  getAll: (callback) => {
    const sql = `
      SELECT cursos.*, grupos.nombre AS nombre_grupo
      FROM cursos 
      LEFT JOIN grupos ON cursos.grupo_id = grupos.id
    `;
    db.query(sql, callback);
  },

  create: (cursoData, callback) => {
    const { nombre, descripcion, grupo_id } = cursoData;
    const sql = 'INSERT INTO cursos (nombre, descripcion, grupo_id) VALUES (?, ?, ?)';
    db.query(sql, [nombre, descripcion, grupo_id], callback);
  },

  update: (id, cursoData, callback) => {
    const { nombre, descripcion, grupo_id } = cursoData;
    const sql = 'UPDATE cursos SET nombre = ?, descripcion = ?, grupo_id = ? WHERE id = ?';
    db.query(sql, [nombre, descripcion, grupo_id, id], callback);
  },

  delete: (id, callback) => {
    const sql = 'DELETE FROM cursos WHERE id = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = Curso;
