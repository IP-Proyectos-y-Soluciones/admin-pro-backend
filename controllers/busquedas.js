const { response } = require('express');

const Usuario = require( '../models/usuario' );
const Medico = require( '../models/medico' );
const Hospital = require( '../models/hospital' );

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getTodo = async ( req, res = response ) => {
  
  const search = req.params.search;
  const regex = new RegExp( search, 'i' );

  const [ usuarios, medicos, hospitales ] = await Promise.all( [
    Usuario.find( { name: regex, } ),
    Medico.find( { name: regex, } ),
    Hospital.find( { name: regex, } ),
  ] );

  res.json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};



module.exports = { getTodo, };