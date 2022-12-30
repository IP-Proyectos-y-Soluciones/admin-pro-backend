const { response } = require( 'express' );

const Medico = require( '../models/medico' );

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getMedicos = async ( req, res = response ) => { 

  const medicos = await Medico.find()
    .populate( 'usuario', 'name img' )
    .populate( 'hospital', 'name img' );

  res.json( {
    ok: true,
    medicos,
  } );

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const crearMedico = async ( req, res = response ) => { 

  const uid = req.uid;
  const medico = new Medico( {
    usuario: uid,
    ...req.body,
  } );

  try {

    const medicoDB = await medico.save();
    
    res.json( {
      ok: true,
      Medico: medicoDB,
    } );
  } catch (error) {
    console.error( error );
    res.status( 500 ).json( {
      ok: false,
      msg: 'Oops... algo salio mal. Comuniquese con el administrador del sistema.',
    } );
  }

  
};

const actualizarMedico = ( req, res = response ) => { 

  res.json( {
    ok: true,
    msg: 'actualizarMedicos',
  } );
  
};

const borrarMedico = ( req, res = response ) => { 

  res.json( {
    ok: true,
    msg: 'borrarMedicos',
  } );
  
};



module.exports = { getMedicos, crearMedico, actualizarMedico, borrarMedico, };