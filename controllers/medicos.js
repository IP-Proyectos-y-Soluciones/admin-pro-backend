import { response } from 'express';

import Medico from '../models/medico.js';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getMedicos = async ( req, res = response ) => { 

  const medicos = await Medico.find()
    .populate( 'usuario', 'name img' )
    .populate( 'hospital', 'name img' );

  res.json({
    ok: true,
    medicos,
  });

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getMedicoById = async ( req, res = response ) => { 

  const id = req.params.id;

  try {
    const medico = await Medico.findById( id )
      .populate( 'usuario', 'name img' )
      .populate( 'hospital', 'name img' );
  
    res.json({
      ok: true,
      medico,
    });
    
  } catch ( error ) {
    console.log( error );
    res.status( 500 ).json({
      ok: false,
      msg: 'Hable con el Administrador',
    });
  }

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const crearMedico = async ( req, res = response ) => { 

  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body,
  });

  try {

    const medicoDB = await medico.save();
    
    res.json({
      ok: true,
      Medico: medicoDB,
    });
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json({
      ok: false,
      msg: 'Oops... algo salio mal. Comuniquese con el administrador del sistema.',
    });
  };
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const actualizarMedico = async ( req, res = response ) => { 

  const id = req.params.id;
  const uid = req.uid;

  try {
    
    /**
     * Verificar si el Médico existe
     */
    const medico = await Medico.findById( id );

    if ( !medico ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Médico no encontrado por id.',
      });
    }

    /**
     * Actualizar el registro del Médico
     */
    const medicoChange = {
      ...req.body,
      usuario: uid,
    };

    /**
     * Guardar en la DB
     */
    const medicoUpdate = await Medico.findByIdAndUpdate( id, medicoChange, { new: true, } );

    res.json({
      ok: true,
      msg: 'Médico Actualizado correctamente!!!!',
      hospital: medicoUpdate,
    });
  } catch ( error ) {
    console.error( error );

    res.status( 500 ).json({
      ok: false,
      msg: 'Oops... Ocurrio un error inesperado.  Consulte con el Administrador del sistema.',
    });
  };
};

const borrarMedico = async ( req, res = response ) => { 

  const id = req.params.id;

  try {
    
    /**
     * Verificar si el Médico existe
     */
    const medico = await Medico.findById( id );

    if ( !medico ) {
      return res.status( 404 ).json({
        ok: false,
        msg: 'Médico no encontrado por id.',
      });
    };

    /**
     * Eliminar Médico
     */
    await Medico.findByIdAndDelete( id );

    res.json({
      ok: true,
      msg: 'Médico Eliminado correctamente.',
    });
  } catch (error) {
    console.error( error );

    res.status( 500 ).json({
      ok: false,
      msg: 'Oops... Ocurrio un error inesperado.  Consulte con el Administrador del sistema.',
    });
  };
};



export { getMedicos, getMedicoById, crearMedico, actualizarMedico, borrarMedico };