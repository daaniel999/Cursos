const db = require('../config/db');

exports.login = (req, res) => {
  const { usuario, contrasena } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?';
  db.query(sql, [usuario, contrasena], (err, result) => {
    if (err) return res.status(500).json({ error: true });
    if (result.length === 0) return res.status(401).json({ autorizado: false });
    res.json({ autorizado: true, usuario: result[0].usuario });
  });
};
