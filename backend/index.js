const express = require('express');
const cors = require('cors');
const app = express();
const usuariosRoutes = require('./routes/usuarios');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', usuariosRoutes);

app.listen(3000, () => {
  console.log('Servidor backend en el puerto 3000');
});
