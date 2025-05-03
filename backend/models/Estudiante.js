const db = require('../config/db');

const Estudiante = {
  


  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query(`
        SELECT 
          e.id,
          e.nombre,
          e.email,
          e.edad,
          s.descripcion AS sexo  /* Esto traerá el nombre del sexo */
        FROM estudiantes e
        INNER JOIN sexos s ON e.sexo_id = s.id
        ORDER BY e.id
      `, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  

  getById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT e.*, s.descripcion AS sexo FROM estudiantes e JOIN sexos s ON e.sexo_id = s.id WHERE e.id = ?', 
      [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  },

  create: (data) => {
    const { nombre, email, edad, sexo_id } = data;
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO estudiantes (nombre, email, edad, sexo_id) VALUES (?, ?, ?, ?)', 
      [nombre, email, edad, sexo_id], (err, result) => {
        if (err) reject(err);
        else resolve({ id: result.insertId, ...data });
      });
    });
  },

  update: (id, data) => {
    const { nombre, email, edad, sexo_id } = data;
    return new Promise((resolve, reject) => {
      db.query('UPDATE estudiantes SET nombre = ?, email = ?, edad = ?, sexo_id = ? WHERE id = ?', 
      [nombre, email, edad, sexo_id, id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows > 0 ? { id, ...data } : null);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM estudiantes WHERE id = ?', [id], (err, result) => {
        if (err) reject(err);
        else resolve(result.affectedRows > 0);
      });
    });
  },

  // Método adicional para verificar si un email ya existe (útil para validaciones)
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM estudiantes WHERE email = ?', [email], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }
};

module.exports = Estudiante;