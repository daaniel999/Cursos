const express = require('express');
const cors = require('cors');
const app = express();
const usuariosRoutes = require('./routes/usuarios');

const estudiantesRoutes = require('./routes/estudiantes');
const sexosRoutes = require('./routes/sexos');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', usuariosRoutes);
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/sexos', sexosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});