const { response } = require( 'express' );
const bcrypt = require( 'bcryptjs' );

const Usuario = require( '../models/usuario' );
const { generarJWT } = require( '../helpers/jwt' );
const { googleVerify } = require( '../helpers/google-verify' );

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const login = async ( req, res = response ) => {

  const { email, password } = req.body;

  try {
    
    /**
     * Verificar email
     */
    const usuarioDB = await Usuario.findOne( { email, } );

    if ( !usuarioDB ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Email o contraseña no son válidos.',
      } );
    }

    /**
     * Verificar password
     */
    const validPassword = bcrypt.compareSync( password, usuarioDB.password );

    if ( !validPassword ) {
      return res.status( 400 ).json( {
        ok: false,
        msg: 'Contraseña o email mo son válidos.',
      } );
    }

    /**
     * Generar  el TOKEN - JWT
     */
    const token = await generarJWT( usuarioDB.id );

    res.json( {
      ok: true,
      token,
    } );

  } catch (error) {
    
    res.status( 500 ).json( {
      ok: false,
      msg: 'Error inesperado... revisar logs',
    } );

  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const googleSignIn = async ( req, res = response ) => { 

  try {
    // @ts-ignore
    const { email, name, picture, } = await googleVerify( req.body.token );

    const usuarioDB = await Usuario.findOne( { email, } );
    let usuario;

    if ( !usuarioDB ) {
      usuario = new Usuario( {
        name,
        email,
        password: '@@@',
        img: picture,
        google: true,
      } );
    } else {
      usuario = usuarioDB;
      usuario.google = true;
      // usuario.password = '@@';
    }

    /**
     * Guardar usuario
     */
    await usuario.save();

    /**
     * Generar  el TOKEN - JWT
     */
    const token = await generarJWT( usuario.id );

    res.json( {
      ok: true,
      email, name, picture,
      token,
    } );
    
  } catch (error) {
    console.error( error );

    res.status( 400 ).json( {
      ok: false,
      msg: 'El Token de Google no es correcto.',
    } );
  }

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const renewToken = async (req, res = response ) => {
  
  const uid = req.uid;

  /**
   * Generar  el TOKEN - JWT
   */
  const token = await generarJWT( uid );

  res.json( {
    ok: true,
    token,
  } );
};

module.exports = { login, googleSignIn, renewToken, };