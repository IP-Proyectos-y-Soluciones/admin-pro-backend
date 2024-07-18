import { response } from 'express';

import Usuario from '../models/usuario.js';
import Medico from '../models/medico.js';
import Hospital from '../models/hospital.js';

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getTodo = async ( req, res = response ) => {

  const search = req.params.search;
  const regex = new RegExp( search, "i" );

  const [ usuarios, medicos, hospitales ] = await Promise.all([
    Usuario.find({ name: regex, }),
    Medico.find({ name: regex, }),
    Hospital.find({ name: regex, }),
  ]);

  res.json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getDocCollection = async ( req, res = response ) => {

  const table = req.params.table;
  const search = req.params.search;
  const regex = new RegExp( search, "i" );

  let data = [];

  switch ( table ) {
    case 'medicos':
      data = await Medico.find({ name: regex, })
        .populate( 'usuario', 'name img' )
        .populate( 'hospital', 'name img' );

      break;

    case 'hospitales':
      data = await Hospital.find({ name: regex })
        .populate( 'usuario', 'name img' );

      break;

    case 'usuarios':
      data = await Usuario.find({ name: regex });

      break;

    default:
      return res.status( 400 ).json({
        ok: false,
        msg: 'La table debe de ser /medicos /hospitales / usuarios',
      });
  };

  res.json({
    ok: true,
    resultados: data,
  });
};

export { getTodo, getDocCollection };
