import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validarJWT = ( req, res, next ) => {

  // Leer el Token
  const token = req.header( 'x-token' );

  // console.log( token );
  if ( !token ) {
    return res.status( 401 ).json({
      ok: false,
      msg: 'No hay token en la petición.',
    });
  };


  try {
    
    const { uid } = jwt.verify( token, process.env.JWT_SECRET_KEY );
    
    // console.log( uid );
    req.uid = uid;
    
    next();

  } catch ( error ) {
    
    return res.status( 401 ).json({
      ok: false,
      msg: 'Token no válido.',
    });
  };
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validarADMIN_ROLE = async( req, res, next ) => {

  const uid = req.uid;

  try {
    const usuarioDB = await Usuario.findById( uid );

    if ( !usuarioDB ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Usuario no existe.',
      });
    };

    if ( usuarioDB.role !== 'ADMIN_ROLE' ) {
      return res.status( 403 ).json({
        ok: false,
        msg: 'No tiene permisos para este acción.',
      });
    };

    next();

  } catch ( error ) {
    console.log( error );
    res.status( 500 ).json({
      ok: false,
      msg: 'Hable con el Administrador',
    });
  };
};

export { validarJWT, validarADMIN_ROLE };