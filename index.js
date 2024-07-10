import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import { dbConnection } from './database/config.js';

import usuariosRoutes from './routes/usuarios.js';
import hospitalesRoutes from './routes/hospitales.js';
import medicosRoutes from './routes/medicos.js';
import busquedasRoutes from './routes/busquedas.js';
import authRoutes from './routes/auth.js';
import uploadsRoutes from './routes/uploads.js';

/**
 * Crear Servidor express
 */
const app = express();

/**
 * Configurar CORS
 */
app.use( cors() );

/**
 * Carpeta publc
 */
app.use( express.static( 'public' ) );

/**
 * Lectura y parseo del Json
 */
app.use( express.json() );

/**
 * Conexion DB
 */
dbConnection();

/**
 * Rutas
 */
app.use( '/api/usuarios', usuariosRoutes );
app.use( '/api/hospitales', hospitalesRoutes );
app.use( '/api/medicos', medicosRoutes );
app.use( '/api/todo', busquedasRoutes );
app.use( '/api/login', authRoutes );
app.use( '/api/upload', uploadsRoutes );

/** 
 * Ejecutar el servidor
 */
app.listen( process.env.PORT, () => {
  console.log( `Servidor ejecutandose en el puerto ${ process.env.PORT }` );
});
