const { response } = require( 'express' );
const bcrypt = require( 'bcryptjs' );

const Usuario = require( '../models/usuario' );

const login = async ( req, res = response ) => {

  const { email, password } = req.body;

  try {
    
    // Verificar email
    const usuarioDB = await Usuario.findOne( { email } );

    if ( !usuarioDB ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Email o contraseña no son válidos.',
      } );
    }

    // Verificar password
    const validPassword = bcrypt.compareSync( password, usuarioDB.password );

    if ( !validPassword ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'Contraseña o email mo son válidos.',
      } );
    }

    // TODO: Generar  el TOKEN - JWT

    res.json( {
      ok: true,
      msg: 'Hola Mundo!!!',
    } );

  } catch (error) {
    
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error inesperado... revisar logs',
    } );

  }
};


module.exports = { login };