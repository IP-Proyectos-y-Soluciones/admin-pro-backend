/**
 * Ruta: '/api/usuarios'
 */

import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';

import { getUsuarios, createUser, actualizarUsuario, borrarUsuario } from '../controllers/usuarios.js';
import { validarADMIN_ROLE, validarJWT } from '../middlewares/validar-jwt.js';


const router = Router();

router.get( '/', validarJWT, getUsuarios );

router.post( '/',
  [
    // Validación de campos obligatorios
    check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'password', 'El password es obligatorio' ).not().isEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    validarCampos,
  ],
  createUser 
);

router.put( '/:id',
  [
    // Validar campos que se van actualizar
    validarJWT,
    validarADMIN_ROLE,
    check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    check( 'role', 'El role es obligatorio' ).not().isEmpty(),
    validarCampos, 
  ],
  actualizarUsuario 
);

  router.delete( '/:id', 
    [ validarJWT, validarADMIN_ROLE ],
    borrarUsuario 
  );


  export default router;