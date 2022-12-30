const { response } = require( 'express' );

const Hospital = require( '../models/hospital' );

const getHospitales = ( req, res = response ) => {
  res.json( {
    ok: true,
    msg: 'getHospitales',
  } );
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const crearHospitales = async ( req, res = response ) => {

  const uid = req.uid;
  const hospital = new Hospital( {
    usuario: uid,
    ...req.body,
  } );

  // console.log( uid );

  try {
    
    const hospitalDB = await hospital.save();

    res.json( {
      ok: true,
      hospital: hospitalDB,
    } );
  } catch ( error ) {
    console.error( error );
    req.status( 500 ).json( {
      ok: false,
      msg: 'Oops... Ocurrio un error inesperado. Consulte con el administrador del sistema.',
    } );
  }
};

const actualizarHospitales = ( req, res = response ) => {
  res.json( {
    ok: true,
    msg: 'actualizarHospitales',
  } );
};

const borrarHospitales = ( req, res = response ) => {
  res.json( {
    ok: true,
    msg: 'borrarHospitales',
  } );
};

module.exports = { getHospitales, crearHospitales, actualizarHospitales, borrarHospitales, };
