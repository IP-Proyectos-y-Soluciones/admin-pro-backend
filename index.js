require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear Servidor express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del Json
app.use(express.json());

// Conexión BD
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));

// Ejecutar el servidor
app.listen(process.env.PORT, () => {
  console.log('Servidor ejecutandose en el puerto ' + process.env.PORT);
});
