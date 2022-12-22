const { response } = require( 'express' );
const bcrypt = require( 'bcryptjs' );

const Usuario = require( '../models/usuario' );


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getUsuarios = async( req, res ) => {

  const usuarios = await Usuario.find( {}, 'name email role google' );

  res.json(
    {
      ok: true,
      usuarios,
    }
  );
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const createUser = async( req, res = response ) => {
  
  // console.log( req.body );
  const { email, password } = req.body;
  
  try {
    
    // Validación de email
    const existeEmail = await Usuario.findOne( { email } );

    if ( existeEmail ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'Email ya esta registrado.',
      } );
    }

    const usuario = new Usuario( req.body );

    // Encriptar password
    const salt = bcrypt.genSaltSync();

    usuario.password = bcrypt.hashSync( password, salt );

    // Guardar usuario
    await usuario.save();

    res.json( {
      ok: true,
      usuario,
    } );

  } catch ( error ) {
    
    console.error( error );

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
const actualizarUsuario = async ( req, res = response ) => {

  // TODO: Validar Token y comprobar si el usuario es el correcto
  
  const uid = req.params.id;

  try {
    
    // Validar si el usuario existe
    const usuarioDB = await Usuario.findById( uid );

    if ( !usuarioDB ) {
      return res.status( 404 ).json( {
        ok: false,
        msg: 'No existe el usuario con ese id.',
      } );
    }

    // Actualizacion el usuario
    const { password, google, email, ...campos} = req.body;

    if ( usuarioDB.email !== email ) {

      const existeEmail = await Usuario.findOne( { email } );
      
      if ( existeEmail ) {
        return res.status( 400 ).json( {
          ok: false,
          msg: 'Ya existe un usuario con ese email.',
        } );
      }
    }

    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

    res.json( {
      ok: true,
      usuario: usuarioActualizado,
    } );
    
  } catch (error) {
    
    console.error( error );

    res.status( 500 ).json( {
      ok: false,
      msg: 'Error inesperado... revisar logs',
    } );

  }
};


module.exports = { getUsuarios, createUser, actualizarUsuario, };