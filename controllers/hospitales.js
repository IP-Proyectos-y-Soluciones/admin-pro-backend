import { response } from 'express';

import Hospital from '../models/hospital.js';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getHospitales = async ( req, res = response ) => {

  const hospitales = await Hospital.find()
    .populate( 'usuario', 'name img' );

  res.json({
    ok: true,
    hospitales,
  });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const crearHospitales = async ( req, res = response ) => {

  const uid = req.uid;
  const hospital = new Hospital({
    usuario: uid,
    ...req.body,
  });

  // console.log( uid );

  try {
    
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch ( error ) {
    console.error( error );
    req.status( 500 ).json({
      ok: false,
      msg: 'Oops... Ocurrio un error inesperado. Consulte con el administrador del sistema.',
    });
  };
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const actualizarHospitales = async ( req, res = response ) => {

  const id = req.params.id;
  const uid = req.uid;

  try {
    
    /**
     * Verificar si el Hospital existe
     */
    const hospital = await Hospital.findById( id );

    if ( !hospital ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Hospital no encontrado por id.',
      });
    };

    /**
     * Actualizar el registro del Hospital
     */
    const hospitalChange = {
      ...req.body,
      usuario: uid,
    };

    /**
     * Guardar en la DB
     */
    const hospitalUpdate = await Hospital.findByIdAndUpdate( id, hospitalChange, { new: true, } );

    res.json({
      ok: true,
      msg: 'Hospital Actualizado correctamente!!!!',
      hospital: hospitalUpdate,
    });
  } catch ( error ) {
    console.error( error );

    res.status( 500 ).json({
      ok: false,
      msg: 'Oops... Ocurrio un error inesperado.  Consulte con el Administrador del sistema.',
    });
  };
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const borrarHospitales = async ( req, res = response ) => {
  
  const id = req.params.id;

  try {
    
    /**
     * Verificar si el Hospital existe
     */
    const hospital = await Hospital.findById( id );

    if ( !hospital ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Hospital no encontrado por id.',
      });
    };

    /**
     * Eliminar Hospital
     */
    await Hospital.findByIdAndDelete( id );

    res.json({
      ok: true,
      msg: 'Hospital Eliminado correctamente.',
    });
  } catch ( error ) {
    console.error( error );

    res.status( 500 ).json({
      ok: false,
      msg: 'Oops... Ocurrio un error inesperado.  Consulte con el Administrador del sistema.',
    });
  }
};

export { getHospitales, crearHospitales, actualizarHospitales, borrarHospitales };
