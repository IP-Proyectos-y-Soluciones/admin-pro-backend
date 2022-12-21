const Usuario = require( '../models/usuario' );


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getUsuarios = ( req, res ) => {
  res.json(
    {
      ok: true,
      msg: 'get Usuarios',
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