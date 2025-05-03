const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

router.get('/', (req, res) => {
  db.query('SELECT * FROM sexos', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los sexos' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
