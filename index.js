require( 'dotenv' ).config();

const express = require( 'express' );
const cors = require( 'cors' );

const { dbConnection } = require( './database/config' );

//Crear Servidor express
const app = express();

//Configurar CORS
app.use( cors() );

// Conexión BD
dbConnection();

//Rutas
app.get( '/', ( req, res ) => {
  
  res.json(
    {
    ok: true,
    msg: 'Hola Mundo',
    }
  );

} );


//Ejecutar el servidor
app.listen( process.env.PORT, () => {
  console.log( 'Servidor ejecutandose en el puerto ' + process.env.PORT );
} );
