/**
 * Medicos
 * Ruta: '/api/medicos'
 */

import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';

import { getMedicos, getMedicoById, crearMedico, actualizarMedico, borrarMedico } from '../controllers/medicos.js';

import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get( '/',validarJWT, getMedicos );

router.post( '/',
  [
    /**
     * Validación de campos obligatorios
     */
    validarJWT,
    check( 'name', 'El nombre del Médico es Obligatorio' ).notEmpty(),
    check( 'hospital', 'El hospital id debe ser valido' ).isMongoId(),
    validarCampos,
  ],
  crearMedico
);

router.put( '/:id',
  [
    /**
     * Validar campos que se van actualizar
     */
    validarJWT,
    check( 'name', 'El nombre del Médico es Obligatorio' ).notEmpty(),
    check( 'hospital', 'El hospital id debe ser valido' ).isMongoId(),
    validarCampos,
  ],
  actualizarMedico
);

router.delete( '/:id',
  validarJWT,
  borrarMedico 
);

router.get( '/:id',
  validarJWT,
  getMedicoById 
);

export default router;
