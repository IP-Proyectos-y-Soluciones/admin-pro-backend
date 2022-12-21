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
const createUser = async( req, res ) => {
  
  // console.log( req.body );
  const { name, email, password } = req.body;

  const usuario = new Usuario( req.body );

  await usuario.save();

  res.json(
    {
      ok: true,
      usuario,
    }
  );
};


module.exports = { getUsuarios, createUser, };