const express = require( 'express' );

//Crear Servidor express
const app = express();

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
