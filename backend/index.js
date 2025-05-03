const express = require('express');
const cors = require('cors');
const app = express();
const usuariosRoutes = require('./routes/usuarios');
const grupoRoutes = require('./routes/grupos');
const estudiantesRoutes = require('./routes/estudiantes');
const sexosRoutes = require('./routes/sexos');
const cursosRoutes = require('./routes/cursos');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/cursos', cursosRoutes);
app.use('/api', usuariosRoutes);
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/sexos', sexosRoutes);
app.use('/api/grupos', grupoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});