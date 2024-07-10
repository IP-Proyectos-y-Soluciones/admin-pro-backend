/**
 * Hospitales
 * Ruta: '/api/hospitales'
 */

import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';

import { 
  getHospitales, 
  crearHospitales, 
  actualizarHospitales, 
  borrarHospitales, 
} from '../controllers/hospitales.js';

import { validarJWT } from '../middlewares/validar-jwt.js';


const router = Router();

router.get( '/',
  getHospitales
);

router.post( '/',
  [
    /**
     * Validación de campos obligatorios
     */
    validarJWT,
    check( 'name', 'El nombre del Hospital es necesario' ).not().isEmpty(),
    validarCampos,
  ],
  crearHospitales
);

router.put( '/:id',
  [
    /**
     * Validar campos que se van actualizar
     */
    validarJWT,
    check( 'name', 'El nombre del Hospital es necesario' ).not().isEmpty(),
    validarCampos,
  ],
  actualizarHospitales
);

router.delete( '/:id',
  validarJWT,
  borrarHospitales
);


export default router;