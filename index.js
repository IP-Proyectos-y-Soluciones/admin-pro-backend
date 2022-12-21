const express = require( 'express' );
const { dbConnection } = require( './database/config' );

//Crear Servidor express
const app = express();

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
app.listen( 3000, () => {
  console.log( 'Servidor ejecutandose en el puerto ' + 3000 );
} );
